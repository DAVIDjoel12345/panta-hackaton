/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface MarketHistoryRequest { marketId: Id; from?: Timestamp; to?: Timestamp; interval?: string; }
