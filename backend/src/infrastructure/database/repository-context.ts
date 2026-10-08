import type { RequestContext } from '../../common/contracts/primitives.js';
/** Proposed PostgreSQL unit-of-work boundary; no driver, ORM or live connection. */
export interface RepositoryContext extends RequestContext { transactionId?: string; }

