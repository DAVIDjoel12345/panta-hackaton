/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp, WalletBinding, UnresolvedProviderData } from '../../common/contracts/primitives.js';
import type { TradingState } from './trading.state.js';
export interface TradeIntentResponse { id: Id; userId: Id; marketId: Id; binding: WalletBinding; state: TradingState; }
export interface QuoteReviewResponse { quoteId: Id; intentId: Id; expiresAt: Timestamp; binding: WalletBinding; providerQuote: UnresolvedProviderData; }
export interface TradeTransactionResponse { intentId: Id; unsignedTransaction: UnresolvedProviderData; }
