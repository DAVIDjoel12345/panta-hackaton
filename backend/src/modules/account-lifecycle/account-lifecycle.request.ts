/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface AccountExportRequest { reauthenticationProofId: Id; }
export interface AccountDeletionRequest { reauthenticationProofId: Id; confirmation: boolean; }
