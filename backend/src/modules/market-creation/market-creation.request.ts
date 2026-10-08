/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey, WalletBinding } from '../../common/contracts/primitives.js';
export interface CreationIntentRequest extends WalletBinding { draftId: Id; idempotencyKey: IdempotencyKey; }
export interface CreationReconcileRequest { intentId: Id; signature?: string; }
