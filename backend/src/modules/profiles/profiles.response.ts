/** Proposed application responses; not sample or runtime success data. */
import type { Id } from '../../common/contracts/primitives.js';
export interface PublicProfileResponse { id: Id; userId: Id; username: string; displayName: string; biography?: string; avatarAssetId?: Id; }
export interface UsernameAvailabilityResponse { available: boolean; }
export type ProfileRecord = PublicProfileResponse;
