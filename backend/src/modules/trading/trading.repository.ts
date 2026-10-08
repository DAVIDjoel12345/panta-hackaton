import type { Id } from '../../common/contracts/primitives.js';
import type { TradeIntentResponse } from './trading.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface TradingRepository {
  findById(id: Id): Promise<TradeIntentResponse | null>;
  save(record: TradeIntentResponse): Promise<void>;
}
