import type { Id, Timestamp } from '../common/contracts/primitives.js';
/** No event bus, outbox or subscriptions are running. */
export interface DomainEvent<T> { id: Id; aggregateId: Id; occurredAt: Timestamp; schemaVersion: number; payload: T; }

