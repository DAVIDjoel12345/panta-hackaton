export const API_UPDATED='panta:api-updated'
export function mutationUpdates(path,data){
  if(/^\/panta\/intents\/[^/]+\/(broadcast|reconcile)$/.test(path)&&
    (path.endsWith('/broadcast')||data?.chainStatus==='confirmed')){
    return ['/positions','/wallets/','/panta/intents','/panta/creator/','/markets']
  }
  if(path==='/market-drafts')return ['/market-drafts']
  return []
}
export function affectsQuery(path,prefixes){
  return !!path&&prefixes.some(prefix=>path===prefix||path.startsWith(prefix.endsWith('/')?prefix:prefix+'?')||path.startsWith(prefix+'/'))
}
