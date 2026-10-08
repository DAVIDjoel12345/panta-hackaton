import {test} from 'node:test'
import assert from 'node:assert/strict'
import {readPantaCatalog,cachedPantaCatalog,rememberPantaCatalog} from '../src/services/pantaCatalog.js'

test('full catalog preserves the oldest page timestamp and stale status',async()=>{
  const calls=[]
  const data=await readPantaCatalog(async path=>{
    calls.push(path)
    return calls.length===1?{items:[{marketId:'a'}],nextCursor:'next',retrievedAt:'2026-10-07T10:00:00Z',cacheStatus:'stale'}:{items:[{marketId:'a'},{marketId:'b'}],nextCursor:null,retrievedAt:'2026-10-07T10:00:20Z',cacheStatus:'fresh'}
  },{category:'all',status:'all'})
  assert.equal(data.items.length,2)
  assert.equal(data.pages,2)
  assert.equal(data.retrievedAt,'2026-10-07T10:00:00.000Z')
  assert.equal(data.cacheStatus,'stale')
  assert.ok(calls[1].includes('cursor=next'))
})
test('incomplete or looping provider pagination is rejected',async()=>{
  await assert.rejects(readPantaCatalog(async()=>({items:[],nextCursor:'repeated'}),{category:'all',status:'all'}),/pagination did not complete/)
  await assert.rejects(readPantaCatalog(async()=>({}),{category:'all',status:'all'}),/incomplete catalog page/)
})

test('first page is available while the remaining API page is still pending',async()=>{
  let release,firstPage
  const blocked=new Promise(resolve=>{release=resolve})
  const result=readPantaCatalog(async path=>{
    if(path.includes('cursor=')){await blocked;return {items:[{marketId:'second'}]}}
    return {items:[{marketId:'first'}],nextCursor:'next'}
  },{category:'all',status:'all',onPage:page=>{firstPage=page}})
  await new Promise(resolve=>setImmediate(resolve))
  assert.equal(firstPage.complete,false)
  assert.deepEqual(firstPage.items,[{marketId:'first'}])
  release()
  const complete=await result
  assert.equal(complete.complete,true)
  assert.equal(complete.items.length,2)
})

test('return visits reuse only complete recent catalogs, preserving quote timestamps',()=>{
  const data={items:[{marketId:'a'}],retrievedAt:'2026-10-07T10:00:00Z',complete:true}
  rememberPantaCatalog('cache-test',data,1000)
  assert.equal(cachedPantaCatalog('cache-test',2000).retrievedAt,data.retrievedAt)
  assert.equal(cachedPantaCatalog('cache-test',2000).cacheStatus,'stale')
  rememberPantaCatalog('cache-test',{items:[],complete:false},2000)
  assert.equal(cachedPantaCatalog('cache-test',2000).items.length,1)
  assert.equal(cachedPantaCatalog('different-filter',2000),null)
  assert.equal(cachedPantaCatalog('cache-test',61000),null)
})
