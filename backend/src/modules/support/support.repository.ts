import type { Id } from '../../common/contracts/primitives.js';
import type { SupportTicketResponse } from './support.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface SupportRepository {
  findById(id: Id): Promise<SupportTicketResponse | null>;
  save(record: SupportTicketResponse): Promise<void>;
}
