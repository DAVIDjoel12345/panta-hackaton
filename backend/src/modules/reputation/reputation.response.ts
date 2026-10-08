/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface ForecastRecord { id: Id; userId: Id; marketId: Id; outcomeReference: string; probability: number; recordedAt: Timestamp; }
export interface ReputationResponse { userId: Id; methodologyVersion?: string; score?: number; sampleSize?: number; explanation: string; }
