import {useDemo} from '../demo/useDemo.js'
import LiveAuthView from '../features/auth/LiveAuthView.jsx'
import CommunityWorkspace from '../features/community/CommunityWorkspace.jsx'
import {Panel,Button} from '../components/ui/primitives.jsx'
import LiveAI from './LiveAI.jsx'
import LiveMarkets from './LiveMarkets.jsx'
import {AccountSettings,SavedWorkspace,ProfileWorkspace,NotificationWorkspace} from './AccountWorkspace.jsx'
import FeatureWorkspace,{OnboardingWorkspace} from './FeatureWorkspace.jsx'
export default function LiveScreen({route,params,children}){
 const demo=useDemo()
 if(route.path==='/'||route.feature==='information')return children
 if(['discovery','markets'].includes(route.feature))return <LiveMarkets key={location.pathname} route={route} params={params} marketId={params.marketId}/>
 if(['portfolio','positions'].includes(route.feature))return <FeatureWorkspace route={route} params={params}/>
 if(demo.loading)return <Panel className="padded"><h1>Connecting to your workspace...</h1></Panel>
 if(demo.error)return <Panel className="padded"><h1>Backend unavailable</h1><p>{demo.error}</p><Button onClick={demo.refresh}>Retry connection</Button></Panel>
 if(route.feature==='auth')return <LiveAuthView route={route}/>
 if(route.feature==='ai')return demo.authenticated?<LiveAI route={route} params={params}/>:<LiveAuthView/>
 if(route.feature==='community')return <CommunityWorkspace route={route} params={params}/>
 if(route.feature==='saved')return <SavedWorkspace route={route}/>
 if(route.feature==='notifications')return <NotificationWorkspace/>
 if(route.feature==='settings'||route.path==='/profile/edit')return demo.authenticated?<AccountSettings route={route} key={demo.user.id+route.path}/>:<LiveAuthView/>
 if(route.feature==='onboarding')return <OnboardingWorkspace route={route}/>
 if(route.feature==='profiles')return <ProfileWorkspace route={route} params={params}/>
 return <FeatureWorkspace route={route} params={params}/>
}
