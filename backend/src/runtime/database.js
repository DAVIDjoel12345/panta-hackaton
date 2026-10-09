import {AsyncLocalStorage} from 'node:async_hooks';
import {mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {randomUUID} from 'node:crypto';

const schema=`
CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,salt TEXT NOT NULL,password_hash TEXT NOT NULL,settings TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS documents(id TEXT PRIMARY KEY,value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS commands(user_id TEXT NOT NULL,request_id TEXT NOT NULL,payload_hash TEXT NOT NULL,result TEXT NOT NULL,PRIMARY KEY(user_id,request_id));
CREATE TABLE IF NOT EXISTS market_drafts(user_id TEXT NOT NULL REFERENCES users(id),id TEXT NOT NULL,value TEXT NOT NULL,PRIMARY KEY(user_id,id));
CREATE TABLE IF NOT EXISTS conversations(id TEXT PRIMARY KEY,user_id TEXT NOT NULL,title TEXT NOT NULL,messages TEXT NOT NULL,updated TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS market_price_samples(market_id TEXT NOT NULL,observed_at INTEGER NOT NULL,yes_price TEXT NOT NULL,no_price TEXT NOT NULL,volume_usdc TEXT,PRIMARY KEY(market_id,observed_at));
CREATE TABLE IF NOT EXISTS market_metadata_snapshots(market_id TEXT PRIMARY KEY,data TEXT NOT NULL,observed_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS transaction_intents(id TEXT PRIMARY KEY,user_id TEXT NOT NULL,request_id TEXT NOT NULL,value TEXT NOT NULL,UNIQUE(user_id,request_id));
CREATE TABLE IF NOT EXISTS operation_locks(id TEXT PRIMARY KEY,token TEXT NOT NULL,expires INTEGER NOT NULL);
`;

// All callers use async reads/writes. Local SQLite remains available for development;
// Vercel must use a remote database, never an ephemeral /tmp or in-memory copy.
export class AppDatabase {
  context=new AsyncLocalStorage();
  queue=Promise.resolve();
  constructor(env=process.env,clientFactory){this.remote=!!env.TURSO_DATABASE_URL;this.ready=this.initialize(env,clientFactory)}
  async initialize(env,clientFactory){
    if(this.remote){
      const url=new URL(env.TURSO_DATABASE_URL);
      if(!['libsql:','https:'].includes(url.protocol)||!env.TURSO_AUTH_TOKEN)throw Error('Configure a remote TURSO_DATABASE_URL and TURSO_AUTH_TOKEN.');
      const createClient=clientFactory||(await import('@libsql/client/web')).createClient;
      this.client=createClient({url:url.href,authToken:env.TURSO_AUTH_TOKEN});
      await this.client.executeMultiple(schema);
    }else{
      if(env.VERCEL==='1'&&env.VERCEL_ENV!=='development')throw Error('Vercel requires TURSO_DATABASE_URL and TURSO_AUTH_TOKEN. Local SQLite is not persistent on Vercel.');
      const file=env.APP_DATABASE_PATH||resolve('data/panta.sqlite');
      if(file!==':memory:')mkdirSync(dirname(file),{recursive:true});
      const {DatabaseSync}=await import('node:sqlite');
      this.local=new DatabaseSync(file);this.local.exec('PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON; PRAGMA busy_timeout=5000;'+schema);
    }
  }
  async exclusive(run){const before=this.queue;let release;this.queue=new Promise(resolve=>{release=resolve});await before;try{return await run()}finally{release()}}
  async execute(sql,args=[]){
    await this.ready;
    const transaction=this.context.getStore();
    if(this.remote)return (transaction||this.client).execute({sql,args});
    const run=()=>{const statement=this.local.prepare(sql);if(statement.columns().length)return {rows:statement.all(...args),rowsAffected:0};const result=statement.run(...args);return {rows:[],rowsAffected:Number(result.changes)}};
    return transaction?run():this.exclusive(run);
  }
  prepare(sql){return {
    get:async(...args)=>(await this.execute(sql,args)).rows[0],
    all:async(...args)=>(await this.execute(sql,args)).rows,
    run:async(...args)=>({changes:(await this.execute(sql,args)).rowsAffected})
  }}
  async transaction(run){
    await this.ready;
    if(this.context.getStore())return run();
    if(this.remote){const tx=await this.client.transaction('write');try{const result=await this.context.run(tx,run);await tx.commit();return result}catch(error){if(!tx.closed)await tx.rollback();throw error}finally{tx.close()}}
    return this.exclusive(async()=>{this.local.exec('BEGIN IMMEDIATE');try{const result=await this.context.run(true,run);this.local.exec('COMMIT');return result}catch(error){this.local.exec('ROLLBACK');throw error}});
  }
  async close(){await this.ready;this.client?.close();this.local?.close()}
  async withLock(id,run){
    const token=randomUUID();
    await this.transaction(async()=>{
      await this.prepare('DELETE FROM operation_locks WHERE id=? AND expires<?').run(id,Date.now());
      const result=await this.prepare('INSERT OR IGNORE INTO operation_locks VALUES (?,?,?)').run(id,token,Date.now()+180000);
      if(!result.changes)throw new Error('OPERATION_BUSY');
    });
    try{return await run()}finally{await this.prepare('DELETE FROM operation_locks WHERE id=? AND token=?').run(id,token)}
  }
}
