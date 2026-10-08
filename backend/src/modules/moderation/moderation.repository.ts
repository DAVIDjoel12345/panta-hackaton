import type { Id } from '../../common/contracts/primitives.js';
import type { ModerationReportRecord, RestrictionRecord, ModerationAuditRecord } from './moderation.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface ModerationRepository {
  findById(id: Id): Promise<ModerationReportRecord | null>;
  save(record: ModerationReportRecord): Promise<void>;
  findRestriction(id: Id): Promise<RestrictionRecord | null>;
  saveRestriction(record: RestrictionRecord): Promise<void>;
  appendAudit(record: ModerationAuditRecord): Promise<void>;
}
