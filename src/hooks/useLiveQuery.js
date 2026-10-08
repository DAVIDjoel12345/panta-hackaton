import {useCallback,useEffect,useState} from 'react'
import {api} from '../services/api.js'
import {readMarketCache,writeMarketCache} from '../services/publicMarketCache.js'
import {API_UPDATED,affectsQuery} from '../services/apiUpdates.js'

// One request at a time; stale responses cannot replace a newly selected resource.
export default function useLiveQuery(path,interval=10000){
  const [snapshot,setSnapshot]=useState(()=>{const data=readMarketCache(path);return {path,data,error:'',pending:!!path&&!data,refreshing:false}}),[revision,setRevision]=useState(0)
  const refresh=useCallback(()=>setRevision(value=>value+1),[])
  useEffect(()=>{
    if(!path)return
    let stopped=false,running=false,timer,controller,failures=0,deadline,queued=false
    const schedule=delay=>{clearTimeout(timer);if(!stopped)timer=setTimeout(load,delay)}
    async function load(){
      if(stopped||running)return
      if(document.hidden){schedule(interval);return}
      clearTimeout(timer);running=true;const started=Date.now();controller=new AbortController()
      deadline=setTimeout(()=>controller.abort(new Error('Market request timed out. Retrying automatically.')),30000)
      setSnapshot(old=>{const data=old.path===path?old.data:readMarketCache(path);return {...old,path,data,error:old.path===path?old.error:'',pending:!data,refreshing:true}})
      let delay=interval
      try{
        if(!navigator.onLine)throw new Error('You are offline. Showing the last successful update.')
        const data=await api(path,{signal:controller.signal})
        if(!stopped){writeMarketCache(path,data);failures=0;setSnapshot({path,data,error:'',pending:false,refreshing:false})}
      }catch(error){
        if(!stopped){failures++;delay=Math.max((error.retryAfter||0)*1000,Math.min(60000,interval*2**Math.min(failures,3)));setSnapshot(old=>({...old,error:error.message,pending:false,refreshing:false}))}
      }finally{clearTimeout(deadline);running=false;const next=queued&&!failures?0:failures?delay:Math.max(250,delay-(Date.now()-started));queued=false;schedule(next)}
    }
    const resume=()=>{if(!document.hidden)load()}
    const updated=event=>{if(affectsQuery(path,event.detail)){if(running)queued=true;else resume()}}
    window.addEventListener(API_UPDATED,updated)
    const offline=()=>setSnapshot(old=>({...old,error:'You are offline. Showing the last successful update.'}))
    load();window.addEventListener('focus',resume);window.addEventListener('online',resume);window.addEventListener('offline',offline);document.addEventListener('visibilitychange',resume)
    return()=>{stopped=true;clearTimeout(timer);clearTimeout(deadline);controller?.abort();window.removeEventListener(API_UPDATED,updated);window.removeEventListener('focus',resume);window.removeEventListener('online',resume);window.removeEventListener('offline',offline);document.removeEventListener('visibilitychange',resume)}
  },[path,interval,revision])
  return {...(snapshot.path===path?snapshot:{data:null,error:'',pending:!!path,refreshing:false}),refresh}
}
