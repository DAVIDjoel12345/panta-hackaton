/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, CursorQuery } from '../../common/contracts/primitives.js';
export interface CreatorMarketsRequest extends CursorQuery { creatorId: Id; }
