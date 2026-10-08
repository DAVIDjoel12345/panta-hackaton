/** State identifiers only; no transitions or state store. */
export const CLAIMS_STATE_IDS = [
  "claims.checkingEligibility",
  "claims.eligible",
  "claims.notEligible",
  "claims.marketUnresolved",
  "claims.noClaimsAvailable",
  "claims.claimReview",
  "claims.awaitingWalletApproval",
  "claims.approvalRejected",
  "claims.claimSubmitting",
  "claims.claimPending",
  "claims.claimConfirmed",
  "claims.claimFailed",
  "claims.alreadyClaimed",
  "claims.eligibilityChanged",
  "claims.eligibilityUnavailable",
  "claims.claimReconciliation"
]
