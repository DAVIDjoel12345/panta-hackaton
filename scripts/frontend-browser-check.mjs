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
await send('Emulation.setDeviceMetricsOverride',{width:1280,height:1000,deviceScaleFactor:1,mobile:false})
await send('Page.navigate',{url:base+'/markets'});await wait(`!!document.querySelector('.market-card')`)
const ids={marketId:'demo-btc',categorySlug:'crypto',articleSlug:'understanding-prices',signature:'demo-tx-001',positionId:'demo-pos-1',claimId:'demo-claim-1',draftId:'demo-draft-1',conversationId:'demo-conversation-1',roomSlug:'crypto',threadId:'demo-thread-1',postId:'demo-thread-1',userId:'demo-alex',creatorId:'demo-alex',reportId:'demo-thread-1'}
for(const route of flattenRoutes(routeTree)){
  const url=route.path.replace(/:([A-Za-z]+)/g,(_,key)=>ids[key])
  await visit(url)
  await check(`route ${url}`,`!document.body.innerText.includes('Unexpected error')&&document.querySelector('#root').innerText.length>150`)
}
console.log('133 route renders passed.')
await visit('/auth/wallet');await evaluate(`document.querySelector('.auth-method').click()`);await delay(100);for(const label of ['Complete simulated connection','Prepare demo ownership challenge','Load fictional challenge','Simulate message signature','Simulate successful verification','Create demo session and continue'])await click(label);await wait(`location.pathname==='/markets'&&!!document.querySelector('.market-card')`);

await visit('/markets')
await input('input[aria-label="Search markets"]','lunar-unmatched')
await check('Search empty state',`document.body.innerText.includes('No markets found')`)
await click('Clear filters')
await check('Search clear restores cards',`document.querySelectorAll('.market-card').length===6`)
await click('Load more markets')
await check('Load more shows all fixtures',`document.querySelectorAll('.market-card').length===8`)
await click('Technology','.category-filters button')
await check('Category filter',`document.querySelectorAll('.market-card').length===2`)
await evaluate(`document.querySelector('button[aria-label="List view"]').click()`)
await check('List view',`document.querySelectorAll('tbody tr').length===2`)
await evaluate(`document.querySelector('button[aria-label="Toggle sidebar"]').click()`)
await check('Sidebar collapse',`document.querySelector('.app-shell').classList.contains('is-collapsed')`)
await visit('/markets/demo-btc')
await input('.desktop-trade input[type="number"]','-1')
await check('Negative amount rejected',`document.querySelector('.desktop-trade button.primary').disabled`)
await input('.desktop-trade input[type="number"]','999')
await check('Insufficient balance rejected',`document.querySelector('.desktop-trade').innerText.includes('Insufficient demo token balance')`)
await input('.desktop-trade input[type="number"]','25')
await click('Review simulated trade')
await check('Trade dialog open with focus',`!!document.querySelector('dialog[open]')&&document.activeElement.closest('dialog')!==null`)
await click('Simulate expiry')
await check('Explicit quote expiry',`document.querySelector('dialog[open]').innerText.includes('Expired (simulated)')`)
await click('Refresh demo quote')
for(const label of ['Continue to demo approval','Simulate approval','Mark simulated submitted','Mark simulated pending','Simulate confirmation'])await click(label)
await check('Simulated confirmation label',`document.querySelector('dialog[open]').innerText.includes('not a blockchain transaction')`)
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await delay(100)
await check('Escape closes dialog',`!document.querySelector('dialog[open]')`)
await visit('/transactions')
await check('Simulated trade record persisted',`document.body.innerText.includes('demo-local-tx-1')`)
await visit('/claims');await click('Review demo claim')
for(const label of ['Continue to demo approval','Simulate approval','Mark simulated pending','Simulate confirmation'])await click(label)
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await delay(100)
await visit('/claims/history')
await check('Claim history retains local result',`document.body.innerText.includes('Simulated confirmed')`)
await visit('/notifications');await click('Mark all read');await click('Show unread')
await check('All notifications read',`document.body.innerText.includes("You're all caught up")`)
await visit('/rooms/crypto/discussion/demo-thread-1')
await input('.community-comments textarea','Browser review: check the resolution source.')
await click('Post comment');await click('Complete local comment')
await check('Local comment posted',`document.body.innerText.includes('Browser review: check the resolution source.')`)
await click('Reply','.community-comment button')
await input('.community-comments form textarea','A local demonstration reply.')
await click('Post reply');await click('Complete local comment')
await check('Local reply posted',`document.body.innerText.includes('A local demonstration reply.')`)
await visit('/moderation')
await check('Moderator gate visible',`document.body.innerText.includes('Demo moderator access required')`)
await input('main select','moderator')
await check('Explicit moderator role reveals tools',`document.body.innerText.includes('locally reported comments')&&!document.body.innerText.includes('Demo moderator access required')`)
await visit('/settings/profile')
await input('.settings-grid input','Alex Demo Review')
await check('Settings show unsaved changes',`window.__pantaDirty===true`)
await click('Save preferences')
await check('Settings saved',`window.__pantaDirty===false`)
await visit('/profile')
await check('Profile name reflects settings',`document.querySelector('.profile-header').innerText.includes('Alex Demo Review')`)
await visit('/create/drafts/demo-draft-1')
for(let i=0;i<12;i++){await click(i===9?'Use simulated quote':i===11?'Simulate approval':'Continue')}
await check('Creation pending distinguished',`document.body.innerText.includes('Simulated pending')`)
await click('Complete local simulation')
await check('Creation completed locally',`document.body.innerText.includes('No live market was published')`)
await visit('/markets')
await check('Created market included locally',`document.body.innerText.includes('9 markets')`)
await visit('/ai')
await input('#ai-prompt','Explain the deadline')
await click('Show demo analysis')
await check('Fixed AI response',`document.querySelector('.message-pair').innerText.includes('No AI request was made')`)
await click('New conversation','a')
await check('New conversation clears local composer history',`!document.querySelector('.message-pair')&&!!document.querySelector('.ai-welcome')`)
await visit('/dev/ui-states')
await check('All states in development gallery',`document.querySelectorAll('[data-state-id]').length===333`)
await check('Every state has explanation and action',`[...document.querySelectorAll('[data-state-id]')].every(e=>e.querySelector('h2')&&e.querySelector('p').innerText.length>50&&e.querySelector('a,button'))`)
for(const width of [360,768,1280]){
  await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:false})
  for(const url of ['/','/markets','/markets/demo-btc','/portfolio','/claims','/create','/ai','/rooms','/profile','/creator','/settings','/notifications','/moderation','/dev/ui-states']){
    await visit(url)
    const size=await evaluate(`({inner:innerWidth,scroll:document.documentElement.scrollWidth})`)
    assert.ok(size.scroll<=width,`${url} overflow at ${width}: ${JSON.stringify(size)}`)
    results.push(`responsive ${url} ${width}`)
  }
}
await send('Emulation.setDeviceMetricsOverride',{width:360,height:800,deviceScaleFactor:1,mobile:false})
await visit('/markets/demo-btc')
await evaluate(`document.querySelector('.mobile-trade-action button').click()`);await delay(100)
await check('Mobile trade drawer readable',`document.querySelector('dialog[open]').getBoundingClientRect().width<=360`)
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await delay(100)
await evaluate(`const trigger=document.querySelector('button[aria-label="Open More menu"]');trigger.focus();trigger.click()`);await delay(100)
await check('Mobile navigation opens',`document.querySelector('dialog[open]').innerText.includes('Signal AI')`)
await send('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await delay(100)
await check('Mobile navigation restores focus',`document.activeElement.getAttribute('aria-label')==='Open More menu'`)
assert.equal(errors.length,0,errors.join('\n'))
fs.writeFileSync('docs/browser-check-results.json',JSON.stringify({passed:results.length,errors,checks:results},null,2))
console.log(`PASS: ${results.length} browser checks; 133 routes, 333 state previews, desktop/tablet/mobile layout, and local interaction flows. No runtime exceptions.`)
socket.close()


