import { rooms, profiles, initialComments } from '../demo/fixtures.js'
export const communityUsers=[...profiles,{id:'demo-muted',name:'Sam Rivers',initials:'SR',color:'orange'},{id:'demo-restricted',name:'Taylor Reed',initials:'TR',color:'pink'},{id:'demo-banned',name:'Casey Lane',initials:'CL',color:'blue'},{id:'demo-visitor',name:'Visitor',initials:'V',color:'purple'}]
export const communityClock='2026-10-05T16:00:00Z'
export const postTypes=['Discussion','Question','Analysis','Announcement']
export const attachmentPolicy={types:['image/jpeg','image/png','image/webp'],maxBytes:5*1024*1024,maxCount:4}
export function createCommunityState(){
  const memberships={}
  for(const room of rooms)memberships[room.slug]={
    'demo-mira':{role:'owner',status:'active'},'demo-jules':{role:'moderator',status:'active'},'demo-alex':{role:'member',status:room.slug==='crypto'?'active':'not-joined'},
    'demo-muted':{role:'member',status:'muted',until:'2026-10-06T16:00:00Z',reason:'Repeated off-topic replies.'},'demo-restricted':{role:'member',status:'restricted',reason:'Posts need a source. Comments are still allowed.'},'demo-banned':{role:'member',status:'banned',reason:'Repeated spam after a warning.'},
  }
  memberships['research-lab']={'demo-mira':{role:'owner',status:'active'},'demo-jules':{role:'moderator',status:'active'},'demo-alex':{role:'member',status:'not-joined'}}
  const communities=rooms.map(r=>({...r,owner:'demo-mira',visibility:'public',membershipPolicy:'open',postingPolicy:'members',commentsEnabled:true,approval:false,rules:'Cite your sources. Discuss ideas respectfully. No spam, harassment, or promises of returns.',archived:false,cover:r.color,avatar:r.name.slice(0,2).toUpperCase()}))
  communities.push({slug:'research-lab',name:'Research Lab',description:'A private space for approved members. Request access to participate.',category:'Science',icon:'shield',color:'purple',owner:'demo-mira',visibility:'private',membershipPolicy:'approval',postingPolicy:'approval',commentsEnabled:true,approval:true,rules:'Keep member discussions private. Share sources respectfully.',archived:false,cover:'purple',avatar:'RL'})
  const posts=initialComments.map((c,i)=>({id:c.id,room:c.room,author:c.author,title:i?'What makes a benchmark reproducible?':'Read the source before reading the price',text:c.text,type:i?'Question':'Analysis',marketId:c.marketId,link:'',attachments:[],status:'published',createdAt:communityClock,edited:false,pinned:i===0,locked:false,likes:i?[]:['demo-jules']}))
  posts.push({id:'demo-post-welcome',room:'crypto',author:'demo-mira',title:'Welcome to the Crypto Collective',text:'Bring a question, a source, or a different perspective. Start by reviewing our community rules.',type:'Announcement',marketId:'',link:'',attachments:[],status:'published',createdAt:'2026-10-05T15:00:00Z',edited:false,pinned:true,locked:false,likes:[]})
  posts.push({id:'demo-post-pending',room:'crypto',author:'demo-alex',title:'A draft ready for review',text:'Which observation window makes this market easiest to resolve?',type:'Question',marketId:'demo-btc',link:'',attachments:[],status:'pending',createdAt:communityClock,edited:false,pinned:false,locked:false,likes:[]})
  return {communities,memberships,posts,comments:[{id:'demo-comment-1',post:'demo-thread-1',author:'demo-jules',text:'The UTC observation window is an important part of the criteria.',parent:null,status:'published',createdAt:communityClock,likes:[],edited:false}],saved:{},drafts:{},reports:[],history:[],notifications:[],pendingLikes:{},failures:{},clock:communityClock,next:1}
}
