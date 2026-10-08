import {useRef,useState} from 'react'
import {CommunityContext} from './useCommunity.js'
import {createCommunityState,communityUsers} from '../../mocks/community.js'
import {communityTransition} from './model.js'
import {useDemo} from '../../demo/useDemo.js'
import {navigate} from '../../app/navigation.js'
export default function CommunityProvider({children}){
  const demo=useDemo(),[state,setState]=useState(createCommunityState),[actor,setActor]=useState('demo-alex'),[mode,setMode]=useState('normal'),[ui,setUI]=useState({})
  const latest=useRef(state),scroll=useRef({})
  const authenticated=demo.authenticated&&demo.sessionAccessStatus==='authenticated'&&actor!=='demo-visitor'
  const user=communityUsers.find(u=>u.id===actor)
  const ensureSigned=()=>{if(authenticated)return true;setActor('demo-alex');navigate('/auth?returnTo='+encodeURIComponent(location.pathname+location.search));return false}
  const run=action=>{const result=communityTransition(latest.current,action,actor,authenticated);if(!result.error){latest.current=result.state;setState(result.state)}return result}
  const like=(room,post,comment)=>{if(!ensureSigned())return;const action={room,post,comment};const result=run({...action,type:'likeBegin'});if(result.error)return demo.notify(result.error);if(mode!=='pending')run({...action,type:'likeResolve',failed:mode==='fail'})}
  const setRead=(id,all=false)=>{const next={...latest.current,notifications:latest.current.notifications.map(n=>n.user===actor&&(all||n.id===id)?{...n,read:all||!n.read}:n)};latest.current=next;setState(next)}
  return <CommunityContext.Provider value={{state,actor,setActor,user,authenticated,mode,setMode,run,like,ensureSigned,ui,setUI,setRead,notifications:state.notifications.filter(n=>n.user===actor),rememberFeed:(slug,y)=>{scroll.current[slug]=y},feedPosition:slug=>scroll.current[slug]||0}}>{children}</CommunityContext.Provider>
}
