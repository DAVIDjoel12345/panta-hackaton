export function marketDisplayTitle(market){
  const title=[market?.title,market?.question].find(value=>typeof value==='string'&&value.trim())
  return title?.trim()||`Panta market ${market?.marketId?.slice(0,8)||'unknown'}…`
}
