/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey } from '../../common/contracts/primitives.js';
export interface SetLikeRequest { targetType: 'post' | 'comment'; targetId: Id; liked: boolean; idempotencyKey: IdempotencyKey; }
