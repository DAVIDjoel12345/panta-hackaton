/** State identifiers only; no transitions or state store. */
export const AUTH_STATE_IDS = [
  "auth.signInChallengeExplanation",
  "auth.awaitingAuthenticationSignature",
  "auth.authenticationRejected",
  "auth.authenticationExpired",
  "auth.sessionExpired",
  "auth.walletRequiredGate",
  "auth.authenticationRequiredGate",
  "auth.unauthorizedAccessScreen"
]
