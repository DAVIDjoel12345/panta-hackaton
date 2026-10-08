/** Proposed application responses; not sample or runtime success data. */
import type { Id } from '../../common/contracts/primitives.js';
export interface SettingsResponse { id: Id; userId: Id; locale?: string; theme: 'light' | 'dark' | 'system'; reducedMotion: boolean; privacy: 'public-profile' | 'private-profile'; }
