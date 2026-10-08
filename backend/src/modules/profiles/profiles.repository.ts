import type { Id } from '../../common/contracts/primitives.js';
import type { ProfileRecord } from './profiles.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface ProfilesRepository {
  findById(id: Id): Promise<ProfileRecord | null>;
  save(record: ProfileRecord): Promise<void>;
}
