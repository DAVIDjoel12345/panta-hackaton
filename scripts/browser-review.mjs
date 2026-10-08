import fs from 'node:fs'
const targets=await (await fetch('http://127.0.0.1:9222/json')).json()
const target=targets.find(t=>t.type==='page')
const socket=new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}))
let next=0
const pending=new Map()
const errors=[]
socket.addEventListener('message',event=>{const message=JSON.parse(event.data);if(message.id){const callback=pending.get(message.id);pending.delete(message.id);if(message.error)callback.reject(new Error(JSON.stringify(message.error)));else callback.resolve(message.result)}if(message.method==='Runtime.exceptionThrown')errors.push(message.params.exceptionDetails.exception?.description||message.params.exceptionDetails.text)})
function send(method,params={}){return new Promise((resolve,reject)=>{const id=++next;pending.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw new Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value}
async function wait(expression){for(let i=0;i<100;i++){if(await evaluate(expression))return;await new Promise(resolve=>setTimeout(resolve,100))}throw new Error(`Timed out: ${expression}`)}
await send('Runtime.enable')
await send('Page.enable')
await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false})
await send('Page.navigate',{url:'http://127.0.0.1:5173/markets'})
await wait(`!!document.querySelector('.market-card')`)
fs.mkdirSync('docs/screenshots',{recursive:true})
for(const [url,width,name] of [['/markets',1280,'explore-desktop'],['/',1280,'landing-desktop'],['/markets/demo-btc',1280,'market-desktop'],['/ai',1280,'ai-desktop'],['/markets',360,'explore-mobile'],['/markets/demo-btc',360,'market-mobile'],['/',360,'landing-mobile'],['/create',768,'creation-tablet']]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768})
  await evaluate(`window.__pantaDirty=false;history.pushState({},'',${JSON.stringify(url)});window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo(0,0)`)
  await wait(`!!document.querySelector('.page-heading,.hero-copy')&&!document.querySelector('.route-loading')`)
  await new Promise(resolve=>setTimeout(resolve,200))
  const dimensions=await evaluate(`({targetWidth:${width},width:innerWidth,body:document.documentElement.scrollWidth,title:document.querySelector('h1')?.innerText,overflow:[...document.querySelectorAll('body *')].filter(e=>e.getBoundingClientRect().right>${width}+1&&!e.closest('.table-scroll,.tabs,.discovery-links,.settings-nav')).slice(0,6).map(e=>e.className)})`)
  const shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:false})
  fs.writeFileSync(`docs/screenshots/${name}.png`,Buffer.from(shot.data,'base64'))
  console.log(JSON.stringify({url,...dimensions}))
}
console.log(JSON.stringify({errors}))
socket.close()
