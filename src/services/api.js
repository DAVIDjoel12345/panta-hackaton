import {API_UPDATED,mutationUpdates} from './apiUpdates.js'
export async function api(path,{method='GET',body,signal}={}){
  const response=await fetch('/api/v1'+path,{method,credentials:'same-origin',headers:body!==undefined?{'Content-Type':'application/json'}:{},...(body!==undefined?{body:JSON.stringify(body)}:{}),signal:signal||AbortSignal.timeout(45000)});
  const data=await response.json().catch(()=>({}));
  if(!response.ok){const error=new Error(data.message||`Request failed (${response.status})`);error.status=response.status;error.code=data.code;error.requestId=data.requestId;const retry=response.headers.get('Retry-After');error.retryAfter=data.retryAfter||(retry?(Number(retry)||Math.max(0,(Date.parse(retry)-Date.now())/1000)):undefined);throw error}
  if(method!=='GET'){const prefixes=mutationUpdates(path,data);if(prefixes.length)window.dispatchEvent(new CustomEvent(API_UPDATED,{detail:prefixes}))}
  const cacheStatus=response.headers.get('X-Cache-Status');
  return cacheStatus&&data&&typeof data==='object'&&!Array.isArray(data)?{...data,cacheStatus}:data;
}
