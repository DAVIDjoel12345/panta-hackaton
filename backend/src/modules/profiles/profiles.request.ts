/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export interface ProfileUpdateRequest { displayName?: string; username?: string; biography?: string; avatarAssetId?: Id; }
export interface UsernameAvailabilityRequest { username: string; }
