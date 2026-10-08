import { useState } from 'react';
import { useCommunity } from '../../features/community/useCommunity.js';
import { permissions } from '../../features/community/permissions.js';
import useUnsavedChanges from '../../hooks/useUnsavedChanges.js';
import { Button, Field, PageHeading, Panel, Link } from '../ui/primitives.jsx';
import { navigate } from '../../app/navigation.js';
import CommunityState from './CommunityState.jsx';
export default function CommunityForm({
  room
}) {
  const c = useCommunity(),
    [form, setForm] = useState(room || {
      name: '',
      slug: '',
      description: '',
      category: 'Technology',
      cover: 'purple',
      avatar: 'PS',
      rules: 'Cite sources. Respect people. No spam or financial guarantees.',
      visibility: 'public',
      membershipPolicy: 'open',
      postingPolicy: 'members',
      commentsEnabled: true,
      approval: false
    }),
    [dirty, setDirty] = useState(false),
    [error, setError] = useState(''),
    [saving, setSaving] = useState(false);
  useUnsavedChanges(dirty);
  const update = (key, value) => {
    setForm({
      ...form,
      [key]: value
    });
    setDirty(true);
    setError('');
  };
  const save = async () => {
    setSaving(true);
    const r = await c.run({
      type: room ? 'settings' : 'createRoom',
      room: room?.slug,
      value: form
    });
    if (r.error) {
      setError(r.error);
      setSaving(false);
      return;
    }
    setDirty(false);
    window.__pantaDirty = false;
    if (!room) navigate('/rooms/' + form.slug);else {
      setSaving(false);
      setError('Community settings saved.');
    }
  };
  if (room && !permissions(c.state, room, c.actor, c.authenticated).owner) return <CommunityState name="Access denied" />;
  return <><PageHeading title={room ? 'Community settings' : 'Create a Signal Room'} description="A clear purpose and fair rules make better conversations." /><Panel className="padded"><form onSubmit={e => {
        e.preventDefault();
        if (c.live) save();else setSaving(true);
      }}><div className="two-columns"><Field label="Community name"><input required minLength={3} maxLength={70} value={form.name} onChange={e => update('name', e.target.value)} /></Field><Field label="Unique community slug" hint={room ? 'Existing community URLs remain stable.' : 'Lowercase letters, numbers and hyphens.'}><input required readOnly={!!room} pattern="[a-z0-9]+(-[a-z0-9]+)*" maxLength={60} value={form.slug} onChange={e => update('slug', e.target.value)} /></Field></div><Field label="Description"><textarea required minLength={10} maxLength={1000} value={form.description} onChange={e => update('description', e.target.value)} /></Field><div className="two-columns"><Field label="Category"><select value={form.category} onChange={e => update('category', e.target.value)}>{['Crypto', 'Technology', 'Science', 'Culture', 'Sports', 'World Events'].map(x => <option key={x}>{x}</option>)}</select></Field><Field label="Cover and avatar color"><select value={form.cover} onChange={e => update('cover', e.target.value)}>{['purple', 'blue', 'orange', 'pink', 'green'].map(x => <option key={x}>{x}</option>)}</select></Field></div><Field label="Avatar initials"><input required maxLength={3} value={form.avatar} onChange={e => update('avatar', e.target.value)} /></Field><Field label="Community rules"><textarea required maxLength={6000} value={form.rules} onChange={e => update('rules', e.target.value)} /></Field><div className="two-columns"><Field label="Visibility" hint="Private posts and member details are shown only to approved members."><select value={form.visibility} onChange={e => update('visibility', e.target.value)}><option value="public">Public community</option><option value="private">Private community</option></select></Field><Field label="Membership policy" hint="Private communities always require approval."><select value={form.membershipPolicy} onChange={e => update('membershipPolicy', e.target.value)}><option value="open">Open membership</option><option value="approval">Approval required</option></select></Field></div><Field label="Who can publish?" hint="Restrictions and bans take precedence over this policy."><select value={form.postingPolicy} onChange={e => update('postingPolicy', e.target.value)}><option value="members">All active members can publish</option><option value="staff">Owner and moderators only</option><option value="approval">Member posts require approval</option></select></Field><label className="check-row"><input type="checkbox" checked={form.approval} onChange={e => update('approval', e.target.checked)} /> Review member posts before publication</label><label className="check-row"><input type="checkbox" checked={form.commentsEnabled} onChange={e => update('commentsEnabled', e.target.checked)} /> Allow comments, including from posting-restricted members</label>{error && <p role="status" className="field-error">{error}</p>}<div className="form-footer"><span>{dirty ? 'Unsaved changes' : 'Saved'}</span>{saving && !c.live ? <><Button variant="primary" onClick={save}>Complete local save</Button><Button onClick={() => {
              setSaving(false);
              setError('Save failed. Your form entries are preserved.');
            }}>Simulate save failure</Button></> : <Button disabled={saving} type="submit" variant="primary">{room ? 'Save community settings' : 'Create community'}</Button>}<Link className="button secondary" href={room ? '/rooms/' + room.slug : '/rooms'}>Cancel</Link></div></form></Panel></>;
}
