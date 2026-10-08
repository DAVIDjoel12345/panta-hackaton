import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readMarketCache,writeMarketCache} from '../src/services/publicMarketCache.js'
test('public detail is reused without altering price time, then expires',()=>{
 const path='/markets/'+'A'.repeat(32)
 const data={priceObservedAt:'2026-10-08T08:00:00Z',yesPrice:'0.5'}
 writeMarketCache(path,data,1000)
 assert.deepEqual(readMarketCache(path,2000),{...data,cacheStatus:'stale'})
 assert.equal(readMarketCache(path,61000),null)
 for(const privatePath of ['/account','/positions','/markets?createdBy=me']){
  writeMarketCache(privatePath,data,1000)
  assert.equal(readMarketCache(privatePath,2000),null)
 }
})
test('reload restores only a recent complete public catalog',async()=>{
 const data={complete:true,items:[{marketId:'a'}],retrievedAt:'2026-10-08T08:00:00Z'}
 const storage=new Map([['panta-public-catalog-v1',JSON.stringify({data,at:1000})]])
 globalThis.sessionStorage={getItem:key=>storage.get(key),setItem:(key,value)=>storage.set(key,value)}
 try{
  const {cachedPantaCatalog}=await import('../src/services/pantaCatalog.js')
  assert.equal(cachedPantaCatalog('all|all',2000).items.length,1)
  assert.equal(cachedPantaCatalog('all|all',2000).cacheStatus,'stale')
  assert.equal(cachedPantaCatalog('all|all',61000),null)
  storage.set('panta-public-catalog-v1','invalid')
  assert.equal(cachedPantaCatalog('all|all',2000),null)
 }finally{delete globalThis.sessionStorage}
})
