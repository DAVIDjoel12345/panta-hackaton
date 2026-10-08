/** Proposed application responses; not sample or runtime success data. */
import type { Id } from '../../common/contracts/primitives.js';
import type { CommunitiesState } from './communities.state.js';
export interface CommunityResponse { id: Id; ownerId: Id; version: number; details: import('./communities.request.js').CommunityInput; state: CommunitiesState; }
export interface PublicCommunitySummary { id: Id; slug: string; name: string; description: string; visibility: 'public' | 'private'; category: string; }
