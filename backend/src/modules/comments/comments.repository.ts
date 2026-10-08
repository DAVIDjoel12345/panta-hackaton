import type { Id } from '../../common/contracts/primitives.js';
import type { CommentResponse } from './comments.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface CommentsRepository {
  findById(id: Id): Promise<CommentResponse | null>;
  save(record: CommentResponse): Promise<void>;
}
