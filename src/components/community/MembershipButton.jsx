import { useState } from 'react';
import { useCommunity } from '../../features/community/useCommunity.js';
import { permissions } from '../../features/community/permissions.js';
import { Button, Modal, Link } from '../ui/primitives.jsx';
export default function MembershipButton({
  room
}) {
  const c = useCommunity(),
    p = permissions(c.state, room, c.actor, c.authenticated);
  const [confirm, setConfirm] = useState(false),
    [error, setError] = useState('');
  const act = async () => {
    if (!c.ensureSigned()) return;
    const result = await c.run({
      type: 'membership',
      room: room.slug
    });
    if (result.error) setError(result.error);else {
      setError('');
      setConfirm(false);
    }
  };
  const label = !p.signed ? 'Sign in to join' : p.owner ? 'Owner' : p.member.status === 'banned' ? 'Banned' : p.member.status === 'pending' ? 'Cancel membership request' : p.active ? 'Leave community' : room.membershipPolicy === 'approval' || room.visibility === 'private' ? 'Request membership' : 'Join community';
  return <><Button variant={p.active ? 'secondary' : 'primary'} onClick={() => {
      if (p.owner) {
        setError('Transfer ownership in management before leaving.');
        return;
      }
      if (p.active) setConfirm(true);else act();
    }} disabled={room.archived || p.member.status === 'banned'}>{label}</Button>{error && <p className="field-error" role="alert">{error} {p.owner && <Link href={`/rooms/${room.slug}/manage/moderators`}>Manage ownership</Link>}</p>}<Modal open={confirm} onClose={() => setConfirm(false)} title="Leave this community?"><p>You will lose member permissions. Private posts and saved private content will become unavailable. Your previous posts are not deleted.</p><Button variant="danger" onClick={act}>Confirm leave</Button><Button onClick={() => setConfirm(false)}>Stay in community</Button></Modal></>;
}
