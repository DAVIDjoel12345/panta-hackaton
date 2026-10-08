/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp, SourceReference } from '../../common/contracts/primitives.js';
export interface ConversationResponse { id: Id; ownerId: Id; title: string; createdAt: Timestamp; }
export interface ConversationMessageResponse { id: Id; conversationId: Id; role: 'user' | 'assistant'; text: string; sources?: SourceReference[]; createdAt: Timestamp; }
