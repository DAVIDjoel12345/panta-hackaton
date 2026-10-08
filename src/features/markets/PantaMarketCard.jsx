import {useEffect,useRef,useState} from 'react'
import useLiveQuery from '../../hooks/useLiveQuery.js'
import {Link,Badge} from '../../components/ui/primitives.jsx'
import Icon from '../../components/ui/Icon.jsx'
import MarketSparkline from './MarketSparkline.jsx'
import {formatMarketPercentage} from './formatMarketPercentage.js'
import {marketDisplayTitle} from './marketDisplay.js'
const date=value=>value?new Date(value*1000).toLocaleDateString():'Unavailable'
export default function PantaMarketCard({item}){
 const initialSettled=item.resolved||['resolved','cancelled'].includes(item.phase)
 const element=useRef(null),[visible,setVisible]=useState(false)
 useEffect(()=>{const node=element.current;if(!node)return;const observer=new IntersectionObserver(entries=>setVisible(entries[0]?.isIntersecting||false),{rootMargin:'150px'});observer.observe(node);return()=>observer.disconnect()},[])
 const detail=useLiveQuery(visible?'/markets/'+encodeURIComponent(item.marketId):null,initialSettled?60000:5000)
 const current=detail.data||item
 const settled=current.resolved||['resolved','cancelled'].includes(current.phase)
 const hasPrice=formatMarketPercentage(current.yesPrice)!=='Unavailable'&&formatMarketPercentage(current.noPrice)!=='Unavailable'
 const stale=current.priceStatus==='last_observed'||current.cacheStatus==='stale'
 const checked=current.priceObservedAt||current.retrievedAt
 const display=settled?'Resolved':hasPrice?formatMarketPercentage(current.yesPrice):'Quote pending'
 const label=settled?'Market settled':stale?'Last observed Panta quote '+new Date(checked).toLocaleTimeString():current.priceStatus==='catalog'?'Panta catalog quote checked '+new Date(checked).toLocaleTimeString():hasPrice?`Panta ${current.priceSource||'spot'} quote checked `+new Date(checked).toLocaleTimeString():detail.pending?'Checking Panta spot price':'Panta has no spot quote'
 const imageUrl=Array.isArray(current.images)?current.images.find(url=>typeof url==='string'&&url.startsWith('https://')):null
 return <article className="market-card" ref={element}><Link className="market-card-main-link" href={'/markets/'+item.marketId} aria-label={'Open market '+(marketDisplayTitle(current))}/><div className="card-top">{imageUrl?<img className="market-card-image" src={imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer"/>:<span className="symbol purple"><Icon name="chart"/></span>}<div className="card-meta"><span>{current.category}</span><Badge>{current.phase}</Badge></div></div><span className="market-question">{marketDisplayTitle(current)}</span><div className="card-probability"><div><strong className={!hasPrice?'market-card-no-quote':''}>{display}</strong><small>{settled?'Review the resolved outcome':hasPrice?'YES market-implied percentage':'Market remains available for detail and activity'}</small></div></div>{!settled&&<MarketSparkline market={current} visible={visible}/>}<div className="outcome-prices"><span className="yes-price">YES <strong>{formatMarketPercentage(current.yesPrice,2,'—')}</strong></span><span className="no-price">NO <strong>{formatMarketPercentage(current.noPrice,2,'—')}</strong></span></div><small className="quote-status">{detail.error?'Price refresh delayed · '+detail.error:label}</small><div className="card-footer"><span>{current.volumeUsdc!=null?current.volumeUsdc+' USDC volume':'Volume not reported'}</span><span>{date(current.endTime)}</span></div><div className="market-card-actions"><Link className="button secondary" href={'/ai?market='+encodeURIComponent(item.marketId)+'&analyze=1'}><Icon name="sparkles" size={15}/>Get analysis with AI</Link></div></article>
}
