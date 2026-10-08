import type { Id } from '../../common/contracts/primitives.js';
import type { CreatorFeeIntentResponse } from './creator-fees.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface CreatorFeesRepository {
  findById(id: Id): Promise<CreatorFeeIntentResponse | null>;
  save(record: CreatorFeeIntentResponse): Promise<void>;
}
