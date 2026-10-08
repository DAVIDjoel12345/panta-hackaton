import type { Id, Timestamp } from '../common/contracts/primitives.js';
/** Optional storage port; authorize target access before issuing any upload/download capability. */
export interface AttachmentStoragePort {
  authorizeUpload(input: { actorId: Id; communityId: Id; mediaType: string; bytes: number }): Promise<{ assetId: Id; instructions: unknown; expiresAt: Timestamp }>;
  validateAndScan(assetId: Id): Promise<void>;
  authorizeRead(assetId: Id, actorId: Id): Promise<unknown>;
}

