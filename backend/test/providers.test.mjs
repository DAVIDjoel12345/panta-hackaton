import 'reflect-metadata';
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { RuntimeStore } from '../dist/runtime/runtime-store.js';
import { LiveServices, samplePriceRows } from '../dist/runtime/providers.js';
test('long chart ranges retain first, latest, and brief Panta price spikes', () => { const rows = Array.from({ length: 10000 }, (_, index) => ({ observed_at: index * 2000, yes_price: index === 5000 ? '0.91' : '0.50' })); const sampled = samplePriceRows(rows); assert.ok(sampled.length <= 1200); assert.equal(sampled[0].observed_at, 0); assert.equal(sampled.at(-1).observed_at, 19998000); assert.ok(sampled.some(row => row.yes_price === '0.91')); });
test('external AI sends authenticated requests, scopes history and rejects failures without local fallback', async () => {
    process.env.APP_DATABASE_PATH = ':memory:';
    const store = new RuntimeStore(), service = new LiveServices(store);
    service.topicResearch.get = async () => ({ recent: [], earlier: [], retrievedAt: new Date().toISOString() });
    const original = globalThis.fetch, oldKey = process.env.GEMINI_API_KEY;
    try {
        const token = await store.authenticate({ email: 'external@example.test', name: 'External Test', password: 'a long real password' }, true, 'test');
        const cookie = 'panta_session=' + token;
        delete process.env.GEMINI_API_KEY;
        let calls = 0;
        globalThis.fetch = async () => { calls++; throw Error('Unexpected fetch'); };
        await assert.rejects(async () => (await service.chat(cookie, { text: 'Hello' })), e => e.getStatus() === 503);
        assert.equal(calls, 0);
        process.env.GEMINI_API_KEY = 'test-only';
        globalThis.fetch = async (url, options) => { calls++; assert.equal(url, 'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions'); assert.equal(options.headers.Authorization, 'Bearer test-only'); assert.equal(JSON.parse(options.body).messages.at(-1).content, 'Hello'); return new Response(JSON.stringify({ choices: [{ message: { content: 'Contract test response' } }] }), { status: 200 }); };
        const result = await service.chat(cookie, { text: 'Hello' });
        assert.equal(result.messages.length, 2);
        assert.equal((await service.list(cookie)).length, 1);
        const other = await store.authenticate({ email: 'other@example.test', name: 'Other Test', password: 'another long password' }, true, 'other');
        await assert.rejects(async () => (await service.conversation('panta_session=' + other, result.id)));
        globalThis.fetch = async () => new Response('{}', { status: 429 });
        await assert.rejects(async () => (await service.chat(cookie, { id: result.id, text: 'Next' })), e => e.getStatus() === 503);
        assert.equal((await service.conversation(cookie, result.id)).messages.length, 2);
        await assert.rejects(async () => (await service.deleteConversation('panta_session=' + other, result.id)));
        assert.deepEqual((await service.deleteConversation(cookie, result.id)), { deleted: true, id: result.id });
        assert.equal((await service.list(cookie)).length, 0);
        await assert.rejects(async () => (await service.conversation(cookie, result.id)));
    }
    finally {
        globalThis.fetch = original;
        if (oldKey === undefined)
            delete process.env.GEMINI_API_KEY;
        else
            process.env.GEMINI_API_KEY = oldKey;
        (await store.onModuleDestroy());
    }
});
test('market observations survive a missing provider spot quote and retain their timestamp', async () => {
    process.env.APP_DATABASE_PATH = ':memory:';
    const store = new RuntimeStore(), service = new LiveServices(store);
    service.topicResearch.get = async () => ({ recent: [], earlier: [], retrievedAt: new Date().toISOString() });
    try {
        const id = 'C86nbpSX4ntRWvN4HMrdnhzHjHTtLooNtnw6k7hnmx1F';
        const at = new Date().toISOString();
        let missing = false;
        service.panta.market = async () => ({ marketId: id, title: 'Test market', phase: 'primary', yesPrice: missing ? null : '0.48', noPrice: missing ? null : '0.52', volumeUsdc: missing ? null : '12.00', ...missing ? {} : { question: 'Full provider question', resolutionRule: 'Official rule', sources: ['https://example.test/rule'] }, retrievedAt: at });
        const fresh = await service.markets(id);
        assert.equal(fresh.priceStatus, 'live');
        missing = true;
        const previous = await service.markets(id);
        assert.equal(previous.priceStatus, 'last_observed');
        assert.equal(previous.yesPrice, '0.48');
        assert.notEqual(previous.priceObservedAt, null);
        assert.equal(previous.question, 'Full provider question');
        assert.equal(previous.resolutionRule, 'Official rule');
        assert.equal(previous.metadataObservedAt, at);
        const series = (await service.marketSeries(id, '1h'));
        assert.equal(series.items.length, 1);
        assert.equal(series.items[0].yesPrice, '0.48');
        service.panta.market = async () => ({ marketId: id, title: 'Test market', phase: 'resolved', resolved: true, yesPrice: '1', noPrice: '0', retrievedAt: new Date(Date.parse(at) + 2000).toISOString() });
        const settled = await service.markets(id);
        assert.equal(settled.priceStatus, 'settled');
        assert.equal((await service.marketSeries(id, '1h')).items.length, 1);
        service.panta.markets = async () => ({ items: [{ marketId: id, phase: 'primary', title: 'Test market' }], retrievedAt: at });
        const catalog = await service.markets();
        assert.equal(catalog.items[0].yesPrice, '0.48');
        assert.equal(catalog.items[0].priceStatus, 'last_observed');
        service.panta.markets = async () => ({ items: [{ marketId: id, phase: 'primary', title: 'Test market', yesPrice: '0.61', noPrice: '0.39', volumeUsdc: '14.00' }], retrievedAt: at });
        const providerCatalog = await service.markets();
        assert.equal(providerCatalog.items[0].yesPrice, '0.61');
        assert.equal(providerCatalog.items[0].volumeUsdc, '14.00');
        assert.equal(providerCatalog.items[0].priceStatus, 'catalog');
        assert.equal(providerCatalog.items[0].priceObservedAt, null, 'Catalog retrieval is not a live price observation');
        assert.equal(providerCatalog.items[0].priceSource, 'catalog');
        const statuses = [];
        service.panta.markets = async (query) => { statuses.push(query.status); return { items: [{ marketId: id, phase: query.status, title: 'Active market' }], nextCursor: null }; };
        const active = await service.markets(undefined, undefined, false, { status: 'active' });
        assert.deepEqual(statuses, ['primary', 'secondary']);
        assert.equal(active.items.length, 2);
        assert.ok(active.items.every(item => item.phase !== 'resolved'));
    }
    finally {
        (await store.onModuleDestroy());
    }
});
test('OpenRouter key uses its own endpoint and Gemini model instead of Google API', async () => {
    process.env.APP_DATABASE_PATH = ':memory:';
    const store = new RuntimeStore(), service = new LiveServices(store);
    service.topicResearch.get = async () => ({ recent: [], earlier: [], retrievedAt: new Date().toISOString() });
    const originalFetch = globalThis.fetch, previousRouted = process.env.OPENROUTER_API_KEY, previousGemini = process.env.GEMINI_API_KEY;
    try {
        delete process.env.OPENROUTER_API_KEY;
        process.env.GEMINI_API_KEY = 'sk-or-v1-test-only';
        const token = await store.authenticate({ email: 'router@example.test', name: 'Router Test', password: 'a long real password' }, true, 'router');
        globalThis.fetch = async (url, options) => { assert.equal(url, 'https://openrouter.ai/api/v1/chat/completions'); assert.equal(options.headers.Authorization, 'Bearer sk-or-v1-test-only'); assert.equal(JSON.parse(options.body).model, 'google/gemini-2.5-flash-lite'); return new Response(JSON.stringify({ choices: [{ message: { content: 'Routed Gemini answer' } }] }), { status: 200 }); };
        const result = await service.chat('panta_session=' + token, { text: 'Explain uncertainty' });
        assert.equal(result.messages.at(-1).content, 'Routed Gemini answer');
        assert.equal((await store.bootstrap('panta_session=' + token)).providers.ai.provider, 'Gemini via OpenRouter');
    }
    finally {
        globalThis.fetch = originalFetch;
        if (previousRouted === undefined)
            delete process.env.OPENROUTER_API_KEY;
        else
            process.env.OPENROUTER_API_KEY = previousRouted;
        if (previousGemini === undefined)
            delete process.env.GEMINI_API_KEY;
        else
            process.env.GEMINI_API_KEY = previousGemini;
        (await store.onModuleDestroy());
    }
});
test('AI refreshes persisted market context and receives sourced topic news', async () => {
    process.env.APP_DATABASE_PATH = ':memory:';
    const store = new RuntimeStore(), service = new LiveServices(store), oldFetch = globalThis.fetch, oldKey = process.env.GEMINI_API_KEY;
    try {
        process.env.GEMINI_API_KEY = 'test-only';
        const token = await store.authenticate({ email: 'context@example.test', name: 'Context', password: 'a long test password' }, true, 'context'), cookie = 'panta_session=' + token;
        let reads = 0, prompt;
        service.markets = async (id) => ({ marketId: id, title: 'Space launch', yesPrice: String(++reads / 10), noPrice: '0.8', priceStatus: 'live', retrievedAt: new Date().toISOString() });
        service.topicResearch.get = async () => ({ recent: [{ title: 'Launch report', url: 'https://example.test/report', publishedAt: new Date().toISOString() }], earlier: [], source: 'Test news', retrievedAt: new Date().toISOString() });
        globalThis.fetch = async (_url, options) => { prompt = JSON.parse(options.body); return new Response(JSON.stringify({ choices: [{ message: { content: 'Analysis based on supplied context' } }] })); };
        const first = await service.chat(cookie, { text: 'Analyze this', marketId: 'market-id' });
        assert.match(prompt.messages[0].content, /Launch report/);
        await service.chat(cookie, { id: first.id, text: 'What changed?' });
        assert.equal(reads, 2);
        assert.match(prompt.messages[0].content, /"yesPrice":"0.2"/);
        assert.equal((await service.conversation(cookie, first.id)).marketId, 'market-id');
        assert.ok(prompt.messages.slice(1).every(message => !('marketId' in message)));
        await service.chat(cookie, { text: 'Latest space launch news' });
        assert.match(prompt.messages[0].content, /Launch report/);
        assert.doesNotMatch(prompt.messages[0].content, /Do not claim access to live prices or news/);
    }
    finally {
        globalThis.fetch = oldFetch;
        if (oldKey === undefined)
            delete process.env.GEMINI_API_KEY;
        else
            process.env.GEMINI_API_KEY = oldKey;
        (await store.onModuleDestroy());
    }
});
