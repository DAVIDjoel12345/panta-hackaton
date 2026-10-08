import assert from 'node:assert/strict'
import {readPantaCatalog} from '../src/services/pantaCatalog.js'

// Requires the backend, Vite, and Chrome with remote debugging enabled.
const browser = process.env.CHROME_URL || 'http://127.0.0.1:9223'
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
  throw Error(`Timed out: ${expression}; page=${await evaluate('location.href')}; alerts=${JSON.stringify(await evaluate("[...document.querySelectorAll('[role=alert]')].map(node=>node.textContent)"))}; body=${String(await evaluate('document.body.innerText')).slice(-650)}; bootstrap=${JSON.stringify(await evaluate("fetch('/api/v1/bootstrap',{credentials:'include'}).then(r=>r.json()).then(x=>({id:x.user?.id,error:x.message}))"))}`)
}

try{
 await send('Page.enable');await send('Network.enable');await send('Runtime.enable')
 await send('Network.deleteCookies',{name:'panta_session',domain:'127.0.0.1',path:'/'})
 await send('Network.deleteCookies',{name:'panta_session',domain:'127.0.0.1',path:'/api'})
 const origin='http://127.0.0.1:5173',identity='ai-browser-'+Date.now()+'@example.test'
 const registration=await fetch(origin+'/api/v1/auth/register',{method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify({name:'AI Browser Check',email:identity,password:'a sufficiently long browser test password'})})
 assert.equal(registration.status,201,'Registration for browser test')
 const cookie=registration.headers.get('set-cookie').split(';')[0].split('=')[1]
 await send('Network.setCookie',{name:'panta_session',value:cookie,url:origin+'/api/',sameSite:'Strict',httpOnly:true})
 const checkedCookie=await send('Network.getCookies',{urls:[origin+'/api/v1/bootstrap']})
 assert.ok(checkedCookie.cookies.some(item=>item.name==='panta_session'),'Browser has session cookie')
 const catalog=await readPantaCatalog(async path=>{const response=await fetch(origin+'/api/v1'+path);assert.ok(response.ok);return response.json()},{category:'all',status:'all'}),marketId=catalog.items.find(item=>item.phase==='primary')?.marketId||catalog.items[0].marketId
 await send('Page.navigate',{url:origin+'/markets'})
 await waitFor("document.querySelectorAll('.market-grid .market-card').length>0")
 assert.ok(await evaluate("document.querySelector('select[aria-label=\"Market lifecycle\"]')?.value==='all'"),'Explore defaults to all Panta API markets')
 await waitFor("document.querySelectorAll('.market-grid .market-card').length==="+catalog.items.length)
 assert.ok(await evaluate("['primary','secondary'].includes(document.querySelector('.market-grid .market-card .card-meta .badge')?.textContent.trim().toLowerCase())"),'Active markets appear first')
 assert.ok(await evaluate("document.querySelector('.market-card')?.tagName==='ARTICLE' && !!document.querySelector('.market-card-main-link') && !!document.querySelector('.market-card-actions a')"),'Whole market card and AI action have separate accessible links')
 const activeCard="[...document.querySelectorAll('.market-card')].find(card=>['primary','secondary'].includes(card.querySelector('.card-meta .badge')?.textContent.trim().toLowerCase()))"
 await waitFor(`!!(${activeCard})`)
 await evaluate(`(${activeCard}).scrollIntoView({block:'center'})`)
 await waitFor(`!!(${activeCard}).querySelector('.market-card-chart svg')`)
 const cardHref=await evaluate(`(${activeCard}).querySelector('.market-card-main-link').getAttribute('href')`)
 if(!process.argv.includes('--chart-only')){
  await evaluate(`(${activeCard}).querySelector('.market-card-actions a').click()`)
  await waitFor(`location.pathname==='/ai'&&new URLSearchParams(location.search).get('market')===${JSON.stringify(cardHref.split('/').at(-1))}`)
  await waitFor("document.querySelectorAll('.restored-messages article').length>=2")
  await send('Page.navigate',{url:origin+'/markets'})
  await waitFor("document.querySelectorAll('.market-grid .market-card').length>0")
 }
 await waitFor(`!!document.querySelector('.market-card-main-link[href=${JSON.stringify(cardHref)}]')`)
 await evaluate(`document.querySelector('.market-card-main-link[href=${JSON.stringify(cardHref)}]').parentElement.querySelector('.market-card-chart').scrollIntoView({block:'center'})`)
 const chartPoint=await evaluate(`(()=>{const r=document.querySelector('.market-card-main-link[href=${JSON.stringify(cardHref)}]').parentElement.querySelector('.market-card-chart').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`)
 await send('Input.dispatchMouseEvent',{type:'mousePressed',x:chartPoint.x,y:chartPoint.y,button:'left',clickCount:1})
 await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:chartPoint.x,y:chartPoint.y,button:'left',clickCount:1})
 await waitFor(`location.pathname===${JSON.stringify(cardHref)}`)
 if(process.argv.includes('--cards-only')){
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true})
  await send('Page.navigate',{url:origin+'/markets'})
  await waitFor("document.querySelectorAll('.market-grid .market-card').length>0")
  assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'),'Market cards fit mobile width')
  console.log(JSON.stringify({passed:['Complete Panta API catalog','Live Panta YES/NO lines','Market-card AI action','Whole-card click','Mobile card width'],cardHref},null,2))
 }else{
 await send('Page.navigate',{url:origin+'/markets/'+marketId});await send('Page.bringToFront')
 await waitFor("document.querySelector('.market-detail-heading h1')?.textContent?.length>4")
 await waitFor("!!document.querySelector('.trading-chart svg')")
 assert.ok(await evaluate("document.body.innerText.includes('actual Panta spot observation') && !!document.querySelector('.trading-chart-legend .yes-line') && !!document.querySelector('.trading-chart-legend .no-line')"),'Live line chart labels Panta source and both outcomes')
 await evaluate("document.querySelector('.trading-chart-ranges button:nth-child(2)').click()")
 await waitFor("document.querySelector('.trading-chart svg')?.getAttribute('aria-label')?.includes('over 6h')")
 await evaluate("document.querySelector('.trading-chart-ranges button:nth-child(3)').click()")
 await waitFor("document.querySelector('.trading-chart svg')?.getAttribute('aria-label')?.includes('over 24h')")
 await waitFor("document.querySelectorAll('.trading-chart svg line').length>5")
 assert.ok(await evaluate("!!document.querySelector('.trading-chart svg line[stroke=\"#a998ff\"]') && !!document.querySelector('.trading-chart svg line[stroke=\"#5ec9ff\"]')"),'Chart shows separate YES and NO Panta price lines')
 const firstCheck=await evaluate("document.querySelector('.market-detail-stats span:last-child')?.textContent")
 await waitFor(`document.querySelector('.market-detail-stats span:last-child')?.textContent!==${JSON.stringify(firstCheck)}`)
 await evaluate("document.querySelector('.trading-chart-outcomes button:nth-child(2)').click()")
 assert.ok(await evaluate("document.querySelector('.trading-chart .eyebrow')?.textContent.startsWith('NO') && document.querySelector('.trade-ticket .segmented button:nth-child(2)')?.getAttribute('aria-pressed')==='true'"),'Chart and trade ticket share the NO outcome')
 assert.ok(await evaluate("fetch('/api/v1/bootstrap',{credentials:'include'}).then(r=>r.json()).then(x=>!!x.user)"),'App bootstrap sees registered account')
 assert.ok(await evaluate("document.body.innerText.includes('What determines the outcome?')"),'Restored market rules')
 await waitFor("document.body.innerText.includes('Panta market data') && document.body.innerText.includes('Price source')")
 await waitFor("document.body.innerText.includes('Resolution sources supplied by Panta')")
 assert.ok(await evaluate("document.body.innerText.includes('Community conversation')"),'Market discussion visible')
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true})
 assert.ok(await evaluate('document.documentElement.scrollWidth<=window.innerWidth+1'),'Market overview fits mobile width')
 if(process.argv.includes('--chart-only')){
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false})
  await send('Page.navigate',{url:origin+'/markets/resolved'})
  await waitFor("document.querySelectorAll('.market-grid .market-card').length>0")
  assert.ok(await evaluate("[...document.querySelectorAll('.market-grid .market-card')].every(card=>!card.querySelector('.market-card-chart')&&!card.textContent.includes('Untitled Panta market'))"),'Resolved cards do not show live chart collection or fabricated titles')
  await send('Page.navigate',{url:origin+'/markets'})
  await waitFor("document.querySelectorAll('.market-grid .market-card').length>0")
  await evaluate("(()=>{const el=document.querySelector('select[aria-label=\"Market lifecycle\"]');el.value='all';el.dispatchEvent(new Event('change',{bubbles:true}))})()")
  await waitFor("document.querySelectorAll('.market-grid .market-card').length==="+catalog.items.length)
  console.log(JSON.stringify({passed:['Complete Panta API catalog','Card line chart','Whole-card click','Live YES/NO chart','Quote updates','Mobile overview','Resolved market display','Catalog page accumulation'],count:catalog.items.length,pages:catalog.pages,marketId},null,2))
 }else{
 await evaluate("[...document.querySelectorAll('a')].find(link=>link.textContent.includes('Discuss with Signal AI'))?.click()")
 await waitFor(`location.pathname==='/ai'&&new URLSearchParams(location.search).get('market')===${JSON.stringify(marketId)}`)
 await waitFor("!!document.querySelector('#live-ai-prompt')")
 await waitFor("document.body.innerText.includes('Panta market context')")
 await waitFor("document.querySelector('#live-ai-prompt')?.value.includes('compare recent and earlier coverage')")
 await waitFor("!!document.querySelector('.topic-coverage .coverage-columns')")
 await evaluate(`(()=>{const el=document.querySelector('#live-ai-prompt');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,'Summarize this Panta market in one concise sentence and give its retrieval time.');el.dispatchEvent(new Event('input',{bubbles:true}));el.form.requestSubmit()})()`)
 await waitFor("document.querySelectorAll('.restored-messages article').length>=2")
 assert.ok(await evaluate("document.querySelectorAll('.restored-messages article')[1].innerText.length>25"),'External Gemini answer rendered')
 await waitFor("!!document.querySelector('.conversation-row .conversation-item.active')")
 const conversationCount=await evaluate("document.querySelectorAll('.conversation-row').length")
 const deleting=new Promise(resolve=>{const listener=async event=>{if(JSON.parse(event.data).method==='Page.javascriptDialogOpening'){socket.removeEventListener('message',listener);await send('Page.handleJavaScriptDialog',{accept:true});resolve()}};socket.addEventListener('message',listener)})
 await evaluate("document.querySelector('.conversation-row .conversation-item.active').parentElement.querySelector('.conversation-delete').click()")
 await deleting
 await waitFor(`document.querySelectorAll('.conversation-row').length<${conversationCount} && !document.querySelector('.restored-messages article')`)
 console.log(JSON.stringify({passed:['App session','Market-card AI action','Whole-card click','Live chart ranges and color segments','Panta timestamp advances','Original market layout with live data','Linked community discussion','Mobile overview','Contextual Gemini answer','Delete conversation'],marketId,answerRendered:true},null,2))
 }
 }
}finally{socket.close();await fetch(browser+'/json/close/'+target.id).catch(()=>{})}
