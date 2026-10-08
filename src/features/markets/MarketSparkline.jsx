import useLiveQuery from '../../hooks/useLiveQuery.js'
import {chartPoints,movement} from './chartData.js'

export default function MarketSparkline({market,visible}){
  const series=useLiveQuery(visible&&market?.marketId?`/markets/${encodeURIComponent(market.marketId)}/series?range=1h`:null,5000)
  const rows=[...(series.data?.items||[])]
  if(market?.priceStatus==='live'&&market.priceObservedAt)rows.push({at:market.priceObservedAt,yesPrice:market.yesPrice,noPrice:market.noPrice})
  const points=chartPoints(rows,'yesPrice',120)
  const noPoints=chartPoints(rows,'noPrice',120)
  const end=Math.max(Date.parse(market?.retrievedAt)||0,Date.parse(series.data?.retrievedAt)||0,points.at(-1)?.at||0,noPoints.at(-1)?.at||0),start=end-3600000
  const x=at=>10+Math.max(0,Math.min(1,(at-start)/(end-start)))*260
  const y=value=>60-value*48
  const change=points.length>1?points.at(-1).value-points[0].value:0,tone=movement(change)
  const draw=(linePoints,color,key)=>linePoints.length===1?<g key={key}><line x1="10" x2="270" y1={y(linePoints[0].value)} y2={y(linePoints[0].value)} stroke={color}/><circle cx={x(linePoints[0].at)} cy={y(linePoints[0].value)} r="3.5" fill={color}/></g>:<polyline key={key} points={linePoints.map(point=>x(point.at)+","+y(point.value)).join(" ")} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"/>
  return <div className="market-card-chart"><div className="market-card-chart-heading"><span>YES / NO · observed 1H</span><span className={tone}>{points.length>1?`${change>=0?'+':''}${(change*100).toFixed(2)} pts`:'Collecting'}</span></div>{points.length||noPoints.length?<svg viewBox="0 0 280 72" preserveAspectRatio="none" role="img" aria-label={`YES and NO line chart from observed Panta quotes`}><line x1="10" x2="270" y1="36" y2="36" stroke="#2a3040" strokeDasharray="3 4"/>{draw(points,'#a998ff','YES')}{draw(noPoints,'#5ec9ff','NO')}</svg>:<div className="market-card-chart-empty">No spot history observed yet</div>}<small>{series.error?'Chart history delayed':points.length>1?'Purple YES · blue NO · live Panta observations':'One Panta quote · line appears after another'}</small></div>
}
