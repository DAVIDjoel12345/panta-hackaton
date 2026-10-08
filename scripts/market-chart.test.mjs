import {test} from 'node:test'
import assert from 'node:assert/strict'
import {chartPoints,movement} from '../src/features/markets/chartData.js'

test('chart excludes missing and invalid prices rather than drawing false zeroes',()=>{
  const start=Date.now(),rows=[{at:new Date(start).toISOString(),yesPrice:'0.48'},{at:new Date(start+1000).toISOString(),yesPrice:null},{at:new Date(start+2000).toISOString(),yesPrice:''},{at:new Date(start+3000).toISOString(),yesPrice:'0.50'},{at:'invalid',yesPrice:'0.40'}]
  assert.deepEqual(chartPoints(rows,'yesPrice').map(point=>point.value),[.48,.5])
})

test('chart keeps real timestamp spacing and preserves spikes when reducing points',()=>{
  const start=Date.now(),rows=Array.from({length:2000},(_,index)=>({at:new Date(start+index*2000).toISOString(),yesPrice:index===1000?'0.91':'0.50'}))
  const points=chartPoints(rows,'yesPrice',120)
  assert.ok(points.length<=120)
  assert.equal(points[0].at,start)
  assert.equal(points.at(-1).at,start+1999*2000)
  assert.ok(points.some(point=>point.value===.91))
  assert.equal(movement(.01),'up')
  assert.equal(movement(-.01),'down')
})
