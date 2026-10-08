export function chartPoints(rows,field,maxPoints=600){
  const valid=(rows||[]).flatMap(row=>{const raw=row?.[field],at=Date.parse(row?.at);if(raw===null||raw===undefined||raw==='')return [];const value=Number(raw);return Number.isFinite(at)&&Number.isFinite(value)&&value>=0&&value<=1?[{at,value}]:[]})
  valid.sort((a,b)=>a.at-b.at)
  const points=[...new Map(valid.map(point=>[point.at,point])).values()]
  if(points.length<=maxPoints)return points
  const bucketSize=Math.ceil(points.length/Math.max(1,Math.floor(maxPoints/4))),sampled=[]
  for(let i=0;i<points.length;i+=bucketSize){const group=points.slice(i,i+bucketSize),low=group.reduce((a,b)=>b.value<a.value?b:a),high=group.reduce((a,b)=>b.value>a.value?b:a);sampled.push(...new Map([group[0],low,high,group.at(-1)].sort((a,b)=>a.at-b.at).map(point=>[point.at,point])).values())}
  return sampled
}
export const movement=value=>value>0.000001?'up':value<-.000001?'down':'flat'
