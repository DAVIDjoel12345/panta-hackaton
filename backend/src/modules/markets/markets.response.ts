/** Proposed application responses; not sample or runtime success data. */
import type { Id, Freshness, UnresolvedProviderData } from '../../common/contracts/primitives.js';
export interface MarketMetadata { id: Id; providerReference: string; category?: string; communityId?: Id; }
/** Verified provider shape is unresolved and is not authoritative application metadata. */
export interface MarketDetailResponse { metadata: MarketMetadata; providerData?: UnresolvedProviderData; freshness?: Freshness; }
export interface CategoriesResponse { categories: string[]; }
