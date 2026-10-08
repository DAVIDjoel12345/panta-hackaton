/** Proposed request shapes only; no runtime validation or working operation. */
import type { Timestamp, SourceReference } from '../../common/contracts/primitives.js';
export interface MarketDraftInput { question: string; description: string; outcomes: { yes: string; no: string }; category: string; closesAt: Timestamp; timezone: string; resolutionSource: SourceReference; observationCriteria: string; }
export interface SaveMarketDraftRequest { draft: MarketDraftInput; expectedVersion?: number; }
export interface AiDraftRequest { prompt: string; sourceReferences?: SourceReference[]; }
