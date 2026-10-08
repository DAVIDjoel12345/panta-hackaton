import type { Id } from '../../common/contracts/primitives.js';
import type { ClaimIntentResponse } from './claims.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface ClaimsRepository {
  findById(id: Id): Promise<ClaimIntentResponse | null>;
  save(record: ClaimIntentResponse): Promise<void>;
}
