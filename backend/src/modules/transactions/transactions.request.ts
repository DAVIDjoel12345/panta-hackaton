/** Proposed request shapes only; no runtime validation or working operation. */
import type { CursorQuery } from '../../common/contracts/primitives.js';
export interface TransactionListRequest extends CursorQuery { walletAddress?: string; state?: string; }
export interface ReconcileTransactionRequest { signature: string; network: string; }
