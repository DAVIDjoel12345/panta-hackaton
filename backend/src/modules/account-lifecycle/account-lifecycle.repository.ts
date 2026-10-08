import type { Id } from '../../common/contracts/primitives.js';
import type { AccountLifecycleResponse } from './account-lifecycle.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface AccountLifecycleRepository {
  findById(id: Id): Promise<AccountLifecycleResponse | null>;
  save(record: AccountLifecycleResponse): Promise<void>;
}
