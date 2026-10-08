import { useState } from 'react';
import { useCommunity } from './useCommunity.js';
import { permissions } from './permissions.js';
import { communityUsers } from '../../mocks/community.js';
import { PageHeading, Panel, Link, Button, Field, Badge, Modal } from '../../components/ui/primitives.jsx';
import CommunityState from '../../components/community/CommunityState.jsx';
import CommunityForm from '../../components/community/CommunityForm.jsx';
import MemberActionDialog from '../../components/moderation/MemberActionDialog.jsx';
import PostCard from '../../components/posts/PostCard.jsx';
const sections = [['Overview', ''], ['Settings', '/settings'], ['Rules', '/rules'], ['Members', '/members'], ['Requests', '/requests'], ['Moderators', '/moderators'], ['Pending posts', '/pending-posts'], ['Reports', '/reports'], ['Restrictions', '/restrictions'], ['Bans', '/bans'], ['Activity', '/activity']];
export default function CommunityManagement({
  room,
  params
}) {
  const c = useCommunity(),
    p = permissions(c.state, room, c.actor, c.authenticated),
    base = '/rooms/' + room.slug + '/manage',
    section = location.pathname.slice(base.length).split('/')[1] || 'overview';
  const [query, setQuery] = useState(''),
    [status, setStatus] = useState('all'),
    [limit, setLimit] = useState(8),
    [action, setAction] = useState(null),
    [archive, setArchive] = useState(false),
    [removeReport, setRemoveReport] = useState(false),
    [notes, setNotes] = useState(''),
    [error, setError] = useState('');
  if (!p.manage) return <CommunityState name="Access denied" />;
  const allMembers = Object.entries(c.state.memberships[room.slug] || {}).map(([id, m]) => ({
    ...m,
    id,
    ...(c.state.users || communityUsers).find(u => u.id === id)
  }));
  const members = allMembers.filter(m => (m.name || m.id).toLowerCase().includes(query.toLowerCase()) && (status === 'all' || m.status === status) && (section === 'requests' ? m.status === 'pending' : section === 'restrictions' ? ['restricted', 'muted'].includes(m.status) : section === 'bans' ? m.status === 'banned' : section === 'moderators' ? ['active', 'muted', 'restricted'].includes(m.status) : true));
  const reports = c.state.reports.filter(r => r.room === room.slug && (status === 'all' || r.status === status) && (r.reason + ' ' + r.explanation).toLowerCase().includes(query.toLowerCase()));
  const history = c.state.history.filter(h => h.room === room.slug && (h.action + ' ' + h.reason + ' ' + h.target).toLowerCase().includes(query.toLowerCase()));
  const postQueue = c.state.posts.filter(post => post.room === room.slug && (status === 'all' ? ['pending', 'rejected', 'removed'].includes(post.status) : post.status === status) && (post.text + ' ' + post.title).toLowerCase().includes(query.toLowerCase()));
  const report = params.reportId ? c.state.reports.find(r => r.id === params.reportId && r.room === room.slug) : null;
  const memberActions = member => <>{section === 'moderators' ? p.owner && member.id !== c.actor && member.status === 'active' && <><Button onClick={() => setAction({
        user: member.id,
        verb: 'moderator',
        role: member.role === 'moderator' ? 'member' : 'moderator'
      })}>{member.role === 'moderator' ? 'Remove moderator' : 'Assign moderator'}</Button><Button onClick={() => setAction({
        user: member.id,
        verb: 'transfer'
      })}>Transfer ownership</Button></> : p.canRestrict(member.id) && (member.status === 'pending' ? ['approve', 'reject'] : member.status === 'banned' ? ['unban'] : ['active', 'muted', 'restricted'].includes(member.status) ? ['restrict', 'mute', 'ban', 'revoke', ...(['muted', 'restricted'].includes(member.status) ? ['lift'] : [])] : []).map(verb => <Button key={verb} onClick={() => setAction({
      user: member.id,
      verb
    })}>{verb[0].toUpperCase() + verb.slice(1)}</Button>)}</>;
  return <><PageHeading title="Community management" description={`${room.name} · ${p.owner ? 'Owner' : 'Moderator'} workspace. Permissions are checked by the server.`} /><nav className="community-manage-nav" aria-label="Community management">{sections.map(([label, s]) => <Link key={s} href={base + s} className={section === (s.slice(1) || 'overview') ? 'active' : ''}>{label}</Link>)}</nav>{['settings', 'rules'].includes(section) ? <CommunityForm room={room} /> : section === 'overview' ? <><div className="metrics-grid three"><Panel className="padded"><h2>{allMembers.filter(m => m.status === 'active').length}</h2><p>Active members</p><Link href={base + '/members'}>Manage members →</Link></Panel><Panel className="padded"><h2>{allMembers.filter(m => m.status === 'pending').length}</h2><p>Membership requests</p><Link href={base + '/requests'}>Review requests →</Link></Panel><Panel className="padded"><h2>{c.state.posts.filter(x => x.room === room.slug && x.status === 'pending').length}</h2><p>Posts awaiting approval</p><Link href={base + '/pending-posts'}>Review posts →</Link></Panel></div><Panel className="padded" title="Community policies"><p>Visibility: {room.visibility}. Membership: {room.membershipPolicy}. Publishing: {room.postingPolicy}. Comments: {room.commentsEnabled ? 'enabled' : 'disabled'}.</p><p>Posting restrictions allow comments when enabled. Mutes prevent posts and comments. Bans prevent participation and rejoining, not public reading.</p>{p.owner && <><Link className="button secondary" href={base + '/settings'}>Edit policies</Link><Button variant="danger" onClick={() => setArchive(true)}>{room.archived ? 'Reopen community' : 'Archive community'}</Button></>}</Panel></> : params.reportId ? report ? <Panel className="padded" title="Report review"><Badge>{report.status}</Badge><h3>{report.reason}</h3><p>{report.explanation || 'No additional explanation.'}</p><h3>Relevant community rules</h3><p className="post-body">{room.rules}</p><h3>Reported content</h3><p className="post-body">{report.comment ? c.state.comments.find(x => x.id === report.comment)?.text || 'Comment unavailable.' : c.state.posts.find(x => x.id === report.post)?.text || 'Post unavailable.'}</p><Link href={`/rooms/${room.slug}/posts/${report.post}`}>Open content in context</Link><Field label="Review notes"><textarea value={notes} onChange={e => setNotes(e.target.value)} /></Field><div className="button-row">{['dismissed', 'resolved'].map(verb => <Button key={verb} onClick={async () => {
          const r = await c.run({
            type: 'reviewReport',
            room: room.slug,
            report: report.id,
            verb,
            reason: notes
          });
          setError(r.error || 'Report ' + verb + '.');
        }}>{verb === 'dismissed' ? 'Dismiss report' : 'Resolve report'}</Button>)}<Button variant="danger" onClick={() => {
          if (!notes.trim()) {
            setError('Add review notes first.');
            return;
          }
          setRemoveReport(true);
        }}>Remove reported content</Button><Button onClick={() => {
          const author = report.comment ? c.state.comments.find(x => x.id === report.comment)?.author : c.state.posts.find(x => x.id === report.post)?.author;
          setAction({
            user: author,
            verb: 'restrict'
          });
        }}>Restrict author</Button></div><p>Reporter identity is not exposed in public views.</p>{error && <p role="status">{error}</p>}</Panel> : <CommunityState name="No reports" /> : <><div className="community-filters"><Field label="Search management records"><input value={query} onChange={e => {
            setQuery(e.target.value);
            setLimit(8);
          }} /></Field>{section !== 'activity' && <Field label="Filter status"><select value={status} onChange={e => {
            setStatus(e.target.value);
            setLimit(8);
          }}><option value="all">All relevant statuses</option>{(section === 'reports' ? ['open', 'dismissed', 'resolved'] : section === 'pending-posts' ? ['pending', 'rejected', 'removed'] : ['active', 'pending', 'muted', 'restricted', 'banned', 'rejected', 'revoked']).map(x => <option key={x}>{x}</option>)}</select></Field>}</div>{section === 'pending-posts' ? <>{postQueue.slice(0, limit).map(post => <PostCard room={room} post={post} key={post.id} />)}{!postQueue.length && <CommunityState name="No posts" />}{postQueue.length > limit && <Button onClick={() => setLimit(limit + 8)}>Load more posts</Button>}</> : section === 'reports' ? <>{reports.slice(0, limit).map(r => <Panel className="padded" key={r.id} title={<Link href={base + '/reports/' + r.id}>{r.reason}</Link>}><Badge>{r.status}</Badge><p>Content reference: {r.target}</p><p>{r.explanation}</p></Panel>)}{!reports.length && <CommunityState name="No reports" />}{reports.length > limit && <Button onClick={() => setLimit(limit + 8)}>Load more reports</Button>}</> : section === 'activity' ? <>{history.slice(0, limit).map(entry => <article className="community-audit" key={entry.id}><Badge>{entry.action}</Badge><strong>{(c.state.users || communityUsers).find(u => u.id === entry.actor)?.name || entry.actor}</strong><p>Target: {entry.target}</p><p>{entry.reason}</p><time>{new Date(entry.createdAt).toLocaleString('en-US', {
              timeZone: 'UTC'
            })} UTC · audit history</time></article>)}{!history.length && <CommunityState name="No reports" />}{history.length > limit && <Button onClick={() => setLimit(limit + 8)}>Load more activity</Button>}</> : <>{section === 'moderators' && !p.owner && <CommunityState name="Access denied" />}<div className="community-member-table"><table><thead><tr><th>Member</th><th>Role / status</th><th>Reason / expiry</th><th>Actions</th></tr></thead><tbody>{members.slice(0, limit).map(member => <tr key={member.id}><td><strong>{member.name}</strong></td><td><Badge>{member.role}</Badge> <Badge>{member.status}</Badge></td><td><p>{member.reason || 'No restriction'}</p>{member.until && <small>Until {new Date(member.until).toLocaleString('en-US', {
                      timeZone: 'UTC'
                    })} UTC</small>}</td><td><div className="community-member-actions">{memberActions(member)}</div></td></tr>)}</tbody></table></div>{!members.length && <CommunityState name={section === 'bans' ? 'No banned members' : section === 'requests' ? 'No pending requests' : 'No members'} />} {members.length > limit && <Button onClick={() => setLimit(limit + 8)}>Load more members</Button>}</>}</>}<Modal open={removeReport} onClose={() => setRemoveReport(false)} title="Remove reported content?"><p>This hides the content and records your review notes as the moderation reason.</p><Button variant="danger" onClick={async () => {
        const r = await c.run({
          type: report.comment ? 'commentAction' : 'postAction',
          room: room.slug,
          post: report.post,
          comment: report.comment,
          verb: 'remove',
          reason: notes
        });
        setError(r.error || 'Content removed. Resolve the report when review is complete.');
        setRemoveReport(false);
      }}>Confirm content removal</Button><Button onClick={() => setRemoveReport(false)}>Cancel</Button></Modal><MemberActionDialog room={room} action={action} onClose={() => setAction(null)} /><Modal open={archive} onClose={() => setArchive(false)} title={room.archived ? 'Reopen community?' : 'Archive community?'}><p>Archiving preserves existing content and makes the community read-only. It does not delete members or posts.</p><Button variant="danger" onClick={async () => {
        const r = await c.run({
          type: 'archive',
          room: room.slug
        });
        if (r.error) setError(r.error);else setArchive(false);
      }}>Confirm archive change</Button><Button onClick={() => setArchive(false)}>Cancel</Button></Modal></>;
}
