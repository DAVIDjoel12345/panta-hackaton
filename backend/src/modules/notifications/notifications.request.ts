/** Proposed request shapes only; no runtime validation or working operation. */
export interface NotificationReadRequest { read: boolean; }
export interface NotificationPreferencesRequest { inApp: boolean; email?: boolean; }
