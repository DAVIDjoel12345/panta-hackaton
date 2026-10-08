import { useState } from 'react'
import { markets, profiles, categories, positions, findMarket, money, demoBalance, analysisFixture, SNAPSHOT, dateLabel } from '../../demo/fixtures.js'
import { useDemo } from '../../demo/useDemo.js'
import { Link, Button, Badge, Panel, Field, DemoNote, Modal, Source, Metric, Empty, Tabs } from './primitives.jsx'
import Icon from './Icon.jsx'
import MarketCard from '../market/MarketCard.jsx'
import PriceChart from '../market/PriceChart.jsx'
import AnalysisResult from '../ai/AnalysisResult.jsx'
import Discussion from '../../features/community/Discussion.jsx'
import TradeTicketView from '../../features/trading/TradeTicketView.jsx'
import { Brand, Navigation } from '../layout/AppShell.jsx'
import WalletControl from '../../features/wallet/WalletControl.jsx'
import StatePanel from '../feedback/StatePanel.jsx'

/** Composable presentation for the scaffold's small shared components. */
export default function FeatureWidget({ name, market=markets[0], profile=profiles[0], position=positions[0], children, items=[], onChange, onConfirm, value, ...props }) {
  const demo=useDemo()
  const [local,setLocal]=useState(value||'')
  const [open,setOpen]=useState(false)
  const change=next=>{setLocal(next);onChange?.(next)}
  if(children)return <Panel title={name} className="padded">{children}</Panel>
  if(['Page shell','Section shell','Responsive container'].includes(name))return <section className={name==='Responsive container'?'page-container':'panel padded'} aria-label={name}>{props.content||<Empty title="Ready for your content" description="Pass content into this reusable layout region." />}</section>
  if(name==='Header')return <header className="public-header"><Brand /><Link href="/markets">Explore markets</Link><WalletControl /></header>
  if(name==='Sidebar')return <nav aria-label="Workspace navigation"><Navigation route={props.route||{path:'/markets'}} /></nav>
  if(name==='Mobile navigation')return <><Button icon="menu" onClick={()=>setOpen(true)}>Navigation</Button><Modal open={open} onClose={()=>setOpen(false)} title="Navigation"><Navigation route={props.route||{path:'/markets'}} onNavigate={()=>setOpen(false)} /></Modal></>
  if(name==='Breadcrumbs')return <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/markets">Explore</Link><Icon name="chevron" size={13} /><span>{props.current||'Markets'}</span></nav>
  if(name==='Tabs')return <Tabs items={items.length?items:[{label:'Explore',href:'/markets'},{label:'Saved',href:'/saved'}]} active={props.active||'/markets'} />
  if(['Modal','Drawer','Confirmation dialog','Report dialog','Report-content dialog'].includes(name))return <><Button onClick={()=>setOpen(true)}>{name.startsWith('Report')?'Report content':props.trigger||'Review details'}</Button><Modal open={open} onClose={()=>setOpen(false)} title={props.title||name}><DemoNote /><p>{props.description||'Review this local demonstration action before continuing.'}</p><div className="modal-actions"><Button onClick={()=>setOpen(false)}>Cancel</Button><Button variant="primary" onClick={()=>{onConfirm?.();setOpen(false);demo.notify('Demo action recorded locally.')}}>Confirm demo action</Button></div></Modal></>
  if(name==='Wallet gate')return demo.wallet?<Badge tone="positive">Demo wallet enabled</Badge>:<Panel className="padded"><h2>A demo wallet is required</h2><p>No real wallet connection or signature is requested.</p><WalletControl /></Panel>
  if(['Status badge','Market lifecycle badge'].includes(name))return <Badge tone="positive">{props.status||market.status}</Badge>
  if(name==='Loading indicator')return <div role="status" className="demo-note"><Icon name="clock" />Loading preview · use explicit simulation controls</div>
  if(['Error panel','Missing-data notice'].includes(name))return <StatePanel id={name==='Error panel'?'global.recoverableError':'ai.missingMarketHistory'} onAction={props.onRetry} />
  if(name==='Alert')return <div role="status" className="caveat"><Icon name="alert" /><p>{props.message||'Illustrative data only. Review the criteria and sources before continuing.'}</p></div>
  if(name==='Toast boundary')return demo.toast?<div role="status" className="caveat"><p>{demo.toast}</p><Button onClick={()=>demo.notify('')}>Dismiss</Button></div>:null
  if(['Market list','Related-market list','Market association'].includes(name))return <div className="market-grid two">{(items.length?items:markets.filter(m=>name!=='Related-market list'||m.id!==market.id).slice(0,3)).map(m=><MarketCard key={m.id} market={m} />)}</div>
  if(name==='Market header')return <div className="market-detail-heading"><span className={`symbol ${market.color}`}><Icon name={market.icon} /></span><div><Badge>{market.category}</Badge><h2>{market.question}</h2></div></div>
  if(name==='YES/NO price display')return <div className="outcome-prices"><span className="yes-price">YES {market.yes}¢</span><span className="no-price">NO {100-market.yes}¢</span></div>
  if(['Data freshness label','Timestamp'].includes(name))return <time dateTime={SNAPSHOT} className="muted">Demo snapshot · {dateLabel(SNAPSHOT)} · 16:00 UTC</time>
  if(['Resolution source panel','Source link','Source references','Source list'].includes(name))return <Panel title="Proposed resolution source" className="padded"><Source market={market} /><p className="muted">Source selection is illustrative and has not been independently verified.</p></Panel>
  if(['Ai summary panel','AI summary panel','Response panel','Analysis result'].includes(name))return <AnalysisResult market={market} />
  if(['AI sources and caveats','Caveat panel'].includes(name))return <div className="caveat"><Icon name="alert" /><p>{analysisFixture.caveat}</p></div>
  if(name==='Chart placeholder')return <PriceChart market={market} />
  if(name==='Metric card')return <Metric label={props.label||'Illustrative YES price'} value={props.metric||`${market.yes}¢`} detail="Fixed demonstration snapshot" />
  if(name==='Table placeholder')return <div className="table-scroll"><table><thead><tr><th>Market</th><th>YES price</th><th>Status</th></tr></thead><tbody>{markets.slice(0,3).map(m=><tr key={m.id}><td><Link href={`/markets/${m.id}`}>{m.question}</Link></td><td>{m.yes}¢</td><td>{m.status}</td></tr>)}</tbody></table></div>
  if(['Category filter','Sort control','Market context selector','Leaderboard filters'].includes(name)){const options=name==='Market context selector'?markets.map(m=>[m.id,m.question]):(name==='Sort control'?['Trending','Volume','Closing soon']:categories).map(c=>[c,c]);return <Field label={name}><select value={value??local} onChange={e=>change(e.target.value)}><option value="">Choose an option</option>{options.map(([id,label])=><option key={id} value={id}>{label}</option>)}</select></Field>}
  if(['Search field','Amount input','Prompt input'].includes(name))return <Field label={name}><input type={name==='Amount input'?'number':'text'} min={name==='Amount input'?0.01:undefined} step={name==='Amount input'?'0.01':undefined} placeholder={name==='Search field'?'Search markets…':name==='Amount input'?'0.00':'Ask about this market…'} value={value??local} onChange={e=>change(e.target.value)} /></Field>
  if(name==='Outcome selector')return <div className="trade-outcomes">{['YES','NO'].map(outcome=><button key={outcome} className={`${outcome.toLowerCase()} ${(value??local)===outcome?'selected':''}`} aria-pressed={(value??local)===outcome} onClick={()=>change(outcome)}>{outcome}</button>)}</div>
  if(name==='Trade ticket')return <TradeTicketView market={market} />
  if(['Fee summary','Quote panel','Quote review'].includes(name))return <Panel className="padded" title="Illustrative fee review"><DemoNote /><div className="detail-rows"><div><span>Trading fee</span><strong>{money(demoBalance.tradingFee)}</strong></div><div><span>Network fee</span><strong>{money(demoBalance.networkFee)}</strong></div><div><span>Quote expiry</span><strong>60 seconds · paused demo clock</strong></div></div></Panel>
  if(['Receipt','Transaction receipt','Transaction history'].includes(name))return <Panel className="padded" title="Demonstration transaction record"><Badge tone="purple">Fictional reference</Badge><p>No blockchain confirmation is represented by this component.</p><Link href={`/transactions/${position.reference}`}>{position.reference} →</Link></Panel>
  if(['Discussion list','Comment','Comment composer','Comment/reply thread'].includes(name))return <Discussion marketId={props.marketId} room={props.room||'crypto'} threadId={props.threadId} />
  if(name==='Reply list')return items.length?<div>{items.map((item,i)=><p className="reply" key={i}>{typeof item==='string'?item:item.text}</p>)}</div>:<p className="muted">No replies yet. Start a discussion to add one.</p>
  if(name==='Avatar')return <span className={`avatar ${profile.color}`} aria-label={profile.name}>{profile.initials}</span>
  if(['Profile card','Profile header'].includes(name))return <Panel className="padded"><span className={`avatar ${profile.color}`}>{profile.initials}</span><h3>{profile.name}</h3><p>{profile.bio}</p><Link href={`/users/${profile.id}`}>View fictional profile →</Link></Panel>
  if(name==='Follow control')return <Button aria-pressed={demo.following.includes(profile.id)} onClick={()=>demo.toggleFollow(profile.id)}>{demo.following.includes(profile.id)?'Following':'Follow demo profile'}</Button>
  if(name==='Prompt composer')return <form onSubmit={e=>{e.preventDefault();onConfirm?.(local);demo.notify('Demo prompt submitted. Only fixed fixture analysis is available.');setLocal('')}}><Field label="Ask about this market"><textarea required value={local} onChange={e=>change(e.target.value)} /></Field><Button type="submit">Submit demo prompt</Button></form>
  if(name==='Message list')return items.length?<div>{items.map((item,i)=><p className="user-message" key={i}>{item.text||item}</p>)}</div>:<Empty title="Start with a question" description="Select a market and a suggested question to see fixed demonstration analysis." />
  if(['Forecast history','Leaderboard list','Score breakdown','Reputation explanation','Sample-size notice'].includes(name))return <Panel title={name} className="padded"><Badge tone="purple">Small fictional sample</Badge><p>{profile.name}: {profile.accuracy}% example accuracy over {profile.resolved} resolved fixture forecasts. This is not trading performance or an implemented reputation score.</p><Link href={`/users/${profile.id}/reputation`}>Read the methodology and caveats →</Link></Panel>
  if(['Position overview','Available entry/cost information','Current position information','Associated market','Resolution result','Claim status'].includes(name))return <Panel title={name} className="padded"><h3>{findMarket(position.marketId).question}</h3><Badge>{position.outcome} · {position.shares} demo shares</Badge><p>Entry cost: {money(position.shares*position.entry/100)}. Lifecycle: {position.status}. {findMarket(position.marketId).result?'Fictional resolved outcome: YES.':'Unresolved; no payout is available.'}</p><Link href={`/positions/${position.id}`}>Review position details →</Link></Panel>
  if(['General details','Room rules'].includes(name))return <form onSubmit={e=>{e.preventDefault();onConfirm?.(local);demo.notify('Room changes saved for this demonstration.')}}><Field label={name}><textarea required value={value??local} onChange={e=>change(e.target.value)} placeholder="Write a clear description and respectful community rules." /></Field><Button type="submit">Save demo changes</Button></form>
  if(['Member management','Roles and permissions'].includes(name))return <Panel title={name} className="padded">{profiles.map(p=><div className="member-row" key={p.id}><Link href={`/users/${p.id}`}>{p.name}</Link><select aria-label={`Demo role for ${p.name}`} onChange={()=>demo.notify('Demo role changed. Frontend visibility is not authorization.')}><option>Member</option><option>Demo moderator</option></select></div>)}</Panel>
  if(name==='Moderation queue')return <Panel title="Local moderation queue" className="padded"><p>{demo.comments.filter(c=>c.reported).length} demonstration reports.</p><Link href="/moderation/reports">Review with demo moderator role →</Link></Panel>
  return <Panel title={name} className="padded"><DemoNote /><p>Review the supplied market context and resolution criteria.</p><Source market={market} /><Link href={`/markets/${market.id}`} className="button secondary">Open market</Link></Panel>
}
