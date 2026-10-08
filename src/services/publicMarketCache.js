const entries=new Map()
const allowed=path=>typeof path==='string'&&/^\/markets\/[1-9A-HJ-NP-Za-km-z]{32,44}(?:\/series\?range=(?:1h|6h|24h))?$/.test(path)
export function readMarketCache(path,now=Date.now()){
  const entry=entries.get(path)
  if(!entry)return null
  if(now-entry.at>=60000){entries.delete(path);return null}
  return {...entry.data,cacheStatus:'stale'}
}
export function writeMarketCache(path,data,now=Date.now()){
  if(!allowed(path))return
  entries.delete(path)
  if(entries.size>=100)entries.delete(entries.keys().next().value)
  entries.set(path,{data,at:now})
}
