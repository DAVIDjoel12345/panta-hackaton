import { useState } from 'react';
import { useCommunity } from '../../features/community/useCommunity.js';
import { communityUsers } from '../../mocks/community.js';
import { Button, Field, Modal } from '../ui/primitives.jsx';
const effect = {
  restrict: 'Prevents new posts. Comments, likes, and reading remain available if the community allows them.',
  mute: 'Prevents posts and comments until the chosen end time. Reading and existing posts remain unchanged.',
  ban: 'Revokes this community membership and prevents participation or rejoining. Public posts remain readable. Prior posts are not deleted.',
  unban: 'Lifts this community ban. The person must join or request membership again.',
  lift: 'Restores active member posting and commenting, subject to the community policy.',
  approve: 'Approves this membership request.',
  reject: 'Rejects this membership request. The user may request again.',
  revoke: 'Revokes membership. Private posts become unavailable. Existing content is not deleted.',
  transfer: 'Transfers ownership to this active member. You become a regular member and lose owner controls.',
  moderator: 'Adds or removes the moderator role. Only the owner can make this change.'
};
export default function MemberActionDialog({
  room,
  action,
  onClose
}) {
  const c = useCommunity();
  const [reason, setReason] = useState(''),
    [hours, setHours] = useState('24'),
    [error, setError] = useState('');
  const user = (c.state.users || communityUsers).find(u => u.id === action?.user);
  return <Modal open={!!action} onClose={onClose} title={action ? `Confirm ${action.verb}` : 'Member action'}><h3>{user?.name}</h3><p>{effect[action?.verb]}</p><form onSubmit={async e => {
      e.preventDefault();
      const r = await c.run({
        type: ['transfer', 'moderator'].includes(action.verb) ? 'role' : 'memberAction',
        room: room.slug,
        ...action,
        reason,
        hours
      });
      if (r.error) setError(r.error);else onClose();
    }}>{action?.verb === 'mute' && <Field label="Mute duration"><select value={hours} onChange={e => setHours(e.target.value)}><option value="1">1 hour</option><option value="24">24 hours</option><option value="168">7 days</option></select></Field>}<Field label="Reason"><textarea required maxLength={1000} value={reason} onChange={e => setReason(e.target.value)} /></Field>{error && <p role="alert" className="field-error">{error}</p>}<Button type="submit" variant={['ban', 'revoke', 'transfer'].includes(action?.verb) ? 'danger' : 'primary'}>Confirm member action</Button><Button onClick={onClose}>Cancel</Button></form></Modal>;
}
