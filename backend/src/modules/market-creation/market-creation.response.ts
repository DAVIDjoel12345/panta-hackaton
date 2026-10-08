/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp, WalletBinding, UnresolvedProviderData } from '../../common/contracts/primitives.js';
import type { MarketCreationState } from './market-creation.state.js';
export interface CreationIntentResponse { id: Id; userId: Id; draftId: Id; state: MarketCreationState; binding: WalletBinding; providerReference?: string; }
export interface CreationFeeResponse { draftId: Id; fee?: UnresolvedProviderData; expiresAt?: Timestamp; }
export interface CreationTransactionResponse { intentId: Id; unsignedTransaction: UnresolvedProviderData; }
