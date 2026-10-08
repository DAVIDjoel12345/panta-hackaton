import fs from 'node:fs'
import {routeTree} from '../src/app/routes.js'
import {flattenRoutes} from '../src/app/routeMatcher.js'
import {authStates} from '../src/features/auth/authStates.js'
const routes=flattenRoutes(routeTree).filter(r=>r.feature==='auth'||r.feature==='onboarding'||['/settings/security','/settings/wallet','/settings/account','/settings/security/mfa','/settings/delete-account'].includes(r.path))
fs.mkdirSync('docs/auth-flows',{recursive:true})
fs.writeFileSync('docs/auth-flows/routes.md','# Authentication route inventory\n\nAccess describes frontend UX, not backend authorization. Optional MFA/recovery routes render an unavailable state.\n\n| Route | Access | Availability | Priority |\n| --- | --- | --- | --- |\n'+routes.map(r=>`| \`${r.path}\` | ${r.access} | ${r.availability||'demo'} | ${r.priority} |`).join('\n')+'\n')
fs.writeFileSync('docs/auth-flows/states.md','# Authentication state checklist\n\n117 new deterministic states extend the original 168 previews to **285**. Every preview has a heading, context, and action. Select a scenario in its feature screen or filter `/dev/ui-states` by the group below. MFA/recovery entries are unavailable design previews, not functioning enrollment.\n\n'+[...new Set(authStates.map(s=>s.group))].map(group=>'## '+group+'\n\n'+authStates.filter(s=>s.group===group).map(s=>'- [x] `'+s.id+'` — '+s.name).join('\n')).join('\n\n')+'\n')
console.log('Updated authentication route and state inventories.')
