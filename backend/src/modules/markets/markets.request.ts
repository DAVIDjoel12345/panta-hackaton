/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, CursorQuery } from '../../common/contracts/primitives.js';
export interface MarketListRequest extends CursorQuery { search?: string; category?: string; sort?: string; lifecycle?: string; }
export interface MarketComparisonRequest { marketIds: Id[]; }
