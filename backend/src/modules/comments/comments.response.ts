/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
import type { CommentsState } from './comments.state.js';
export interface CommentResponse { id: Id; postId: Id; authorId: Id; parentCommentId?: Id; text?: string; status: CommentsState; version: number; createdAt: Timestamp; editedAt?: Timestamp; }
