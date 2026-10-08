import type { Id } from '../../common/contracts/primitives.js';
import type { LikeRecord } from './likes.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface LikesRepository {
  findById(id: Id): Promise<LikeRecord | null>;
  save(record: LikeRecord): Promise<void>;
}
