import { useAuth } from '../../features/auth/useAuth.js'
import { useDemo } from '../../demo/useDemo.js'
import { Link, Panel, Button } from '../ui/primitives.jsx'
export default function SessionGate({route,children}) {
  const auth=useAuth();const demo=useDemo()
  const protectedRoute=['authenticated','moderator'].includes(route.access)||route.feature==='onboarding'||route.path.startsWith('/settings/')
  if(demo.live){if(demo.loading||demo.error)return children;if(!protectedRoute||demo.authenticated)return children;return <Panel className="padded"><h1>Sign in to your workspace</h1><Link className="button primary" href={'/auth?returnTo='+encodeURIComponent(location.pathname+location.search)}>Sign in</Link></Panel>}
  if(!protectedRoute)return children
  if(['checking','denied'].includes(auth.status))return <Panel className="padded"><h1>{auth.status==='checking'?'Checking demo session':'Access denied'}</h1><p>No protected content is displayed while this session is unresolved.</p><Button onClick={()=>auth.setStatus(demo.authenticated?'authenticated':'guest')}>Finish demo session check</Button></Panel>
  if(!demo.authenticated||auth.status==='expired')return <Panel className="padded"><h1>{auth.status==='expired'?'Your session expired':'Sign in to your workspace'}</h1><p>Public markets remain available. Sign in to continue this account-specific action.</p><Link className="button primary" href={'/auth?returnTo='+encodeURIComponent(location.pathname+location.search)}>Continue to sign in</Link><Link className="button secondary" href="/markets">Browse markets</Link></Panel>
  return <>{['refreshing','offline'].includes(auth.status)&&<div className="auth-message" role="status">{auth.status==='offline'?'Offline. Previously displayed demo content is retained.':'Refreshing session. Your content remains visible.'}<Button onClick={()=>auth.setStatus('authenticated')}>Restore demo session</Button></div>}{children}</>
}
