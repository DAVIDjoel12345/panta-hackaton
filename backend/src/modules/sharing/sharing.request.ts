/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface CanonicalLinkRequest { targetType: 'community' | 'post' | 'market'; targetId: Id; }
