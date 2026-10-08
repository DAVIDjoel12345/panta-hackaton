export function membership(state,slug,actor){const item=state.memberships[slug]?.[actor]||{role:'member',status:'not-joined'};return item.status==='muted'&&item.until&&Date.parse(item.until)<=Date.parse(state.clock)?{...item,status:'active',expired:true}:item}
export function permissions(state,room,actor,authenticated,post=null){
  const member=membership(state,room?.slug,actor)
  const signed=authenticated&&actor!=='demo-visitor'
  const active=signed&&['active','muted','restricted'].includes(member.status)
  const owner=active&&member.role==='owner',moderator=active&&member.role==='moderator',manage=owner||moderator
  const read=!!room&&(room.visibility==='public'||active)&&(!post||post.room===room.slug)
  const participate=read&&active&&!room?.archived
  const postAllowed=participate&&member.status==='active'&&(room.postingPolicy!=='staff'||manage)
  const comment=participate&&['active','restricted'].includes(member.status)&&room.commentsEnabled&&!post?.locked&&(!post||post.status==='published')
  return {member,signed,active,owner,moderator,manage,read,canJoin:signed&&!active&&!room?.archived&&!['banned','pending'].includes(member.status),canLeave:active&&!owner,canPost:postAllowed,canComment:comment,canInteract:participate,canReport:signed&&read&&member.status!=='banned',approval:postAllowed&&!manage&&(room.approval||room.postingPolicy==='approval'),canEdit:postAllowed&&post?.author===actor&&['published','pending','rejected','draft'].includes(post?.status),canDelete:signed&&read&&post?.author===actor&&post?.status!=='deleted',canViewPost:read&&!!post&&(post.status==='published'||(signed&&(post.author===actor||manage))),canRestrict:target=>manage&&target!==actor&&state.memberships[room.slug]?.[target]?.role!=='owner'&&(owner||state.memberships[room.slug]?.[target]?.role!=='moderator')}
}
export function visiblePosts(state,room,actor,authenticated){return state.posts.filter(p=>p.room===room.slug&&permissions(state,room,actor,authenticated,p).canViewPost)}
export const visibleCommentCount=(state,id)=>state.comments.filter(c=>c.post===id&&c.status==='published').length
export function safeCommunityLink(value){if(!value)return '';try{const url=new URL(value);return ['http:','https:'].includes(url.protocol)?url.href:''}catch{return ''}}
