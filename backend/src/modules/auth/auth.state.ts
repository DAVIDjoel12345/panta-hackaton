/** Domain vocabulary only; no state transitions are implemented. */
export type AuthState = 'challenge-issued' | 'verification-pending' | 'verified' | 'expired' | 'consumed' | 'rejected';
