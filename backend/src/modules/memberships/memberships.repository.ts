import type { Id } from '../../common/contracts/primitives.js';
import type { MembershipResponse } from './memberships.response.js';
/** Application persistence only. No implementation or DI binding. Authorize before reads/writes. */
export interface MembershipsRepository {
  findById(id: Id): Promise<MembershipResponse | null>;
  save(record: MembershipResponse): Promise<void>;
}
