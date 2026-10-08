import type { Id } from '../../common/contracts/primitives.js';
import type { NotificationResponse } from './notifications.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface NotificationsRepository {
  findById(id: Id): Promise<NotificationResponse | null>;
  save(record: NotificationResponse): Promise<void>;
}
