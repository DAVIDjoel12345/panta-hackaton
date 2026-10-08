/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface AnalysisRequest { marketId: Id; contextVersion?: string; }
export interface AnalysisContextRequest { marketId: Id; }
