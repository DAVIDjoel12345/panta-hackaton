import type { Id } from '../../common/contracts/primitives.js';
import type { FollowResponse } from './follows.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface FollowsRepository {
  findById(id: Id): Promise<FollowResponse | null>;
  save(record: FollowResponse): Promise<void>;
}
