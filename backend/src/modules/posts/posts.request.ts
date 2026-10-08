/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey, CursorQuery } from '../../common/contracts/primitives.js';
export interface PostInput { title?: string; text: string; category: 'discussion' | 'question' | 'analysis' | 'announcement'; sourceUrl?: string; marketId?: Id; attachmentIds: Id[]; }
export interface PostWriteRequest { content: PostInput; expectedVersion?: number; idempotencyKey: IdempotencyKey; }
export interface PostFeedRequest extends CursorQuery { sort?: 'latest' | 'popular' | 'announcements'; search?: string; category?: string; }
export interface AttachmentAuthorizationRequest { filename: string; mediaType: string; byteLength: number; communityId: Id; }
export interface PostReviewRequest { decision: 'approve' | 'reject'; reason: string; }
export interface PostPolicyRequest { pinned?: boolean; commentsLocked?: boolean; announcement?: boolean; }
