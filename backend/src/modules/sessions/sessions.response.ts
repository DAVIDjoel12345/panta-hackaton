/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface SessionResponse { id: Id; userId: Id; createdAt: Timestamp; expiresAt: Timestamp; revokedAt?: Timestamp; }
/** Public response excludes session secrets and cookie/token values. */
export interface SessionRecord extends SessionResponse { verifierHash: string; }
