import {useCommunity} from './useCommunity.js'
import {visiblePosts,permissions} from './permissions.js'
import {Link,Empty} from '../../components/ui/primitives.jsx'
import PostCard from '../../components/posts/PostCard.jsx'
export default function Discussion({marketId,room='crypto',threadId}){
  const c=useCommunity(),community=c.state.communities.find(r=>r.slug===room)
  if(!community)return <Empty title="Community unavailable" description="Return to the community directory."/>
  const posts=visiblePosts(c.state,community,c.actor,c.authenticated).filter(p=>threadId?p.id===threadId:!marketId||p.marketId===marketId)
  const p=permissions(c.state,community,c.actor,c.authenticated)
  return <section className="discussion"><h2>Community conversation</h2><p className="muted">Posts, replies and moderation use the same community conversation. Local changes reset on reload.</p><Link href={'/rooms/'+room}>Visit community</Link>{p.canPost&&<Link className="button secondary" href={'/rooms/'+room+'/posts/new'+(marketId?'?market='+encodeURIComponent(marketId):'')}>Write a post</Link>}{posts.map(post=><PostCard key={post.id} room={community} post={post}/>)}{!posts.length&&<Empty title="No community posts yet" description="Open the community to join or start a conversation."/>}</section>
}
