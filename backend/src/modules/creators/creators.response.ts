/** Proposed application responses; not sample or runtime success data. */
import type { Id, Freshness, UnresolvedProviderData } from '../../common/contracts/primitives.js';
export interface CreatorMarketResponse { marketId: Id; creatorId: Id; providerReference: string; }
export interface CreatorAnalyticsResponse { creatorId: Id; verifiedMetrics?: UnresolvedProviderData; freshness?: Freshness; }
