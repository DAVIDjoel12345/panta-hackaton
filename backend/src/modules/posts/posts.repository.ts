import type { Id } from '../../common/contracts/primitives.js';
import type { PostResponse } from './posts.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface PostsRepository {
  findById(id: Id): Promise<PostResponse | null>;
  save(record: PostResponse): Promise<void>;
}
