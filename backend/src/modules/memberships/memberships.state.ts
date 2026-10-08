/** Domain vocabulary only; no state transitions are implemented. */
export type MembershipsState = 'not-joined' | 'pending' | 'active' | 'muted' | 'posting-restricted' | 'banned' | 'left' | 'rejected' | 'revoked';
