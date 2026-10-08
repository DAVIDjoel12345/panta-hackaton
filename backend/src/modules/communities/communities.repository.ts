import type { Id } from '../../common/contracts/primitives.js';
import type { CommunityResponse } from './communities.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface CommunitiesRepository {
  findById(id: Id): Promise<CommunityResponse | null>;
  save(record: CommunityResponse): Promise<void>;
}
