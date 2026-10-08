/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface CreateSessionRequest { proofId: Id; }
export interface RevokeSessionRequest { sessionId: Id; }
export interface RevokeAllSessionsRequest { reauthenticationProofId: Id; }
