/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp, Freshness, UnresolvedProviderData } from '../../common/contracts/primitives.js';
export interface PriceSnapshotResponse { marketId: Id; observedAt?: Timestamp; prices?: UnresolvedProviderData; volume?: UnresolvedProviderData; liquidity?: UnresolvedProviderData; participantCount?: number; freshness?: Freshness; }
export interface PriceHistoryResponse { marketId: Id; history?: UnresolvedProviderData; freshness?: Freshness; }
