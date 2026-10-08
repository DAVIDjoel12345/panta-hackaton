import type { Id } from '../../common/contracts/primitives.js';
import type { UserRecord } from './users.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface UsersRepository {
  findById(id: Id): Promise<UserRecord | null>;
  save(record: UserRecord): Promise<void>;
}
