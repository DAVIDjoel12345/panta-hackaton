import useLiveQuery from '../../hooks/useLiveQuery.js';
import { useEffect, useRef, useState } from 'react';
import { useCommunity } from '../../features/community/useCommunity.js';
import { permissions, safeCommunityLink } from '../../features/community/permissions.js';
import { attachmentPolicy, postTypes } from '../../mocks/community.js';
import { markets } from '../../demo/fixtures.js';
import { Button, Field, Link, Badge } from '../ui/primitives.jsx';
import useUnsavedChanges from '../../hooks/useUnsavedChanges.js';
import { navigate } from '../../app/navigation.js';
import CommunityState from '../community/CommunityState.jsx';
const empty = {
  title: '',
  text: '',
  type: 'Discussion',
  marketId: '',
  link: '',
  attachments: []
};
export default function PostComposer({
  room,
  post
}) {
  const c = useCommunity(),
    p = permissions(c.state, room, c.actor, c.authenticated, post),
    draftKey = c.actor + ':' + room.slug;
  const catalog=useLiveQuery(c.live?'/markets':null,30000);
  const [form, setForm] = useState(post || c.state.drafts[draftKey] || {
      ...empty,
      marketId: new URLSearchParams(location.search).get('market') || ''
    }),
    [dirty, setDirty] = useState(false),
    [preview, setPreview] = useState(false),
    [stage, setStage] = useState(''),
    [error, setError] = useState(''),
    [files, setFiles] = useState([]);
  const urls = useRef(new Set()),
    readers = useRef(new Set());
  useUnsavedChanges(dirty);
  useEffect(() => {
    const temporary = urls.current,
      reading = readers.current;
    return () => {
      for (const url of temporary) URL.revokeObjectURL(url);
      for (const reader of reading) reader.abort();
    };
  }, []);
  const update = (key, value) => {
    setForm(current => ({
      ...current,
      [key]: value
    }));
    setDirty(true);
    setError('');
  };
  function addFiles(event) {
    const incoming = [...event.target.files];
    event.target.value = '';
    if (files.length + form.attachments.length + incoming.length > attachmentPolicy.maxCount) {
      setError('Add at most 4 images.');
      return;
    }
    if (incoming.some(file => !attachmentPolicy.types.includes(file.type) || file.size > attachmentPolicy.maxBytes)) {
      setError('Use JPEG, PNG or WebP images, at most 5 MB each.');
      return;
    }
    const previews = incoming.map(file => {
      const url = URL.createObjectURL(file);
      urls.current.add(url);
      return {
        file,
        url,
        status: 'uploading',
        data: '',
        alt: file.name
      };
    });
    setFiles(current => [...current, ...previews]);
    setDirty(true);
    if (c.live) previews.forEach(prepare);
  }
  function prepare(item) {
    const reader = new FileReader();
    readers.current.add(reader);
    reader.onload = () => {
      readers.current.delete(reader);
      setFiles(current => current.map(f => f.url === item.url ? {
        ...f,
        status: 'ready',
        data: String(reader.result)
      } : f));
    };
    reader.onerror = () => {
      readers.current.delete(reader);
      setFiles(current => current.map(f => f.url === item.url ? {
        ...f,
        status: 'failed'
      } : f));
    };
    reader.readAsDataURL(item.file);
  }
  function remove(item) {
    URL.revokeObjectURL(item.url);
    urls.current.delete(item.url);
    setFiles(current => current.filter(f => f.url !== item.url));
    setDirty(true);
  }
  const payload = () => ({
    ...form,
    attachments: [...form.attachments, ...files.filter(f => f.status === 'ready').map(f => ({
      url: f.data,
      alt: f.alt
    }))]
  });
  async function saveDraft() {
    if (files.some(f => f.status !== 'ready')) {
      setError('Finish or remove pending image previews before saving.');
      return;
    }
    const r = await c.run({
      type: 'draft',
      room: room.slug,
      value: payload()
    });
    if (r.error) setError(r.error);else {
      setDirty(false);
      setError('Draft saved to your account.');
    }
  }
  async function publish() {
    setStage('publishing');
    const result = await c.run({
      type: 'publish',
      room: room.slug,
      post: post?.id,
      value: payload()
    });
    if (result.error) {
      setError(result.error);
      setStage('');
      return;
    }
    setDirty(false);
    window.__pantaDirty = false;
    navigate(`/rooms/${room.slug}/posts/${result.post}`);
  }
  if (!p.canPost || post && !p.canEdit) return <CommunityState name={p.member.status === 'muted' ? 'Temporarily muted' : p.member.status === 'restricted' ? 'Posting restricted' : 'Posting disabled'} />;
  return <section className="community-composer"><header><div><Badge tone="purple">{room.name}</Badge><h1>{post ? 'Edit your post' : 'Start a conversation'}</h1><p>{p.approval ? 'Your post will need moderator approval before appearing in the feed.' : 'You can publish directly to this community.'}</p></div><Link className="button secondary" href={'/rooms/' + room.slug}>Close composer</Link></header><div className="community-composer-body"><div className="button-row"><Button aria-pressed={!preview} onClick={() => setPreview(false)}>Write</Button><Button aria-pressed={preview} onClick={() => setPreview(true)}>Preview</Button><Button onClick={saveDraft}>Save draft</Button></div>{preview ? <article className="composer-preview"><Badge>{form.type}</Badge><h2>{form.title || 'Untitled conversation'}</h2><p className="post-body">{form.text || 'Your post preview appears here.'}</p>{safeCommunityLink(form.link) && <a href={safeCommunityLink(form.link)} target="_blank" rel="noreferrer">{form.link}</a>}<div className="post-images">{[...form.attachments, ...files.map(f => ({
            url: f.url,
            alt: f.alt
          }))].map((f, i) => <img src={f.url} alt={f.alt} key={i} />)}</div></article> : <><Field label="Post category"><select value={form.type} onChange={e => update('type', e.target.value)}>{postTypes.map(type => <option key={type}>{type}</option>)}</select></Field><Field label="Title (optional)"><input maxLength={160} value={form.title} onChange={e => update('title', e.target.value)} /></Field><Field label="Your post" hint={`${form.text.length}/10000 characters. Plain text only.`}><textarea className="post-textarea" maxLength={10000} value={form.text} onChange={e => update('text', e.target.value)} placeholder="What should the community be thinking about?" /></Field><Field label="Source link (optional)"><input type="url" value={form.link} onChange={e => update('link', e.target.value)} placeholder="https://example.com/source" /></Field><Field label="Reference a prediction market"><select value={form.marketId} onChange={e => update('marketId', e.target.value)}><option value="">No market reference</option>{(c.live ? (catalog.data?.items||[]).map(m=>({id:m.marketId,question:m.title})) : markets).map(m => <option key={m.id} value={m.id}>{m.question}</option>)}</select></Field>{c.live&&<Field label="Or paste a Panta market identifier"><input value={form.marketId} onChange={e=>update('marketId',e.target.value)} placeholder="Solana market address"/></Field>}<Field label="Images (optional)" hint="Up to 4 JPEG, PNG or WebP files; 5 MB each. Images are stored with your post."><input type="file" accept={attachmentPolicy.types.join(',')} multiple onChange={addFiles} /></Field><div className="composer-attachments">{form.attachments.map((file, index) => <div key={index}><img src={file.url} alt={file.alt} /><Button onClick={() => update('attachments', form.attachments.filter((_, i) => i !== index))}>Remove existing image</Button></div>)}{files.map(file => <div key={file.url}><img src={file.url} alt={file.alt} /><Badge>{file.status === 'uploading' ? 'Upload preview · awaiting local preparation' : file.status === 'failed' ? 'Upload preview failed' : 'Image ready'}</Badge><Field label="Image description"><input value={file.alt} onChange={e => setFiles(current => current.map(f => f.url === file.url ? {
                ...f,
                alt: e.target.value
              } : f))} /></Field>{file.status !== 'ready' && <Button onClick={() => prepare(file)}>{file.status === 'failed' ? 'Retry image preparation' : 'Prepare image'}</Button>}{!c.live && file.status === 'uploading' && <Button onClick={() => setFiles(current => current.map(f => f.url === file.url ? {
              ...f,
              status: 'failed'
            } : f))}>Simulate upload failure</Button>}<Button onClick={() => remove(file)}>Remove image</Button></div>)}</div></>}{error && <p role="status" className="field-error">{error}</p>}</div><footer className="community-composer-footer"><Link className="button secondary" href={'/rooms/' + room.slug}>Cancel</Link>{stage === 'publishing' && c.live ? <Button disabled>Publishing...</Button> : stage === 'publishing' ? <><span role="status">Publishing locally…</span><Button variant="primary" onClick={publish}>Complete local publication</Button><Button onClick={() => {
          setStage('');
          setError('Publication failed. Your draft and images remain available.');
        }}>Simulate publish failure</Button></> : <Button variant="primary" disabled={!form.text.trim() || files.some(f => f.status !== 'ready')} onClick={() => {
        if (form.link && !safeCommunityLink(form.link)) {
          setError('Use a valid HTTP or HTTPS link.');
          return;
        }
        if (c.live) publish();else setStage('publishing');
      }}>{p.approval ? 'Submit for approval' : post ? 'Save post changes' : 'Publish post'}</Button>}</footer></section>;
}
