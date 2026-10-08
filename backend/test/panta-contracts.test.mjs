import 'reflect-metadata';
import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PantaClient} from '../dist/panta/client.js';
import {baseUnits,buyInput} from '../dist/panta/contracts.js';
const id='11111111111111111111111111111111';
test('exact token conversion and supported buy validation',()=>{
 assert.equal(baseUnits('9007199254740993.123456'),9007199254740993123456n);
 for(const value of ['-1','1e6','0.0000001','NaN'])assert.throws(()=>baseUnits(value));
 assert.throws(()=>buyInput.parse({wallet:id,marketId:id,side:'yes',amountUsdc:'0'}));
 assert.throws(()=>buyInput.parse({wallet:id,marketId:id,side:'yes',amountUsdc:'1',userId:'forged'}));
});
test('central adapter validates responses, coalesces reads, preserves timestamp and redacts upstream errors',async()=>{
 const original=globalThis.fetch,key=process.env.PANTA_API_KEY;process.env.PANTA_API_KEY='test-secret-never-log';let calls=0;
 try{const client=new PantaClient();globalThis.fetch=async(url,options)=>{calls++;assert.equal(options.headers['X-Api-Key'],process.env.PANTA_API_KEY);assert.ok(options.headers['X-Request-Id']);assert.match(url,/status=primary/);await new Promise(r=>setTimeout(r,5));return Response.json({items:[{marketId:id,title:'Market',category:'science',phase:'primary'}]})};
 const [first,second]=await Promise.all([client.markets({status:'primary'}),client.markets({status:'primary'})]);assert.equal(calls,1);assert.equal(first.retrievedAt,second.retrievedAt);
 for(const value of client.cache.values())value.at=0;
 await client.markets({status:'primary'});assert.equal(calls,2);
 globalThis.fetch=async()=>Response.json({items:[{marketId:'broken'}]});client.cache.clear();await assert.rejects(client.markets(),error=>error.getResponse().code==='INVALID_PROVIDER_RESPONSE');
 globalThis.fetch=async()=>Response.json({code:'UNAUTHORIZED',message:'secret '+process.env.PANTA_API_KEY},{status:401});await assert.rejects(client.market(id),error=>!JSON.stringify(error.getResponse()).includes(process.env.PANTA_API_KEY));
 globalThis.fetch=async()=>Response.json({code:'RATE_LIMITED'},{status:429,headers:{'Retry-After':'12'}});await assert.rejects(client.market(id),error=>error.getResponse().retryAfter===12);
 }finally{globalThis.fetch=original;if(key===undefined)delete process.env.PANTA_API_KEY;else process.env.PANTA_API_KEY=key}
});
test('transaction-producing calls never retry after uncertain network response',async()=>{const original=globalThis.fetch,key=process.env.PANTA_API_KEY;process.env.PANTA_API_KEY='contract-key';let calls=0;try{globalThis.fetch=async()=>{calls++;throw Error('network')};await assert.rejects(new PantaClient().buyQuote({wallet:id,marketId:id,side:'yes',amountUsdc:'2',maxSlippageBps:100},'app-user'));assert.equal(calls,1)}finally{globalThis.fetch=original;if(key===undefined)delete process.env.PANTA_API_KEY;else process.env.PANTA_API_KEY=key}});
