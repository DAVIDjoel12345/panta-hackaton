import type { Id } from '../../common/contracts/primitives.js';
import type { AnalysisResponse } from './ai-analysis.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface AiAnalysisRepository {
  findById(id: Id): Promise<AnalysisResponse | null>;
  save(record: AnalysisResponse): Promise<void>;
}
