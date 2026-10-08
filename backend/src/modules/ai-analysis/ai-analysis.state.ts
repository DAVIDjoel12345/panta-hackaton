/** Domain vocabulary only; no state transitions are implemented. */
export type AiAnalysisState = 'requested' | 'pending' | 'available' | 'failed' | 'stale';
