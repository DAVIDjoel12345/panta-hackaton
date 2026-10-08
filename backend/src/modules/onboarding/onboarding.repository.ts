import type { Id } from '../../common/contracts/primitives.js';
import type { OnboardingResponse } from './onboarding.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface OnboardingRepository {
  findById(id: Id): Promise<OnboardingResponse | null>;
  save(record: OnboardingResponse): Promise<void>;
}
