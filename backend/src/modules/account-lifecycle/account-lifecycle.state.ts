/** Domain vocabulary only; no state transitions are implemented. */
export type AccountLifecycleState = 'requested' | 'review-required' | 'pending' | 'complete' | 'failed' | 'cancelled';
