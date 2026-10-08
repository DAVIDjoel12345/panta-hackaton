/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey, WalletBinding } from '../../common/contracts/primitives.js';
export interface PurchaseIntentRequest extends WalletBinding { marketId: Id; outcomeReference: string; amount: string; idempotencyKey: IdempotencyKey; }
export interface QuoteRequest { intentId: Id; }
export interface ConstructTradeRequest { intentId: Id; quoteId: Id; }
export interface TrackSubmissionRequest { intentId: Id; signature: string; }
