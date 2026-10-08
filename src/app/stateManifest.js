/** @type {import('../types/scaffold.js').StateDefinition[]} */
export const stateManifest = [
  {
    "id": "global.pageLoading",
    "name": "Page loading",
    "component": "PageLoadingState",
    "file": "src/components/states/PageLoadingState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.sectionLoading",
    "name": "Section loading",
    "component": "SectionLoadingState",
    "file": "src/components/states/SectionLoadingState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.skeletonPlaceholder",
    "name": "Skeleton placeholder",
    "component": "SkeletonPlaceholderState",
    "file": "src/components/states/SkeletonPlaceholderState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.emptyState",
    "name": "Empty state",
    "component": "EmptyStateState",
    "file": "src/components/states/EmptyStateState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.noSearchResults",
    "name": "No search results",
    "component": "NoSearchResultsState",
    "file": "src/components/states/NoSearchResultsState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.recoverableError",
    "name": "Recoverable error",
    "component": "RecoverableErrorState",
    "file": "src/components/states/RecoverableErrorState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.unexpectedError",
    "name": "Unexpected error",
    "component": "UnexpectedErrorState",
    "file": "src/components/states/UnexpectedErrorState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.offline",
    "name": "Offline",
    "component": "OfflineState",
    "file": "src/components/states/OfflineState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.reconnecting",
    "name": "Reconnecting",
    "component": "ReconnectingState",
    "file": "src/components/states/ReconnectingState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.staleData",
    "name": "Stale data",
    "component": "StaleDataState",
    "file": "src/components/states/StaleDataState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.partialData",
    "name": "Partial data",
    "component": "PartialDataState",
    "file": "src/components/states/PartialDataState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.apiUnavailable",
    "name": "API unavailable",
    "component": "ApiUnavailableState",
    "file": "src/components/states/ApiUnavailableState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.rateLimited",
    "name": "Rate limited",
    "component": "RateLimitedState",
    "file": "src/components/states/RateLimitedState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.maintenance",
    "name": "Maintenance",
    "component": "MaintenanceState",
    "file": "src/components/states/MaintenanceState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.featureUnavailable",
    "name": "Feature unavailable",
    "component": "FeatureUnavailableState",
    "file": "src/components/states/FeatureUnavailableState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.comingSoon",
    "name": "Coming soon",
    "component": "ComingSoonState",
    "file": "src/components/states/ComingSoonState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.walletRequired",
    "name": "Wallet required",
    "component": "WalletRequiredState",
    "file": "src/components/states/WalletRequiredState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.authenticationRequired",
    "name": "Authentication required",
    "component": "AuthenticationRequiredState",
    "file": "src/components/states/AuthenticationRequiredState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.accessDenied",
    "name": "Access denied",
    "component": "AccessDeniedState",
    "file": "src/components/states/AccessDeniedState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.notFound",
    "name": "Not found",
    "component": "NotFoundState",
    "file": "src/components/states/NotFoundState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.invalidRouteParameter",
    "name": "Invalid route parameter",
    "component": "InvalidRouteParameterState",
    "file": "src/components/states/InvalidRouteParameterState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.success",
    "name": "Success",
    "component": "SuccessState",
    "file": "src/components/states/SuccessState.jsx",
    "priority": "P0"
  },
  {
    "id": "global.confirmationRequired",
    "name": "Confirmation required",
    "component": "ConfirmationRequiredState",
    "file": "src/components/states/ConfirmationRequiredState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.chooseYesNo",
    "name": "Choose YES/NO",
    "component": "ChooseYesNoState",
    "file": "src/features/trading/states/ChooseYesNoState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.enterAmount",
    "name": "Enter amount",
    "component": "EnterAmountState",
    "file": "src/features/trading/states/EnterAmountState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.quoteLoading",
    "name": "Quote loading",
    "component": "QuoteLoadingState",
    "file": "src/features/trading/states/QuoteLoadingState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.quoteReview",
    "name": "Quote review",
    "component": "QuoteReviewState",
    "file": "src/features/trading/states/QuoteReviewState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.quoteExpired",
    "name": "Quote expired",
    "component": "QuoteExpiredState",
    "file": "src/features/trading/states/QuoteExpiredState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.quoteUnavailable",
    "name": "Quote unavailable",
    "component": "QuoteUnavailableState",
    "file": "src/features/trading/states/QuoteUnavailableState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.insufficientTokenBalance",
    "name": "Insufficient token balance",
    "component": "InsufficientTokenBalanceState",
    "file": "src/features/trading/states/InsufficientTokenBalanceState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.insufficientNetworkFeeBalance",
    "name": "Insufficient network-fee balance",
    "component": "InsufficientNetworkFeeBalanceState",
    "file": "src/features/trading/states/InsufficientNetworkFeeBalanceState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.unsupportedNetwork",
    "name": "Unsupported network",
    "component": "UnsupportedNetworkState",
    "file": "src/features/trading/states/UnsupportedNetworkState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.marketClosed",
    "name": "Market closed",
    "component": "MarketClosedState",
    "file": "src/features/trading/states/MarketClosedState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.tradingUnavailable",
    "name": "Trading unavailable",
    "component": "TradingUnavailableState",
    "file": "src/features/trading/states/TradingUnavailableState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionValidationFailure",
    "name": "Transaction validation failure",
    "component": "TransactionValidationFailureState",
    "file": "src/features/trading/states/TransactionValidationFailureState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.awaitingWalletApproval",
    "name": "Awaiting wallet approval",
    "component": "AwaitingWalletApprovalState",
    "file": "src/features/trading/states/AwaitingWalletApprovalState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.walletApprovalRejected",
    "name": "Wallet approval rejected",
    "component": "WalletApprovalRejectedState",
    "file": "src/features/trading/states/WalletApprovalRejectedState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionSubmitting",
    "name": "Transaction submitting",
    "component": "TransactionSubmittingState",
    "file": "src/features/trading/states/TransactionSubmittingState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionSubmitted",
    "name": "Transaction submitted",
    "component": "TransactionSubmittedState",
    "file": "src/features/trading/states/TransactionSubmittedState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionPendingConfirmation",
    "name": "Transaction pending confirmation",
    "component": "TransactionPendingConfirmationState",
    "file": "src/features/trading/states/TransactionPendingConfirmationState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.confirmationStatusUnknown",
    "name": "Confirmation status unknown",
    "component": "ConfirmationStatusUnknownState",
    "file": "src/features/trading/states/ConfirmationStatusUnknownState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionConfirmed",
    "name": "Transaction confirmed",
    "component": "TransactionConfirmedState",
    "file": "src/features/trading/states/TransactionConfirmedState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionFailed",
    "name": "Transaction failed",
    "component": "TransactionFailedState",
    "file": "src/features/trading/states/TransactionFailedState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionExpired",
    "name": "Transaction expired",
    "component": "TransactionExpiredState",
    "file": "src/features/trading/states/TransactionExpiredState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionReconciliation",
    "name": "Transaction reconciliation",
    "component": "TransactionReconciliationState",
    "file": "src/features/trading/states/TransactionReconciliationState.jsx",
    "priority": "P0"
  },
  {
    "id": "trading.transactionDetailsReceipt",
    "name": "Transaction details/receipt",
    "component": "TransactionDetailsReceiptState",
    "file": "src/features/trading/states/TransactionDetailsReceiptState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.connectWalletModal",
    "name": "Connect-wallet modal",
    "component": "ConnectWalletModalState",
    "file": "src/features/wallet/states/ConnectWalletModalState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.walletSelection",
    "name": "Wallet selection",
    "component": "WalletSelectionState",
    "file": "src/features/wallet/states/WalletSelectionState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.walletNotDetected",
    "name": "Wallet not detected",
    "component": "WalletNotDetectedState",
    "file": "src/features/wallet/states/WalletNotDetectedState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.connecting",
    "name": "Connecting",
    "component": "ConnectingState",
    "file": "src/features/wallet/states/ConnectingState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.connectionFailed",
    "name": "Connection failed",
    "component": "ConnectionFailedState",
    "file": "src/features/wallet/states/ConnectionFailedState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.walletConnectedAccountMenu",
    "name": "Wallet connected/account menu",
    "component": "WalletConnectedAccountMenuState",
    "file": "src/features/wallet/states/WalletConnectedAccountMenuState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.walletAccountChanged",
    "name": "Wallet account changed",
    "component": "WalletAccountChangedState",
    "file": "src/features/wallet/states/WalletAccountChangedState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.walletDisconnected",
    "name": "Wallet disconnected",
    "component": "WalletDisconnectedState",
    "file": "src/features/wallet/states/WalletDisconnectedState.jsx",
    "priority": "P0"
  },
  {
    "id": "wallet.unsupportedNetwork",
    "name": "Unsupported network",
    "component": "UnsupportedNetworkState",
    "file": "src/features/wallet/states/UnsupportedNetworkState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.signInChallengeExplanation",
    "name": "Sign-in challenge explanation",
    "component": "SignInChallengeExplanationState",
    "file": "src/features/auth/states/SignInChallengeExplanationState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.awaitingAuthenticationSignature",
    "name": "Awaiting authentication signature",
    "component": "AwaitingAuthenticationSignatureState",
    "file": "src/features/auth/states/AwaitingAuthenticationSignatureState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.authenticationRejected",
    "name": "Authentication rejected",
    "component": "AuthenticationRejectedState",
    "file": "src/features/auth/states/AuthenticationRejectedState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.authenticationExpired",
    "name": "Authentication expired",
    "component": "AuthenticationExpiredState",
    "file": "src/features/auth/states/AuthenticationExpiredState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.sessionExpired",
    "name": "Session expired",
    "component": "SessionExpiredState",
    "file": "src/features/auth/states/SessionExpiredState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.walletRequiredGate",
    "name": "Wallet-required gate",
    "component": "WalletRequiredGateState",
    "file": "src/features/auth/states/WalletRequiredGateState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.authenticationRequiredGate",
    "name": "Authentication-required gate",
    "component": "AuthenticationRequiredGateState",
    "file": "src/features/auth/states/AuthenticationRequiredGateState.jsx",
    "priority": "P0"
  },
  {
    "id": "auth.unauthorizedAccessScreen",
    "name": "Unauthorized-access screen",
    "component": "UnauthorizedAccessScreenState",
    "file": "src/features/auth/states/UnauthorizedAccessScreenState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.walletDisconnected",
    "name": "Wallet disconnected",
    "component": "WalletDisconnectedState",
    "file": "src/features/portfolio/states/WalletDisconnectedState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.loadingPositions",
    "name": "Loading positions",
    "component": "LoadingPositionsState",
    "file": "src/features/portfolio/states/LoadingPositionsState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.noPositions",
    "name": "No positions",
    "component": "NoPositionsState",
    "file": "src/features/portfolio/states/NoPositionsState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.noOpenPositions",
    "name": "No open positions",
    "component": "NoOpenPositionsState",
    "file": "src/features/portfolio/states/NoOpenPositionsState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.noResolvedPositions",
    "name": "No resolved positions",
    "component": "NoResolvedPositionsState",
    "file": "src/features/portfolio/states/NoResolvedPositionsState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.noClaimablePositions",
    "name": "No claimable positions",
    "component": "NoClaimablePositionsState",
    "file": "src/features/portfolio/states/NoClaimablePositionsState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.partialData",
    "name": "Partial data",
    "component": "PartialDataState",
    "file": "src/features/portfolio/states/PartialDataState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.staleData",
    "name": "Stale data",
    "component": "StaleDataState",
    "file": "src/features/portfolio/states/StaleDataState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.positionSynchronization",
    "name": "Position synchronization",
    "component": "PositionSynchronizationState",
    "file": "src/features/portfolio/states/PositionSynchronizationState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.positionsUnavailable",
    "name": "Positions unavailable",
    "component": "PositionsUnavailableState",
    "file": "src/features/portfolio/states/PositionsUnavailableState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.positionNotFound",
    "name": "Position not found",
    "component": "PositionNotFoundState",
    "file": "src/features/portfolio/states/PositionNotFoundState.jsx",
    "priority": "P0"
  },
  {
    "id": "portfolio.positionBelongsToAnotherWallet",
    "name": "Position belongs to another wallet",
    "component": "PositionBelongsToAnotherWalletState",
    "file": "src/features/portfolio/states/PositionBelongsToAnotherWalletState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.checkingEligibility",
    "name": "Checking eligibility",
    "component": "CheckingEligibilityState",
    "file": "src/features/claims/states/CheckingEligibilityState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.eligible",
    "name": "Eligible",
    "component": "EligibleState",
    "file": "src/features/claims/states/EligibleState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.notEligible",
    "name": "Not eligible",
    "component": "NotEligibleState",
    "file": "src/features/claims/states/NotEligibleState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.marketUnresolved",
    "name": "Market unresolved",
    "component": "MarketUnresolvedState",
    "file": "src/features/claims/states/MarketUnresolvedState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.noClaimsAvailable",
    "name": "No claims available",
    "component": "NoClaimsAvailableState",
    "file": "src/features/claims/states/NoClaimsAvailableState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.claimReview",
    "name": "Claim review",
    "component": "ClaimReviewState",
    "file": "src/features/claims/states/ClaimReviewState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.awaitingWalletApproval",
    "name": "Awaiting wallet approval",
    "component": "AwaitingWalletApprovalState",
    "file": "src/features/claims/states/AwaitingWalletApprovalState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.approvalRejected",
    "name": "Approval rejected",
    "component": "ApprovalRejectedState",
    "file": "src/features/claims/states/ApprovalRejectedState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.claimSubmitting",
    "name": "Claim submitting",
    "component": "ClaimSubmittingState",
    "file": "src/features/claims/states/ClaimSubmittingState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.claimPending",
    "name": "Claim pending",
    "component": "ClaimPendingState",
    "file": "src/features/claims/states/ClaimPendingState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.claimConfirmed",
    "name": "Claim confirmed",
    "component": "ClaimConfirmedState",
    "file": "src/features/claims/states/ClaimConfirmedState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.claimFailed",
    "name": "Claim failed",
    "component": "ClaimFailedState",
    "file": "src/features/claims/states/ClaimFailedState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.alreadyClaimed",
    "name": "Already claimed",
    "component": "AlreadyClaimedState",
    "file": "src/features/claims/states/AlreadyClaimedState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.eligibilityChanged",
    "name": "Eligibility changed",
    "component": "EligibilityChangedState",
    "file": "src/features/claims/states/EligibilityChangedState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.eligibilityUnavailable",
    "name": "Eligibility unavailable",
    "component": "EligibilityUnavailableState",
    "file": "src/features/claims/states/EligibilityUnavailableState.jsx",
    "priority": "P0"
  },
  {
    "id": "claims.claimReconciliation",
    "name": "Claim reconciliation",
    "component": "ClaimReconciliationState",
    "file": "src/features/claims/states/ClaimReconciliationState.jsx",
    "priority": "P0"
  },
  {
    "id": "creation.emptyDraft",
    "name": "Empty draft",
    "component": "EmptyDraftState",
    "file": "src/features/creation/states/EmptyDraftState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.draftLoading",
    "name": "Draft loading",
    "component": "DraftLoadingState",
    "file": "src/features/creation/states/DraftLoadingState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.draftSaved",
    "name": "Draft saved",
    "component": "DraftSavedState",
    "file": "src/features/creation/states/DraftSavedState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.unsavedChanges",
    "name": "Unsaved changes",
    "component": "UnsavedChangesState",
    "file": "src/features/creation/states/UnsavedChangesState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.aiGenerating",
    "name": "AI generating",
    "component": "AiGeneratingState",
    "file": "src/features/creation/states/AiGeneratingState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.aiUnavailable",
    "name": "AI unavailable",
    "component": "AiUnavailableState",
    "file": "src/features/creation/states/AiUnavailableState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.invalidAiOutput",
    "name": "Invalid AI output",
    "component": "InvalidAiOutputState",
    "file": "src/features/creation/states/InvalidAiOutputState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.ambiguousQuestion",
    "name": "Ambiguous question",
    "component": "AmbiguousQuestionState",
    "file": "src/features/creation/states/AmbiguousQuestionState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.missingDeadline",
    "name": "Missing deadline",
    "component": "MissingDeadlineState",
    "file": "src/features/creation/states/MissingDeadlineState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.invalidDate",
    "name": "Invalid date",
    "component": "InvalidDateState",
    "file": "src/features/creation/states/InvalidDateState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.missingResolutionSource",
    "name": "Missing resolution source",
    "component": "MissingResolutionSourceState",
    "file": "src/features/creation/states/MissingResolutionSourceState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.incompleteResolutionCriteria",
    "name": "Incomplete resolution criteria",
    "component": "IncompleteResolutionCriteriaState",
    "file": "src/features/creation/states/IncompleteResolutionCriteriaState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.possibleDuplicate",
    "name": "Possible duplicate",
    "component": "PossibleDuplicateState",
    "file": "src/features/creation/states/PossibleDuplicateState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.draftValidationPassed",
    "name": "Draft validation passed",
    "component": "DraftValidationPassedState",
    "file": "src/features/creation/states/DraftValidationPassedState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.feeQuoteLoading",
    "name": "Fee quote loading",
    "component": "FeeQuoteLoadingState",
    "file": "src/features/creation/states/FeeQuoteLoadingState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.feeQuoteExpired",
    "name": "Fee quote expired",
    "component": "FeeQuoteExpiredState",
    "file": "src/features/creation/states/FeeQuoteExpiredState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.feeQuoteFailed",
    "name": "Fee quote failed",
    "component": "FeeQuoteFailedState",
    "file": "src/features/creation/states/FeeQuoteFailedState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.insufficientBalance",
    "name": "Insufficient balance",
    "component": "InsufficientBalanceState",
    "file": "src/features/creation/states/InsufficientBalanceState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.creationRejected",
    "name": "Creation rejected",
    "component": "CreationRejectedState",
    "file": "src/features/creation/states/CreationRejectedState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.creationPending",
    "name": "Creation pending",
    "component": "CreationPendingState",
    "file": "src/features/creation/states/CreationPendingState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.creationFailed",
    "name": "Creation failed",
    "component": "CreationFailedState",
    "file": "src/features/creation/states/CreationFailedState.jsx",
    "priority": "P1"
  },
  {
    "id": "creation.creationConfirmed",
    "name": "Creation confirmed",
    "component": "CreationConfirmedState",
    "file": "src/features/creation/states/CreationConfirmedState.jsx",
    "priority": "P1"
  },
  {
    "id": "ai.noSelectedMarket",
    "name": "No selected market",
    "component": "NoSelectedMarketState",
    "file": "src/features/ai/states/NoSelectedMarketState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.emptyConversation",
    "name": "Empty conversation",
    "component": "EmptyConversationState",
    "file": "src/features/ai/states/EmptyConversationState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.loadingContext",
    "name": "Loading context",
    "component": "LoadingContextState",
    "file": "src/features/ai/states/LoadingContextState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.generatingResponse",
    "name": "Generating response",
    "component": "GeneratingResponseState",
    "file": "src/features/ai/states/GeneratingResponseState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.responseComplete",
    "name": "Response complete",
    "component": "ResponseCompleteState",
    "file": "src/features/ai/states/ResponseCompleteState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.missingMarketHistory",
    "name": "Missing market history",
    "component": "MissingMarketHistoryState",
    "file": "src/features/ai/states/MissingMarketHistoryState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.unsupportedQuestion",
    "name": "Unsupported question",
    "component": "UnsupportedQuestionState",
    "file": "src/features/ai/states/UnsupportedQuestionState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.sourcesUnavailable",
    "name": "Sources unavailable",
    "component": "SourcesUnavailableState",
    "file": "src/features/ai/states/SourcesUnavailableState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.staleAnalysis",
    "name": "Stale analysis",
    "component": "StaleAnalysisState",
    "file": "src/features/ai/states/StaleAnalysisState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.rateLimited",
    "name": "Rate limited",
    "component": "RateLimitedState",
    "file": "src/features/ai/states/RateLimitedState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.aiServiceUnavailable",
    "name": "AI service unavailable",
    "component": "AiServiceUnavailableState",
    "file": "src/features/ai/states/AiServiceUnavailableState.jsx",
    "priority": "future"
  },
  {
    "id": "ai.requestFailed",
    "name": "Request failed",
    "component": "RequestFailedState",
    "file": "src/features/ai/states/RequestFailedState.jsx",
    "priority": "future"
  },
  {
    "id": "community.noRooms",
    "name": "No rooms",
    "component": "NoRoomsState",
    "file": "src/features/community/states/NoRoomsState.jsx",
    "priority": "future"
  },
  {
    "id": "community.roomNotFound",
    "name": "Room not found",
    "component": "RoomNotFoundState",
    "file": "src/features/community/states/RoomNotFoundState.jsx",
    "priority": "future"
  },
  {
    "id": "community.roomUnavailable",
    "name": "Room unavailable",
    "component": "RoomUnavailableState",
    "file": "src/features/community/states/RoomUnavailableState.jsx",
    "priority": "future"
  },
  {
    "id": "community.noMarkets",
    "name": "No markets",
    "component": "NoMarketsState",
    "file": "src/features/community/states/NoMarketsState.jsx",
    "priority": "future"
  },
  {
    "id": "community.noDiscussions",
    "name": "No discussions",
    "component": "NoDiscussionsState",
    "file": "src/features/community/states/NoDiscussionsState.jsx",
    "priority": "future"
  },
  {
    "id": "community.noMembers",
    "name": "No members",
    "component": "NoMembersState",
    "file": "src/features/community/states/NoMembersState.jsx",
    "priority": "future"
  },
  {
    "id": "community.joinRequired",
    "name": "Join required",
    "component": "JoinRequiredState",
    "file": "src/features/community/states/JoinRequiredState.jsx",
    "priority": "future"
  },
  {
    "id": "community.postingRestricted",
    "name": "Posting restricted",
    "component": "PostingRestrictedState",
    "file": "src/features/community/states/PostingRestrictedState.jsx",
    "priority": "future"
  },
  {
    "id": "community.commentRemoved",
    "name": "Comment removed",
    "component": "CommentRemovedState",
    "file": "src/features/community/states/CommentRemovedState.jsx",
    "priority": "future"
  },
  {
    "id": "community.threadLocked",
    "name": "Thread locked",
    "component": "ThreadLockedState",
    "file": "src/features/community/states/ThreadLockedState.jsx",
    "priority": "future"
  },
  {
    "id": "community.contentReported",
    "name": "Content reported",
    "component": "ContentReportedState",
    "file": "src/features/community/states/ContentReportedState.jsx",
    "priority": "future"
  },
  {
    "id": "community.membershipRequestPending",
    "name": "Membership request pending",
    "component": "MembershipRequestPendingState",
    "file": "src/features/community/states/MembershipRequestPendingState.jsx",
    "priority": "future"
  },
  {
    "id": "profiles.profileNotFound",
    "name": "Profile not found",
    "component": "ProfileNotFoundState",
    "file": "src/features/profiles/states/ProfileNotFoundState.jsx",
    "priority": "future"
  },
  {
    "id": "profiles.privateRestrictedProfile",
    "name": "Private/restricted profile",
    "component": "PrivateRestrictedProfileState",
    "file": "src/features/profiles/states/PrivateRestrictedProfileState.jsx",
    "priority": "future"
  },
  {
    "id": "profiles.noForecasts",
    "name": "No forecasts",
    "component": "NoForecastsState",
    "file": "src/features/profiles/states/NoForecastsState.jsx",
    "priority": "future"
  },
  {
    "id": "profiles.noResolvedForecasts",
    "name": "No resolved forecasts",
    "component": "NoResolvedForecastsState",
    "file": "src/features/profiles/states/NoResolvedForecastsState.jsx",
    "priority": "future"
  },
  {
    "id": "profiles.insufficientScoringHistory",
    "name": "Insufficient scoring history",
    "component": "InsufficientScoringHistoryState",
    "file": "src/features/profiles/states/InsufficientScoringHistoryState.jsx",
    "priority": "future"
  },
  {
    "id": "profiles.noLeaderboardEntries",
    "name": "No leaderboard entries",
    "component": "NoLeaderboardEntriesState",
    "file": "src/features/profiles/states/NoLeaderboardEntriesState.jsx",
    "priority": "future"
  },
  {
    "id": "profiles.reputationUnavailable",
    "name": "Reputation unavailable",
    "component": "ReputationUnavailableState",
    "file": "src/features/profiles/states/ReputationUnavailableState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.balanceLoading",
    "name": "Balance loading",
    "component": "BalanceLoadingState",
    "file": "src/features/creator/states/BalanceLoadingState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.noFeesAvailable",
    "name": "No fees available",
    "component": "NoFeesAvailableState",
    "file": "src/features/creator/states/NoFeesAvailableState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.feesAvailable",
    "name": "Fees available",
    "component": "FeesAvailableState",
    "file": "src/features/creator/states/FeesAvailableState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.feeClaimReview",
    "name": "Fee-claim review",
    "component": "FeeClaimReviewState",
    "file": "src/features/creator/states/FeeClaimReviewState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.awaitingSignature",
    "name": "Awaiting signature",
    "component": "AwaitingSignatureState",
    "file": "src/features/creator/states/AwaitingSignatureState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.feeClaimPending",
    "name": "Fee claim pending",
    "component": "FeeClaimPendingState",
    "file": "src/features/creator/states/FeeClaimPendingState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.feeClaimConfirmed",
    "name": "Fee claim confirmed",
    "component": "FeeClaimConfirmedState",
    "file": "src/features/creator/states/FeeClaimConfirmedState.jsx",
    "priority": "future"
  },
  {
    "id": "creator.feeClaimFailed",
    "name": "Fee claim failed",
    "component": "FeeClaimFailedState",
    "file": "src/features/creator/states/FeeClaimFailedState.jsx",
    "priority": "future"
  },
  {
    "id": "saved.noSavedContent",
    "name": "No saved content",
    "component": "NoSavedContentState",
    "file": "src/features/saved/states/NoSavedContentState.jsx",
    "priority": "future"
  },
  {
    "id": "saved.savedItemUnavailable",
    "name": "Saved item unavailable",
    "component": "SavedItemUnavailableState",
    "file": "src/features/saved/states/SavedItemUnavailableState.jsx",
    "priority": "future"
  },
  {
    "id": "notifications.noNotifications",
    "name": "No notifications",
    "component": "NoNotificationsState",
    "file": "src/features/notifications/states/NoNotificationsState.jsx",
    "priority": "future"
  },
  {
    "id": "notifications.allNotificationsRead",
    "name": "All notifications read",
    "component": "AllNotificationsReadState",
    "file": "src/features/notifications/states/AllNotificationsReadState.jsx",
    "priority": "future"
  },
  {
    "id": "notifications.notificationDestinationUnavailable",
    "name": "Notification destination unavailable",
    "component": "NotificationDestinationUnavailableState",
    "file": "src/features/notifications/states/NotificationDestinationUnavailableState.jsx",
    "priority": "future"
  },
  {
    "id": "notifications.notificationPermissionsDisabled",
    "name": "Notification permissions disabled",
    "component": "NotificationPermissionsDisabledState",
    "file": "src/features/notifications/states/NotificationPermissionsDisabledState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.saveConfirmation",
    "name": "Save confirmation",
    "component": "SaveConfirmationState",
    "file": "src/features/settings/states/SaveConfirmationState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.unsavedChanges",
    "name": "Unsaved changes",
    "component": "UnsavedChangesState",
    "file": "src/features/settings/states/UnsavedChangesState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.settingsLoading",
    "name": "Settings loading",
    "component": "SettingsLoadingState",
    "file": "src/features/settings/states/SettingsLoadingState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.settingsSaveFailed",
    "name": "Settings save failed",
    "component": "SettingsSaveFailedState",
    "file": "src/features/settings/states/SettingsSaveFailedState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.sessionRevocationConfirmation",
    "name": "Session revocation confirmation",
    "component": "SessionRevocationConfirmationState",
    "file": "src/features/settings/states/SessionRevocationConfirmationState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.exportPending",
    "name": "Export pending",
    "component": "ExportPendingState",
    "file": "src/features/settings/states/ExportPendingState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.exportAvailable",
    "name": "Export available",
    "component": "ExportAvailableState",
    "file": "src/features/settings/states/ExportAvailableState.jsx",
    "priority": "future"
  },
  {
    "id": "settings.deletionConfirmation",
    "name": "Deletion confirmation",
    "component": "DeletionConfirmationState",
    "file": "src/features/settings/states/DeletionConfirmationState.jsx",
    "priority": "future"
  }
]
