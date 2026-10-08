import {spawn} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import {existsSync} from 'node:fs';
const root=fileURLToPath(new URL('../',import.meta.url));
const children=[];
function launch(args,cwd=root,env=process.env){const child=spawn(process.execPath,args,{cwd,env,stdio:'inherit',windowsHide:true});children.push(child);child.on('error',e=>{console.error(e.message);stop(1)});return child}
function stop(code=0){for(const child of children)child.kill();process.exit(code)}
process.on('SIGINT',()=>stop());process.on('SIGTERM',()=>stop());
if(!existsSync(root+'backend/dist/main.js')){console.error('Run npm run build --prefix backend first.');process.exit(1)}
async function ready(url,child,name){for(let i=0;i<80;i++){if(child.exitCode&&child.exitCode!==0)throw Error(name+' exited during startup');try{const response=await fetch(url,{signal:AbortSignal.timeout(750)});if(response.ok)return}catch{}await new Promise(resolve=>setTimeout(resolve,250))}throw Error(name+' did not become ready')}
try{
  const primary=launch(['--env-file-if-exists=.env','dist/main.js'],root+'backend');
  await ready('http://127.0.0.1:3001/api/v1/runtime/health',primary,'Primary backend');
  const secondary=launch(['--env-file-if-exists=.env','dist/main.js'],root+'backend',{...process.env,PORT:'3002'});
  await ready('http://127.0.0.1:3002/api/v1/runtime/health',secondary,'Secondary backend');
  const gateway=launch(['scripts/api-gateway.mjs']);
  await ready('http://127.0.0.1:3000/api/v1/runtime/health',gateway,'API gateway');
  launch(['node_modules/vite/bin/vite.js','--host','127.0.0.1','--port','5173','--strictPort']);
}catch(error){console.error(error.message);stop(1)}
for(const child of children)child.on('exit',code=>{if(code){console.error('A service exited:',code);stop(code)}});
