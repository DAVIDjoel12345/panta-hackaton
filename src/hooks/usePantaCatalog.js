import {useCallback,useEffect,useState} from 'react'
import {api} from '../services/api.js'
import {readPantaCatalog,cachedPantaCatalog,rememberPantaCatalog} from '../services/pantaCatalog.js'
import {API_UPDATED,affectsQuery} from '../services/apiUpdates.js'

export default function usePantaCatalog({category,status},interval=10000){
  const key=`${category}|${status}`
  const [snapshot,setSnapshot]=useState(()=>{const data=cachedPantaCatalog(key);return {key,data,error:'',pending:!data,refreshing:false}})
  const [revision,setRevision]=useState(0)
  const refresh=useCallback(()=>setRevision(value=>value+1),[])
  useEffect(()=>{const updated=event=>{if(affectsQuery('/markets',event.detail))refresh()};window.addEventListener(API_UPDATED,updated);return()=>window.removeEventListener(API_UPDATED,updated)},[refresh])
  useEffect(()=>{
    let stopped=false,running=false,timer,controller,failures=0
    const schedule=delay=>{clearTimeout(timer);if(!stopped)timer=setTimeout(load,delay)}
    async function load(){
      if(stopped||running)return
      if(document.hidden){schedule(interval);return}
      running=true;controller=new AbortController()
      setSnapshot(old=>{const data=old.key===key?old.data:cachedPantaCatalog(key);return {...old,key,data,error:'',pending:!data,refreshing:true}})
      let retry=interval
      try{
        if(!navigator.onLine)throw Error('You are offline. Showing the last successful Panta catalog.')
        const data=await readPantaCatalog(api,{category,status,signal:AbortSignal.any([controller.signal,AbortSignal.timeout(30000)]),onPage:partial=>{
          if(!stopped)setSnapshot(old=>old.key===key&&old.data?.complete!==false&&old.data?old:{key,data:partial,error:'',pending:false,refreshing:true})
        }})
        if(!stopped){failures=0;rememberPantaCatalog(key,data);setSnapshot({key,data,error:'',pending:false,refreshing:false})}
      }catch(error){if(!stopped){failures++;retry=Math.max((error.retryAfter||0)*1000,Math.min(60000,interval*2**Math.min(failures,3)));setSnapshot(old=>({...old,key,error:error.message,pending:false,refreshing:false}))}}
      finally{running=false;schedule(retry)}
    }
    const resume=()=>{if(!document.hidden)load()}
    load();window.addEventListener('focus',resume);window.addEventListener('online',resume);document.addEventListener('visibilitychange',resume)
    return()=>{stopped=true;clearTimeout(timer);controller?.abort();window.removeEventListener('focus',resume);window.removeEventListener('online',resume);document.removeEventListener('visibilitychange',resume)}
  },[key,category,status,interval,revision])
  return {...(snapshot.key===key?snapshot:{data:null,error:'',pending:true,refreshing:false}),refresh}
}
