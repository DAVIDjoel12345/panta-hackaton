import test from 'node:test';
import assert from 'node:assert/strict';
import {TopicResearch,parseNewsRss,topicQuery} from '../src/runtime/topic-research.js';

test('topic query drops market wording and keeps names',()=>{assert.equal(topicQuery('Will Bukayo Saka score 7+ points by October?'),'Bukayo Saka score')});

test('RSS parser accepts dated Google News links and rejects unsafe links',()=>{const date=new Date().toUTCString();const rss=`<rss><channel><item><title>Saka &amp; Arsenal</title><link>https://news.google.com/rss/articles/abc?oc=5</link><pubDate>${date}</pubDate><source>Example</source></item><item><title>Unsafe</title><link>javascript:alert(1)</link><pubDate>${date}</pubDate></item></channel></rss>`;const items=parseNewsRss(rss);assert.equal(items.length,1);assert.equal(items[0].title,'Saka & Arsenal');assert.equal(items[0].source,'Example')});

test('research separates recent and previous coverage and shares cached requests',async()=>{let calls=0;const now=Date.now();const rss=date=>`<rss><channel><item><title>Report</title><link>https://news.google.com/rss/articles/${date}</link><pubDate>${new Date(now-date*86400000).toUTCString()}</pubDate><source>Publisher</source></item></channel></rss>`;const research=new TopicResearch(async()=>({ok:true,text:async()=>rss(++calls===1?2:20)}));const market={marketId:'id',title:'Bukayo Saka points'};const [first,second]=await Promise.all([research.get(market),research.get(market)]);assert.equal(calls,2);assert.deepEqual(first,second);assert.equal(first.recent.length,1);assert.equal(first.earlier.length,1);assert.equal((await research.get(market)).recent.length,1);assert.equal(calls,2)});
test('research uses the full provider question when the catalog title is empty',async()=>{let searched='';const research=new TopicResearch(async url=>{searched=url.searchParams.get('q');return {ok:true,text:async()=>'<rss><channel></channel></rss>'}});await research.get({marketId:'blank-title',title:'',question:'Will Bukayo Saka score seven points?'});assert.match(searched,/Bukayo Saka/)})
test('a failed earlier lookup preserves recent news and retries after a short cooldown',async()=>{
 let calls=0,fail=true
 const research=new TopicResearch(async url=>{
  calls++
  if(fail&&url.searchParams.get('q').includes('before:'))throw Error('Temporary outage')
  return {ok:true,text:async()=>'<rss><item><title>Recent report</title><link>https://news.google.com/rss/articles/recent</link><pubDate>'+new Date().toUTCString()+'</pubDate></item></rss>'}
 })
 const market={marketId:'partial',title:'Space launch'}
 const first=await research.get(market)
 assert.equal(first.recent.length,1)
 assert.equal(first.earlier.length,0)
 assert.match(first.error,/Earlier coverage/)
 await research.get(market);assert.equal(calls,2)
 fail=false
 research.cache.get('partial').at-=31000
 const recovered=await research.get(market)
 assert.equal(calls,4)
 assert.equal(recovered.error,undefined)
})
test('general topic requests keep independent cache entries',async()=>{
 let calls=0
 const research=new TopicResearch(async()=>{calls++;return {ok:true,text:async()=>'<rss/>'}})
 await research.get({title:'Space launch'})
 await research.get({title:'Arsenal football'})
 await research.get({title:'Space launch'})
 assert.equal(calls,4)
})
