import type { WalletBinding } from '../../common/contracts/primitives.js';
export type ChainObservation = 'not-found' | 'pending' | 'confirmed' | 'failed' | 'unknown';
/** No network, commitment level, RPC provider or transaction encoding is selected. */
export interface SolanaAdapter {
  verifyWalletSignature(input: { walletAddress: string; message: string; signature: string }): Promise<boolean>;
  validateUnsignedTransaction(transaction: unknown, binding: WalletBinding): Promise<void>;
  lookupSignature(signature: string, binding: WalletBinding): Promise<{ status: ChainObservation; evidence: unknown }>;
}
// Intentionally no signing method or private-key field.

