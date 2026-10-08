/** Application contracts only. Strings do not validate input at runtime. */
export type Id = string;
export type Timestamp = string;
export type RequestId = string;
export type IdempotencyKey = string;
export interface RequestContext { requestId: RequestId; actorId: Id; }
export interface Freshness { observedAt: Timestamp; staleAfter?: Timestamp; source: string; }
export interface WalletBinding { walletAddress: string; network: string; }
/** Provider payload is deliberately unresolved; no provider fields are assumed. */
export interface UnresolvedProviderData { providerReference: string; payload: unknown; }
export interface SourceReference { label: string; url?: string; observedAt?: Timestamp; }
export interface ValidationIssue { field: string; code: string; message: string; }
export interface CursorQuery { cursor?: string; limit?: number; }
export interface Page<T> { items: T[]; nextCursor?: string; }
export interface AcceptedRequest { requestId: RequestId; requestedAt: Timestamp; }

