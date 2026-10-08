import type { Id } from '../../common/contracts/primitives.js';
import type { SavedContentResponse } from './saved-content.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface SavedContentRepository {
  findById(id: Id): Promise<SavedContentResponse | null>;
  save(record: SavedContentResponse): Promise<void>;
}
