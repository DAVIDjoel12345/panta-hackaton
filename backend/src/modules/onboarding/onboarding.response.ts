/** Proposed application responses; not sample or runtime success data. */
import type { Id, Timestamp } from '../../common/contracts/primitives.js';
export interface OnboardingResponse { id: Id; userId: Id; completedSteps: string[]; interests: string[]; completedAt?: Timestamp; }
