/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface LikeResponse { targetId: Id; targetType: 'post' | 'comment'; liked: boolean; count: number; }
export interface LikeRecord { id: Id; userId: Id; targetType: 'post' | 'comment'; targetId: Id; createdAt: Timestamp; }
