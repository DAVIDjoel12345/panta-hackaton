import type { Id } from '../../common/contracts/primitives.js';
import type { MarketMetadata } from './markets.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface MarketsRepository {
  findById(id: Id): Promise<MarketMetadata | null>;
  save(record: MarketMetadata): Promise<void>;
}
