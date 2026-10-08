import {useEffect,useState} from 'react'
import {api} from '../services/api.js'
export default function BackendStatus(){
  const [status,setStatus]=useState(null),[error,setError]=useState('')
  useEffect(()=>{const controller=new AbortController();let running=false;async function refresh(){if(running)return;running=true;try{const data=await api('/runtime/health',{signal:controller.signal});if(!controller.signal.aborted){setStatus(data);setError('')}}catch(e){if(!controller.signal.aborted)setError(e.message)}finally{running=false}}refresh();const timer=setInterval(refresh,30000);return()=>{clearInterval(timer);controller.abort()}},[])
  return <div role="status">{error?<p>Backend connection unavailable: {error}</p>:status?<><p>Backend online · checked {new Date(status.serverTime).toLocaleString()}</p><p>AI credentials: {status.providers.ai}. Market credentials: {status.providers.markets}.</p><small>Credential configuration does not confirm provider availability. Market pages refresh every {status.marketRefreshSeconds} seconds.</small></>:<p>Checking backend connection...</p>}</div>
}
