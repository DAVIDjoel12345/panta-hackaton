import {useEffect,useState} from 'react'
import useLiveQuery from '../../hooks/useLiveQuery.js'
import {Button} from '../../components/ui/primitives.jsx'
import {chartPoints,movement} from './chartData.js'
import {formatMarketPercentage} from './formatMarketPercentage.js'

const ranges={ '1h':1, '6h':6, '24h':24 }
const price=value=>formatMarketPercentage(value,2,'No quote')
const clock=at=>new Date(at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
function QuoteIndicator({market,refreshing}){
  const [now,setNow]=useState(null)
  useEffect(()=>{const timer=setInterval(()=>setNow(Date.now()),1000);return()=>clearInterval(timer)},[])
  const observed=Date.parse(market?.priceObservedAt),age=now!==null&&Number.isFinite(observed)?Math.max(0,Math.floor((now-observed)/1000)):null
  const live=market?.priceStatus==='live'&&market?.cacheStatus!=='stale'&&age!==null&&age<10
  const status=market?.priceStatus==='settled'?'Settled':market?.cacheStatus==='stale'||market?.priceStatus==='last_observed'||age!==null&&age>=10?'Delayed':live?'Live':refreshing?'Connecting':'Waiting for quote'
  return <span className={`quote-indicator ${live?'live':status==='Delayed'?'delayed':''}`} role="status"><i/>{status}{age!==null&&market?.priceStatus!=='settled'?` · ${age}s since Panta quote`:''}{refreshing?' · syncing':''}</span>
}

export default function TradingChart({market,outcome='YES',onOutcomeChange}){
  const [range,setRange]=useState('1h'),[hover,setHover]=useState(null)
  const settled=market?.priceStatus==='settled'
  const series=useLiveQuery(market?.marketId?`/markets/${encodeURIComponent(market.marketId)}/series?range=${range}`:null,settled?60000:2000)
  const field=outcome==='NO'?'noPrice':'yesPrice'
  const rows=[...(series.data?.items||[])]
  if(market?.priceStatus==='live'&&market.priceObservedAt)rows.push({at:market.priceObservedAt,yesPrice:market.yesPrice,noPrice:market.noPrice})
  const points=chartPoints(rows,field)
  const yesPoints=chartPoints(rows,'yesPrice'),noPoints=chartPoints(rows,'noPrice')
  const windowEnd=Math.max(Date.parse(market?.retrievedAt)||0,Date.parse(series.data?.retrievedAt)||0,yesPoints.at(-1)?.at||0,noPoints.at(-1)?.at||0),windowStart=windowEnd-ranges[range]*3600000
  const x=point=>60+Math.max(0,Math.min(1,(point.at-windowStart)/(windowEnd-windowStart)))*760
  const y=value=>290-value*235
  const axisLabel=at=>range==='24h'?new Date(at).toLocaleString([],{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}):clock(at)
  const first=points[0],last=points.at(-1),selected=points[hover]||last,change=first&&last?last.value-first.value:0,tone=movement(change)
  const latest=outcome==='NO'?market?.noPrice:market?.yesPrice
  const line=(linePoints,color,key)=><g key={key}>{linePoints.length===1?<line x1="60" x2="820" y1={y(linePoints[0].value)} y2={y(linePoints[0].value)} stroke={color} strokeWidth="1.5"/>:linePoints.slice(1).map((point,index)=>{const previous=linePoints[index];return <line key={`${key}-${point.at}`} x1={x(previous)} y1={y(previous.value)} x2={x(point)} y2={y(point.value)} stroke={color} strokeWidth={key===outcome?3:2.2} strokeLinecap="round" vectorEffect="non-scaling-stroke"/>})}{linePoints.length>0&&<circle cx={x(linePoints.at(-1))} cy={y(linePoints.at(-1).value)} r="5" fill={color} stroke="#10141c" strokeWidth="2"/>}</g>
  const selectAt=(clientX,bounds)=>{const at=windowStart+Math.max(0,Math.min(1,(clientX-bounds.left)/bounds.width))*(windowEnd-windowStart);let closest=0;for(let index=1;index<points.length;index++)if(Math.abs(points[index].at-at)<Math.abs(points[closest].at-at))closest=index;setHover(closest)}
  return <div className="trading-chart" aria-label="Panta price line chart">
    <div className="trading-chart-header"><div><span className="eyebrow">{outcome} · {settled?'PANTA RESOLVED OUTCOME':'PANTA SPOT'}</span><div className="trading-chart-price"><strong>{price(latest)}</strong><span className={`trading-chart-direction ${tone}`}>{points.length>1?`${change>=0?'+':''}${(change*100).toFixed(2)} pts`:settled?'Settled':'Collecting'}</span></div><small>{settled?'Final provider outcome · ':market?.priceStatus==='last_observed'?'Last valid quote · ':'Last checked · '}{market?.priceObservedAt?clock(market.priceObservedAt):market?.retrievedAt?clock(market.retrievedAt):'awaiting a Panta RPC quote'}</small><QuoteIndicator market={market} refreshing={series.refreshing||market?.cacheStatus==='stale'}/></div><div className="trading-chart-controls"><div className="trading-chart-outcomes" aria-label="Chart outcome">{['YES','NO'].map(value=><Button key={value} aria-pressed={outcome===value} className={outcome===value?'selected':''} onClick={()=>{onOutcomeChange?.(value);setHover(null)}}>{value} {price(value==='YES'?market?.yesPrice:market?.noPrice)}</Button>)}</div><div className="trading-chart-ranges" aria-label="Chart time range">{Object.keys(ranges).map(value=><Button key={value} className={range===value?'selected':''} aria-pressed={range===value} onClick={()=>{setRange(value);setHover(null)}}>{value.toUpperCase()}</Button>)}</div></div></div>
    <div className="trading-chart-legend"><span><i className="yes-line"/>YES {price(market?.yesPrice)}</span><span><i className="no-line"/>NO {price(market?.noPrice)}</span><span><i className="up"/>Selected outcome rising</span><span><i className="down"/>Selected outcome falling</span><span>Straight lines connect timestamped Panta quotes</span></div>
    <div className="trading-chart-canvas">{yesPoints.length||noPoints.length?<svg viewBox="0 0 900 350" preserveAspectRatio="none" role="img" aria-label={`YES and NO price lines from observed Panta quotes over ${range}`}>
      {[0,1,2,3,4].map(index=>{const level=1-index/4,axis=y(level);return <g key={index}><line x1="60" x2="820" y1={axis} y2={axis} stroke="#29303d" strokeDasharray="3 5"/><text x="835" y={axis+4} fill="#929bab" fontSize="12">{formatMarketPercentage(level,0)}</text></g>})}
      {line(yesPoints,'#a998ff','YES')}
      {line(noPoints,'#5ec9ff','NO')}
      {selected&&<g><line x1={x(selected)} x2={x(selected)} y1="48" y2="295" stroke="#667083" strokeDasharray="4 4"/><circle cx={x(selected)} cy={y(selected.value)} r="5" fill="#d2c8ff"/><text x="62" y="28" fill="#d4d8e1" fontSize="13">{axisLabel(selected.at)} · {formatMarketPercentage(selected.value,3)}</text></g>}
      {points.length>1&&<><text x="60" y="330" fill="#929bab" fontSize="12">{axisLabel(windowStart)}</text><text x="705" y="330" fill="#929bab" fontSize="12">{axisLabel(windowEnd)}</text></>}
      <rect x="60" y="48" width="760" height="247" fill="transparent" onMouseMove={event=>selectAt(event.clientX,event.currentTarget.getBoundingClientRect())} onMouseLeave={()=>setHover(null)} onTouchMove={event=>selectAt(event.touches[0].clientX,event.currentTarget.getBoundingClientRect())} onTouchEnd={()=>setHover(null)}/>
    </svg>:<div className="trading-chart-empty">{settled?'No saved pre-resolution spot observations in this time range.':'Waiting for a valid Panta spot price. The provider currently has no RPC quote for this market.'}</div>}</div>
    <div className="trading-chart-footer"><small>{points.length} actual Panta spot observation{points.length===1?'':'s'} · {settled?'historical series':'checked every 2 seconds while visible'}</small><small>{series.error?'Chart history delayed':points.length<2?settled?'No earlier quote in this range':'Straight guide marks one quote; the line forms after another':'Latest dots mark the newest observed quotes'}</small></div>
  </div>
}
