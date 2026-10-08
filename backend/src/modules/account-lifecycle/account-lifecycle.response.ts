/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
import type { AccountLifecycleState } from './account-lifecycle.state.js';
export interface AccountLifecycleResponse { id: Id; userId: Id; kind: 'export' | 'deletion'; status: AccountLifecycleState; requestedAt: Timestamp; completedAt?: Timestamp; }
