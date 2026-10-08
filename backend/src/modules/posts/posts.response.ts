/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
import type { PostsState } from './posts.state.js';
export interface PostResponse { id: Id; communityId: Id; authorId: Id; content: import('./posts.request.js').PostInput; status: PostsState; createdAt: Timestamp; editedAt?: Timestamp; version: number; commentsLocked: boolean; pinned: boolean; }
export interface AttachmentAuthorizationResponse { attachmentId: Id; uploadInstructions: unknown; expiresAt: Timestamp; }
