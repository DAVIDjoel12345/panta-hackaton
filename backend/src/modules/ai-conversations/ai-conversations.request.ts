/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, IdempotencyKey } from '../../common/contracts/primitives.js';
export interface ConversationCreateRequest { title?: string; marketId?: Id; }
export interface ConversationMessageRequest { text: string; idempotencyKey: IdempotencyKey; }
