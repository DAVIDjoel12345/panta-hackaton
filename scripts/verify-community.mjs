import assert from 'node:assert/strict'
import {createCommunityState} from '../src/mocks/community.js'
import {permissions,visiblePosts,visibleCommentCount,safeCommunityLink} from '../src/features/community/permissions.js'
import {communityTransition} from '../src/features/community/model.js'
let state=createCommunityState(),checks=0
const ok=(value,message)=>{assert.ok(value,message);checks++}
const act=(actor,action,error=false)=>{const result=communityTransition(state,{room:'crypto',...action},actor,true);ok(error?result.error:!result.error,result.error||'Expected permission denial');if(!error)state=result.state;return result}
const p=(actor,room='crypto',post='demo-thread-1')=>permissions(state,state.communities.find(r=>r.slug===room),actor,true,state.posts.find(x=>x.id===post))
ok(p('demo-mira').owner,'Owner');ok(p('demo-jules').manage,'Moderator');ok(!p('demo-alex').manage,'Member cannot manage');ok(p('demo-restricted').canComment&&!p('demo-restricted').canPost,'Restrictions allow comments');ok(!p('demo-muted').canPost&&!p('demo-muted').canComment,'Mute disables writing');ok(p('demo-banned').read&&!p('demo-banned').canInteract,'Public ban retains reading');ok(!p('demo-visitor','research-lab',null).read,'Private visitor blocked')
act('demo-jules',{type:'role',user:'demo-alex',verb:'moderator'},true)
act('demo-jules',{type:'memberAction',user:'demo-mira',verb:'ban',reason:'Test'},true)
act('demo-alex',{type:'postAction',post:'demo-thread-1',verb:'remove',reason:'Test'},true)
act('demo-banned',{type:'membership'},true)
act('demo-alex',{type:'likeBegin',post:'demo-thread-1'});ok(state.posts[0].likes.includes('demo-alex'),'Optimistic like')
act('demo-alex',{type:'likeBegin',post:'demo-thread-1'},true)
act('demo-alex',{type:'likeResolve',post:'demo-thread-1',failed:true});ok(!state.posts[0].likes.includes('demo-alex'),'Rollback')
act('demo-alex',{type:'likeBegin',post:'demo-thread-1'});act('demo-mira',{type:'memberAction',user:'demo-alex',verb:'ban',reason:'Pending permission race'});ok(!state.posts[0].likes.includes('demo-alex')&&!Object.keys(state.pendingLikes).length,'Ban rolls back pending like')
act('demo-mira',{type:'memberAction',user:'demo-alex',verb:'unban',reason:'Reviewed'});act('demo-alex',{type:'membership'})
act('demo-alex',{type:'comment',post:'demo-thread-1',text:'Root comment'});let comment=state.comments.at(-1)
act('demo-alex',{type:'comment',post:'demo-thread-1',text:'Reply',parent:comment.id});let reply=state.comments.at(-1)
act('demo-alex',{type:'comment',post:'demo-thread-1',text:'Bounded reply',parent:reply.id});ok(state.comments.at(-1).parent===comment.id,'Bounded nesting')
const count=visibleCommentCount(state,'demo-thread-1');act('demo-alex',{type:'commentAction',post:'demo-thread-1',comment:comment.id,verb:'delete'});ok(visibleCommentCount(state,'demo-thread-1')===count-1&&state.comments.find(x=>x.id===comment.id).text==='','Deleted comment tombstone')
act('demo-jules',{type:'postAction',post:'demo-thread-1',verb:'lock'});act('demo-alex',{type:'comment',post:'demo-thread-1',text:'Blocked'},true)
act('demo-alex',{type:'report',post:'demo-thread-1',reason:'Spam'});act('demo-alex',{type:'report',post:'demo-thread-1',reason:'Spam'},true)
act('demo-alex',{type:'reviewReport',report:state.reports[0].id,verb:'resolved',reason:'No'},true)
act('demo-jules',{type:'reviewReport',report:state.reports[0].id,verb:'resolved',reason:'Reviewed context'})
act('demo-alex',{type:'membership',room:'research-lab'});ok(state.memberships['research-lab']['demo-alex'].status==='pending','Private request pending')
act('demo-mira',{type:'memberAction',room:'research-lab',user:'demo-alex',verb:'approve',reason:'Reviewed request'})
const value={title:'Private source',text:'Only approved readers',type:'Discussion',attachments:[],link:'',marketId:''}
let result=act('demo-alex',{type:'publish',room:'research-lab',value}),post=result.post
ok(state.posts.find(x=>x.id===post).status==='pending','Approval required')
act('demo-jules',{type:'publish',room:'research-lab',post,value:{...value,text:'Rewrite'}},true)
act('demo-jules',{type:'postAction',room:'research-lab',post,verb:'approve'})
act('demo-alex',{type:'savePost',room:'research-lab',post})
act('demo-mira',{type:'memberAction',room:'research-lab',user:'demo-alex',verb:'revoke',reason:'Access ended'})
ok(!p('demo-alex','research-lab',post).canViewPost,'Revocation hides saved content');act('demo-alex',{type:'savePost',room:'research-lab',post});ok(!state.saved['demo-alex'].includes(post),'Unavailable bookmark removable')
ok(!visiblePosts(state,state.communities.find(x=>x.slug==='research-lab'),'demo-visitor',false).length,'No private visitor content')
act('demo-mira',{type:'postAction',room:'crypto',post,verb:'remove',reason:'Cross room'},true)
act('demo-mira',{type:'clock'});ok(p('demo-muted').canPost,'Mute expires')
act('demo-mira',{type:'membership'},true);act('demo-mira',{type:'role',user:'demo-alex',verb:'transfer',reason:'Transfer confirmed'});ok(p('demo-alex').owner&&!p('demo-mira').owner,'Ownership transfers atomically');act('demo-mira',{type:'membership'})
ok(!safeCommunityLink('javascript:alert(1)')&&safeCommunityLink('https://example.com'),'Unsafe links blocked')
console.log('PASS: '+checks+' community permission and state-transition assertions.')
