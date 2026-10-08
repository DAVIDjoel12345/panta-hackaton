import type { Id } from '../../common/contracts/primitives.js';
import type { MarketDraftResponse } from './market-drafts.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface MarketDraftsRepository {
  findById(id: Id): Promise<MarketDraftResponse | null>;
  save(record: MarketDraftResponse): Promise<void>;
}
