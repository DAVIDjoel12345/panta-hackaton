import { authStates } from '../../features/auth/authStates.js'
import { Button, Field, Link, Badge } from '../ui/primitives.jsx'
export function AuthStatus({id,onRetry}) {
  const state=authStates.find(s=>s.id===id)
  if(!state)return null
  return <section className="auth-message" role="status" data-auth-state={id}><Badge tone="purple">Demo scenario</Badge><h2>{state.name}</h2><p>{state.description}</p>{onRetry?<Button onClick={onRetry}>Return to this flow</Button>:<Link className="button secondary" href="/auth">Open authentication demo</Link>}</section>
}
export default function AuthScenarios({group,value,onChange}) {
  return <details className="auth-scenarios"><summary>Preview deterministic demo states</summary><Field label="Scenario"><select value={value} onChange={e=>onChange(e.target.value)}><option value="">Current flow</option>{authStates.filter(s=>s.group===group).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></Field>{value&&<AuthStatus id={value} onRetry={()=>onChange('')}/>}</details>
}
