import {useCallback,useEffect,useRef,useState} from 'react'
import {DemoContext} from '../demo/useDemo.js'
import {AuthContext} from '../features/auth/useAuth.js'
import {CommunityContext} from '../features/community/useCommunity.js'
import {api} from '../services/api.js'
import {navigate} from './navigation.js'
import {Button} from '../components/ui/primitives.jsx'
import useVisualViewport from '../hooks/useVisualViewport.js'
const empty={communities:[],memberships:{},posts:[],comments:[],saved:{},drafts:{},reports:[],history:[],notifications:[],pendingLikes:{},failures:{},users:[],clock:new Date().toISOString()}
export default function LiveProviders({children}){
  const [session,setSession]=useState(null),[state,setState]=useState(empty),[loading,setLoading]=useState(true),[error,setError]=useState(''),[connected,setConnected]=useState(false),[toast,notify]=useState(''),[ui,setUI]=useState({}),[busy,setBusy]=useState(false)
  const scroll=useRef({}),pending=useRef(false),generation=useRef(0),actorRef=useRef(null)
  useVisualViewport()
  const refresh=useCallback(async()=>{const version=++generation.current;try{const [next,data]=await Promise.all([api('/bootstrap'),api('/communities/state')]);if(version!==generation.current)return;if(actorRef.current!==next.user?.id){setUI({});scroll.current={};actorRef.current=next.user?.id}setSession(next);setState(data);setError('')}catch(e){if(version===generation.current){setError(e.message);setState(empty);setSession(null)}}finally{if(version===generation.current)setLoading(false)}},[])
  useEffect(()=>{const initial=queueMicrotask(refresh);void initial;const stream=new EventSource('/api/v1/events');stream.onopen=()=>{setConnected(true);refresh()};stream.onmessage=()=>refresh();stream.onerror=()=>setConnected(false);window.addEventListener('focus',refresh);return()=>{stream.close();window.removeEventListener('focus',refresh)}},[refresh])
  const user=session?.user,actor=user?.id||'visitor',authenticated=!!user
  const ensureSigned=()=>{if(authenticated)return true;navigate('/auth?returnTo='+encodeURIComponent(location.pathname+location.search));return false}
  const run=async action=>{if(pending.current)return {error:'Please wait for the current change to finish.'};pending.current=true;setBusy(true);try{const result=await api('/communities/commands',{method:'POST',body:{...action,requestId:crypto.randomUUID()}});await refresh();return result}catch(e){notify(e.message);return {error:e.message}}finally{pending.current=false;setBusy(false)}}
  const logout=async()=>{try{await api('/auth/logout',{method:'POST',body:{}});setState(empty);setSession(null);setUI({});await refresh();navigate('/auth')}catch(e){notify(e.message)}}
  const settings=user?.settings||{name:'Guest',bio:'',theme:'dark',compact:false,email:''}
  useEffect(()=>{document.documentElement.dataset.theme=settings.theme},[settings.theme])
  const auth={status:loading?'checking':authenticated?'authenticated':'guest',session:user,account:user?.name||'Guest',verifiedWallets:[],associatedWallets:[],logout,refresh,setStatus:refresh}
  const demo={live:true,user,loading,error,refresh,connected,busy,capabilities:session?.capabilities||{},providers:session?.providers||{},settings,authenticated,sessionAccessStatus:auth.status,wallet:false,role:'member',notifications:[],notify,toast,requireAuth:ensureSigned,saved:[],savedRooms:[],savedAnalyses:[],following:[]}
  const community={live:true,state,actor,user:state.users.find(u=>u.id===actor),authenticated,ui,setUI,loading,error,connected,busy,run,ensureSigned,refresh,like:async(room,post,comment)=>{if(ensureSigned())await run({type:'like',room,post,comment})},setRead:async(id,all=false)=>{try{await api('/notifications/read',{method:'PUT',body:{id,all,read:!state.notifications.find(n=>n.id===id)?.read}});await refresh()}catch(e){notify(e.message)}},notifications:state.notifications,rememberFeed:(slug,y)=>{scroll.current[slug]=y},feedPosition:slug=>scroll.current[slug]||0}
  return <DemoContext.Provider value={demo}><AuthContext.Provider value={auth}><CommunityContext.Provider value={community}>{children}{toast&&<div className="toast" role="status"><span>{toast}</span><Button aria-label="Dismiss notification" onClick={()=>notify('')}>Close</Button></div>}</CommunityContext.Provider></AuthContext.Provider></DemoContext.Provider>
}
