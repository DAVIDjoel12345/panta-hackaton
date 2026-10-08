import type { Id } from '../../common/contracts/primitives.js';
import type { CreationIntentResponse } from './market-creation.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface MarketCreationRepository {
  findById(id: Id): Promise<CreationIntentResponse | null>;
  save(record: CreationIntentResponse): Promise<void>;
}
