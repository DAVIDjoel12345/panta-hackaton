/** Proposed application responses; not sample or runtime success data. */
import type { Id, ValidationIssue } from '../../common/contracts/primitives.js';
export interface MarketDraftResponse { id: Id; ownerId: Id; version: number; draft: import('./market-drafts.request.js').MarketDraftInput; status: 'draft' | 'review-required' | 'validated'; }
export interface DraftValidationResponse { issues: ValidationIssue[]; duplicateCandidates: Id[]; providerMappingVerified: boolean; }
