/** Domain vocabulary only; no state transitions are implemented. */
export type TransactionsState = 'draft' | 'quote-requested' | 'quote-ready' | 'quote-expired' | 'awaiting-approval' | 'submitted' | 'pending' | 'confirmed' | 'failed' | 'expired' | 'confirmation-unknown';
