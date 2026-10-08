import type { Id } from '../../common/contracts/primitives.js';
import type { ForecastRecord } from './reputation.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface ReputationRepository {
  findById(id: Id): Promise<ForecastRecord | null>;
  save(record: ForecastRecord): Promise<void>;
}
