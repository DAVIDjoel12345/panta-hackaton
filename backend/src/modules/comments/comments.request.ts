/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey } from '../../common/contracts/primitives.js';
export interface CommentWriteRequest { text: string; parentCommentId?: Id; expectedVersion?: number; idempotencyKey: IdempotencyKey; }
