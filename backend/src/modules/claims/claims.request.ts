/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey, WalletBinding, CursorQuery } from '../../common/contracts/primitives.js';
export interface ClaimablePositionsRequest extends WalletBinding, CursorQuery {}
export interface ClaimIntentRequest extends WalletBinding { positionId: Id; idempotencyKey: IdempotencyKey; }
export interface ClaimReconcileRequest { intentId: Id; signature?: string; }
