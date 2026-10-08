/** Proposed application responses; not sample or runtime success data. */
import type { Id, WalletBinding, UnresolvedProviderData } from '../../common/contracts/primitives.js';
import type { CreatorFeesState } from './creator-fees.state.js';
export interface CreatorFeeResponse { providerFeeReference: string; verifiedFeeData?: UnresolvedProviderData; }
export interface CreatorFeeIntentResponse { id: Id; userId: Id; providerFeeReference: string; binding: WalletBinding; state: CreatorFeesState; }
export interface CreatorFeeTransactionResponse { intentId: Id; unsignedTransaction: UnresolvedProviderData; }
