import type { Id } from '../../common/contracts/primitives.js';
import type { TransactionObservation } from './transactions.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface TransactionsRepository {
  findById(id: Id): Promise<TransactionObservation | null>;
  save(record: TransactionObservation): Promise<void>;
}
