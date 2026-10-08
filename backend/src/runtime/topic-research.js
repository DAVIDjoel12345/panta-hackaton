const DAY=86400000;
const decode=value=>value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1').replace(/&#(x[0-9a-f]+|\d+);|&(#x[0-9a-f]+|#\d+|amp|lt|gt|quot|apos);/gi,(match,named,entity)=>{const code=named||entity;if(code==='amp')return '&';if(code==='lt')return '<';if(code==='gt')return '>';if(code==='quot')return '"';if(code==='apos')return "'";const number=code.startsWith('#x')||code.startsWith('x')?parseInt(code.replace(/^#?x/,''),16):parseInt(code.replace(/^#/,''),10);return Number.isFinite(number)&&number>0&&number<=0x10ffff?String.fromCodePoint(number):match});
const field=(item,name)=>decode(item.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`,'i'))?.[1]||'').replace(/<[^>]*>/g,'').trim();
const stop=new Set('will would could should this that these those before after about anywhere against first second third points point market price yes no the and for from with into onto over under when where what which who how many much does did has have been are was were october november december january february march april may june july august september today tomorrow yesterday by on in of to at a an is it its x gw bst sgt wat'.split(' '));
export function topicQuery(title){const words=String(title||'').normalize('NFKC').match(/[\p{L}][\p{L}\p{N}'-]*/gu)||[];return [...new Set(words.map(word=>word.replace(/['-]$/,'')).filter(word=>word.length>=3&&!stop.has(word.toLowerCase())))].slice(0,4).join(' ')}
export function parseNewsRss(xml,now=Date.now()){const items=[];for(const [,chunk] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)){const title=field(chunk,'title').slice(0,240),link=field(chunk,'link'),source=field(chunk,'source').slice(0,80),date=new Date(field(chunk,'pubDate'));let url;try{url=new URL(link);if(url.protocol!=='https:'||url.hostname!=='news.google.com'||!url.pathname.startsWith('/rss/articles/'))continue}catch{continue}if(!title||!Number.isFinite(date.getTime())||date.getTime()>now+DAY||date.getTime()<now-90*DAY)continue;items.push({title,url:url.href,source:source||'Google News',publishedAt:date.toISOString()})}return items}
export class TopicResearch {
  constructor(fetcher=fetch){this.fetcher=fetcher;this.cache=new Map()}
  async get(market){
    const query=topicQuery(market.title||market.question),id=market.marketId||'topic:'+query;
    const previous=this.cache.get(id);
    if(previous&&Date.now()-previous.at<previous.ttl)return previous.promise;
    const entry={at:Date.now(),ttl:600000,promise:null};
    entry.promise=this.load(market).catch(error=>({marketId:market.marketId,query,source:'Google News RSS',recent:[],earlier:[],retrievedAt:new Date().toISOString(),error:error?.message==='No distinct search terms.'?'No useful topic terms were found.':'Topic coverage is temporarily unavailable.'})).then(result=>{
      if(result.error)entry.ttl=30000;
      return result;
    });
    this.cache.set(id,entry);
    if(this.cache.size>300)this.cache.delete(this.cache.keys().next().value);
    return entry.promise;
  }
  async load(market){
    const query=topicQuery(market.title||market.question);
    if(!query)throw Error('No distinct search terms.');
    const now=Date.now(),past=age=>new Date(now-age*DAY).toISOString().slice(0,10);
    const searches=[query+' after:'+past(7),query+' after:'+past(90)+' before:'+past(7)];
    const results=await Promise.allSettled(searches.map(async search=>{
      const url=new URL('https://news.google.com/rss/search');
      url.searchParams.set('q',search);url.searchParams.set('hl','en');url.searchParams.set('gl','US');url.searchParams.set('ceid','US:en');
      const response=await this.fetcher(url,{signal:AbortSignal.timeout(10000),headers:{Accept:'application/rss+xml, application/xml'}});
      if(!response.ok)throw Error('News lookup failed.');
      const xml=await response.text();
      if(xml.length>1500000)throw Error('News response too large.');
      return parseNewsRss(xml,now);
    }));
    const seen=new Set(),unique=items=>items.filter(item=>{if(seen.has(item.url))return false;seen.add(item.url);return true}).slice(0,6);
    const rows=index=>results[index].status==='fulfilled'?results[index].value:[];
    const failed=results.flatMap((result,index)=>result.status==='rejected'?[index===0?'Recent':'Earlier']:[]);
    return {marketId:market.marketId,query,source:'Google News RSS',
      recent:unique(rows(0).filter(item=>Date.parse(item.publishedAt)>=now-7*DAY)),
      earlier:unique(rows(1).filter(item=>Date.parse(item.publishedAt)<now-7*DAY)),
      retrievedAt:new Date().toISOString(),coverage:'Recent: last 7 days; earlier: days 8?90. Headlines and dates only.',
      ...(failed.length?{error:failed.join(' and ')+' coverage temporarily unavailable.'}:{})};
  }
}
