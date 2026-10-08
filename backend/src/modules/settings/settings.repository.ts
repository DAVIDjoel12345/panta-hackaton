import type { Id } from '../../common/contracts/primitives.js';
import type { SettingsResponse } from './settings.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface SettingsRepository {
  findById(id: Id): Promise<SettingsResponse | null>;
  save(record: SettingsResponse): Promise<void>;
}
