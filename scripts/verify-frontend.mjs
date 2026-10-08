import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'
import { transformSync, buildSync } from 'esbuild'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { routeTree } from '../src/app/routes.js'
import { flattenRoutes, matchRoute } from '../src/app/routeMatcher.js'
import { stateManifest } from '../src/app/stateManifest.js'
import { markets, positions, findMarket } from '../src/demo/fixtures.js'
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(entry=>entry.isDirectory()?walk(path.join(dir,entry.name)):[path.join(dir,entry.name)])
const routes=flattenRoutes(routeTree)
assert.equal(routes.length,133)
assert.equal(new Set(routes.map(r=>r.path)).size,133)
for(const route of routes){assert.ok(fs.existsSync(route.file));const actual=route.path.replace(/:[^/]+/g,'demo-id');assert.equal(matchRoute(routeTree,actual).route.id,route.id);for(const id of Object.values(route.states).flat())assert.ok(stateManifest.some(s=>s.id===id))}
for(const url of ['/rooms/create','/claims/available','/markets/new'])assert.equal(matchRoute([...routeTree].reverse(),url).route.path,url)
assert.equal(matchRoute(routeTree,'/markets/%00').status,'invalid-parameter')
assert.equal(matchRoute(routeTree,'/missing/path').status,'not-found')
const jsx=walk('src').filter(file=>file.endsWith('.jsx'))
for(const file of jsx)transformSync(fs.readFileSync(file,'utf8'),{loader:'jsx',sourcefile:file})
for(const market of markets){assert.equal(market.history.at(-1),market.yes);assert.ok(market.yes>=0&&market.yes<=100);assert.ok(market.id.startsWith('demo-'))}
for(const position of positions)assert.ok(findMarket(position.marketId))
const liveServices=new Set(['api.js','apiUpdates.js','pantaCatalog.js','publicMarketCache.js'])
for(const file of walk('src/services').filter(file=>liveServices.has(path.basename(file))))transformSync(fs.readFileSync(file,'utf8'),{loader:'js',sourcefile:file})
for(const file of walk('src/services').filter(file=>!liveServices.has(path.basename(file)))){const code=fs.readFileSync(file,'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/\/\/[^\n]*/g,'').trim();assert.equal(code,'export {}',`Integration boundary changed: ${file}`)}
const temp=path.resolve('.frontend-state-check.mjs')
try{
  buildSync({entryPoints:['src/components/feedback/StatePanel.jsx'],bundle:true,format:'esm',platform:'node',jsx:'automatic',external:['react','react-dom','react/jsx-runtime'],outfile:temp})
  const {default:StatePanel}=await import('file:///'+temp.replaceAll('\\','/'))
  const descriptions=new Set()
  for(const state of stateManifest){const markup=renderToStaticMarkup(React.createElement(StatePanel,{id:state.id}));assert.ok(markup.includes('<h2>'));assert.ok(markup.includes('Simulated state'));assert.ok(markup.includes('href="/markets"'));descriptions.add(markup)}
  assert.equal(descriptions.size,stateManifest.length)
}finally{if(fs.existsSync(temp))fs.unlinkSync(temp)}
function luminance(hex){const channels=hex.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722}
const combinations=[['F5F7FB','111318'],['A5ADBA','111318'],['929BAB','17191F'],['B6A6FF','201A31'],['35D99A','111318'],['FF8399','111318'],['FFFFFF','7357FF'],['18C783','111318'],['FF5572','111318'],['C3B4FF','111318']]
const contrasts=combinations.map(([fg,bg])=>{const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5,`${fg}/${bg}: ${ratio}`);return{foreground:'#'+fg,background:'#'+bg,ratio:Number(ratio.toFixed(2))}})
fs.writeFileSync('docs/contrast-checks.json',JSON.stringify(contrasts,null,2))
console.log(`PASS: ${routes.length} routes, ${jsx.length} JSX files, ${stateManifest.length} unique state renders, fixture consistency, remaining placeholder service boundaries, and ${contrasts.length} text contrast pairs.`)
