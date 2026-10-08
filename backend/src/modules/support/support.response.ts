/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
import type { SupportState } from './support.state.js';
export interface SupportTicketResponse { id: Id; userId: Id; status: SupportState; createdAt: Timestamp; }
