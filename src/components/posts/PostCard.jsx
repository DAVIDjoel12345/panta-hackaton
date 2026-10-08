import { useState } from 'react';
import { communityUsers } from '../../mocks/community.js';
import { markets } from '../../demo/fixtures.js';
import { useCommunity } from '../../features/community/useCommunity.js';
import { permissions, visibleCommentCount, safeCommunityLink } from '../../features/community/permissions.js';
import { Link, Button, Badge } from '../ui/primitives.jsx';
import { ShareSheet, ReportDialog, PostActionDialog } from './PostDialogs.jsx';
import LikeButton from './LikeButton.jsx';
import CommunityState from '../community/CommunityState.jsx';
export default function PostCard({
  post,
  room,
  detail = false
}) {
  const c = useCommunity(),
    p = permissions(c.state, room, c.actor, c.authenticated, post),
    author = (c.state.users || communityUsers).find(u => u.id === post.author) || {
      name: 'Community member',
      initials: 'CM'
    },
    role = c.state.memberships[room.slug]?.[post.author]?.role;
  const [share, setShare] = useState(false),
    [report, setReport] = useState(false),
    [action, setAction] = useState(''),
    [error, setError] = useState('');
  const saved = c.state.saved[c.actor]?.includes(post.id),
    market = (c.live ? [] : markets).find(m => m.id === post.marketId),
    href = `/rooms/${room.slug}/posts/${post.id}`;
  if (!p.canViewPost) return <CommunityState name={p.read ? 'Post removed' : 'Private community'} />;
  const hidden = ['removed', 'deleted'].includes(post.status);
  return <article className="community-post" data-post-id={post.id}><header><span className={`avatar ${author.color || 'purple'}`}>{author.initials}</span><div><strong>{author.name}</strong>{role !== 'member' && role && <Badge tone="purple">{role}</Badge>}<p><time dateTime={post.createdAt}>{new Date(post.createdAt).toLocaleString('en-US', {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              timeZone: 'UTC'
            })} UTC</time>{post.edited && ' · Edited'}</p></div><details className="post-menu"><summary aria-label="Post actions">•••</summary><div>{p.canEdit && <Link href={href + '/edit'}>Edit your post</Link>}{p.canDelete && <Button onClick={() => setAction('delete')}>Delete your post</Button>}{p.manage && post.status !== 'deleted' && <>{['pin', 'announce', 'lock', ...(post.status === 'pending' ? ['approve', 'reject'] : []), post.status === 'removed' ? 'restore' : 'remove'].map(verb => <Button key={verb} onClick={() => setAction(verb)}>{verb === 'pin' ? post.pinned ? 'Unpin' : 'Pin' : verb === 'lock' ? post.locked ? 'Unlock comments' : 'Lock comments' : verb === 'announce' ? 'Mark announcement' : verb[0].toUpperCase() + verb.slice(1)}</Button>)}</>}{p.canReport && <Button onClick={() => setReport(true)}>Report post</Button>}{!p.signed && <Button onClick={c.ensureSigned}>Sign in for post actions</Button>}</div></details></header>{hidden ? <CommunityState name={post.status === 'removed' ? 'Post removed' : 'Post deleted'} /> : <><div className="post-labels"><Badge>{post.type}</Badge>{post.pinned && <Badge tone="purple">Pinned</Badge>}{post.status !== 'published' && <Badge>{post.status}</Badge>}{post.locked && <Badge>Comments locked</Badge>}</div>{post.title && (detail ? <h2>{post.title}</h2> : <h2><Link href={href} onClick={() => c.rememberFeed(room.slug, window.scrollY)}>{post.title}</Link></h2>)}<p className="post-body">{post.text}</p>{safeCommunityLink(post.link) && <a className="post-external" href={safeCommunityLink(post.link)} target="_blank" rel="noreferrer">{post.link}</a>}{post.attachments?.length > 0 && <div className="post-images">{post.attachments.map((a, i) => <img key={i} src={a.url} alt={a.alt || 'User-provided community attachment'} loading="lazy" />)}</div>}{c.live&&post.marketId&&<Link className="post-market" href={'/markets/'+post.marketId}><span>REFERENCED MARKET ? Powered by Panta</span><strong style={{overflowWrap:'anywhere'}}>{post.marketId}</strong><span>Open market and criteria</span></Link>}{market && <Link className="post-market" href={'/markets/' + market.id}><span>REFERENCED MARKET · ILLUSTRATIVE</span><strong>{market.question}</strong><div><span>YES {market.yes}¢</span><span>Read the criteria →</span></div></Link>}{post.status === 'published' && <footer><LikeButton post={post} room={room} /><Link className="button secondary" href={href} onClick={() => c.rememberFeed(room.slug, window.scrollY)}>Comments · {visibleCommentCount(c.state, post.id)}</Link><Button disabled={c.authenticated && !p.canInteract} onClick={() => {
          if (c.ensureSigned()) setShare(true);
        }}>Share</Button><Button aria-pressed={!!saved} disabled={c.authenticated && !p.canInteract} onClick={async () => {
          if (!c.ensureSigned()) return;
          const r = await c.run({
            type: 'savePost',
            room: room.slug,
            post: post.id
          });
          setError(r.error || '');
        }}>{saved ? 'Saved' : 'Save'}</Button></footer>}</>}{error && <p role="alert" className="field-error">{error}</p>}<ShareSheet room={room} post={post} open={share} onClose={() => setShare(false)} /><ReportDialog room={room} post={post} open={report} onClose={() => setReport(false)} /><PostActionDialog room={room} post={post} action={action} onClose={() => setAction('')} /></article>;
}
