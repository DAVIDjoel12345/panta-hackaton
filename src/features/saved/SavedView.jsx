import {SavedCommunityPosts} from '../community/CommunityWorkspace.jsx'
import { useState } from 'react'
import { useDemo } from '../../demo/useDemo.js'
import { markets, rooms } from '../../demo/fixtures.js'
import { PageHeading, Tabs, Link, Panel, Button, Empty, DemoNote } from '../../components/ui/primitives.jsx'
import MarketCard from '../../components/market/MarketCard.jsx'
import AnalysisResult from '../../components/ai/AnalysisResult.jsx'
import StatePanel, { ScenarioControl } from '../../components/feedback/StatePanel.jsx'
export default function SavedView({route}) {
  const demo=useDemo();const [scenario,setScenario]=useState('');const tab=route.path.split('/')[2]||'all'
  return <><PageHeading title="Keep a little signal close." description="Your saved questions, communities, and explanations." /><Tabs active={route.path} items={[['All saved',''],['Markets','/markets'],['Rooms','/rooms'],['Analyses','/analyses'],['Posts','/posts']].map(([label,s])=>({label,href:'/saved'+s}))} /><DemoNote />{['all','markets'].includes(tab)&&<><h2>Saved markets</h2>{demo.saved.length?<div className="market-grid">{[...markets,...demo.customMarkets].filter(m=>demo.saved.includes(m.id)).map(m=><MarketCard key={m.id} market={m} />)}</div>:<Empty title="No saved markets" />}</>}{['all','rooms'].includes(tab)&&<><h2>Saved rooms</h2>{demo.savedRooms.length?rooms.filter(r=>demo.savedRooms.includes(r.slug)).map(r=><Panel className="padded" key={r.slug} title={<Link href={`/rooms/${r.slug}`}>{r.name}</Link>} action={<Button onClick={()=>demo.toggleRoomSave(r.slug)}>Unsave room</Button>}><p>{r.description}</p></Panel>):<Empty title="No saved rooms" />}</>}{['all','analyses'].includes(tab)&&<><h2>Saved analyses</h2>{demo.savedAnalyses.length?markets.filter(m=>demo.savedAnalyses.includes(m.id)).map(m=><AnalysisResult key={m.id} market={m} />):<Empty title="No saved analyses" description="Save a market explanation to revisit its context." />}</>}{['all','posts'].includes(tab)&&<SavedCommunityPosts/>}<ScenarioControl feature="saved" value={scenario} onChange={setScenario} />{scenario&&<StatePanel id={scenario} onAction={()=>setScenario('')} />}</>
}
