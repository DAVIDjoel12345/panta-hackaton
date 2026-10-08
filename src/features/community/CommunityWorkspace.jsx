import CommunityMarkets from '../panta/CommunityMarkets.jsx';
import { useEffect, useState } from 'react';
import { useCommunity } from './useCommunity.js';
import { permissions, visiblePosts, membership } from './permissions.js';
import { communityUsers } from '../../mocks/community.js';
import { markets } from '../../demo/fixtures.js';
import { Link, Button, Field, PageHeading, Badge, Panel } from '../../components/ui/primitives.jsx';
import CommunityHeader from '../../components/community/CommunityHeader.jsx';
import CommunityControls from '../../components/community/CommunityControls.jsx';
import CommunityState, { CommunityScenarios } from '../../components/community/CommunityState.jsx';
import MembershipButton from '../../components/community/MembershipButton.jsx';
import CommunityForm from '../../components/community/CommunityForm.jsx';
import PostCard from '../../components/posts/PostCard.jsx';
import PostComposer from '../../components/posts/PostComposer.jsx';
import CommunityComments from '../../components/comments/CommunityComments.jsx';
import CommunityManagement from './CommunityManagement.jsx';
import MarketCard from '../../components/market/MarketCard.jsx';
function CommunityDirectory({
  joined
}) {
  const c = useCommunity();
  const [query, setQuery] = useState(''),
    [category, setCategory] = useState('All categories'),
    [sort, setSort] = useState('Name'),
    [limit, setLimit] = useState(6);
  const count = room => Object.values(c.state.memberships[room.slug] || {}).filter(m => ['active', 'muted', 'restricted'].includes(m.status)).length;
  const items = c.state.communities.filter(r => (!joined || ['active', 'muted', 'restricted', 'pending'].includes(membership(c.state, r.slug, c.actor).status)) && (r.name + ' ' + r.description).toLowerCase().includes(query.toLowerCase()) && (category === 'All categories' || r.category === category)).sort((a, b) => sort === 'Members' ? count(b) - count(a) : a.name.localeCompare(b.name));
  return <><PageHeading title={joined ? 'Your communities' : 'Find your people. Share your perspective.'} eyebrow="SIGNAL ROOMS" description="Follow questions together. Share sources, challenge assumptions, and build a clearer view." actions={<Link className="button primary" href="/rooms/create">Create a community</Link>} /><nav className="tabs" aria-label="Community directory"><Link href="/rooms" className={!joined ? 'active' : ''}>Discover</Link><Link href="/rooms/joined" className={joined ? 'active' : ''}>My communities</Link><Link href="/saved/posts">Saved posts</Link></nav><div className="community-filters"><Field label="Search communities"><input value={query} onChange={e => {
          setQuery(e.target.value);
          setLimit(6);
        }} placeholder="Find a topic or community…" /></Field><Field label="Category"><select value={category} onChange={e => setCategory(e.target.value)}>{['All categories', ...new Set(c.state.communities.map(r => r.category))].map(x => <option key={x}>{x}</option>)}</select></Field><Field label="Sort communities"><select value={sort} onChange={e => setSort(e.target.value)}><option>Name</option><option>Members</option></select></Field></div><div className="community-directory">{items.slice(0, limit).map(room => <article className="community-directory-card" key={room.slug}><div className={`community-card-cover cover-${room.cover}`}><span>{room.avatar}</span><Badge>{room.visibility}</Badge></div><div><Badge>{room.category}</Badge><h2><Link className="community-card-link" href={'/rooms/' + room.slug}>{room.name}</Link></h2><p>{room.description}</p><small>{count(room)} members · {c.authenticated ? membership(c.state, room.slug, c.actor).status : 'Visitor'}</small><div className="room-footer"><Link href={'/rooms/' + room.slug}>Explore room →</Link><MembershipButton room={room} /></div></div></article>)}</div>{!items.length && <CommunityState name={query ? 'No search results' : 'Empty community directory'} onRetry={() => {
      setQuery('');
      setCategory('All categories');
    }} />}{items.length > limit && <Button onClick={() => setLimit(limit + 6)}>Load more communities</Button>}</>;
}
function Feed({
  room,
  mine = false
}) {
  const c = useCommunity(),
    key = 'feed:' + room.slug,
    defaults = c.ui[key] || {
      query: '',
      sort: 'Latest',
      type: 'All post types',
      limit: 5
    },
    [filter, setFilter] = useState(defaults);
  const update = value => {
    const next = {
      ...filter,
      ...value
    };
    setFilter(next);
    c.setUI(current => ({
      ...current,
      [key]: next
    }));
  };
  const [restorePosition] = useState(() => c.feedPosition(room.slug));
  useEffect(() => {
    const frame = requestAnimationFrame(() => window.scrollTo(0, restorePosition));
    return () => cancelAnimationFrame(frame);
  }, [restorePosition]);
  let items = visiblePosts(c.state, room, c.actor, c.authenticated).filter(p => (!mine || p.author === c.actor) && (p.title + ' ' + p.text).toLowerCase().includes(filter.query.toLowerCase()) && (filter.type === 'All post types' || p.type === filter.type) && (filter.sort !== 'Announcements' || p.type === 'Announcement'));
  items = items.sort((a, b) => filter.sort === 'Popular' ? b.likes.length - a.likes.length : b.createdAt.localeCompare(a.createdAt));
  const pinned = items.filter(p => p.pinned && p.status === 'published'),
    regular = items.filter(p => !pinned.includes(p));
  const draft = c.state.drafts[c.actor + ':' + room.slug];
  return <><div className="community-filters feed-filters"><Field label="Search posts"><input value={filter.query} onChange={e => update({
          query: e.target.value,
          limit: 5
        })} /></Field><Field label="Feed order"><select value={filter.sort} onChange={e => update({
          sort: e.target.value
        })}>{['Latest', 'Popular', 'Announcements'].map(x => <option key={x}>{x}</option>)}</select></Field><Field label="Post type"><select value={filter.type} onChange={e => update({
          type: e.target.value
        })}>{['All post types', 'Discussion', 'Question', 'Analysis', 'Announcement'].map(x => <option key={x}>{x}</option>)}</select></Field></div>{mine && draft && <Panel className="padded" title="Your saved draft"><p>{draft.title || 'Untitled draft'}</p><Link className="button primary" href={`/rooms/${room.slug}/posts/new`}>Resume draft</Link></Panel>}{pinned.length > 0 && <section className="pinned-posts"><h2 className="community-section-label">Pinned by the community</h2>{pinned.map(post => <PostCard key={post.id} room={room} post={post} />)}</section>}{regular.slice(0, filter.limit).map(post => <PostCard key={post.id} room={room} post={post} />)}{!items.length && <CommunityState name={filter.query ? 'No search results' : 'No posts'} onRetry={() => update({
      query: '',
      type: 'All post types',
      sort: 'Latest'
    })} />} {regular.length > filter.limit && <Button onClick={() => update({
      limit: filter.limit + 5
    })}>Load more posts</Button>}</>;
}
function CommunityMembers({
  room
}) {
  const c = useCommunity(),
    [query, setQuery] = useState(''),
    [limit, setLimit] = useState(8);
  const members = Object.entries(c.state.memberships[room.slug] || {}).filter(([, m]) => ['active', 'muted', 'restricted'].includes(m.status)).map(([id, m]) => ({
    ...(c.state.users || communityUsers).find(u => u.id === id),
    ...m,
    id
  })).filter(m => (m.name || m.id).toLowerCase().includes(query.toLowerCase()));
  return <Panel className="padded" title="Community members"><Field label="Search members"><input value={query} onChange={e => setQuery(e.target.value)} /></Field>{members.slice(0, limit).map(member => <div className="community-public-member" key={member.id}><span className={`avatar ${member.color || 'purple'}`}>{member.initials}</span><strong>{member.name}</strong><Badge>{member.role}</Badge></div>)}{!members.length && <CommunityState name="No members" />}{members.length > limit && <Button onClick={() => setLimit(limit + 8)}>Load more members</Button>}</Panel>;
}
export function SavedCommunityPosts() {
  const c = useCommunity(),
    saved = c.state.saved[c.actor] || [];
  return <><h2>Saved community posts</h2>{!saved.length && <CommunityState name="No posts" />}{saved.map(id => {
      const post = c.state.posts.find(p => p.id === id),
        room = c.state.communities.find(r => r.slug === post?.room);
      if (!room || !post || !permissions(c.state, room, c.actor, c.authenticated, post).canViewPost || post.status !== 'published') return <Panel className="padded" key={id}><h3>Saved content unavailable</h3><p>The content may have been removed, or your membership no longer grants access. Saving does not preserve private access.</p><Button onClick={() => c.run({type:'removeSaved',post:id})}>Remove unavailable bookmark</Button></Panel>;
      return <PostCard room={room} post={post} key={id} />;
    })}</>;
}
export default function CommunityWorkspace({
  route,
  params
}) {
  const c = useCommunity(),
    room = c.state.communities.find(r => r.slug === params.roomSlug);
  const [appeal, setAppeal] = useState('');
  if (params.roomSlug && !room) return <CommunityState name="Community not found" />;
  const p = room ? permissions(c.state, room, c.actor, c.authenticated) : null;
  const base = room ? '/rooms/' + room.slug : '';
  const postId = params.postId || params.threadId,
    post = c.state.posts.find(x => x.id === postId && x.room === room?.slug);
  const manage = !!room && location.pathname.startsWith(base + '/manage'),
    composer = !!room && (location.pathname === base + '/posts/new' || location.pathname.endsWith('/edit'));
  const blocked = room && !p.read;
  return <div className="community-workspace"><div className="demo-note" role="status">{c.connected ? "Connected - changes sync across browsers" : "Reconnecting - checking for updates"}</div>{!c.live && <CommunityControls />}{route.path === '/rooms/create' ? <CommunityForm /> : !room ? <CommunityDirectory joined={route.path === '/rooms/joined'} /> : composer ? postId && !post ? <CommunityState name="Post deleted" /> : <PostComposer key={postId || room.slug} room={room} post={post} /> : manage ? <CommunityManagement room={room} params={params} /> : <><CommunityHeader room={room} />{location.pathname.endsWith('/membership') ? <Panel className="padded" title="Your community membership"><Badge>{p.signed ? p.member.status : 'Visitor'}</Badge><p>{p.member.reason || 'Review the membership policy and current participation permissions.'}</p><p>{p.member.until && `Restriction ends ${p.member.until}.`}</p><MembershipButton room={room} />{['muted', 'restricted', 'banned', 'rejected', 'revoked'].includes(p.member.status) && <><p>Ask community staff to review this restriction.</p><Button disabled={c.busy} onClick={async () => {const result=await c.run({type:'appeal',room:room.slug});setAppeal(result.error||'Review requested. Community staff have been notified.')}}>Request review</Button>{appeal && <p role="status">{appeal}</p>}</>}</Panel> : blocked ? <CommunityState name="Private community"><MembershipButton room={room} /></CommunityState> : <>{room.archived && <CommunityState name="Community archived" />}{postId ? !post ? <CommunityState name="Post deleted" /> : !permissions(c.state, room, c.actor, c.authenticated, post).canViewPost ? <CommunityState name="Post removed" /> : <><Link className="button secondary" href={base}>← Back to feed</Link><PostCard room={room} post={post} detail /><CommunityComments room={room} post={post} /></> : location.pathname.endsWith('/members') ? <CommunityMembers room={room} /> : location.pathname.endsWith('/about') ? <Panel className="padded" title="About & community rules"><p>{room.description}</p><h3>Rules</h3><p className="post-body">{room.rules}</p><p>Membership: {room.membershipPolicy}. Publishing: {room.postingPolicy}. Comments: {room.commentsEnabled ? 'enabled' : 'disabled'}.</p></Panel> : location.pathname.endsWith('/markets') ? c.live?<CommunityMarkets room={room}/>:<div className="market-grid">{(c.live ? [] : markets).filter(m => m.room === room.slug).map(m => <MarketCard key={m.id} market={m} />)}</div> : <div className="community-feed-layout"><div><Feed room={room} mine={location.pathname.endsWith('/my-posts')} /></div><aside className="community-info"><Panel className="padded" title="About this room"><p>{room.description}</p><Link href={base + '/about'}>Read community rules →</Link></Panel><Panel className="padded" title="Keep the conversation useful"><p className="post-body">{room.rules}</p><Link href={base + '/members'}>Meet the members →</Link></Panel><Panel className="padded" title="Questions in this community">{c.live&&<CommunityMarkets room={room}/>}{(c.live ? [] : markets).filter(m => m.room === room.slug).slice(0, 3).map(m => <Link className="community-market-link" key={m.id} href={'/markets/' + m.id}>{m.question}<small>Illustrative · {m.yes}¢ YES</small></Link>)}</Panel></aside></div>}</>}</>}{!c.live && <CommunityScenarios />}</div>;
}
