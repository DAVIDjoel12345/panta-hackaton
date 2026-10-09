import assert from 'node:assert/strict'

const browser = process.env.CHROME_URL || 'http://127.0.0.1:9226'
const app = process.env.APP_URL || 'http://127.0.0.1:5174'
const target = await (await fetch(`${browser}/json/new?about:blank`, { method: 'PUT' })).json()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
let nextId = 0
const pending = new Map()
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (!message.id) return
  const callback = pending.get(message.id)
  pending.delete(message.id)
  if (message.error) callback.reject(new Error(JSON.stringify(message.error)))
  else callback.resolve(message.result)
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId
  pending.set(id, { resolve, reject })
  socket.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
  return result.result.value
}
const wait = async expression => {
  for (let i = 0; i < 100; i++) {
    if (await evaluate(expression)) return
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  throw new Error(`Timed out: ${expression}`)
}

try {
  await send('Runtime.enable')
  await send('Page.enable')
  await send('Page.addScriptToEvaluateOnNewDocument', { source: `(() => {
    const make = address => ({ address, publicKey: new Uint8Array(32), chains: ['solana:mainnet'], features: [] })
    let accounts = localStorage.getItem('panta-signal:wallet-name') === 'Connect Only Wallet' ? [make('11111111111111111111111111111111')] : []
    let notify = () => {}
    const wallet = { version: '1.0.0', name: 'Connect Only Wallet', icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>', chains: ['solana:mainnet'],
      get accounts() { return accounts }, features: {
        'standard:connect': { version: '1.0.0', connect: async () => { accounts = [make('11111111111111111111111111111111')]; return { accounts } } },
        'standard:disconnect': { version: '1.0.0', disconnect: async () => { accounts = [] } },
        'standard:events': { version: '1.0.0', on: (_event, callback) => { notify = callback; return () => { notify = () => {} } } }
      } }
    const rejected = { version: '1.0.0', name: 'Rejected Wallet', icon: wallet.icon, chains: wallet.chains, accounts: [],
      features: { 'standard:connect': { version: '1.0.0', connect: async () => { throw Error('User rejected') } } } }
    const slow = { version: '1.0.0', name: 'Slow Wallet', icon: wallet.icon, chains: wallet.chains, accounts: [],
      features: { 'standard:connect': { version: '1.0.0', connect: () => new Promise(resolve => { window.__finishSlowWallet = () => resolve({ accounts: [make('11111111111111111111111111111111')] }) }) } } }
    window.addEventListener('wallet-standard:app-ready', event => {
      event.detail.register(wallet, rejected)
      window.__unregisterSlowWallet = event.detail.register(slow)
    })
    window.__switchTestWallet = () => { accounts = [make('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')]; notify({ accounts }) }
  })()` })

  await send('Page.navigate', { url: `${app}/markets` })
  await wait(`!!document.querySelector('.topbar button[aria-label="Connect wallet"]')`)
  await evaluate(`document.querySelector('.topbar button[aria-label="Connect wallet"]').click()`)
  await wait(`!![...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Connect Only Wallet')`)
  await evaluate(`[...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Connect Only Wallet').click()`)
  await wait(`document.querySelector('.topbar button[aria-label^="Wallet connected:"]')?.getAttribute('aria-label').includes('11111111111111111111111111111111')`)
  await evaluate(`window.__switchTestWallet()`)
  await wait(`document.querySelector('.topbar button[aria-label^="Wallet connected:"]')?.getAttribute('aria-label').includes('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')`)
  await send('Page.reload')
  await wait(`document.querySelector('.topbar button[aria-label^="Wallet connected:"]')?.getAttribute('aria-label').includes('11111111111111111111111111111111')`)
  await evaluate(`document.querySelector('.topbar button[aria-label^="Wallet connected:"]').click()`)
  await wait(`!![...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Disconnect wallet')`)
  await evaluate(`[...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Disconnect wallet').click()`)
  await wait(`!!document.querySelector('.topbar button[aria-label="Connect wallet"]')`)
  await send('Page.reload')
  await wait(`!!document.querySelector('.topbar button[aria-label="Connect wallet"]')`)
  await evaluate(`document.querySelector('.topbar button[aria-label="Connect wallet"]').click()`)
  await wait(`!![...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Slow Wallet')`)
  await evaluate(`[...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Slow Wallet').click()`)
  await evaluate(`window.__unregisterSlowWallet(); window.__finishSlowWallet()`)
  await wait(`document.querySelector('dialog[open] [role="alert"]')?.textContent.includes('closed during connection')`)
  assert.ok(await evaluate(`!!document.querySelector('.topbar button[aria-label="Connect wallet"]')`))
  await wait(`!![...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Rejected Wallet')`)
  await evaluate(`[...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Rejected Wallet').click()`)
  await wait(`document.querySelector('dialog[open] [role="alert"]')?.textContent.includes('cancelled')`)
  assert.ok(await evaluate(`!!document.querySelector('.topbar button[aria-label="Connect wallet"]')`))
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true })
  await send('Page.reload')
  await wait(`!!document.querySelector('.mobile-wallet button[aria-label="Connect wallet"]')`)
  await evaluate(`document.querySelector('.mobile-wallet button[aria-label="Connect wallet"]').click()`)
  await wait(`!![...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Connect Only Wallet')`)
  assert.ok(await evaluate(`document.documentElement.scrollWidth <= innerWidth`), 'Wallet modal overflows mobile viewport')
  await evaluate(`[...document.querySelectorAll('dialog[open] button')].find(button => button.textContent === 'Connect Connect Only Wallet').click()`)
  await wait(`document.querySelector('.mobile-wallet button[aria-label^="Wallet connected:"]')?.getAttribute('aria-label').includes('11111111111111111111111111111111')`)
  console.log('PASS: connect-only wallet, account change, quiet reload, disconnect, removed wallet, rejection, mobile connect')
} finally {
  socket.close()
  await fetch(`${browser}/json/close/${target.id}`).catch(() => {})
}
