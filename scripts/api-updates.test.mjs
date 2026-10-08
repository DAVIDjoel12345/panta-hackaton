import {test} from 'node:test'
import assert from 'node:assert/strict'
import {mutationUpdates,affectsQuery} from '../src/services/apiUpdates.js'
test('confirmed transactions update related live resources only',()=>{
 const affected=mutationUpdates('/panta/intents/id/reconcile',{chainStatus:'confirmed'})
 for(const path of ['/markets','/markets/abc','/positions?wallet=abc','/wallets/abc/balances','/wallets/abc/trades','/panta/intents','/panta/creator/abc'])assert.equal(affectsQuery(path,affected),true,path)
 for(const path of [null,'/ai/conversations','/account','/positions-other'])assert.equal(affectsQuery(path,affected),false,path)
 assert.deepEqual(mutationUpdates('/panta/intents/id/reconcile',{chainStatus:'pending'}),[])
 assert.deepEqual(mutationUpdates('/panta/intents/id/build',{}),[])
 assert.ok(mutationUpdates('/panta/intents/id/broadcast',{}).length)
})
test('successful writes emit refresh events; rate limited reads retain Retry-After',async()=>{
 const {api}=await import('../src/services/api.js')
 const originalFetch=globalThis.fetch,originalWindow=globalThis.window
 const events=[]
 globalThis.window={dispatchEvent:event=>events.push(event)}
 try{
  globalThis.fetch=async()=>new Response(JSON.stringify({chainStatus:'confirmed'}),{status:200})
  await api('/panta/intents/id/reconcile',{method:'POST',body:{}})
  assert.equal(events.length,1)
  assert.ok(affectsQuery('/positions?wallet=abc',events[0].detail))
  globalThis.fetch=async()=>new Response(JSON.stringify({message:'Wait'}),{status:429,headers:{'Retry-After':'12'}})
  await assert.rejects(api('/markets'),error=>error.retryAfter===12)
  assert.equal(events.length,1)
 }finally{globalThis.fetch=originalFetch;globalThis.window=originalWindow}
})
