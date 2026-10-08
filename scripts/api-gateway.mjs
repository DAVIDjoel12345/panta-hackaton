import http from 'node:http'
import {pathToFileURL} from 'node:url'

// Only stateless market reads may move between workers. Keep writes and SSE
// together because the current community event bus lives in the primary process.
export function createGateway({primary = 'http://127.0.0.1:3001', markets = [primary, 'http://127.0.0.1:3002'], cacheTtlMs = 10000, detailCacheTtlMs = 2000, tradeCacheTtlMs = 5000, staleTtlMs = 60000} = {}) {
  const workers = [...new Set(markets)].map(url => ({url: new URL(url), active: 0, unavailableUntil: 0}))
  const main = {url: new URL(primary), active: 0, unavailableUntil: 0}
  let cursor = 0
  const cache = new Map()
  const inflight = new Map()
  async function refresh(key, pathname, search) {
    if (inflight.has(key)) return inflight.get(key)
    const task = (async () => {
      let lastError
      const attempted = new Set()
      for (let attempt = 0; attempt < workers.length; attempt++) {
        const available = workers.filter(worker => !attempted.has(worker) && worker.unavailableUntil <= Date.now())
        const worker = available[cursor++ % available.length]
        if (!worker) break
        attempted.add(worker)
        worker.active++
        try {
          const target = new URL(pathname + search, worker.url)
          const response = await fetch(target, {signal: AbortSignal.timeout(15000), headers: {Accept: 'application/json'}})
          if (!response.ok) {lastError = Error(`Worker returned ${response.status}`);worker.unavailableUntil = Date.now() + 3000;continue}
          const body = await response.text()
          // Public market GETs only. Never cache cookies, account data or errors.
          const parsed = JSON.parse(body)
          if (typeof parsed !== 'object' || !parsed) throw Error('Invalid market JSON')
          const entry = {body, at: Date.now()}
          if (cache.size >= 500) cache.delete(cache.keys().next().value)
          cache.set(key, entry)
          worker.unavailableUntil = 0
          return entry
        } catch (error) {lastError = error;worker.unavailableUntil = Date.now() + 3000}
        finally {worker.active--}
      }
      throw lastError || Error('No market worker available')
    })()
    inflight.set(key, task)
    try {return await task} finally {inflight.delete(key)}
  }
  return http.createServer((req, res) => {
    const incoming = new URL(req.url, 'http://localhost')
    const pathname = incoming.pathname
    const detailRead = /^\/api\/v1\/markets\/[^/]+\/?$/.test(pathname)
    const tradesRead = /^\/api\/v1\/markets\/[^/]+\/trades\/?$/.test(pathname)
    const seriesRead = /^\/api\/v1\/markets\/[^/]+\/series\/?$/.test(pathname)
    const balanced = req.method === 'GET' && /^\/api\/v1\/markets(?:\/[^/]+(?:\/(?:trades|series))?)?\/?$/.test(pathname)
    const cacheable = req.method === 'GET' && !incoming.searchParams.has('createdBy') && /^\/api\/v1\/markets(?:\/[^/]+(?:\/(?:trades|series))?)?\/?$/.test(pathname)
    if (cacheable && cacheTtlMs > 0) {
      const key = pathname + incoming.search
      const found = cache.get(key)
      const age = found ? Date.now() - found.at : Infinity
      const ttl = detailRead ? detailCacheTtlMs : seriesRead ? 1000 : tradesRead ? tradeCacheTtlMs : cacheTtlMs
      const send = (entry, status) => {
        if (res.destroyed) return
        res.writeHead(200, {'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store','X-Cache-Status':status,'X-Cache-Age-Ms':String(Date.now()-entry.at)})
        res.end(entry.body)
      }
      if (age < ttl) {send(found, 'fresh');return}
      if (detailRead && found && age < staleTtlMs) {
        send(found, 'stale')
        void refresh(key, pathname, incoming.search).catch(() => {})
        return
      }
      if (detailRead || tradesRead || seriesRead) {
        void refresh(key, pathname, incoming.search).then(entry => send(entry, 'miss')).catch(() => {
          if (found && Date.now()-found.at < staleTtlMs) {send(found, 'stale');return}
          if (!res.destroyed) {res.writeHead(503, {'Content-Type':'application/json','Cache-Control':'no-store','Retry-After':'3'});res.end(JSON.stringify({message:'Market data temporarily unavailable.'}))}
        })
        return
      }
      if (age < staleTtlMs) {
        send(found, 'stale')
        void refresh(key, pathname, incoming.search).catch(() => {})
        return
      }
      void refresh(key, pathname, incoming.search).then(entry => send(entry, 'miss')).catch(() => {
        if (found && Date.now()-found.at < staleTtlMs) {send(found, 'stale');return}
        if (!res.destroyed) {res.writeHead(503, {'Content-Type':'application/json','Cache-Control':'no-store','Retry-After':'3'});res.end(JSON.stringify({message:'Market data temporarily unavailable.'}))}
      })
      return
    }
    const attempted = new Set()
    function forward() {
      const available = balanced ? workers.filter(worker => !attempted.has(worker) && worker.unavailableUntil <= Date.now()) : [main]
      if (!available.length) {
        res.writeHead(503, {'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'Retry-After': '3'})
        res.end(JSON.stringify({message: 'API temporarily unavailable. Automatic refresh will retry.'}))
        return
      }
      const least = Math.min(...available.map(worker => worker.active))
      const candidates = available.filter(worker => worker.active === least)
      const worker = candidates[cursor++ % candidates.length]
      attempted.add(worker)
      worker.active++
      let released = false
      const release = () => { if (!released) { released = true; worker.active-- } }
      const destination = new URL(worker.url.origin)
      destination.pathname = pathname
      destination.search = incoming.search
      const upstream = http.request(destination, {
        method: req.method,
        headers: {...req.headers, host: worker.url.host},
      })
      const connectionDeadline = setTimeout(() => upstream.destroy(Error('Worker connection timed out')), 2000)
      upstream.once('socket', socket => {
        if (!socket.connecting) clearTimeout(connectionDeadline)
        else socket.once('connect', () => clearTimeout(connectionDeadline))
      })
      const abort = () => upstream.destroy()
      res.once('close', abort)
      upstream.once('close', () => { clearTimeout(connectionDeadline); release(); res.removeListener('close', abort) })
      // SSE stays open; ordinary requests have a bounded idle timeout.
      if (pathname !== '/api/v1/events') upstream.setTimeout(70000, () => upstream.destroy(Error('Upstream timeout')))
      upstream.on('response', response => {
        worker.unavailableUntil = 0
        res.writeHead(response.statusCode, {...response.headers, 'X-Accel-Buffering': 'no'})
        response.on('error', () => res.destroy())
        response.pipe(res)
      })
      upstream.on('error', () => {
        release()
        worker.unavailableUntil = Date.now() + 10000
        if (res.destroyed) return
        if (res.headersSent) { res.destroy(); return }
        if (balanced) forward()
        else {
          res.writeHead(503, {'Content-Type': 'application/json', 'Cache-Control': 'no-store'})
          res.end(JSON.stringify({message: 'Primary API unavailable. Please retry shortly.'}))
        }
      })
      req.once('aborted', abort)
      upstream.once('close', () => req.removeListener('aborted', abort))
      if (balanced) upstream.end()
      else req.pipe(upstream)
    }
    forward()
  })
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const server = createGateway()
  server.on('error', error => { console.error(`API gateway: ${error.message}`); process.exitCode = 1 })
  server.listen(3000, '127.0.0.1', () => console.log('API gateway listening on http://127.0.0.1:3000'))
  for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, () => { server.close(); server.closeAllConnections() })
}
