/** Proposed application responses; not sample or runtime success data. */
import type { Id, Freshness, WalletBinding, UnresolvedProviderData } from '../../common/contracts/primitives.js';
import type { ClaimsState } from './claims.state.js';
export type ClaimEligibility = 'unknown' | 'eligible' | 'ineligible' | 'already-claimed';
export interface ClaimablePositionResponse { positionId: Id; eligibility: ClaimEligibility; freshness?: Freshness; }
export interface ClaimEligibilityResponse { positionId: Id; eligibility: ClaimEligibility; reason?: string; freshness?: Freshness; }
export interface ClaimIntentResponse { id: Id; userId: Id; positionId: Id; binding: WalletBinding; state: ClaimsState; }
export interface ClaimTransactionResponse { intentId: Id; unsignedTransaction: UnresolvedProviderData; }
