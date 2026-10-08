import assert from 'node:assert/strict'

// Requires the backend, Vite, and Chrome with remote debugging enabled.
const browser = process.env.CHROME_URL || 'http://127.0.0.1:9223'
const base = process.env.APP_URL || 'http://127.0.0.1:5174'
const target = await (await fetch(`${browser}/json/new?about:blank`, {method: 'PUT'})).json()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, {once: true}))
let sequence = 0
const calls = new Map()
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (!message.id) return
  const pending = calls.get(message.id)
  calls.delete(message.id)
  if (message.error) pending.reject(Error(message.error.message))
  else pending.resolve(message.result)
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++sequence
  calls.set(id, {resolve, reject})
  socket.send(JSON.stringify({id, method, params}))
})
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', {expression, returnByValue: true})
  if (result.exceptionDetails) throw Error(result.exceptionDetails.text)
  return result.result.value
}
async function waitFor(expression) {
  const deadline = Date.now() + 45000
  while (Date.now() < deadline) {
    const value = await evaluate(expression)
    if (value) return value
    await new Promise(resolve => setTimeout(resolve, 250))
  }
  throw Error(`Timed out: ${expression}`)
}
try {
  const response = await fetch(`${base}/api/v1/markets`)
  assert.equal(response.status, 200, 'Frontend proxy reaches the live backend')
  const feed = await response.json()
  assert.equal(feed.source, 'Panta')
  assert.ok(feed.items.length > 0, 'Provider returns market records')
  await send('Page.enable')
  await send('Network.enable')
  await send('Page.navigate', {url: `${base}/markets`})
  await send('Page.bringToFront')
  await waitFor("document.querySelectorAll('.market-card').length > 0")
  const caption = "document.querySelector('.results-caption')?.innerText"
  const first = await waitFor(`${caption}?.includes('Catalog checked') && ${caption}`)
  await waitFor(`${caption}?.includes('Catalog checked') && ${caption} !== ${JSON.stringify(first)} && !${caption}?.includes('Refreshing...')`)
  if (feed.items.some(item => !item.resolved && !['resolved','cancelled'].includes(item.phase))) {
    await waitFor("[...document.querySelectorAll('.quote-status')].some(el => el.textContent.includes('Price checked'))")
  }
  await send('Emulation.setDeviceMetricsOverride', {width:390,height:844,deviceScaleFactor:1,mobile:true})
  assert.ok(await evaluate('document.documentElement.scrollWidth <= window.innerWidth + 1'), 'Market quotes fit mobile viewport')
  const count = await evaluate("document.querySelectorAll('.market-card').length")
  await send('Network.emulateNetworkConditions', {offline: true, latency: 0, downloadThroughput: 0, uploadThroughput: 0})
  await waitFor("document.body.innerText.includes('Stale')")
  assert.equal(await evaluate("document.querySelectorAll('.market-card').length"), count, 'Offline mode preserves received market data')
  await send('Network.emulateNetworkConditions', {offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1})
  await waitFor("!document.body.innerText.includes('Stale') && !document.body.innerText.includes('Refresh interrupted')")
  console.log(JSON.stringify({passed: ['Live Panta API through frontend proxy', 'Visible market cards', 'Automatic refresh without navigation', 'Offline data retention', 'Reconnect refresh'], markets: count}, null, 2))
} finally {
  await send('Network.emulateNetworkConditions', {offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1}).catch(() => {})
  socket.close()
  await fetch(`${browser}/json/close/${target.id}`).catch(() => {})
}
