import { communityUsers } from '../../mocks/community.js';
import { useCommunity } from '../../features/community/useCommunity.js';
import { Button, Field, Badge } from '../ui/primitives.jsx';
export default function CommunityControls() {
  const c = useCommunity();
  if (!import.meta.env.DEV) return null;
  return <details className="community-demo"><summary>Development demo controls <Badge>Not real authorization</Badge></summary><div className="two-columns"><Field label="Community demo identity"><select value={c.actor} onChange={e => c.setActor(e.target.value)}>{communityUsers.map(u => <option key={u.id} value={u.id}>{u.name} · {{
              'demo-alex': 'Member',
              'demo-mira': 'Owner',
              'demo-jules': 'Moderator',
              'demo-muted': 'Muted member',
              'demo-restricted': 'Posting restricted',
              'demo-banned': 'Banned',
              'demo-visitor': 'Visitor'
            }[u.id]}</option>)}</select></Field><Field label="Like request scenario"><select value={c.mode} onChange={e => c.setMode(e.target.value)}><option value="normal">Immediate local completion</option><option value="pending">Explicit pending / result controls</option><option value="fail">Fail and roll back</option></select></Field></div><p>Actor fixtures apply only after sign-in. Roles and membership remain separate. Demo clock: {c.state.clock}.</p><Button onClick={async () => await c.run({
      type: 'clock'
    })}>Advance demo clock 24 hours</Button></details>;
}
