import 'reflect-metadata';
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { RuntimeStore } from '../dist/runtime/runtime-store.js';
import { PantaService } from '../dist/panta/service.js';
import { ChainService } from '../dist/panta/chain.js';
import { Keypair, TransactionMessage, VersionedTransaction, SystemProgram } from '@solana/web3.js';
const wallet = '11111111111111111111111111111111';
test('signing fails closed without verified deployment; signed messages cannot be substituted', () => {
    const chain = new ChainService();
    assert.equal(chain.configuration().ready, false);
    const payer = Keypair.generate();
    const message = new TransactionMessage({ payerKey: payer.publicKey, recentBlockhash: wallet, instructions: [SystemProgram.transfer({ fromPubkey: payer.publicKey, toPubkey: Keypair.generate().publicKey, lamports: 1 })] }).compileToV0Message();
    const tx = new VersionedTransaction(message);
    tx.sign([payer]);
    const raw = Buffer.from(tx.serialize()).toString('base64'), bytes = Buffer.from(message.serialize()).toString('base64');
    assert.ok(chain.signed(raw, bytes, payer.publicKey.toBase58()));
    assert.throws(() => chain.signed(raw, 'tampered', payer.publicKey.toBase58()));
    assert.throws(() => chain.signed(raw, bytes, Keypair.generate().publicKey.toBase58()));
});
test('durable intent binding, duplicate prevention, uncertain broadcast and reporting recovery', async () => {
    process.env.APP_DATABASE_PATH = ':memory:';
    const store = new RuntimeStore();
    let quotes = 0, builds = 0, broadcasts = 0, reports = 0;
    const client = { cache: new Map(), buyQuote: async (input) => { quotes++; return { quoteId: 'q1', marketId: wallet, side: 'yes', amountUsdc: input.amountUsdc, feeUsdc: '0.02', shares: '2', expiresAt: new Date(Date.now() + 60000).toISOString() }; }, buyBuild: async () => { builds++; return { orderId: 'o1', quoteId: 'q1', wallet, marketId: wallet, side: 'yes', amountUsdc: '1', recentBlockhash: wallet, instructions: [] }; }, submit: async () => ({ status: 'submitted' }), verify: async () => ({ status: 'confirmed' }), report: async () => { if (++reports === 1)
            throw Error('attribution delayed'); return { status: 'processed' }; } };
    const service = new PantaService(store, client);
    const chain = { configuration: () => ({ready:true,chain:'solana:devnet',reason:null}), rpc: async () => ({}), validate: async () => ({ transaction: 'unsigned', message: 'message', feeLamports: '5000', chain: 'solana:devnet', validatedAt: new Date().toISOString() }), signed: () => 'test-signature', broadcast: async () => { broadcasts++; throw Error('RPC response lost'); }, status: async () => 'confirmed' };
    Object.assign(service.chain, chain);
    try {
        const previousRailway=process.env.RAILWAY_ENVIRONMENT;
        process.env.RAILWAY_ENVIRONMENT='production';
        try {
            assert.equal(service.readiness().ready,false);
            assert.match(service.readiness().reason,/TURSO_DATABASE_URL/);
        } finally {
            if(previousRailway===undefined)delete process.env.RAILWAY_ENVIRONMENT;
            else process.env.RAILWAY_ENVIRONMENT=previousRailway;
        }
        const token = await store.authenticate({ email: 'intent@example.test', password: 'long password for test', name: 'Tester' }, true, 'test'), cookie = 'panta_session=' + token;
        const other = await store.authenticate({ email: 'other@example.test', password: 'long password for test', name: 'Other' }, true, 'other');
        const body = { kind: 'buy', input: { wallet, marketId: wallet, side: 'yes', amountUsdc: '1' }, requestId: randomUUID() };
        const intent = await service.prepare(cookie, body);
        assert.equal((await service.prepare(cookie, body)).id, intent.id);
        assert.equal(quotes, 1);
        await assert.rejects(async () => (await service.read('panta_session=' + other, intent.id)));
        await service.build(cookie, intent.id);
        await service.build(cookie, intent.id);
        assert.equal(builds, 1);
        const uncertain = await service.broadcast(cookie, intent.id, { transaction: 'signed' });
        assert.equal(uncertain.state, 'confirmation_unknown');
        assert.equal(uncertain.signature, 'test-signature');
        assert.equal((await service.read(cookie, intent.id)).signed, undefined);
        await service.broadcast(cookie, intent.id, { transaction: 'signed' });
        assert.equal(broadcasts, 1);
        await assert.rejects(async () => (await service.build(cookie, intent.id)));
        await assert.rejects(async () => (await service.prepare(cookie, { ...body, requestId: randomUUID() })), e => e.getResponse().code === 'RECONCILIATION_REQUIRED');
        const confirmed = await service.reconcile(cookie, intent.id);
        assert.equal(confirmed.chainStatus, 'confirmed');
        assert.equal(confirmed.providerStatus, 'reconciliation_required');
        const recovered = await service.reconcile(cookie, intent.id);
        assert.equal(recovered.providerStatus, 'processed');
        assert.equal(broadcasts, 1);
        const expired = await service.prepare(cookie, { ...body, requestId: randomUUID() });
        const record = JSON.parse((await store.db.prepare('SELECT value FROM transaction_intents WHERE id=?').get(expired.id)).value);
        record.quote.expiresAt = new Date(0).toISOString();
        (await store.db.prepare('UPDATE transaction_intents SET value=? WHERE id=?').run(JSON.stringify(record), record.id));
        await assert.rejects(async () => (await service.build(cookie, expired.id)), e => e.getResponse().code === 'QUOTE_EXPIRED');
    }
    finally {
        (await store.onModuleDestroy());
    }
});
