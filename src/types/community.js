/**
 * @typedef {'member'|'moderator'|'owner'} CommunityRole
 * @typedef {'not-joined'|'pending'|'active'|'muted'|'restricted'|'banned'|'rejected'|'revoked'} MembershipStatus
 * @typedef {{role:CommunityRole,status:MembershipStatus,reason?:string,until?:string}} Membership
 * @typedef {{slug:string,owner:string,visibility:'public'|'private',postingPolicy:'members'|'staff'|'approval',approval:boolean,commentsEnabled:boolean}} Community
 * @typedef {{id:string,room:string,author:string,text:string,status:'draft'|'pending'|'published'|'rejected'|'removed'|'deleted'}} CommunityPost
 * @typedef {Object} CommunityService
 * @property {(slug:string)=>Promise<Community>} getCommunity Must authorize before returning private data.
 * @property {(slug:string,cursor?:string)=>Promise<{items:CommunityPost[],cursor?:string}>} listPosts Server filters visibility and membership.
 * @property {(slug:string,input:Partial<CommunityPost>)=>Promise<CommunityPost>} publishPost Server enforces role, restrictions, approval and upload ownership.
 * @property {(postId:string,liked:boolean,idempotencyKey:string)=>Promise<{count:number,liked:boolean}>} setLike Atomic, idempotent per user.
 * @property {(slug:string,memberId:string,restriction:Membership,reason:string)=>Promise<void>} restrictMember Server checks authority and owner immunity.
 * @property {(slug:string,nextOwner:string)=>Promise<void>} transferOwnership Atomic transfer after verified consent.
 * @property {(contentId:string,reason:string,explanation:string)=>Promise<void>} reportContent Reporter identity is never public.
 * @property {(slug:string,listener:Function)=>()=>void} subscribe Authorization applies to every streamed event and reconnect.
 * No production adapter exists. Client selectors are UX rules, not authorization.
 */
export {}
