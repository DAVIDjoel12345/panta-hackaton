/** Proposed request shapes only; no runtime validation or working operation. */
export interface SettingsUpdateRequest { locale?: string; theme?: 'light' | 'dark' | 'system'; reducedMotion?: boolean; privacy?: 'public-profile' | 'private-profile'; }
