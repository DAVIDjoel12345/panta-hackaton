/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface WalletAssociationResponse { id: Id; userId: Id; walletAddress: string; verifiedAt: Timestamp; }
