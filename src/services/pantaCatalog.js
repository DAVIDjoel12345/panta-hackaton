// Public catalog only; never persist credentials or account responses.
const catalogCache=new Map()
export function cachedPantaCatalog(key,now=Date.now()){
  let entry=catalogCache.get(key)
  // Only the complete public catalog survives reloads within this browser tab.
  if(!entry&&key==='all|all'){
    try{const saved=JSON.parse(sessionStorage.getItem('panta-public-catalog-v1'));if(saved?.data?.complete===true&&Array.isArray(saved.data.items)&&Number.isFinite(saved.at)&&saved.at<=now)entry=saved}catch{/* Storage may be disabled. */}
  }
  if(!entry)return null
  if(now-entry.at>=60000){catalogCache.delete(key);return null}
  return {...entry.data,cacheStatus:'stale'}
}
export function rememberPantaCatalog(key,data,now=Date.now()){
  if(data.complete===false)return
  catalogCache.delete(key)
  if(catalogCache.size>=12)catalogCache.delete(catalogCache.keys().next().value)
  catalogCache.set(key,{data,at:now})
  if(key==='all|all')try{sessionStorage.setItem('panta-public-catalog-v1',JSON.stringify({data,at:now}))}catch{/* In-memory loading still works. */}
}
export async function readPantaCatalog(request,{category,status,signal,onPage}){
  const rows=new Map(),seen=new Set()
  let cursor='',pages=0,oldest=Infinity,firstPageAt=null,stale=false
  do{
    const params=new URLSearchParams({limit:'50',...(cursor?{cursor}:{}),...(category!=='all'?{category}:{}),...(status!=='all'&&!['resolved','cancelled'].includes(status)?{status}:{})})
    const response=await request('/markets?'+params,{signal})
    if(!Array.isArray(response.items))throw Error('Panta returned an incomplete catalog page.')
    for(const item of response.items)rows.set(item.marketId,item)
    const observed=Date.parse(response.retrievedAt)
    if(pages===0)firstPageAt=response.retrievedAt||null
    if(Number.isFinite(observed))oldest=Math.min(oldest,observed)
    else stale=true
    stale ||= response.cacheStatus==='stale'
    cursor=response.nextCursor||'';pages++
    if(cursor){
      if(seen.has(cursor)||pages>=100)throw Error('Panta catalog pagination did not complete. Showing the last complete catalog.')
      seen.add(cursor)
    }
    if(cursor)onPage?.({items:[...rows.values()],retrievedAt:Number.isFinite(oldest)?new Date(oldest).toISOString():null,source:'Panta',pages,cacheStatus:stale?'stale':'fresh',complete:false})
  }while(cursor)
  return {items:[...rows.values()],retrievedAt:Number.isFinite(oldest)?new Date(oldest).toISOString():null,firstPageAt,fullCatalogAt:new Date().toISOString(),source:'Panta',pages,cacheStatus:stale?'stale':'fresh',complete:true}
}

export async function refreshPantaCatalogPage(request,{category,status,signal,previous}){
  const params=new URLSearchParams({limit:'50',...(category!=='all'?{category}:{}),...(status!=='all'&&!['resolved','cancelled'].includes(status)?{status}:{})})
  const response=await request('/markets?'+params,{signal})
  if(!Array.isArray(response.items))throw Error('Panta returned an incomplete catalog page.')
  const rows=new Map([...response.items,...previous.items].map(item=>[item.marketId,item]))
  // The newest page wins if an existing market changed.
  for(const item of response.items)rows.set(item.marketId,item)
  return {...previous,items:[...rows.values()],firstPageAt:response.retrievedAt||null,cacheStatus:response.cacheStatus==='stale'?'stale':'fresh',complete:true}
}
