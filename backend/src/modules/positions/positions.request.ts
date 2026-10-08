/** Proposed request shapes only; no runtime validation or working operation. */
import type { WalletBinding, CursorQuery } from '../../common/contracts/primitives.js';
export interface PositionListRequest extends WalletBinding, CursorQuery { lifecycle?: 'open' | 'resolved'; }
