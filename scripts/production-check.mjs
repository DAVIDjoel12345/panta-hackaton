import assert from 'node:assert/strict'
const target=await(await fetch((process.env.CHROME_URL || 'http://127.0.0.1:9223')+'/json/new?about:blank',{method:'PUT'})).json()
const socket=new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}))
let id=0
const calls=new Map()
socket.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.id){const call=calls.get(m.id);calls.delete(m.id);if(m.error)call.reject(Error(JSON.stringify(m.error)));else call.resolve(m.result)}})
const send=(method,params={})=>new Promise((resolve,reject)=>{const key=++id;calls.set(key,{resolve,reject});socket.send(JSON.stringify({id:key,method,params}))})
const text=async()=>{const result=await send('Runtime.evaluate',{expression:'document.body.innerText',returnByValue:true});return result.result.value||''}
await send('Page.enable')
for(const [route,expected] of [['/markets/demo-btc','Will Bitcoin reach $100,000'],['/settings/privacy','Sign in to your workspace'],['/auth/login','Welcome to your next perspective'],['/auth/callback','Missing or invalid callback state'],['/rooms/crypto','Crypto Collective'],['/rooms/research-lab','Only approved members'],['/dev/ui-states','Not found']]){
  await send('Page.navigate',{url:'http://127.0.0.1:4173'+route})
  let body=''
  for(let i=0;i<100;i++){body=await text();if(body.includes(expected))break;await new Promise(resolve=>setTimeout(resolve,100))}
  assert.ok(body.includes(expected),`${route}: ${body.slice(0,100)}`)
  assert.ok(!body.includes('UI state laboratory'));assert.ok(!body.includes('Development demo controls'))
}
console.log('PASS: production deep links and development-only gallery exclusion.')
await send('Page.close')
socket.close()
