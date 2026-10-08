/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface SavedContentResponse { id: Id; userId: Id; targetType: 'market' | 'community' | 'post' | 'analysis'; targetId: Id; savedAt: Timestamp; available: boolean; }
