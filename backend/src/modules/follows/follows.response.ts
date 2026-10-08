/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface FollowResponse { id: Id; followerId: Id; followedId: Id; createdAt: Timestamp; }
