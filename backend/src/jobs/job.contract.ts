import type { Id, Timestamp } from '../common/contracts/primitives.js';
/** Future work inventory, not a worker or scheduler. */
export type JobKind = 'transaction-reconciliation' | 'restriction-expiry' | 'notification-delivery' | 'account-export' | 'account-deletion';
export interface JobRequest { id: Id; kind: JobKind; requestedAt: Timestamp; subjectId: Id; }

