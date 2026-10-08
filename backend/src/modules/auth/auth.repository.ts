import type { Id } from '../../common/contracts/primitives.js';
import type { AuthChallengeRecord } from './auth.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface AuthRepository {
  findById(id: Id): Promise<AuthChallengeRecord | null>;
  save(record: AuthChallengeRecord): Promise<void>;
}
