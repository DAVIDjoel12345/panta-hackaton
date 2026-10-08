/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey, CursorQuery } from '../../common/contracts/primitives.js';
export interface JoinCommunityRequest { communityId: Id; idempotencyKey: IdempotencyKey; }
export interface ReviewMembershipRequest { membershipId: Id; decision: 'approve' | 'reject'; reason: string; }
export interface AssignModeratorRequest { userId: Id; moderator: boolean; }
export interface MembershipListRequest extends CursorQuery { status?: string; }
