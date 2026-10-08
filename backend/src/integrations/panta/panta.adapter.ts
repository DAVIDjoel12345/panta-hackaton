import type { UnresolvedProviderData, WalletBinding } from '../../common/contracts/primitives.js';
/** Port only. Discover operations and wire shapes from current official Panta documentation later. */
export interface PantaAdapter {
  verifyCapabilities(): Promise<ReadonlySet<string>>;
  fetchMarket(providerReference: string): Promise<UnresolvedProviderData>;
  requestQuote(input: unknown, binding: WalletBinding): Promise<UnresolvedProviderData>;
  constructUnsignedTransaction(input: unknown, binding: WalletBinding): Promise<UnresolvedProviderData>;
  readPositions(binding: WalletBinding): Promise<UnresolvedProviderData>;
  readClaimEligibility(input: unknown, binding: WalletBinding): Promise<UnresolvedProviderData>;
}

