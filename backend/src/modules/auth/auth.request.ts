/** Proposed request shapes only; no runtime validation or working operation. */
import type { Id } from '../../common/contracts/primitives.js';
export type AuthenticationPurpose = 'sign-in' | 'associate-wallet' | 'reauthentication';
export interface WalletChallengeRequest { walletAddress: string; purpose: AuthenticationPurpose; }
export interface VerifyWalletRequest { challengeId: Id; signature: string; }
export interface EmailCredentialsRequest { email: string; password: string; }
export interface EmailActionRequest { email: string; }
export interface VerifyEmailRequest { token: string; }
export interface PasswordResetRequest { token: string; newPassword: string; }
export interface CodeVerificationRequest { requestId: Id; code: string; }
export interface SocialCallbackRequest { provider: string; code: string; state: string; }
export interface ReauthenticationRequest { purpose: string; }
export interface MfaRequest { verificationId: Id; code: string; }
