/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey, WalletBinding } from '../../common/contracts/primitives.js';
export interface CreatorFeeClaimRequest extends WalletBinding { providerFeeReference: string; idempotencyKey: IdempotencyKey; }
export interface CreatorFeeReconcileRequest { intentId: Id; signature?: string; }
