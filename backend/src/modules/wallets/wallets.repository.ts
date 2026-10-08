import type { Id } from '../../common/contracts/primitives.js';
import type { WalletAssociationResponse } from './wallets.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface WalletsRepository {
  findById(id: Id): Promise<WalletAssociationResponse | null>;
  save(record: WalletAssociationResponse): Promise<void>;
}
