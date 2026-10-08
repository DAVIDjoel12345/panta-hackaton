/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface LeaderboardEntry { userId: Id; rank: number; score: number; methodologyVersion: string; sampleSize: number; }
export interface LeaderboardResponse { entries: LeaderboardEntry[]; calculatedAt?: Timestamp; nextCursor?: string; }
