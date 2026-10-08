import { useState } from 'react';
import { useCommunity } from '../../features/community/useCommunity.js';
import { permissions } from '../../features/community/permissions.js';
import { communityUsers } from '../../mocks/community.js';
import { Button, Field, Modal } from '../ui/primitives.jsx';
import LikeButton from '../posts/LikeButton.jsx';
import { ReportDialog } from '../posts/PostDialogs.jsx';
import CommunityState from '../community/CommunityState.jsx';
function CommentItem({
  comment,
  room,
  post,
  onReply
}) {
  const c = useCommunity(),
    p = permissions(c.state, room, c.actor, c.authenticated, post),
    author = (c.state.users || communityUsers).find(u => u.id === comment.author) || {
      name: 'Community member',
      initials: 'CM'
    };
  const [edit, setEdit] = useState(false),
    [text, setText] = useState(comment.text),
    [remove, setRemove] = useState(false),
    [reason, setReason] = useState(''),
    [report, setReport] = useState(false),
    [error, setError] = useState('');
  const own = comment.author === c.actor;
  return <article className={`community-comment ${comment.parent ? 'is-reply' : ''}`}><span className="avatar purple">{author.initials}</span><div><strong>{author.name}</strong><small>{comment.edited ? 'Edited · ' : ''}{new Date(comment.createdAt).toLocaleDateString('en-US')}</small>{comment.status !== 'published' ? <p className="muted">{comment.status === 'deleted' ? 'Comment deleted by its author.' : 'Comment removed by a moderator.'}</p> : <>{edit ? <form onSubmit={async e => {
          e.preventDefault();
          const r = await c.run({
            type: 'commentAction',
            room: room.slug,
            post: post.id,
            comment: comment.id,
            verb: 'edit',
            text
          });
          if (r.error) setError(r.error);else setEdit(false);
        }}><Field label="Edit your comment"><textarea required maxLength={2000} value={text} onChange={e => setText(e.target.value)} /></Field><Button type="submit">Save comment</Button><Button onClick={() => setEdit(false)}>Cancel edit</Button></form> : <p className="post-body">{comment.text}</p>}<div className="comment-actions"><LikeButton room={room} post={post} comment={comment} /><Button disabled={c.authenticated && !p.canComment} onClick={() => {
            if (c.ensureSigned()) onReply(comment);
          }}>Reply</Button>{own && p.canComment && <Button onClick={() => setEdit(true)}>Edit</Button>}{(own || p.manage) && <Button onClick={() => setRemove(true)}>{own ? 'Delete' : 'Remove'}</Button>}{p.canReport && <Button onClick={() => setReport(true)}>Report comment</Button>}</div></>}{error && <p role="alert" className="field-error">{error}</p>}</div><Modal open={remove} onClose={() => setRemove(false)} title={own ? 'Delete your comment?' : 'Remove this comment?'}><p>A placeholder remains. Replies are retained, and removed content is excluded from the visible count.</p><Field label="Reason"><textarea required={!own} value={reason} onChange={e => setReason(e.target.value)} /></Field><Button variant="danger" onClick={async () => {
        const r = await c.run({
          type: 'commentAction',
          room: room.slug,
          post: post.id,
          comment: comment.id,
          verb: 'remove',
          reason
        });
        if (r.error) setError(r.error);else setRemove(false);
      }}>Confirm comment removal</Button><Button onClick={() => setRemove(false)}>Cancel</Button>{error && <p role="alert">{error}</p>}</Modal><ReportDialog post={post} room={room} comment={comment.id} open={report} onClose={() => setReport(false)} /></article>;
}
export default function CommunityComments({
  post,
  room
}) {
  const c = useCommunity(),
    p = permissions(c.state, room, c.actor, c.authenticated, post),
    key = 'comment:' + post.id;
  const [text, setText] = useState(c.ui[key]?.text || ''),
    [reply, setReply] = useState(null),
    [stage, setStage] = useState(''),
    [error, setError] = useState(''),
    [limit, setLimit] = useState(6);
  const items = c.state.comments.filter(x => x.post === post.id),
    roots = items.filter(x => !x.parent);
  const submit = async () => {
    setStage('posting');
    const r = await c.run({
      type: 'comment',
      room: room.slug,
      post: post.id,
      text,
      parent: reply?.id
    });
    if (r.error) setError(r.error);else {
      setText('');
      setReply(null);
      c.setUI(current => ({
        ...current,
        [key]: {
          text: ''
        }
      }));
      setError('');
    }
    setStage('');
  };
  if (post.status !== 'published') return <CommunityState name="Post removed" />;
  return <section className="community-comments"><h2>Conversation <span className="muted">{items.filter(x => x.status === 'published').length} visible</span></h2>{items.some(x => x.status !== 'published') && <p className="muted">Removed and deleted entries are not included in the visible count.</p>}{post.locked ? <CommunityState name="Comments locked" /> : !p.canComment && c.authenticated ? <CommunityState name={p.member.status === 'muted' ? 'Temporarily muted' : 'Membership required'} /> : <form onSubmit={e => {
      e.preventDefault();
      c.setUI(current => ({
        ...current,
        [key]: {
          text
        }
      }));
      if (!c.ensureSigned()) return;
      if (!text.trim()) {
        setError('Write a comment before posting.');
        return;
      }
      if (c.live) submit();else setStage('posting');
    }}>{reply && <p>Replying to {(c.state.users || communityUsers).find(u => u.id === reply.author)?.name}<Button onClick={() => setReply(null)}>Cancel reply</Button></p>}<Field label={reply ? 'Your reply' : 'Your comment'}><textarea value={text} onChange={e => {
          setText(e.target.value);
          c.setUI(current => ({
            ...current,
            [key]: {
              text: e.target.value
            }
          }));
        }} maxLength={2000} placeholder="Add a source, a question, or another perspective…" /></Field>{stage === 'posting' && c.live ? <Button disabled>Posting...</Button> : stage === 'posting' ? <div className="community-inline-status" role="status"><p>Posting · local simulation</p><Button onClick={submit}>Complete local comment</Button><Button onClick={() => {
          setStage('');
          setError('Submission failed. Your unsent text is preserved.');
        }}>Simulate comment failure</Button></div> : <Button type="submit" variant="primary">{reply ? 'Post reply' : 'Post comment'}</Button>}{error && <p className="field-error" role="alert">{error}</p>}</form>}{!roots.length && <CommunityState name="No comments" />}{roots.slice(0, limit).map(root => <div key={root.id}><CommentItem comment={root} room={room} post={post} onReply={setReply} /><ReplyList items={items.filter(x => x.parent === root.id)} room={room} post={post} onReply={setReply} /></div>)}{roots.length > limit && <Button onClick={() => setLimit(limit + 6)}>Load more comments</Button>}</section>;
}
function ReplyList({
  items,
  ...props
}) {
  const [limit, setLimit] = useState(3);
  return <>{items.slice(0, limit).map(reply => <CommentItem key={reply.id} comment={reply} {...props} />)}{items.length > limit && <Button onClick={() => setLimit(limit + 3)}>Load more replies</Button>}</>;
}
