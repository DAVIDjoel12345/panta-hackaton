import type { Id } from '../../common/contracts/primitives.js';
import type { SessionRecord } from './sessions.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface SessionsRepository {
  findById(id: Id): Promise<SessionRecord | null>;
  save(record: SessionRecord): Promise<void>;
}
