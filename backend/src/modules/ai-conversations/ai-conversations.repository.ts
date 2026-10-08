import type { Id } from '../../common/contracts/primitives.js';
import type { ConversationResponse, ConversationMessageResponse } from './ai-conversations.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface AiConversationsRepository {
  findById(id: Id): Promise<ConversationResponse | null>;
  save(record: ConversationResponse): Promise<void>;
  appendMessage(record: ConversationMessageResponse): Promise<void>;
}
