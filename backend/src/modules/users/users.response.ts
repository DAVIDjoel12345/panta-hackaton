/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface CurrentUserResponse { id: Id; username?: string; email?: string; emailVerified: boolean; createdAt: Timestamp; }
export type UserRecord = CurrentUserResponse;
