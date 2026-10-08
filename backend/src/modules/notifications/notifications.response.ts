/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface NotificationResponse { id: Id; recipientId: Id; eventId: Id; title: string; targetPath: string; readAt?: Timestamp; createdAt: Timestamp; }
export interface NotificationPreferencesResponse { userId: Id; inApp: boolean; email?: boolean; }
