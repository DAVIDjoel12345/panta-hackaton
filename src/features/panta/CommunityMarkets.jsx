import {useCommunity} from '../community/useCommunity.js'
import {Link,Empty} from '../../components/ui/primitives.jsx'
import {permissions} from '../community/permissions.js'
export default function CommunityMarkets({room}){const c=useCommunity();const ids=[...new Set(c.state.posts.filter(p=>p.room===room.slug&&p.marketId&&p.status==='published'&&permissions(c.state,room,c.actor,c.authenticated,p).canViewPost).map(p=>p.marketId))];return ids.length?<div className="stack">{ids.map(id=><Link key={id} className="community-market-link" href={'/markets/'+id}>Panta market <small style={{overflowWrap:'anywhere'}}>{id}</small></Link>)}</div>:<Empty title="No referenced markets yet" description="Attach a real Panta market to a community post."/>}
