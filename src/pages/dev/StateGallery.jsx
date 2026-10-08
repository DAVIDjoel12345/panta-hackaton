import {communityStates} from '../../features/community/communityStates.js'
import CommunityState from '../../components/community/CommunityState.jsx'
import { authStates } from '../../features/auth/authStates.js'
import { AuthStatus } from '../../components/auth/AuthStatus.jsx'
import { useState } from 'react'
import { stateManifest } from '../../app/stateManifest.js'
import StatePanel from '../../components/feedback/StatePanel.jsx'
import { PageHeading, Field, Badge, DemoNote } from '../../components/ui/primitives.jsx'
export default function StateGallery() {
  const [query,setQuery]=useState('')
  const [feature,setFeature]=useState('all')
  const records=[...stateManifest,...authStates,...communityStates,{id:'trading.quoteReady',name:'Quote ready',priority:'P0'},{id:'trading.invalidAmount',name:'Invalid amount',priority:'P0'}]
  const visible=records.filter(s=>(feature==='all'||s.id.startsWith(feature+'.'))&&(s.id+' '+s.name).toLowerCase().includes(query.toLowerCase()))
  return <><PageHeading title="UI state laboratory" description="Development only. Inspect every shared state and feature substate deterministically." /><DemoNote>Deterministic state previews. No real integrations are running.</DemoNote><div className="two-columns"><Field label="Search states"><input value={query} onChange={e=>setQuery(e.target.value)} /></Field><Field label="Feature"><select value={feature} onChange={e=>setFeature(e.target.value)}><option value="all">All features</option>{[...new Set(records.map(s=>s.id.split('.')[0]))].map(f=><option key={f}>{f}</option>)}</select></Field></div><p>{visible.length} states</p><p className="gallery-preview-guide">Preview widths: 320, 360, 390, and 430px portrait; 844 × 390px landscape; 768px tablet; 1280px desktop. Use browser device controls for real viewport and large-text testing. State selection is deterministic.</p><div className="state-gallery">{visible.map(s=><div key={s.id} data-state-id={s.id}><div className="gallery-label"><code>{s.id}</code><Badge>{s.priority}</Badge></div>{s.group==='communityUX'?<CommunityState name={s.id}/>:s.group?<AuthStatus id={s.id}/>:<StatePanel id={s.id} />}</div>)}</div></>
}
