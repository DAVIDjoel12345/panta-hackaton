import assert from 'node:assert/strict'
import fs from 'node:fs'
import {safeReturnPath,authCapabilities,passwordPolicy} from '../src/features/auth/config.js'
import {authStates} from '../src/features/auth/authStates.js'
import {demoAuthAdapter} from '../src/mocks/authAdapter.js'
for(const unsafe of ['https://evil.test','//evil.test','javascript:alert(1)','/\\evil.test','/%2f%2fevil.test','/%5cevil.test','/auth/login','/auth','/markets\n','/%00','/%0a','/%'])assert.equal(safeReturnPath(unsafe),'/markets',unsafe)
for(const safe of ['/settings/account','/markets/demo-btc?outcome=no','/rooms/crypto/discussion'])assert.equal(safeReturnPath(safe),safe)
assert.equal(authCapabilities.live,false);assert.equal(authCapabilities.mfa,false);assert.equal(authCapabilities.recovery,false)
assert.equal(passwordPolicy.minLength,12)
assert.equal(new Set(authStates.map(s=>s.id)).size,117)
for(const state of authStates){assert.ok(state.name.length>3);assert.ok(state.description.length>65)}
const challenge=demoAuthAdapter.challenge('DEMO-MIRA');assert.equal(challenge.account,'DEMO-MIRA');assert.ok(challenge.nonce.startsWith('FICTIONAL'));assert.ok(Number.isFinite(Date.parse(challenge.expiresAt)))
assert.equal(demoAuthAdapter.session('wallet').fictional,true)
const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name])
for(const file of walk('src').filter(p=>/\.(jsx?|tsx?)$/.test(p))){const code=fs.readFileSync(file,'utf8');if(!file.endsWith('SplashOverlay.jsx'))assert.ok(!/(localStorage|sessionStorage)\.(setItem|\w+\s*=)/.test(code),`Unexpected persistent write: ${file}`)}
console.log('PASS: redirect validation, 117 auth state definitions, capability boundaries, fictional challenge binding, and no persistent auth writes.')
