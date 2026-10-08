/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp, WalletBinding } from '../../common/contracts/primitives.js';
import type { TransactionsState } from './transactions.state.js';
export interface TransactionResponse { id: Id; userId: Id; intentId: Id; signature?: string; binding: WalletBinding; state: TransactionsState; observedAt?: Timestamp; }
/** Observation only; a local status is never independent chain authority. */
export type TransactionObservation = TransactionResponse;
