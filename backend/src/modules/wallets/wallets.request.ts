/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface AssociateWalletRequest { ownershipProofId: Id; walletAddress: string; }
export interface RemoveWalletRequest { associationId: Id; reauthenticationProofId: Id; }
