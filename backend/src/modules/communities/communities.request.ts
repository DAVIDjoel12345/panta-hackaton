/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id, CursorQuery } from '../../common/contracts/primitives.js';
export interface CommunityInput { name: string; slug: string; description: string; category: string; coverAssetId?: Id; avatarAssetId?: Id; rules: string; visibility: 'public' | 'private'; membershipPolicy: 'open' | 'approval'; postingPolicy: 'members' | 'staff' | 'approval'; commentsEnabled: boolean; }
export interface CommunityListRequest extends CursorQuery { search?: string; category?: string; joined?: boolean; sort?: 'name' | 'members'; }
export interface CommunityUpdateRequest { changes: Partial<CommunityInput>; expectedVersion: number; }
export interface TransferOwnershipRequest { nextOwnerId: Id; reauthenticationProofId: Id; expectedVersion: number; }
