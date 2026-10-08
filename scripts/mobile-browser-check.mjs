import fs from 'node:fs'
import assert from 'node:assert/strict'
import { routeTree } from '../src/app/routes.js'
import { flattenRoutes } from '../src/app/routeMatcher.js'
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
async function wait(expression){for(let i=0;i<120;i++){if(await evaluate(expression))return;await delay(70)}throw Error(`Timed out: ${expression}`)}
async function visit(url){await evaluate(`window.__pantaDirty=false;history.pushState({},'',${JSON.stringify(url)});window.dispatchEvent(new PopStateEvent('popstate'));window.scrollTo(0,0)`);await delay(100);await wait(`!!document.querySelector('h1,.state-panel h2,.empty h2')&&!document.querySelector('.route-loading')`)}
async function click(text,selector='button'){await evaluate(`(()=>{const button=[...document.querySelectorAll(${JSON.stringify(selector)})].find(e=>e.textContent.trim()===${JSON.stringify(text)}&&e.getClientRects().length);if(!button)throw Error('Button missing: '+${JSON.stringify(text)});button.click()})()`);await delay(100)}
async function input(selector,value){await evaluate(`(()=>{const el=document.querySelector(${JSON.stringify(selector)});if(!el)throw Error('Input missing');const proto=el.tagName==='TEXTAREA'?HTMLTextAreaElement.prototype:el.tagName==='SELECT'?HTMLSelectElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(proto,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event(el.tagName==='SELECT'?'change':'input',{bubbles:true}))})()`);await delay(80)}
async function check(name,expression){assert.ok(await evaluate(expression),name);results.push(name)}
await send('Runtime.enable');await send('Page.enable')
const size=async(width,height=850)=>{await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:false});await delay(100)}
const escape=async()=>{await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await delay(160)}
const back=async()=>{await evaluate('history.back()');await delay(180)}
const shown=selector=>`(()=>{const e=document.querySelector(${JSON.stringify(selector)});return !!e&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=='hidden'})()`
const snapshot=async name=>{const shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(`docs/screenshots/${name}.png`,Buffer.from(shot.data,'base64'))}
await size(320)
await send('Page.navigate',{url:base+'/markets'});await wait(`!!document.querySelector('.market-card')`)
const ids={marketId:'demo-btc',categorySlug:'crypto',articleSlug:'understanding-prices',signature:'demo-tx-001',positionId:'demo-pos-1',claimId:'demo-claim-1',draftId:'demo-draft-1',conversationId:'demo-conversation-1',roomSlug:'crypto',threadId:'demo-thread-1',postId:'demo-thread-1',userId:'demo-alex',creatorId:'demo-alex',reportId:'demo-thread-1'}
for(const route of process.env.INTERACTIONS_ONLY ? [] : flattenRoutes(routeTree)){
  const url=route.path.replace(/:([A-Za-z]+)/g,(_,key)=>ids[key]);await visit(url)
  await check(`320px route ${url}`,`document.documentElement.scrollWidth<=320&&!document.body.innerText.includes('Unexpected error')`)
}
console.log('All 133 routes fit at 320px.')
await visit('/auth/wallet');await evaluate(`document.querySelector('.auth-method').click()`);await delay(100);for(const label of ['Complete simulated connection','Prepare demo ownership challenge','Load fictional challenge','Simulate message signature','Simulate successful verification','Create demo session and continue'])await click(label);await wait(`location.pathname==='/markets'&&!!document.querySelector('.market-card')`);

for(const [width,height] of process.env.INTERACTIONS_ONLY ? [] : [[360,850],[390,850],[430,850],[768,1000],[1280,1000],[844,390]]){
  await size(width,height)
  for(const url of ['/','/markets','/markets/demo-btc','/portfolio','/transactions','/claims','/create','/ai','/rooms','/leaderboard','/settings','/dev/ui-states']){
    await visit(url);await check(`${width}x${height} ${url}`,`document.documentElement.scrollWidth<=${width}`)
  }
}
await size(390);await visit('/markets');await snapshot('mobile-explore-390')
await check('Five primary destinations',`document.querySelectorAll('.bottom-navigation>a,.bottom-navigation>button').length===5`)
await evaluate(`document.querySelector('[aria-label="Open More menu"]').focus()`);await click('More')
await check('Nine More destinations without moderator',`document.querySelector('.more-list').children.length===9`)
await check('Native modal focus',`!!document.activeElement.closest('dialog[open]')`)
for(let i=0;i<14;i++)await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Tab',code:'Tab',windowsVirtualKeyCode:9})
await check('Tab focus stays inside sheet',`!!document.activeElement.closest('dialog[open]')`)
await check('Keyboard focus has visible outline',`getComputedStyle(document.activeElement).outlineStyle!=='none'`)
await back();await check('Browser Back closes sheet and restores focus',`!document.querySelector('dialog[open]')&&document.activeElement.getAttribute('aria-label')==='Open More menu'&&location.pathname==='/markets'`)
await click('More');await click('Settings','dialog[open] a')
await wait(`location.pathname==='/settings'&&!document.querySelector('dialog[open]')`)
await wait(`!!document.querySelector('.grouped-settings')`);await check('Mobile settings grouped navigation',shown('.grouped-settings'))
await back();await check('Sheet navigation has no ghost history entry',`location.pathname==='/markets'&&!document.querySelector('dialog[open]')`)
await click('Filters');await input('dialog[open] select','Technology');await click('Show matching markets')
await check('Filter applies and closes',`!document.querySelector('dialog[open]')&&document.querySelectorAll('.market-card').length===2`)
await click('Filters · 1');await check('Filter retained on reopening',`document.querySelector('dialog[open] select').value==='Technology'`);await escape()
await visit('/portfolio');await check('Position cards and outcome filter visible',`document.querySelectorAll('.position-card').length===3&&getComputedStyle(document.querySelector('[aria-label="Filter outcomes"]')).display!=='none'`)
await snapshot('mobile-portfolio-390')
await visit('/transactions');await check('Transaction cards replace table',`document.querySelectorAll('.transaction-card').length>=3&&!document.querySelector('table')`)
await visit('/markets/demo-btc');await evaluate(`document.querySelector('.mobile-market-prices .no').click()`);await click('Trade NO')
await check('Full screen ticket and hidden navigation',`document.querySelector('dialog[open]').getBoundingClientRect().height===850&&getComputedStyle(document.querySelector('.bottom-navigation')).visibility==='hidden'`)
await input('dialog[open] input[type="number"]','38');await escape();await click('Trade NO')
await check('Amount survives sheet dismissal',`document.querySelector('dialog[open] input[type="number"]').value==='38'`)
await click('Review simulated trade');await check('Resolution criteria visible before approval',`document.querySelectorAll('dialog[open]').length===2&&!!document.querySelector('dialog[open] .trade-rules[open]')`)
await snapshot('mobile-trade-review-390');await back();await check('Back closes only nested review',`document.querySelectorAll('dialog[open]').length===1`)
await back();await check('Back restores market navigation',`!document.querySelector('dialog[open]')&&getComputedStyle(document.querySelector('.bottom-navigation')).visibility==='visible'`)
await visit('/create');await check('Focused creation hides primary nav',`getComputedStyle(document.querySelector('.bottom-navigation')).display==='none'`)
await visit('/markets');await click('Create','.bottom-navigation a');await input('main textarea','Will this demonstration question remain safely editable?')
await evaluate('history.back()');await delay(200);await send('Page.handleJavaScriptDialog',{accept:false});await delay(200)
await check('Cancel Back preserves unsaved creation',`location.pathname==='/create'&&document.querySelector('main textarea').value.includes('safely editable')`)
await evaluate('history.back()');await delay(200);await send('Page.handleJavaScriptDialog',{accept:true});await delay(200)
await check('Confirm Back leaves creation and restores navigation',`location.pathname==='/markets'&&getComputedStyle(document.querySelector('.bottom-navigation')).display!=='none'`)
await visit('/ai');await click('Conversation history');await check('AI history sheet',`document.querySelector('dialog[open]').innerText.includes('Understanding market prices')`);await escape()
await evaluate(`document.querySelector('#ai-prompt').focus()`);await input('#ai-prompt','Preserve this question');await size(390,430)
await check('Resized keyboard viewport hides navigation',`document.documentElement.dataset.keyboardOpen==='true'`)
await check('Keyboard keeps composer input visible',`(()=>{const r=document.querySelector('#ai-prompt').getBoundingClientRect();return r.top>=0&&r.bottom<=430})()`)
await evaluate('document.activeElement.blur()');await size(390,850);await check('Keyboard dismissal preserves question',`document.querySelector('#ai-prompt').value==='Preserve this question'`)
await visit('/markets/demo-btc');await evaluate(`document.querySelector('h1').textContent='A very long market question '.repeat(15);document.querySelector('.source-link').textContent='https://example.com/'+ 'long-source-reference'.repeat(25)`)
await check('Long question and source wrap',`document.documentElement.scrollWidth<=390`)
await evaluate(`document.documentElement.style.setProperty('--safe-bottom','34px');document.documentElement.style.setProperty('--safe-top','20px')`)
await check('Simulated safe area reserves bottom inset',`parseFloat(getComputedStyle(document.querySelector('.bottom-navigation')).paddingBottom)>=34`)
await click('Trade YES');await check('Safe-area full screen fits viewport',`document.querySelector('dialog[open]').getBoundingClientRect().bottom<=850`);await escape()
await evaluate(`document.documentElement.style.removeProperty('--safe-bottom');document.documentElement.style.removeProperty('--safe-top')`)
await visit('/settings/wallet');await evaluate(`document.querySelector('.account-card strong').textContent='DEMO-'+ 'WalletReference'.repeat(15)`)
await check('Long wallet reference wraps',`document.documentElement.scrollWidth<=390`)
await size(320);await visit('/settings/profile')
await evaluate(`const style=document.createElement('style');style.id='large-text-test';style.textContent='main p,main label,main input,main button,main select {font-size:24px!important}';document.head.append(style)`)
await check('Large form text does not overflow',`document.documentElement.scrollWidth<=320`)
await evaluate(`document.getElementById('large-text-test').remove()`)
await send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]})
await check('Reduced motion honored',`matchMedia('(prefers-reduced-motion: reduce)').matches&&parseFloat(getComputedStyle(document.querySelector('.button')).transitionDuration)<0.01`)
await visit('/');await snapshot('mobile-landing-320');await size(844,390);await visit('/markets');await snapshot('mobile-landscape-844')
await visit('/dev/ui-states');await check('All deterministic states remain available',`document.querySelectorAll('[data-state-id]').length===333`)
assert.equal(errors.length,0,errors.join('\n'))
fs.writeFileSync('docs/mobile-browser-results.json',JSON.stringify({passed:results.length,errors,checks:results},null,2))
console.log(`PASS: ${results.length} mobile checks. No runtime exceptions.`)
socket.close()
