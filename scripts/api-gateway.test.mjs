import {test} from 'node:test'
import assert from 'node:assert/strict'
import http from 'node:http'
import {createGateway} from './api-gateway.mjs'

const listen = server => new Promise(resolve => server.listen(0, '127.0.0.1', () => resolve(`http://127.0.0.1:${server.address().port}`)))
const close = server => new Promise(resolve => {server.close(resolve); server.closeAllConnections()})
test('market reads balance and fail over; writes and unbuffered events stay on primary', async () => {
  let writes = 0
  const primary = http.createServer((req, res) => {
    if (req.method === 'POST') writes++
    if (req.url.endsWith('/events')) {
      res.writeHead(200, {'Content-Type': 'text/event-stream'})
      res.write('data: primary-event\n\n')
      return
    }
    req.resume()
    res.setHeader('Set-Cookie', 'session=primary; HttpOnly')
    res.end('primary')
  })
  const secondary = http.createServer((_req, res) => res.end('secondary'))
  const first = await listen(primary), second = await listen(secondary)
  const gateway = createGateway({primary: first, markets: [first, second], cacheTtlMs: 0})
  const url = await listen(gateway)
  try {
    const responses = []
    for (let i = 0; i < 4; i++) responses.push(await (await fetch(url + '/api/v1/markets')).text())
    assert.deepEqual(responses, ['primary', 'secondary', 'primary', 'secondary'])
    const write = await fetch(url + '/api/v1/communities/commands', {method: 'POST', body: '{}'})
    assert.equal(await write.text(), 'primary')
    assert.match(write.headers.get('set-cookie'), /session=primary/)
    assert.equal(writes, 1)
    const controller = new AbortController()
    const stream = await fetch(url + '/api/v1/events', {signal: controller.signal})
    assert.match(new TextDecoder().decode((await stream.body.getReader().read()).value), /primary-event/)
    controller.abort()
    await close(secondary)
    for (let i = 0; i < 3; i++) assert.equal(await (await fetch(url + '/api/v1/markets')).text(), 'primary')
    await close(primary)
    assert.equal((await fetch(url + '/api/v1/markets')).status, 503)
    assert.equal((await fetch(url + '/api/v1/communities/commands', {method: 'POST', body: '{}'})).status, 503)
    assert.equal(writes, 1)
  } finally {await Promise.all([close(gateway), close(primary), close(secondary)])}
})
test('public market reads share a fresh cache and refresh stale data once in the background', async () => {
  let reads = 0
  const backend = http.createServer((_req, res) => {reads++;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({items:[],retrievedAt: new Date().toISOString(),version:reads}))})
  const origin = await listen(backend)
  const gateway = createGateway({primary:origin,markets:[origin],cacheTtlMs:30,staleTtlMs:500})
  const url = await listen(gateway)
  try {
    const first=await fetch(url+'/api/v1/markets');assert.equal(first.headers.get('x-cache-status'),'miss');assert.equal((await first.json()).version,1)
    const hit=await fetch(url+'/api/v1/markets');assert.equal(hit.headers.get('x-cache-status'),'fresh');assert.equal((await hit.json()).version,1);assert.equal(reads,1)
    await new Promise(resolve=>setTimeout(resolve,40))
    const stale=await fetch(url+'/api/v1/markets');assert.equal(stale.headers.get('x-cache-status'),'stale');assert.equal((await stale.json()).version,1)
    for(let i=0;i<40&&reads<2;i++)await new Promise(resolve=>setTimeout(resolve,10))
    assert.equal(reads,2)
    const updated=await fetch(url+'/api/v1/markets');assert.equal((await updated.json()).version,2)
  } finally {await Promise.all([close(gateway),close(backend)])}
})
test('market detail serves the last timestamped quote immediately and coalesces its background refresh', async () => {
  let reads=0
  const backend=http.createServer((_req,res)=>{reads++;res.setHeader('Content-Type','application/json');res.end(JSON.stringify({version:reads,retrievedAt:new Date().toISOString()}))})
  const origin=await listen(backend),gateway=createGateway({primary:origin,markets:[origin],cacheTtlMs:1000,detailCacheTtlMs:20})
  const url=await listen(gateway),path='/api/v1/markets/C86nbpSX4ntRWvN4HMrdnhzHjHTtLooNtnw6k7hnmx1F'
  try{
    assert.equal((await(await fetch(url+path)).json()).version,1)
    assert.equal((await(await fetch(url+path)).json()).version,1)
    await new Promise(resolve=>setTimeout(resolve,30))
    const responses=await Promise.all([fetch(url+path),fetch(url+path)])
    assert.deepEqual(await Promise.all(responses.map(response=>response.json())).then(rows=>rows.map(row=>row.version)),[1,1])
    assert.ok(responses.every(response=>response.headers.get('x-cache-status')==='stale'))
    for(let i=0;i<40&&reads<2;i++)await new Promise(resolve=>setTimeout(resolve,10))
    assert.equal(reads,2)
    assert.equal((await(await fetch(url+path)).json()).version,2)
    const beforeSeries=reads
    const series=await Promise.all([fetch(url+path+'/series?range=1h'),fetch(url+path+'/series?range=1h')])
    const seriesVersions=await Promise.all(series.map(response=>response.json())).then(rows=>rows.map(row=>row.version))
    assert.equal(seriesVersions[0],seriesVersions[1])
    assert.ok(reads>=beforeSeries+1)
  }finally{await Promise.all([close(gateway),close(backend)])}
})
test('expired catalog is not returned indefinitely when the provider is down',async()=>{
 let available=true
 const backend=http.createServer((_req,res)=>{res.writeHead(available?200:503,{'Content-Type':'application/json'});res.end(JSON.stringify({items:[]}))})
 const origin=await listen(backend),gateway=createGateway({primary:origin,markets:[origin],cacheTtlMs:5,staleTtlMs:15}),url=await listen(gateway)
 try{
  assert.equal((await fetch(url+'/api/v1/markets')).status,200)
  available=false
  await new Promise(resolve=>setTimeout(resolve,30))
  assert.equal((await fetch(url+'/api/v1/markets')).status,503)
 }finally{await Promise.all([close(gateway),close(backend)])}
})
