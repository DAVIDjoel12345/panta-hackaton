import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createRequire } from 'node:module';

test('Solana websocket dependency loads a CommonJS-compatible uuid', () => {
  const fromRpc = createRequire(new URL('../node_modules/rpc-websockets/dist/index.cjs', import.meta.url));
  assert.match(fromRpc.resolve('uuid'), /uuid[/\\]dist[/\\]cjs[/\\]index\.js$/);
  assert.equal(typeof fromRpc('uuid').v4, 'function');
  assert.equal(typeof fromRpc('rpc-websockets').Client, 'function');
});
