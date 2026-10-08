import type { Id } from '../common/contracts/primitives.js';
/** Optional delivery boundary; no sender, template renderer, queue or vendor SDK. */
export interface NotificationDeliveryPort {
  deliver(input: { recipientId: Id; eventId: Id; channel: 'in-app' | 'email'; templateId: string; parameters: Readonly<Record<string, string>> }): Promise<void>;
}

