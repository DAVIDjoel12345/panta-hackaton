/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface ForecastRequest { marketId: Id; outcomeReference: string; probability: number; }
export interface ReputationRequest { userId: Id; methodologyVersion?: string; }
