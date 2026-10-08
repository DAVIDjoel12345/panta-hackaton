/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface SetFollowRequest { targetUserId: Id; following: boolean; }
