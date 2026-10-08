/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp, SourceReference } from '../../common/contracts/primitives.js';
export interface AnalysisResponse { id: Id; marketId: Id; summary: string; observations: string[]; caveats: string[]; sources: SourceReference[]; missingInformation: string[]; generatedAt: Timestamp; contextVersion: string; }
export interface AnalysisContextResponse { marketId: Id; sources: SourceReference[]; missingInformation: string[]; untrustedContent: string[]; }
