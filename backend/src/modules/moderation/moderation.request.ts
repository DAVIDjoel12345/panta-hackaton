/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface ReportRequest { communityId: Id; targetType: 'post' | 'comment'; targetId: Id; reason: string; context?: string; }
export interface ReviewReportRequest { decision: 'dismissed' | 'resolved'; notes: string; }
export interface ContentModerationRequest { targetType: 'post' | 'comment'; targetId: Id; action: 'remove' | 'restore'; reason: string; }
/** Actor and timestamp are added from a verified server context, never client authority. */
export interface RestrictionRequest { communityId: Id; targetMemberId: Id; action: 'restrict-posting' | 'mute' | 'ban' | 'unban' | 'lift' | 'revoke'; durationSeconds?: number; expiresAt?: Timestamp; reason: string; }
export interface AppealRequest { restrictionId: Id; explanation: string; }
