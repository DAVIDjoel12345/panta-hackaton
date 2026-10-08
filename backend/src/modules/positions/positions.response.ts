/** Proposed application responses; not sample or runtime success data. */
import type { Id, Freshness, WalletBinding, UnresolvedProviderData } from '../../common/contracts/primitives.js';
export interface PositionResponse { id: Id; marketId: Id; binding: WalletBinding; authoritativeData: UnresolvedProviderData; freshness?: Freshness; }
