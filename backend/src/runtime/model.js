import { permissions, safeCommunityLink } from './permissions.js'
function reconcileLikes(state){
  for(const [key,pending] of Object.entries(state.pendingLikes)){
    const actor=key.split(':')[0],item=(pending.comment?state.comments:state.posts).find(x=>x.id===pending.item)
    const post=pending.comment?state.posts.find(x=>x.id===item?.post):item
    const room=state.communities.find(x=>x.slug===post?.room),p=permissions(state,room,actor,true,post)
    if(!item||item.status!=='published'||post?.status!=='published'||!p.canInteract||!p.canViewPost){
      if(item)item.likes=pending.liked?[...new Set([...item.likes,actor])]:item.likes.filter(x=>x!==actor)
      delete state.pendingLikes[key]
    }
  }
  return state
}
export function communityTransition(previous,action,actor,authenticated){
  const state=structuredClone(previous)
  const room=state.communities.find(r=>r.slug===action.room)
  const post=state.posts.find(p=>p.id===action.post&&p.room===action.room)
  const p=permissions(state,room,actor,authenticated,post)
  const id=prefix=>`${prefix}-${state.next++}`
  const fail=message=>({state:previous,error:message})
  const note=(user,type,target,text,href)=>{if(user===actor&&type==='like')return;const key=`${type}:${target}:${user}`;if(!state.notifications.some(n=>n.id===key))state.notifications.unshift({id:key,user,title:text,body:'A community you participate in has an update.',href,read:false,icon:'users'})}
  const audit=(verb,target,reason)=>state.history.unshift({id:id('audit'),room:room.slug,actor,action:verb,target,reason,createdAt:state.clock})
  const roomLink=room?`/rooms/${room.slug}`:'/rooms'
  if(action.type==='createRoom'){
    if(!authenticated||actor==='demo-visitor')return fail('Sign in before creating a community.')
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(action.value.slug)||state.communities.some(r=>r.slug===action.value.slug))return fail('Choose a unique lowercase slug using letters, numbers and hyphens.')
    if(action.value.name.trim().length<3||action.value.description.trim().length<10||!action.value.rules.trim())return fail('Add a name, description, and community rules.')
    state.communities.push({...action.value,owner:actor,archived:false,icon:'users',color:action.value.cover});state.memberships[action.value.slug]={[actor]:{role:'owner',status:'active'}}
  }else if(action.type==='clock'){
    state.clock=new Date(Date.parse(state.clock)+86400000).toISOString()
    for(const [slug,members]of Object.entries(state.memberships))for(const [user,member]of Object.entries(members))if(member.status==='muted'&&Date.parse(member.until)<=Date.parse(state.clock)){members[user]={...member,status:'active',reason:'Temporary mute expired.'};state.history.unshift({id:id('audit'),room:slug,actor:'system',action:'Mute expired',target:user,reason:'Demo clock advanced explicitly.',createdAt:state.clock})}
  }else if(!room)return fail('Community not found.')
  else if(action.type==='appeal'){
    if(!p.signed||!['muted','restricted','banned','rejected','revoked'].includes(p.member.status))return fail('There is no restriction to appeal.');
    if(state.history.some(e=>e.room===room.slug&&e.actor===actor&&e.action==='Review requested'&&Date.parse(state.clock)-Date.parse(e.createdAt)<86400000))return fail('A review was already requested today.');
    audit('Review requested',actor,'Member requested review of '+p.member.status);
    for(const [user,m] of Object.entries(state.memberships[room.slug]))if(['owner','moderator'].includes(m.role))note(user,'appeal',actor+':'+state.clock,'Membership review requested',roomLink+'/manage/activity');
  }else if(action.type==='membership'){
    if(!p.signed)return fail('Sign in to manage membership.')
    if(p.owner)return fail('Transfer ownership before leaving your community.')
    if(p.member.status==='banned')return fail('This community ban must be lifted before you can rejoin.')
    if(room.archived)return fail('This community is archived.')
    const status=p.member.status==='pending'?'not-joined':p.active?'not-joined':room.membershipPolicy==='approval'||room.visibility==='private'?'pending':'active'
    state.memberships[room.slug]??={};state.memberships[room.slug][actor]={role:'member',status}
  }else if(action.type==='savePost'){
    if(p.signed&&post&&(state.saved[actor]||[]).includes(post.id)){state.saved[actor]=state.saved[actor].filter(x=>x!==post.id);return {state}}
    if(!p.canInteract||!p.canViewPost||post.status!=='published')return fail('Active membership and access to this post are required.')
    const saved=state.saved[actor]||[];state.saved[actor]=saved.includes(post.id)?saved.filter(x=>x!==post.id):[...saved,post.id]
  }else if(action.type==='likeBegin'||action.type==='likeResolve'){
    const item=action.comment?state.comments.find(c=>c.id===action.comment&&c.post===post?.id):post
    if(!p.canInteract||!p.canViewPost||post.status!=='published'||!item||item.status!=='published')return fail('This content cannot receive likes with your current membership.')
    const key=`${actor}:${item.id}`
    if(action.type==='likeBegin'){
      if(state.pendingLikes[key])return fail('A like is already pending.')
      const liked=item.likes.includes(actor);item.likes=liked?item.likes.filter(x=>x!==actor):[...item.likes,actor];state.pendingLikes[key]={liked,item:item.id,comment:!!action.comment};delete state.failures[key]
    }else{
      const pending=state.pendingLikes[key];if(!pending)return fail('No pending like to complete.')
      if(action.failed){item.likes=pending.liked?[...new Set([...item.likes,actor])]:item.likes.filter(x=>x!==actor);state.failures[key]='Like failed. Previous count restored. Try again.'}
      else if(item.likes.includes(actor))note(item.author,'like',item.id,'Your community content was liked',`${roomLink}/posts/${post.id}`)
      delete state.pendingLikes[key]
    }
  }else if(action.type==='publish'){
    if(!p.canPost||action.post&&!p.canEdit)return fail('You cannot publish or edit this post with the current permissions.')
    const value=action.value;if(!value.text.trim()||value.text.length>10000)return fail('Write between 1 and 10,000 characters.')
    if(value.link&&!safeCommunityLink(value.link))return fail('Use a valid HTTP or HTTPS link.')
    const next={...value,id:post?.id||id('post'),room:room.slug,author:actor,status:p.approval?'pending':'published',createdAt:post?.createdAt||state.clock,edited:!!post,pinned:post?.pinned||false,locked:post?.locked||false,likes:post?.likes||[]}
    if(post)state.posts=state.posts.map(item=>item.id===post.id?next:item);else state.posts.unshift(next)
    delete state.drafts[actor+':'+room.slug];return {state:reconcileLikes(state),post:next.id}
  }else if(action.type==='draft'){
    if(!p.canPost)return fail('Posting permission is required to save a draft.');state.drafts[actor+':'+room.slug]=action.value
  }else if(action.type==='comment'){
    if(!p.canComment||!p.canViewPost)return fail('Comments are unavailable for this post or membership.')
    if(!action.text.trim()||action.text.length>2000)return fail('Write between 1 and 2,000 characters.')
    const parent=action.parent?state.comments.find(c=>c.id===action.parent&&c.post===post.id):null
    if(action.parent&&(!parent||parent.status!=='published'))return fail('The reply target is no longer available.')
    const comment={id:id('comment'),post:post.id,author:actor,text:action.text.trim(),parent:parent?(parent.parent||parent.id):null,status:'published',createdAt:state.clock,likes:[],edited:false}
    state.comments.push(comment);note(parent?.author||post.author,'reply',comment.id,'A reply to your community conversation',`${roomLink}/posts/${post.id}`)
  }else if(action.type==='commentAction'){
    const comment=state.comments.find(c=>c.id===action.comment&&c.post===post?.id);if(!comment||!p.canViewPost||post.status!=='published')return fail('Comment unavailable.')
    if(action.verb==='edit'){if(comment.author!==actor||!p.canComment||comment.status!=='published'||!action.text.trim()||action.text.length>2000)return fail('Cannot edit this comment.');comment.text=action.text.trim();comment.edited=true}
    else {if(!(p.manage||p.signed&&comment.author===actor))return fail('Permission denied.');if(comment.author!==actor&&!action.reason?.trim())return fail('A removal reason is required.');comment.status=comment.author===actor?'deleted':'removed';comment.text='';audit('Comment '+comment.status,comment.id,action.reason||'Author deleted their own comment.');note(comment.author,'removed',comment.id,'A comment is no longer available',`${roomLink}/posts/${post.id}`)}
  }else if(action.type==='postAction'){
    if(!post||!p.canViewPost)return fail('Post unavailable.')
    const own=post.author===actor
    if(action.verb==='delete'){if(!p.canDelete)return fail('Only the author can delete their post.');post.status='deleted';post.text='';post.title='';post.attachments=[]}
    else {if(!p.manage)return fail('Owner or moderator access is required.');if(['remove','reject'].includes(action.verb)&&!action.reason?.trim())return fail('Explain this moderation decision.')
      if(['approve','reject'].includes(action.verb)&&post.status!=='pending')return fail('This post is no longer awaiting approval.')
      if(action.verb==='remove'&&post.status==='removed')return fail('This post was already removed.')
      if(action.verb==='pin')post.pinned=!post.pinned
      if(action.verb==='lock')post.locked=!post.locked
      if(action.verb==='announce')post.type='Announcement'
      if(action.verb==='approve'&&post.status==='pending')post.status='published'
      if(action.verb==='reject'&&post.status==='pending')post.status='rejected'
      if(action.verb==='remove')post.status='removed'
      if(action.verb==='restore'&&post.status==='removed')post.status='published'
    }
    post.reason=action.reason||'';audit(action.verb,post.id,action.reason||(own?'Author action':'Community moderation'))
    note(post.author,action.verb,post.id,`Post ${action.verb} · community update`,`${roomLink}/posts/${post.id}`)
  }else if(action.type==='report'){
    if(!p.canReport||!p.canViewPost)return fail('Sign in with access to report this content.')
    if(action.comment&&!state.comments.some(c=>c.id===action.comment&&c.post===post.id&&c.status==='published'))return fail('Comment unavailable.')
    if(!action.reason)return fail('Select a report reason.')
    const target=action.comment||post.id;if(state.reports.some(r=>r.target===target&&r.reporter===actor&&r.status==='open'))return fail('You already have an open report for this content.')
    state.reports.unshift({id:id('report'),room:room.slug,post:post.id,target,comment:action.comment||null,reporter:actor,reason:action.reason,explanation:action.explanation||'',status:'open',notes:'',createdAt:state.clock})
  }else if(action.type==='reviewReport'){
    if(!p.manage)return fail('Permission denied.');const report=state.reports.find(r=>r.id===action.report&&r.room===room.slug);if(!report)return fail('Report unavailable.');if(!action.reason?.trim())return fail('Add review notes before closing the report.');report.status=action.verb;report.notes=action.reason;audit('Report '+action.verb,report.target,action.reason)
  }else if(action.type==='memberAction'){
    const target=state.memberships[room.slug]?.[action.user];if(!target||!p.canRestrict(action.user))return fail('You cannot change this member. Owners are protected; moderators cannot restrict fellow moderators.')
    if(!action.reason?.trim())return fail('A reason is required.')
    if(['approve','reject'].includes(action.verb)&&target.status!=='pending')return fail('This request has already been reviewed.')
    const expected={ban:'banned',unban:'not-joined',lift:'active',restrict:'restricted',revoke:'revoked'}[action.verb]
    if(expected===target.status&&target.reason===action.reason)return fail('This member action was already applied.')
    if(action.verb==='approve')target.status='active'
    if(action.verb==='reject')target.status='rejected'
    if(action.verb==='revoke')target.status='revoked'
    if(action.verb==='ban')target.status='banned'
    if(action.verb==='unban')target.status='not-joined'
    if(action.verb==='restrict')target.status='restricted'
    if(action.verb==='mute'){target.status='muted';target.until=new Date(Date.parse(state.clock)+(Number(action.hours)||24)*3600000).toISOString()}
    if(action.verb==='lift'){target.status='active';delete target.until}
    target.reason=action.reason;audit(action.verb,action.user,action.reason);note(action.user,action.verb,id('change'),`Membership ${action.verb}`,`${roomLink}/membership`)
  }else if(action.type==='role'){
    if(!p.owner)return fail('Only the owner can change moderators or ownership.')
    const target=state.memberships[room.slug]?.[action.user];if(!target||target.status!=='active'||action.user===actor)return fail('Select another active member.')
    if(action.verb==='transfer'){state.memberships[room.slug][actor].role='member';target.role='owner';room.owner=action.user}
    else {const role=action.role||(target.role==='moderator'?'member':'moderator');if(role===target.role)return fail('This role change was already applied.');target.role=role}
    audit(action.verb,action.user,action.reason||'Owner confirmed this change.');note(action.user,'role',id('role'),'Your community role changed',roomLink)
  }else if(action.type==='settings'){
    if(!p.owner)return fail('Only the owner can change community settings.')
    if(action.value.name.trim().length<3||action.value.description.trim().length<10||!action.value.rules.trim())return fail('Name, description and rules are required.')
    Object.assign(room,action.value,{slug:room.slug,owner:room.owner});audit('Settings updated',room.slug,'Owner saved community policy.')
  }else if(action.type==='archive'){
    if(!p.owner)return fail('Only the owner can archive this community.');room.archived=!room.archived;audit(room.archived?'Archived':'Reopened',room.slug,action.reason||'Owner confirmation')
  }else return fail('Unsupported community action.')
  return {state:reconcileLikes(state)}
}
