# Authentication state checklist

117 new deterministic states extend the original 168 previews to **285**. Every preview has a heading, context, and action. Select a scenario in its feature screen or filter `/dev/ui-states` by the group below. MFA/recovery entries are unavailable design previews, not functioning enrollment.

## walletAuth

- [x] `walletAuth.walletUnavailable` — Wallet unavailable
- [x] `walletAuth.walletNotInstalled` — Wallet not installed
- [x] `walletAuth.connecting` — Connecting
- [x] `walletAuth.connectionRejected` — Connection rejected
- [x] `walletAuth.connectionFailed` — Connection failed
- [x] `walletAuth.unsupportedNetwork` — Unsupported network
- [x] `walletAuth.accountSelected` — Account selected
- [x] `walletAuth.accountChangedDuringAuthentication` — Account changed during authentication
- [x] `walletAuth.challengeLoading` — Challenge loading
- [x] `walletAuth.challengeUnavailable` — Challenge unavailable
- [x] `walletAuth.awaitingSignature` — Awaiting signature
- [x] `walletAuth.signatureRejected` — Signature rejected
- [x] `walletAuth.signatureInvalid` — Signature invalid
- [x] `walletAuth.challengeExpired` — Challenge expired
- [x] `walletAuth.verificationPending` — Verification pending
- [x] `walletAuth.verificationFailed` — Verification failed
- [x] `walletAuth.authenticated` — Authenticated
- [x] `walletAuth.sessionCreationFailed` — Session creation failed

## registration

- [x] `registration.initial` — Initial
- [x] `registration.invalidForm` — Invalid form
- [x] `registration.submitting` — Submitting
- [x] `registration.verificationRequired` — Verification required
- [x] `registration.emailSent` — Email sent
- [x] `registration.resendAvailable` — Resend available
- [x] `registration.resendCooldown` — Resend cooldown
- [x] `registration.rateLimited` — Rate limited
- [x] `registration.requestFailed` — Request failed
- [x] `registration.verificationComplete` — Verification complete
- [x] `registration.verificationLinkExpired` — Verification link expired
- [x] `registration.verificationLinkInvalid` — Verification link invalid
- [x] `registration.verificationAlreadyComplete` — Verification already complete

## login

- [x] `login.idle` — Idle
- [x] `login.invalidFields` — Invalid fields
- [x] `login.submitting` — Submitting
- [x] `login.invalidCredentials` — Invalid credentials
- [x] `login.verificationRequired` — Verification required
- [x] `login.additionalSecurityChallengeRequired` — Additional security challenge required
- [x] `login.rateLimited` — Rate limited
- [x] `login.serviceUnavailable` — Service unavailable
- [x] `login.networkError` — Network error
- [x] `login.loginComplete` — Login complete

## emailVerification

- [x] `emailVerification.waiting` — Waiting
- [x] `emailVerification.verifying` — Verifying
- [x] `emailVerification.incorrectCode` — Incorrect code
- [x] `emailVerification.expiredCode` — Expired code
- [x] `emailVerification.invalidLink` — Invalid link
- [x] `emailVerification.previouslyUsedLink` — Previously used link
- [x] `emailVerification.resendCooldown` — Resend cooldown
- [x] `emailVerification.tooManyAttempts` — Too many attempts
- [x] `emailVerification.verified` — Verified
- [x] `emailVerification.failed` — Failed

## passwordRecovery

- [x] `passwordRecovery.requestLoading` — Request loading
- [x] `passwordRecovery.genericRequestSuccess` — Generic request success
- [x] `passwordRecovery.rateLimited` — Rate limited
- [x] `passwordRecovery.linkValidation` — Link validation
- [x] `passwordRecovery.invalidLink` — Invalid link
- [x] `passwordRecovery.expiredLink` — Expired link
- [x] `passwordRecovery.alreadyUsedLink` — Already used link
- [x] `passwordRecovery.passwordPolicyFailure` — Password policy failure
- [x] `passwordRecovery.passwordMismatch` — Password mismatch
- [x] `passwordRecovery.resetSubmitting` — Reset submitting
- [x] `passwordRecovery.resetComplete` — Reset complete
- [x] `passwordRecovery.resetFailed` — Reset failed

## socialAuth

- [x] `socialAuth.redirecting` — Redirecting
- [x] `socialAuth.callbackLoading` — Callback loading
- [x] `socialAuth.cancelledAuthorization` — Cancelled authorization
- [x] `socialAuth.failedCallback` — Failed callback
- [x] `socialAuth.missingOrInvalidCallbackState` — Missing or invalid callback state
- [x] `socialAuth.providerUnavailable` — Provider unavailable
- [x] `socialAuth.successfulSession` — Successful session
- [x] `socialAuth.accountLinkingConfirmation` — Account linking confirmation

## accountSecurity

- [x] `accountSecurity.reauthenticationRequired` — Reauthentication required
- [x] `accountSecurity.addWallet` — Add wallet
- [x] `accountSecurity.confirmWalletAssociation` — Confirm wallet association
- [x] `accountSecurity.walletAlreadyLinked` — Wallet already linked
- [x] `accountSecurity.removeWallet` — Remove wallet
- [x] `accountSecurity.lastSignInMethodProtected` — Last sign in method protected
- [x] `accountSecurity.changeEmail` — Change email
- [x] `accountSecurity.verifyNewEmail` — Verify new email
- [x] `accountSecurity.changePassword` — Change password
- [x] `accountSecurity.activeSessions` — Active sessions
- [x] `accountSecurity.revokeSession` — Revoke session
- [x] `accountSecurity.signOutEverywhere` — Sign out everywhere
- [x] `accountSecurity.deletionRequested` — Deletion requested

## optionalMfa

- [x] `optionalMfa.unavailable` — Unavailable
- [x] `optionalMfa.setup` — Setup
- [x] `optionalMfa.challenge` — Challenge
- [x] `optionalMfa.invalidCode` — Invalid code
- [x] `optionalMfa.expiredCode` — Expired code
- [x] `optionalMfa.recoveryMethod` — Recovery method
- [x] `optionalMfa.setupComplete` — Setup complete
- [x] `optionalMfa.disableConfirmation` — Disable confirmation

## onboardingAuth

- [x] `onboardingAuth.loading` — Loading
- [x] `onboardingAuth.saving` — Saving
- [x] `onboardingAuth.validationError` — Validation error
- [x] `onboardingAuth.usernameUnavailable` — Username unavailable
- [x] `onboardingAuth.saveFailed` — Save failed
- [x] `onboardingAuth.resumeIncompleteOnboarding` — Resume incomplete onboarding
- [x] `onboardingAuth.skipOptionalStep` — Skip optional step
- [x] `onboardingAuth.complete` — Complete

## sessionAuth

- [x] `sessionAuth.checking` — Checking
- [x] `sessionAuth.guest` — Guest
- [x] `sessionAuth.authenticated` — Authenticated
- [x] `sessionAuth.expired` — Expired
- [x] `sessionAuth.refreshing` — Refreshing
- [x] `sessionAuth.offline` — Offline
- [x] `sessionAuth.accessDenied` — Access denied

## splash

- [x] `splash.initial` — Initial
- [x] `splash.logoReveal` — Logo reveal
- [x] `splash.signalLine` — Signal line
- [x] `splash.pulse` — Pulse
- [x] `splash.tagline` — Tagline
- [x] `splash.exit` — Exit
- [x] `splash.skipped` — Skipped
- [x] `splash.alreadyPlayed` — Already played
- [x] `splash.reducedMotion` — Reduced motion
- [x] `splash.assetFailureFallback` — Asset failure fallback
