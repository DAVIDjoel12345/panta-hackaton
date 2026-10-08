import {DatabaseSync} from 'node:sqlite';
import {mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {randomBytes,randomUUID,scrypt as derive,timingSafeEqual,createHash} from 'node:crypto';
import {promisify} from 'node:util';
import {Subject} from 'rxjs';
import {BadRequestException,UnauthorizedException,ForbiddenException,ConflictException,HttpException} from '@nestjs/common';
import {communityTransition} from './model.js';
import {permissions} from './permissions.js';
import {aiProvider} from './ai-provider.js';
const scrypt=promisify(derive),hash=value=>createHash('sha256').update(value).digest('hex');
const empty=()=>({communities:[],memberships:{},posts:[],comments:[],saved:{},drafts:{},reports:[],history:[],notifications:[],pendingLikes:{},failures:{},clock:new Date().toISOString(),next:1});
const fail=message=>{throw new BadRequestException({code:'VALIDATION_FAILED',message})};
const text=(value,min,max)=>{if(typeof value!=='string'||value.trim().length<min||value.length>max)fail(`Expected text between ${min} and ${max} characters.`);return value.trim()};
const oneOf=(value,values)=>{if(!values.includes(value))fail('Unsupported option.');return value};
export class RuntimeStore {
  events=new Subject();
  attempts=new Map();
  constructor(){
    const file=process.env.APP_DATABASE_PATH||resolve('data/panta.sqlite');
    if(file!==':memory:')mkdirSync(dirname(file),{recursive:true});
    this.db=new DatabaseSync(file);this.db.exec(`PRAGMA journal_mode=WAL; PRAGMA foreign_keys=ON;
      CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,email TEXT UNIQUE NOT NULL,name TEXT NOT NULL,salt TEXT NOT NULL,password_hash TEXT NOT NULL,settings TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id TEXT NOT NULL REFERENCES users(id),expires INTEGER NOT NULL);
      CREATE TABLE IF NOT EXISTS documents(id TEXT PRIMARY KEY,value TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS commands(user_id TEXT NOT NULL,request_id TEXT NOT NULL,payload_hash TEXT NOT NULL,result TEXT NOT NULL,PRIMARY KEY(user_id,request_id));`);
    this.db.exec('CREATE TABLE IF NOT EXISTS market_drafts(user_id TEXT NOT NULL REFERENCES users(id),id TEXT NOT NULL,value TEXT NOT NULL,PRIMARY KEY(user_id,id))');
    this.db.prepare('INSERT OR IGNORE INTO documents VALUES (?,?)').run('community',JSON.stringify(empty()));
  }
  onModuleDestroy(){this.events.complete();this.db.close()}
  rate(key,limit=20){const now=Date.now();if(this.attempts.size>10000)for(const [k,v]of this.attempts)if(v.until<now)this.attempts.delete(k);let item=this.attempts.get(key);if(!item||item.until<now){item={until:now+60000,count:0};this.attempts.set(key,item)}if(++item.count>limit)throw new HttpException({code:'RATE_LIMITED',message:'Please wait a minute before trying again.'},429)}
  user(cookie=''){
    const tokens=String(cookie).split(';').map(x=>x.trim()).filter(x=>x.startsWith('panta_session=')).map(x=>x.slice(14));
    if(!tokens.length)return null;
    const lookup=this.db.prepare('SELECT u.* FROM users u JOIN sessions s ON s.user_id=u.id WHERE s.token_hash=? AND s.expires>?');
    const row=tokens.map(token=>lookup.get(hash(token),Date.now())).find(Boolean);
    return row?{id:row.id,name:row.name,email:row.email,settings:JSON.parse(row.settings),emailVerified:false}:null;
  }
  require(cookie){const user=this.user(cookie);if(!user)throw new UnauthorizedException({code:'AUTH_REQUIRED',message:'Sign in to continue.'});return user}
  async authenticate(input,register,ip){
    this.rate('auth:'+ip,12);const email=text(input?.email,3,254).toLowerCase(),password=input?.password;
    if(typeof password!=='string'||password.length<12||password.length>128)fail('Password must contain 12 to 128 characters.');
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))fail('Enter a valid email address.');
    let row=this.db.prepare('SELECT * FROM users WHERE email=?').get(email);
    if(register){
      if(row)throw new ConflictException({code:'CONFLICT',message:'Unable to register this email. Try signing in.'});
      const name=text(input.name,2,70),salt=randomBytes(16).toString('hex'),passwordHash=(await scrypt(password,salt,64)).toString('hex');
      const id=randomUUID(),settings={name,bio:'',email,digest:false,marketAlerts:false,profileVisible:true,theme:'dark',compact:false};
      try{this.db.prepare('INSERT INTO users VALUES (?,?,?,?,?,?)').run(id,email,name,salt,passwordHash,JSON.stringify(settings))}catch{throw new ConflictException({code:'CONFLICT',message:'Unable to register this email.'})}
      row={id};
    }else{
      const derived=await scrypt(password,row?.salt||'invalid-account-timing-salt',64);
      if(!row||!timingSafeEqual(Buffer.from(row.password_hash,'hex'),derived))throw new UnauthorizedException({code:'AUTH_REQUIRED',message:'Email or password is incorrect.'});
    }
    const token=randomBytes(32).toString('hex');this.db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(hash(token),row.id,Date.now()+7*86400000);return token;
  }
  logout(cookie){const tokens=String(cookie||'').split(';').map(x=>x.trim()).filter(x=>x.startsWith('panta_session=')).map(x=>x.slice(14));for(const token of tokens)this.db.prepare('DELETE FROM sessions WHERE token_hash=?').run(hash(token));this.changed()}
  changed(){this.events.next({data:{type:'changed'}})}
  load(){const state=JSON.parse(this.db.prepare('SELECT value FROM documents WHERE id=?').get('community').value);state.clock=new Date().toISOString();return state}
  persist(state){this.db.prepare('UPDATE documents SET value=? WHERE id=?').run(JSON.stringify(state),'community')}
  bootstrap(cookie){const ai=aiProvider();return {user:this.user(cookie),capabilities:{community:true,profiles:true,settings:true,notifications:true,emailPassword:true,markets:!!process.env.PANTA_API_KEY,trading:false,claims:false,ai:!!ai.key,wallet:false},storage:'sqlite',serverTime:new Date().toISOString(),providers:{ai:{provider:ai.provider,configured:!!ai.key},markets:{provider:'Panta',configured:!!process.env.PANTA_API_KEY}},version:1}}
  snapshot(cookie){
    const user=this.user(cookie),actor=user?.id||'visitor',state=this.load();
    const accessible=new Set(state.communities.filter(r=>permissions(state,r,actor,!!user).read).map(r=>r.slug));
    const staff=new Set(state.communities.filter(r=>permissions(state,r,actor,!!user).manage).map(r=>r.slug));
    state.posts=state.posts.filter(post=>permissions(state,state.communities.find(r=>r.slug===post.room),actor,!!user,post).canViewPost).map(post=>['removed','deleted'].includes(post.status)?{...post,text:'',title:'',attachments:[]}:post);
    const posts=new Set(state.posts.filter(p=>p.status==='published').map(p=>p.id));state.comments=state.comments.filter(c=>posts.has(c.post));
    state.memberships=Object.fromEntries(Object.entries(state.memberships).map(([slug,members])=>[slug,accessible.has(slug)?Object.fromEntries(Object.entries(members).map(([id,m])=>[id,staff.has(slug)||id===actor?m:{role:m.role,status:m.status}])):members[actor]?{[actor]:members[actor]}:{}]));
    state.reports=state.reports.filter(r=>staff.has(r.room)).map(({reporter:_reporter,...report})=>report);state.history=state.history.filter(r=>staff.has(r.room));state.notifications=state.notifications.filter(n=>n.user===actor);
    state.saved=user?{[actor]:state.saved[actor]||[]}:{};state.drafts=user?Object.fromEntries(Object.entries(state.drafts).filter(([key])=>key.startsWith(actor+':')&&accessible.has(key.slice(actor.length+1)))):{};
    state.users=this.db.prepare('SELECT id,name,settings FROM users').all().map(u=>({id:u.id,name:u.name,bio:JSON.parse(u.settings).profileVisible?JSON.parse(u.settings).bio:'',initials:u.name.split(' ').map(x=>x[0]).join('').slice(0,2).toUpperCase(),color:'purple'}));
    return state;
  }
  validate(input){
    if(!input||typeof input!=='object'||Array.isArray(input))fail('Invalid command.');
    const type=oneOf(input.type,['appeal','removeSaved','createRoom','membership','savePost','publish','draft','comment','commentAction','postAction','report','reviewReport','memberAction','role','settings','archive','like']);
    const action={type};
    for(const key of ['room','post','comment','parent','user','report'])if(['constructor','prototype','__proto__'].includes(input[key]))fail('Invalid identifier.');for(const key of ['room','post','comment','parent','user','report','requestId'])if(input[key]!==undefined)action[key]=text(input[key],1,150);
    if(input.reason!==undefined)action.reason=text(input.reason,0,2000);
    if(input.explanation!==undefined)action.explanation=text(input.explanation,0,1500);
    if(type==='comment'||type==='commentAction'&&input.verb==='edit')action.text=text(input.text,1,2000);
    const verbs={commentAction:['edit','delete','remove'],postAction:['delete','pin','lock','announce','approve','reject','remove','restore'],reviewReport:['dismissed','resolved'],memberAction:['approve','reject','revoke','ban','unban','restrict','mute','lift'],role:['moderator','transfer']};
    if(verbs[type])action.verb=oneOf(input.verb,verbs[type]);
    if(type==='role'&&input.role!==undefined)action.role=oneOf(input.role,['member','moderator']);
    if(type==='memberAction'&&action.verb==='mute'){action.hours=Number(input.hours);if(!Number.isFinite(action.hours)||action.hours<1||action.hours>720)fail('Mute duration must be 1–720 hours.')}
    if(['createRoom','settings'].includes(type)){
      const v=input.value;if(!v)fail('Community details are required.');
      if(['constructor','prototype','__proto__'].includes(v.slug))fail('Invalid community slug.');
      action.value={name:text(v.name,3,70),slug:text(v.slug,1,60),description:text(v.description,10,1000),rules:text(v.rules,1,6000),category:text(v.category,1,60),avatar:text(v.avatar,1,3),cover:oneOf(v.cover,['purple','blue','orange','pink','green']),visibility:oneOf(v.visibility,['public','private']),membershipPolicy:oneOf(v.membershipPolicy,['open','approval']),postingPolicy:oneOf(v.postingPolicy,['members','staff','approval']),commentsEnabled:v.commentsEnabled===true,approval:v.approval===true};
    }
    if(['publish','draft'].includes(type)){
      const v=input.value;if(!v)fail('Post content is required.');
      if(v.attachments!==undefined&&!Array.isArray(v.attachments))fail('Invalid attachments.');
      if((v.attachments||[]).length>4)fail('At most four images are allowed.');
      const attachments=(v.attachments||[]).map(a=>{
        const match=typeof a?.url==='string'&&a.url.match(/^data:image\/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)$/);
        if(!match)fail('Only PNG, JPEG and WebP images are accepted.');
        const bytes=Buffer.from(match[2],'base64');if(bytes.length>5*1024*1024||bytes.length<12)fail('Images must be smaller than 5 MB.');
        const valid=match[1]==='png'?bytes.subarray(0,8).equals(Buffer.from([137,80,78,71,13,10,26,10])):match[1]==='jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:bytes.toString('ascii',0,4)==='RIFF'&&bytes.toString('ascii',8,12)==='WEBP';
        if(!valid)fail('Image content does not match its file type.');
        return {url:a.url,alt:text(a.alt||'Community attachment',1,300)};
      });
      if(v.marketId&&!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(v.marketId))fail('Use a valid Panta market address.');
      action.value={title:text(v.title||'',0,160),text:text(v.text||'',type==='publish'?1:0,10000),type:oneOf(v.type,['Discussion','Question','Analysis','Announcement']),link:text(v.link||'',0,2048),marketId:v.marketId||'',attachments};
    }
    return action;
  }
  command(cookie,input){
    const user=this.require(cookie);this.rate('write:'+user.id,120);const action=this.validate(input),requestId=text(input.requestId,1,150),payloadHash=hash(JSON.stringify(action));
    this.db.exec('BEGIN IMMEDIATE');
    try{
      const duplicate=this.db.prepare('SELECT * FROM commands WHERE user_id=? AND request_id=?').get(user.id,requestId);
      if(duplicate){if(duplicate.payload_hash!==payloadHash)throw new ConflictException('Request identifier already used.');this.db.exec('COMMIT');return {...JSON.parse(duplicate.result),state:this.snapshot(cookie)}}
      let state=this.load(),result;
      if(action.type==='removeSaved'){state.saved[user.id]=(state.saved[user.id]||[]).filter(id=>id!==action.post);result={state};
      }else if(action.type==='like'){
        result=communityTransition(state,{...action,type:'likeBegin'},user.id,true);
        if(!result.error)result=communityTransition(result.state,{...action,type:'likeResolve'},user.id,true);
      }else result=communityTransition(state,action,user.id,true);
      if(result.error)throw new ForbiddenException({code:'ACCESS_DENIED',message:result.error});
      state=result.state;this.persist(state);const reply=result.post?{post:result.post}:{};
      this.db.prepare('INSERT INTO commands VALUES (?,?,?,?)').run(user.id,requestId,payloadHash,JSON.stringify(reply));this.db.exec('COMMIT');this.changed();return {...reply,state:this.snapshot(cookie)};
    }catch(error){if(this.db.isTransaction)this.db.exec('ROLLBACK');throw error}
  }
  readNotifications(cookie,input){if(!input||typeof input!=='object'||Array.isArray(input))fail('Invalid notification update.');const user=this.require(cookie),state=this.load();state.notifications=state.notifications.map(n=>n.user===user.id&&(input.all===true||n.id===input.id)?{...n,read:input.all===true||input.read===true}:n);this.persist(state);this.changed();return {saved:true}}
  saveSettings(cookie,input){if(!input||typeof input!=='object'||Array.isArray(input))fail('Invalid settings.');const user=this.require(cookie),old=user.settings;const settings={...old,name:text(input.name??old.name,2,70),bio:text(input.bio??old.bio,0,1000),theme:oneOf(input.theme??old.theme,['dark','contrast','light','system']),compact:input.compact===undefined?old.compact:input.compact===true,profileVisible:input.profileVisible===undefined?old.profileVisible:input.profileVisible!==false};this.db.prepare('UPDATE users SET name=?,settings=? WHERE id=?').run(settings.name,JSON.stringify(settings),user.id);this.changed();return settings}
  marketDrafts(cookie,input){const user=this.require(cookie);if(input===undefined)return this.db.prepare('SELECT value FROM market_drafts WHERE user_id=?').all(user.id).map(row=>JSON.parse(row.value));if(!input||typeof input!=='object'||Array.isArray(input))fail('Invalid draft.');this.rate('draft:'+user.id,30);const id=input.id?text(input.id,1,100):randomUUID();const value={id,question:text(input.question,3,160),description:text(input.description||'',0,4000),category:text(input.category||'Technology',1,60),deadline:text(input.deadline||'',0,40),source:text(input.source||'',0,2048),criteria:text(input.criteria||'',0,2048),imageUrl:text(input.imageUrl||'',0,2048),startTime:text(input.startTime||'',0,40),resolutionTime:text(input.resolutionTime||'',0,40),marketType:oneOf(input.marketType||'standard',['standard','breaking']),eventInProgress:input.eventInProgress===true,updatedAt:new Date().toISOString()};if(value.source&&!/^https?:\/\//i.test(value.source))fail('Use an HTTP or HTTPS source URL.');this.db.prepare('INSERT INTO market_drafts VALUES (?,?,?) ON CONFLICT(user_id,id) DO UPDATE SET value=excluded.value').run(user.id,id,JSON.stringify(value));return value}
  accountExport(cookie){const user=this.require(cookie),state=this.snapshot(cookie);return {exportedAt:new Date().toISOString(),account:user,marketDrafts:this.marketDrafts(cookie),posts:state.posts.filter(p=>p.author===user.id),comments:state.comments.filter(c=>c.author===user.id),saved:state.saved[user.id]||[],drafts:state.drafts,notifications:state.notifications,conversations:this.db.prepare('SELECT id,title,messages,updated FROM conversations WHERE user_id=?').all(user.id).map(row=>({...row,messages:JSON.parse(row.messages)}))}}
  profile(id){const row=this.db.prepare('SELECT id,name,settings FROM users WHERE id=?').get(id);if(!row)return null;const settings=JSON.parse(row.settings);return {id:row.id,name:row.name,bio:settings.profileVisible?settings.bio:'',profileVisible:settings.profileVisible}}
}
