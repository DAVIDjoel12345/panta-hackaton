/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
import type { MembershipsState } from './memberships.state.js';
export type CommunityRole = 'owner' | 'moderator' | 'member';
export interface MembershipResponse { id: Id; communityId: Id; userId: Id; role: CommunityRole; status: MembershipsState; reason?: string; expiresAt?: Timestamp; }
export interface PublicMemberResponse { userId: Id; displayName: string; role: CommunityRole; }
