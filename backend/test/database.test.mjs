import assert from 'node:assert/strict';
import {test} from 'node:test';
import {createClient} from '@libsql/client';
import {AppDatabase} from '../dist/runtime/database.js';
import {allowedOrigins} from '../dist/runtime/deployment.js';
import {RuntimeStore} from '../dist/runtime/runtime-store.js';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {pathToFileURL} from 'node:url';

test('independent backend instances share hosted sessions and durable settings', async () => {
  const directory=mkdtempSync(join(tmpdir(),'panta-libsql-'));
  const url=pathToFileURL(join(directory,'shared.sqlite')).href;
  const make=()=>new RuntimeStore(new AppDatabase({TURSO_DATABASE_URL:'https://database.example',TURSO_AUTH_TOKEN:'test'},()=>createClient({url})));
  const first=make(); await first.ready;
  const second=make(); await second.ready;
  try {
    const token=await first.authenticate({email:'shared@example.test',name:'Shared user',password:'long shared test password'},true,'test');
    const cookie='panta_session='+token;
    assert.equal((await second.user(cookie)).email,'shared@example.test');
    await second.saveSettings(cookie,{bio:'Saved by another instance'});
    assert.equal((await first.user(cookie)).settings.bio,'Saved by another instance');
    await first.db.withLock('shared-operation',async()=>{
      await assert.rejects(second.db.withLock('shared-operation',async()=>assert.fail('Duplicate execution')),/OPERATION_BUSY/);
    });
    await second.logout(cookie);
    assert.equal(await first.user(cookie),null);
  } finally {
    await first.onModuleDestroy(); await second.onModuleDestroy();
    try { rmSync(directory,{recursive:true,force:true,maxRetries:5,retryDelay:100}); } catch (error) { assert.equal(error.code,'EPERM'); }
  }
});

test('hosted adapter commits, rolls back and excludes concurrent operations', async () => {
  // Exercise the real libSQL client/transaction API without external credentials.
  const db = new AppDatabase({TURSO_DATABASE_URL:'https://database.example', TURSO_AUTH_TOKEN:'test'}, () => createClient({url:'file::memory:'}));
  try {
    await db.ready;
    await db.transaction(async () => {
      await db.prepare('INSERT INTO documents VALUES (?,?)').run('test','before');
    });
    await assert.rejects(db.transaction(async () => {
      await db.prepare('UPDATE documents SET value=? WHERE id=?').run('after','test');
      throw Error('rollback');
    }), /rollback/);
    assert.equal((await db.prepare('SELECT value FROM documents WHERE id=?').get('test')).value,'before');
    await db.withLock('trade', async () => {
      await assert.rejects(db.withLock('trade', async () => assert.fail('Duplicate operation')), /OPERATION_BUSY/);
    });
    await db.withLock('trade', async () => {});
    assert.equal((await db.prepare('SELECT * FROM operation_locks').all()).length,0);
  } finally { await db.close(); }
});

test('Vercel refuses ephemeral SQLite and accepts only explicit trusted domains', async () => {
  const missing = new AppDatabase({VERCEL:'1', VERCEL_ENV:'production'});
  await assert.rejects(missing.ready,/Vercel requires/);
  const invalid = new AppDatabase({TURSO_DATABASE_URL:'file:local.db',TURSO_AUTH_TOKEN:'test'});
  await assert.rejects(invalid.ready,/Configure a remote/);
  assert.deepEqual(allowedOrigins({VERCEL:'1',VERCEL_URL:'preview.vercel.app',FRONTEND_ORIGINS:'https://panta.example'}),['https://panta.example','https://preview.vercel.app']);
  assert.deepEqual(allowedOrigins({VERCEL:'1'}),[]);
  assert.deepEqual(allowedOrigins({RAILWAY_PUBLIC_DOMAIN:'panta.example.up.railway.app'}),['http://127.0.0.1:5174','http://localhost:5173','http://127.0.0.1:5173','https://panta.example.up.railway.app']);
});
