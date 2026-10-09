import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import type { RuntimeStore } from '../runtime/runtime-store.js';
import { PantaClient, PantaError } from './client.js';
import { ChainService, type Kind, type TransactionBinding } from './chain.js';
import * as c from './contracts.js';
type Values = Record<string, unknown>;
interface Intent {
    id: string;
    userId: string;
    kind: Kind;
    input: Values;
    wallet: string;
    state: string;
    chainStatus: string;
    providerStatus: string;
    createdAt: string;
    updatedAt: string;
    quote?: Values;
    build?: c.Build;
    approved?: {
        transaction: string;
        message: string;
        feeLamports: string;
        chain: string;
        validatedAt: string;
    };
    signature?: string;
    signed?: string;
    error?: string;
    requestId: string;
}
const kinds = z.enum(['buy', 'create', 'claim', 'fees']);
export class PantaService {
    readonly client: PantaClient;
    readonly chain = new ChainService();
    private readonly locks = new Set<string>();
    constructor(private readonly store: RuntimeStore, client = new PantaClient()) { this.client = client; }
    private async user(cookie?: string) { return (await this.store.require(cookie)); }
    private async save(intent: Intent) { intent.updatedAt = new Date().toISOString(); (await this.store.db.prepare('INSERT INTO transaction_intents VALUES (?,?,?,?) ON CONFLICT(id) DO UPDATE SET value=excluded.value').run(intent.id, intent.userId, intent.requestId, JSON.stringify(intent))); return intent; }
    private async get(cookie: string | undefined, id: string) { const user = (await this.user(cookie)); const row = (await this.store.db.prepare('SELECT value FROM transaction_intents WHERE id=? AND user_id=?').get(id, String(user.id))) as {
        value: string;
    } | undefined; if (!row)
        throw new PantaError('NOT_FOUND', 'Transaction intent not found.', 404); return JSON.parse(row.value) as Intent; }
    private public(intent: Intent) { const { signed: _, approved, ...rest } = intent; return { ...rest, ...(approved ? { review: { feeLamports: approved.feeLamports, chain: approved.chain, validatedAt: approved.validatedAt } } : {}) }; }
    private async lock<T>(id: string, run: () => Promise<T>) { if (this.locks.has(id))
        throw new PantaError('BUSY', 'This operation is already running.', 409); this.locks.add(id); try {
        return await this.store.db.withLock('intent:'+id,run);
    }
    finally {
        this.locks.delete(id);
    } }
    private error(error: unknown) { return error instanceof PantaError ? (error.getResponse() as {
        message: string;
    }).message : 'Operation interrupted. Check status before retrying.'; }
    async config() { let permission: null | boolean = null; let providerError: string | null = null; try {
        permission = (await this.client.account()).canCreateMarkets;
    }
    catch (e) {
        providerError = this.error(e);
    } return { source: 'Panta', pollIntervalMs: 10000, canCreateMarkets: permission, providerError, ...this.chain.configuration() }; }
    async list(cookie?: string) { const user = (await this.user(cookie)); return ((await this.store.db.prepare('SELECT value FROM transaction_intents WHERE user_id=? ORDER BY rowid DESC LIMIT 200').all(String(user.id))) as {
        value: string;
    }[]).map(row => this.public(JSON.parse(row.value) as Intent)); }
    async read(cookie: string | undefined, id: string) { return this.public((await this.get(cookie, id))); }
    async prepare(cookie: string | undefined, raw: unknown) {
 const user=await this.user(cookie);
 return this.lock('prepare:'+user.id,()=>this.prepareLocked(cookie,raw));
 }
 private async prepareLocked(cookie: string | undefined, raw: unknown) {
        const user = (await this.user(cookie));
        this.store.rate('panta-prepare:' + user.id, 20);
        const envelope = z.object({ kind: kinds, input: z.record(z.string(), z.unknown()), requestId: z.string().uuid() }).strict().parse(raw);
        const parsed = envelope.kind === 'buy' ? c.buyInput.parse(envelope.input) : envelope.kind === 'create' ? c.createInput.parse(envelope.input) : z.object({ wallet: c.address, marketId: c.address }).strict().parse(envelope.input);
        const old = (await this.store.db.prepare('SELECT value FROM transaction_intents WHERE user_id=? AND request_id=?').get(String(user.id), envelope.requestId)) as {
            value: string;
        } | undefined;
        if (old) {
            const item = JSON.parse(old.value) as Intent;
            if (item.kind !== envelope.kind || JSON.stringify(item.input) !== JSON.stringify(parsed))
                throw new PantaError('INTENT_CONFLICT', 'Request identifier already belongs to different details.', 409);
            return this.public(item);
        }
        const unresolved = (await this.list(cookie)).find(item => item.wallet === parsed.wallet && item.kind === envelope.kind && item.signature && ['pending', 'confirmation_unknown', 'submitting', 'submitted'].includes(item.chainStatus));
        if (unresolved)
            throw new PantaError('RECONCILIATION_REQUIRED', 'Check the pending transaction in recovery history before preparing another action for this wallet.', 409);
        const now = new Date().toISOString();
        const intent: Intent = { id: randomUUID(), requestId: envelope.requestId, userId: String(user.id), kind: envelope.kind, input: parsed, wallet: parsed.wallet, state: 'quote_loading', chainStatus: 'not_submitted', providerStatus: 'not_submitted', createdAt: now, updatedAt: now };
        (await this.save(intent));
        try {
            if (intent.kind === 'buy')
                intent.quote = await this.client.buyQuote(parsed as c.BuyInput, intent.userId);
            else if (intent.kind === 'create') {
                if (!(await this.client.account()).canCreateMarkets)
                    throw new PantaError('CREATE_NOT_PERMITTED', 'Request create-market permission from Panta.', 403);
                intent.quote = await this.client.createQuote(parsed as c.CreateInput);
            }
            else {
                const marketId = String(intent.input.marketId);
                if (intent.kind === 'claim') {
                    const positions = await this.client.positions(intent.wallet);
                    if (!positions.positions.some(p => p.marketId === marketId && p.claimable && !p.claimed))
                        throw new PantaError('NOT_CLAIMABLE', 'No eligible unclaimed winning position was returned.', 400);
                }
                intent.build = intent.kind === 'claim' ? await this.client.claim(intent.wallet, marketId) : await this.client.creatorFees(intent.wallet, marketId);
            }
            intent.state = 'quote_ready';
        }
        catch (e) {
            intent.state = 'failed';
            intent.error = this.error(e);
        }
        (await this.save(intent));
        return this.public(intent);
    }
    private binding(intent: Intent): TransactionBinding { return { kind: intent.kind, wallet: intent.wallet, market: String(intent.kind === 'create' ? intent.quote?.expectedEventPda : intent.input.marketId), amountBase: intent.kind === 'buy' ? c.baseUnits(String(intent.input.amountUsdc)).toString() : intent.kind === 'create' ? String(intent.quote?.paymentUsdc) : '0', ...(intent.kind === 'buy' ? { side: String(intent.input.side), quotedShares: String(intent.quote?.shares), maxSlippageBps: Number(intent.input.maxSlippageBps) } : {}), ...(intent.kind === 'create' ? { question: String(intent.input.question), resolutionRule: String(intent.input.resolutionRule), startTime: Number(intent.input.startTime), endTime: Number(intent.input.endTime), resolutionTime: Number(intent.input.resolutionTime) } : {}) }; }
    async build(cookie: string | undefined, id: string) {
        return this.lock(id, async () => {
            const intent = (await this.get(cookie, id));
            if (intent.signature)
                throw new PantaError('ALREADY_SUBMITTED', 'A signature already exists. Check its status; do not rebuild.', 409);
            if (intent.state === 'build_unknown' || intent.state === 'building')
                throw new PantaError('BUILD_UNKNOWN', 'Previous build outcome is unknown. No automatic rebuild is allowed.', 409);
            if (intent.state === 'failed')
                throw new PantaError('INTENT_FAILED', intent.error || 'Request a new reviewed intent.', 400);
            if (intent.quote?.expiresAt && Date.parse(String(intent.quote.expiresAt)) <= Date.now()) {
                intent.state = 'quote_expired';
                (await this.save(intent));
                throw new PantaError('QUOTE_EXPIRED', 'Quote expired. Request and review a new quote.', 400);
            }
            if (!intent.build) {
                intent.state = 'building';
                (await this.save(intent));
                try {
                    intent.build = intent.kind === 'create' ? await this.client.createBuild(String(intent.quote?.createId), intent.wallet) : await this.client.buyBuild(String(intent.quote?.quoteId), intent.wallet, Number(intent.input.maxSlippageBps), intent.userId);
                    intent.state = 'built';
                    (await this.save(intent));
                }
                catch (e) {
                    intent.state = 'build_unknown';
                    intent.error = this.error(e);
                    (await this.save(intent));
                    throw e;
                }
            }
            // Build DTO bindings are checked in addition to independent instruction decoding.
            const build = intent.build;
            if ('wallet' in build && build.wallet !== intent.wallet || 'marketId' in build && build.marketId !== intent.input.marketId)
                throw new PantaError('INVALID_TRANSACTION', 'Build wallet or market mismatch.');
            if (intent.kind === 'buy' && 'amountUsdc' in build && (c.baseUnits(String(build.amountUsdc)) !== c.baseUnits(String(intent.input.amountUsdc)) || build.side !== intent.input.side || build.quoteId !== intent.quote?.quoteId))
                throw new PantaError('INVALID_TRANSACTION', 'Build quote, outcome, or amount mismatch.');
            if (intent.kind === 'create' && 'expectedEventPda' in build && (build.expectedEventPda !== intent.quote?.expectedEventPda || build.paymentUsdc !== intent.quote?.paymentUsdc))
                throw new PantaError('INVALID_TRANSACTION', 'Creation address or fee mismatch.');
            intent.approved = await this.chain.validate(build, this.binding(intent));
            intent.state = 'awaiting_signature';
            delete intent.error;
            (await this.save(intent));
            return { ...this.public(intent), approval: intent.approved };
        });
    }
    async broadcast(cookie: string | undefined, id: string, raw: unknown) {
        return this.lock(id, async () => {
            const intent = (await this.get(cookie, id));
            const { transaction } = z.object({ transaction: z.string().min(1).max(20000) }).strict().parse(raw);
            if (!intent.approved || !intent.build)
                throw new PantaError('NOT_REVIEWED', 'Review and validate this transaction first.', 400);
            const signature = this.chain.signed(transaction, intent.approved.message, intent.wallet);
            if (intent.signature) {
                if (intent.signature !== signature)
                    throw new PantaError('SIGNATURE_CONFLICT', 'A different transaction was already submitted.', 409);
                return this.public(intent);
            }
            await this.chain.rpc();
            // Durable before broadcast: uncertainty must never produce a second purchase.
            intent.signature = signature;
            intent.signed = transaction;
            intent.state = 'submitting';
            intent.chainStatus = 'confirmation_unknown';
            (await this.save(intent));
            try {
                await this.chain.broadcast(transaction);
                intent.state = 'submitted';
                intent.chainStatus = 'pending';
            }
            catch (e) {
                intent.state = 'confirmation_unknown';
                intent.error = this.error(e);
            }
            (await this.save(intent));
            return this.public(intent);
        });
    }
    async reconcile(cookie: string | undefined, id: string) {
        return this.lock(id, async () => {
            const intent = (await this.get(cookie, id));
            if (!intent.signature || !intent.build)
                return this.public(intent);
            try {
                intent.chainStatus = await this.chain.status(intent.signature, intent.build.recentBlockhash);
                intent.state = intent.chainStatus;
                delete intent.error;
            }
            catch (e) {
                intent.error = this.error(e);
                (await this.save(intent));
                return this.public(intent);
            }
            try {
                if (intent.kind === 'buy' && 'orderId' in intent.build) {
                    await this.client.submit(String(intent.build.orderId), intent.signature, intent.wallet);
                    const status = await this.client.verify(String(intent.build.orderId), intent.signature, intent.wallet);
                    intent.providerStatus = status.status;
                }
                if (intent.chainStatus === 'confirmed') {
                    if (intent.kind === 'create') {
                        const registration = await this.client.register(String(intent.quote?.createId), intent.signature);
                        intent.providerStatus = registration.status;
                    }
                    else if (intent.kind === 'fees')
                        intent.providerStatus = 'not_applicable';
                    else {
                        await this.client.report({ signature: intent.signature, wallet: intent.wallet, marketId: String(intent.input.marketId), userId: intent.userId, clientOrderId: intent.id, ...(intent.quote?.quoteId ? { quoteId: String(intent.quote.quoteId) } : {}) });
                        intent.providerStatus = 'processed';
                    }
                    this.client.cache.clear();
                }
            }
            catch (e) {
                intent.providerStatus = 'reconciliation_required';
                intent.error = this.error(e);
            }
            (await this.save(intent));
            return this.public(intent);
        });
    }
    async creatorMarkets(cookie: string | undefined, wallet: string) { const user = (await this.user(cookie)); c.address.parse(wallet); const own = (await this.list(cookie)).filter(i => i.kind === 'create' && i.wallet === wallet); return { wallet, source: 'Panta Signal creation records', items: own.map(i => ({ intentId: i.id, marketId: i.quote?.expectedEventPda, title: i.input.question, state: i.state, providerStatus: i.providerStatus })), userId: user.id }; }
    async operator(cookie: string | undefined, operation: string) { const user = (await this.user(cookie)); if (!(process.env.PANTA_OPERATOR_USER_IDS || '').split(',').includes(String(user.id)))
        throw new PantaError('FORBIDDEN', 'Provider account access requires an explicitly configured integration operator.', 403); switch (operation) {
        case 'account': return this.client.account();
        case 'metrics': return this.client.metrics();
        case 'dashboard': return this.client.dashboard();
        case 'creates': return this.client.creates();
        default: throw new PantaError('NOT_FOUND', 'Unsupported operator read.', 404);
    } }
}
