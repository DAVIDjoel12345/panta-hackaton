// Local server operator tool. Never expose this as an application-user endpoint.
import {mkdirSync,readFileSync,writeFileSync} from 'node:fs'
import {PantaClient} from '../dist/panta/client.js'
mkdirSync('data',{recursive:true})
const tokenFile='data/panta-operator-token.json'
const [operation,...args]=process.argv.slice(2)
let token
if(process.env.PANTA_OPERATOR_USE_JWT==='1')token=JSON.parse(readFileSync(tokenFile,'utf8'))
const client=new PantaClient(token?.access)
try {
 switch(operation){
  case 'login': case 'register': {
   const result=await client.providerLogin({email:process.env.PANTA_BOOTSTRAP_EMAIL,password:process.env.PANTA_BOOTSTRAP_PASSWORD,...process.env.PANTA_BOOTSTRAP_NAME?{name:process.env.PANTA_BOOTSTRAP_NAME}:{}},operation==='register')
   writeFileSync(tokenFile,JSON.stringify(result),{mode:0o600});console.log('Provider tokens saved in ignored server data directory.');break
  }
  case 'refresh': {const previous=JSON.parse(readFileSync(tokenFile,'utf8'));const result=await client.providerRefresh(previous.refresh);writeFileSync(tokenFile,JSON.stringify(result),{mode:0o600});console.log('Rotated provider tokens saved.');break}
  case 'create-key': {if(!['test','live'].includes(args[0]))throw Error('Specify test or live and an optional key label.');const result=await client.createKey(args[0],args[1]||'Panta Signal');const path='data/panta-key-'+Date.now()+'.json';writeFileSync(path,JSON.stringify(result),{mode:0o600,flag:'wx'});console.log('One-time secret saved to '+path+'. Move it into backend/.env; do not commit this file.');break}
  case 'revoke-key': await client.revokeKey(args[0]);console.log('Requested key revoked.');break
  case 'update-name': await client.updateAccount(args.join(' '));console.log('Provider display name updated.');break
  case 'account':case 'keys':case 'metrics':case 'dashboard':case 'creates':case 'accountTrades': console.log(JSON.stringify(await client[operation](),null,2));break
  default: throw Error('Use account, keys, metrics, dashboard, creates, accountTrades, update-name, create-key, revoke-key, login, register, or refresh.')
 }
}catch(error){console.error(error.getResponse?.()||'Operator operation failed. Check command arguments and server configuration.');process.exitCode=1}
