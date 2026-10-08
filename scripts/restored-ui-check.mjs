import{routeTree}from'../src/app/routes.js'
import{flattenRoutes}from'../src/app/routeMatcher.js'
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



await send('Page.navigate',{url:base+'/auth/signup'});await wait("!!document.querySelector('input[type=email]')");await input('input[autocomplete=name]','Restoration Reviewer');await input('input[type=email]','restore-'+Date.now()+'@example.test');await input('input[type=password]','A real restoration password!');await click('Create account');await wait("location.pathname==='/rooms'");
await visit('/settings/appearance');await wait("!!document.querySelector('main select')");await input('main select','contrast');await click('Save preferences');await wait("document.body.innerText.includes('Preferences saved to your account.')");await check('Appearance saved through backend',"document.documentElement.dataset.theme==='contrast'");
await visit('/create');await wait("!!document.querySelector('main textarea')");await input('main textarea','Will this saved market draft persist?');await click('Save draft');await wait("document.body.innerText.includes('Draft saved to your account.')");await visit('/create/drafts');await wait("document.body.innerText.includes('Will this saved market draft persist?')");await check('Draft list loaded from backend',"document.body.innerText.includes('Will this saved market draft persist?')");
const account=await evaluate("fetch('/api/v1/bootstrap').then(r=>r.json())");
const routes=flattenRoutes(routeTree).filter(route=>route.path!=='/dev/ui-states');for(const width of [1440,390]){await size(width);for(const route of routes){const path=route.path.replace(':userId',account.user.id).replace(/:[A-Za-z]+/g,'test-reference');console.log('Checking '+width+' '+path);await visit(path);await check(width+' '+route.path+' renders',"!!document.querySelector('main')&&!document.body.innerText.includes('Something went wrong')");const over=await evaluate('document.documentElement.scrollWidth>innerWidth+1');if(over)throw Error('Horizontal overflow '+width+' '+path)}}
assert.deepEqual(errors,[]);console.log(JSON.stringify({passed:results.length,routes:routes.length,widths:[1440,390],backendSettings:true,backendDrafts:true,browserErrors:errors},null,2));socket.close();await fetch(browser+'/json/close/'+target.id).catch(()=>{});
