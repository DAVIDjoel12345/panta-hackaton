import { useCommunity } from '../../features/community/useCommunity.js';
import { permissions } from '../../features/community/permissions.js';
import { Button } from '../ui/primitives.jsx';
export default function LikeButton({
  post,
  room,
  comment
}) {
  const c = useCommunity(),
    item = comment || post,
    p = permissions(c.state, room, c.actor, c.authenticated, post),
    key = c.actor + ':' + item.id,
    pending = c.state.pendingLikes[key],
    error = c.state.failures[key];
  return <div className="community-like"><Button aria-label={`${item.likes.includes(c.actor) ? 'Unlike' : 'Like'} ${comment ? 'comment' : 'post'}`} aria-pressed={item.likes.includes(c.actor)} disabled={!!pending || c.authenticated && !p.canInteract} onClick={() => c.like(room.slug, post.id, comment?.id)}>{item.likes.includes(c.actor) ? '♥' : '♡'} <span>{item.likes.length}</span><span className="sr-only"> likes</span>{pending && ' · Pending'}</Button>{pending && <div className="like-results"><Button onClick={async () => await c.run({
        type: 'likeResolve',
        room: room.slug,
        post: post.id,
        comment: comment?.id
      })}>Complete like</Button><Button onClick={async () => await c.run({
        type: 'likeResolve',
        room: room.slug,
        post: post.id,
        comment: comment?.id,
        failed: true
      })}>Fail like</Button></div>}{error && <small role="status" className="field-error">{error}</small>}</div>;
}
