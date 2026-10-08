import { useState } from 'react';
import { useCommunity } from '../../features/community/useCommunity.js';
import { Button, Modal, Field } from '../ui/primitives.jsx';
export function ShareSheet({
  post,
  room,
  open,
  onClose
}) {
  const [feedback, setFeedback] = useState('');
  const postUrl = new URL(`/rooms/${room.slug}/posts/${post.id}`, location.origin).href,
    roomUrl = new URL('/rooms/' + room.slug, location.origin).href;
  async function copy(text) {
    try {
      if (!navigator.clipboard) throw Error();
      await navigator.clipboard.writeText(text);
      setFeedback('Link copied. No share count is recorded.');
    } catch {
      setFeedback('Copy unavailable. Select the link below and copy it manually.');
    }
  }
  async function share() {
    try {
      await navigator.share({
        title: post.title || room.name,
        url: postUrl
      });
      setFeedback('Share action completed.');
    } catch (error) {
      setFeedback(error.name === 'AbortError' ? 'Sharing cancelled.' : 'Sharing unavailable. Copy the link instead.');
    }
  }
  return <Modal open={open} onClose={onClose} title="Share this conversation"><p>{room.visibility === 'private' ? 'Only approved members can view this link.' : 'Invite someone to read the conversation.'} Sharing does not grant membership.</p><Field label="Canonical post link"><input readOnly value={postUrl} onFocus={e => e.target.select()} /></Field><div className="stack"><Button onClick={() => copy(postUrl)}>Copy post link</Button><Button onClick={() => copy(roomUrl)}>Copy community link</Button>{navigator.share && <Button onClick={share}>Share with your device</Button>}</div>{feedback && <p role="status">{feedback}</p>}</Modal>;
}
export function ReportDialog({
  post,
  room,
  comment,
  open,
  onClose
}) {
  const c = useCommunity();
  const [reason, setReason] = useState(''),
    [explanation, setExplanation] = useState(''),
    [result, setResult] = useState('');
  return <Modal open={open} onClose={onClose} title="Report community content"><p>Reference: {comment || post.id}. Reporter identity is not shown publicly. Reports are sent to the community review queue.</p><form onSubmit={async e => {
      e.preventDefault();
      const r = await c.run({
        type: 'report',
        room: room.slug,
        post: post.id,
        comment,
        reason,
        explanation
      });
      setResult(r.error || 'Report recorded for moderator review.');
    }}><Field label="Reason category"><select required value={reason} onChange={e => setReason(e.target.value)}><option value="">Choose a reason</option>{['Spam', 'Harassment', 'Misleading claims', 'Community rule violation', 'Other'].map(x => <option key={x}>{x}</option>)}</select></Field><Field label="Additional context (optional)"><textarea maxLength={1500} value={explanation} onChange={e => setExplanation(e.target.value)} /></Field><Button type="submit" variant="primary">Submit report</Button></form>{result && <p role="status">{result}</p>}</Modal>;
}
export function PostActionDialog({
  post,
  room,
  action,
  onClose
}) {
  const c = useCommunity();
  const [reason, setReason] = useState(''),
    [error, setError] = useState('');
  return <Modal open={!!action} onClose={onClose} title={`${action === 'delete' ? 'Delete your post' : action === 'remove' ? 'Remove community content' : 'Confirm ' + action}`}><p>{action === 'delete' ? 'This deletes your own post and leaves an unavailable-content destination.' : action === 'remove' ? 'This hides the content from community members. A moderator can restore it after review.' : 'This changes how the post appears or who can participate. It does not rewrite another person’s post.'}</p><form onSubmit={async e => {
      e.preventDefault();
      const r = await c.run({
        type: 'postAction',
        room: room.slug,
        post: post.id,
        verb: action,
        reason
      });
      if (r.error) setError(r.error);else onClose();
    }}><Field label="Reason"><textarea required={['remove', 'reject'].includes(action)} value={reason} onChange={e => setReason(e.target.value)} maxLength={1000} /></Field>{error && <p className="field-error" role="alert">{error}</p>}<Button type="submit" variant={['delete', 'remove', 'reject'].includes(action) ? 'danger' : 'primary'}>Confirm {action}</Button><Button onClick={onClose}>Cancel</Button></form></Modal>;
}
