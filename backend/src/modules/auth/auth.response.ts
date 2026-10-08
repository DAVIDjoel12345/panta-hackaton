/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface WalletChallengeResponse { id: Id; walletAddress: string; nonce: string; domain: string; issuedAt: Timestamp; expiresAt: Timestamp; purpose: 'sign-in' | 'associate-wallet' | 'reauthentication'; }
/** Internal proof reference, not a bearer token or automatically created session. */
export interface IdentityProofResponse { proofId: Id; userId: Id; verifiedAt: Timestamp; }
export interface AuthChallengeRecord { id: Id; walletAddress: string; nonce: string; canonicalMessage: string; purpose: string; domain: string; issuedAt: Timestamp; expiresAt: Timestamp; consumedAt?: Timestamp; }
