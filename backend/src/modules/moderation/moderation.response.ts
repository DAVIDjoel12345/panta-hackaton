/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface ReportResponse { id: Id; communityId: Id; targetType: 'post' | 'comment'; targetId: Id; reason: string; context?: string; status: 'open' | 'dismissed' | 'resolved'; }
/** Reporter identity exists only in internal persistence, never the public response above. */
export interface ModerationReportRecord extends ReportResponse { reporterId: Id; createdAt: Timestamp; reviewNotes?: string; }
export interface RestrictionRecord { id: Id; communityId: Id; targetMemberId: Id; action: import('./moderation.request.js').RestrictionRequest['action']; durationSeconds?: number; expiresAt?: Timestamp; reason: string; actingUserId: Id; createdAt: Timestamp; status: 'active' | 'expired' | 'lifted'; }
export interface ModerationAuditRecord { id: Id; communityId: Id; actingUserId: Id; targetId: Id; action: string; reason: string; createdAt: Timestamp; }
