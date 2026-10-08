/** Proposed request shapes only; no runtime validation or working operation. */
import type { CursorQuery } from '../../common/contracts/primitives.js';
export interface LeaderboardRequest extends CursorQuery { category?: string; methodologyVersion?: string; }
