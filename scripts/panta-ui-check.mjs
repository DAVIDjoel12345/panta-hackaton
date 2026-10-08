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
 await send('Page.enable');await send('Runtime.enable')
 await send('Page.addScriptToEvaluateOnNewDocument',{source:`(()=>{let notify=()=>{};const make=address=>({address,publicKey:new Uint8Array(32),chains:['solana:devnet','solana:mainnet'],features:['solana:signTransaction']});let accounts=[make('11111111111111111111111111111111')];const wallet={version:'1.0.0',name:'Browser Test Wallet',icon:'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>',chains:['solana:devnet','solana:mainnet'],get accounts(){return accounts},features:{'standard:connect':{version:'1.0.0',connect:async()=>({accounts})},'standard:disconnect':{version:'1.0.0',disconnect:async()=>{}},'standard:events':{version:'1.0.0',on:(_name,callback)=>{notify=callback;return()=>{notify=()=>{}}}},'solana:signTransaction':{version:'1.0.0',supportedTransactionVersions:[0],signTransaction:async()=>{throw Error('No funded actions in browser checks')}}}};window.addEventListener('wallet-standard:app-ready',event=>event.detail.register(wallet));window.__changeTestWallet=()=>{accounts=[make('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')];notify({accounts})}})()`})
 await send('Page.navigate',{url:base+'/portfolio'});await send('Page.bringToFront')
 await waitFor("document.body.innerText.includes('Connect Browser Test Wallet')")
 await evaluate("[...document.querySelectorAll('button')].find(b=>b.textContent==='Connect Browser Test Wallet').click()")
 await waitFor("document.body.innerText.includes('11111111111111111111111111111111')")
 await evaluate('window.__changeTestWallet()')
 await waitFor("document.body.innerText.includes('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')")
 assert.ok(!(await evaluate("document.body.innerText.includes('11111111111111111111111111111111')")))
 await evaluate("[...document.querySelectorAll('button')].find(b=>b.textContent==='Disconnect wallet').click()")
 await waitFor("document.body.innerText.includes('Wallet disconnected')")
 for(const path of ['/markets','/portfolio','/claims','/creator','/transactions','/create']){
  await evaluate(`window.__pantaDirty=false;history.pushState({},'',${JSON.stringify(path)});window.dispatchEvent(new PopStateEvent('popstate'))`)
  await waitFor("!!document.querySelector('h1')&&!document.querySelector('.route-loading')")
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true})
  assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'),path+' mobile overflow')
 }
 console.log(JSON.stringify({passed:['Wallet Standard selection','Account change invalidation','Disconnect separate from sign-in','Financial routes at mobile width'],fundedTransactions:0},null,2))
} finally {socket.close();await fetch(browser+'/json/close/'+target.id).catch(()=>{})}
