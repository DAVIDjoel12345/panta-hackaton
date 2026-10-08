import assert from 'node:assert/strict'
const browser = process.env.CHROME_URL || 'http://127.0.0.1:9223'
const base = process.env.APP_URL || 'http://127.0.0.1:5174'
const target=await(await fetch(`${browser}/json/new?about:blank`,{method:'PUT'})).json()
const socket=new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve=>socket.addEventListener('open',resolve,{once:true}))
let sequence=0
const calls=new Map(),errors=[],results=[]
socket.addEventListener('message',event=>{const msg=JSON.parse(event.data);if(msg.id){const cb=calls.get(msg.id);calls.delete(msg.id);if(msg.error)cb.reject(Error(JSON.stringify(msg.error)));else cb.resolve(msg.result)}if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.exception?.description||msg.params.exceptionDetails.text)})
const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;calls.set(id,{resolve,reject});socket.send(JSON.stringify({id,method,params}))})
async function evaluate(expression){const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.exception?.description||result.exceptionDetails.text);return result.result.value}
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms))
async function wait(expression){for(let i=0;i<600;i++){if(await evaluate(expression))return;await delay(70)}throw Error(`Timed out: ${expression}`)}
async function visit(url){await evaluate(`window.__pantaDirty=false;history.pushState({},'',${JSON.stringify(url)});window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo(0,0)`);await delay(220);await wait(`!!document.querySelector('h1,.state-panel h2,.empty h2,.community-state h2')&&!document.querySelector('.route-loading')`)}
async function click(text,selector='button'){await evaluate(`(()=>{const button=[...document.querySelectorAll(${JSON.stringify(selector)})].find(e=>e.textContent.trim()===${JSON.stringify(text)}&&e.getClientRects().length);if(!button)throw Error('Button missing: '+${JSON.stringify(text)});button.click()})()`);await delay(100)}
async function input(selector,value){await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)throw Error('Input missing');const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:el.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}))})()`);await delay(80)}
async function check(name,expression){assert.ok(await evaluate(expression),name);results.push(name)}
await send('Runtime.enable');await send('Page.enable')
const size=async width=>{await send('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:false});await delay(100)}


const slug='browser-room-'+Date.now();
await size(1280);await send('Page.navigate',{url:base+'/auth/signup'});await wait("!!document.querySelector('input[type=email]')");
await input('input[autocomplete=name]','Browser Owner');await input('input[type=email]','browser-'+Date.now()+'@example.test');await input('input[type=password]','A real browser password!');await click('Create account');await wait("location.pathname==='/rooms'");
await visit('/rooms/create');await input('main form input','Browser Community');await input('input[pattern]',slug);await input('form textarea','A community created through the real browser interface.');await click('Create community');await wait("location.pathname==='/rooms/"+slug+"'");await check('Community created on backend',"document.body.innerText.includes('Browser Community')");
await visit('/rooms/'+slug+'/posts/new');await input('.community-composer input','Browser post');await input('.post-textarea','This is persisted by the actual backend.');await click('Publish post');await wait("!!document.querySelector('.community-comments')");
await input('.community-comments form textarea','A real browser comment.');await click('Post comment');await wait("[...document.querySelectorAll('.community-comment .post-body')].some(e=>e.textContent==='A real browser comment.')");await check('Comment saved through API',"document.body.innerText.includes('A real browser comment.')");
await send('Page.reload');await delay(800);await wait("!!document.querySelector('.community-comments')");await check('Session and content survive reload',"document.body.innerText.includes('A real browser comment.')");
await visit('/rooms');await check('No demo identity controls in live mode',"!document.querySelector('.community-demo')");await size(390);await check('Mobile directory fits viewport',"document.documentElement.scrollWidth<=window.innerWidth+1");
if(process.env.RUN_LIVE_AI==='1'){
await visit('/ai');await input('main textarea','Give one concise tip for asking a clear community question.');await click('Send');await wait("document.querySelectorAll('main article').length===2");await check('External AI response rendered',"document.querySelectorAll('main article')[1].textContent.length>20");await send('Page.reload');await delay(800);await wait("document.body.innerText.includes('Give one concise tip')");await check('Conversation history persisted',"document.body.innerText.includes('Give one concise tip')");
}
assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:results},null,2));socket.close();
