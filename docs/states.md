# Implemented state screens

Community adds 48 states; see [community implementation](community-implementation.md). Authentication adds 117 states; see [authentication state checklist](auth-flows/states.md). All existing state component files now use meaningful titles, contextual explanations, status styling, and recovery/navigation actions. Feature scenario controls preserve the form underneath; no artificial network timers run.

The development-only `/dev/ui-states` gallery shows all 166 scaffold states plus `trading.quoteReady`, `trading.invalidAmount`, and 117 authentication states and 48 community states (333 total).

## global

- [Page loading](../src/components/states/PageLoadingState.jsx) — `global.pageLoading` · P0
- [Section loading](../src/components/states/SectionLoadingState.jsx) — `global.sectionLoading` · P0
- [Skeleton placeholder](../src/components/states/SkeletonPlaceholderState.jsx) — `global.skeletonPlaceholder` · P0
- [Empty state](../src/components/states/EmptyStateState.jsx) — `global.emptyState` · P0
- [No search results](../src/components/states/NoSearchResultsState.jsx) — `global.noSearchResults` · P0
- [Recoverable error](../src/components/states/RecoverableErrorState.jsx) — `global.recoverableError` · P0
- [Unexpected error](../src/components/states/UnexpectedErrorState.jsx) — `global.unexpectedError` · P0
- [Offline](../src/components/states/OfflineState.jsx) — `global.offline` · P0
- [Reconnecting](../src/components/states/ReconnectingState.jsx) — `global.reconnecting` · P0
- [Stale data](../src/components/states/StaleDataState.jsx) — `global.staleData` · P0
- [Partial data](../src/components/states/PartialDataState.jsx) — `global.partialData` · P0
- [API unavailable](../src/components/states/ApiUnavailableState.jsx) — `global.apiUnavailable` · P0
- [Rate limited](../src/components/states/RateLimitedState.jsx) — `global.rateLimited` · P0
- [Maintenance](../src/components/states/MaintenanceState.jsx) — `global.maintenance` · P0
- [Feature unavailable](../src/components/states/FeatureUnavailableState.jsx) — `global.featureUnavailable` · P0
- [Coming soon](../src/components/states/ComingSoonState.jsx) — `global.comingSoon` · P0
- [Wallet required](../src/components/states/WalletRequiredState.jsx) — `global.walletRequired` · P0
- [Authentication required](../src/components/states/AuthenticationRequiredState.jsx) — `global.authenticationRequired` · P0
- [Access denied](../src/components/states/AccessDeniedState.jsx) — `global.accessDenied` · P0
- [Not found](../src/components/states/NotFoundState.jsx) — `global.notFound` · P0
- [Invalid route parameter](../src/components/states/InvalidRouteParameterState.jsx) — `global.invalidRouteParameter` · P0
- [Success](../src/components/states/SuccessState.jsx) — `global.success` · P0
- [Confirmation required](../src/components/states/ConfirmationRequiredState.jsx) — `global.confirmationRequired` · P0

## trading

- [Choose YES/NO](../src/features/trading/states/ChooseYesNoState.jsx) — `trading.chooseYesNo` · P0
- [Enter amount](../src/features/trading/states/EnterAmountState.jsx) — `trading.enterAmount` · P0
- [Quote loading](../src/features/trading/states/QuoteLoadingState.jsx) — `trading.quoteLoading` · P0
- [Quote review](../src/features/trading/states/QuoteReviewState.jsx) — `trading.quoteReview` · P0
- [Quote expired](../src/features/trading/states/QuoteExpiredState.jsx) — `trading.quoteExpired` · P0
- [Quote unavailable](../src/features/trading/states/QuoteUnavailableState.jsx) — `trading.quoteUnavailable` · P0
- [Insufficient token balance](../src/features/trading/states/InsufficientTokenBalanceState.jsx) — `trading.insufficientTokenBalance` · P0
- [Insufficient network-fee balance](../src/features/trading/states/InsufficientNetworkFeeBalanceState.jsx) — `trading.insufficientNetworkFeeBalance` · P0
- [Unsupported network](../src/features/trading/states/UnsupportedNetworkState.jsx) — `trading.unsupportedNetwork` · P0
- [Market closed](../src/features/trading/states/MarketClosedState.jsx) — `trading.marketClosed` · P0
- [Trading unavailable](../src/features/trading/states/TradingUnavailableState.jsx) — `trading.tradingUnavailable` · P0
- [Transaction validation failure](../src/features/trading/states/TransactionValidationFailureState.jsx) — `trading.transactionValidationFailure` · P0
- [Awaiting wallet approval](../src/features/trading/states/AwaitingWalletApprovalState.jsx) — `trading.awaitingWalletApproval` · P0
- [Wallet approval rejected](../src/features/trading/states/WalletApprovalRejectedState.jsx) — `trading.walletApprovalRejected` · P0
- [Transaction submitting](../src/features/trading/states/TransactionSubmittingState.jsx) — `trading.transactionSubmitting` · P0
- [Transaction submitted](../src/features/trading/states/TransactionSubmittedState.jsx) — `trading.transactionSubmitted` · P0
- [Transaction pending confirmation](../src/features/trading/states/TransactionPendingConfirmationState.jsx) — `trading.transactionPendingConfirmation` · P0
- [Confirmation status unknown](../src/features/trading/states/ConfirmationStatusUnknownState.jsx) — `trading.confirmationStatusUnknown` · P0
- [Transaction confirmed](../src/features/trading/states/TransactionConfirmedState.jsx) — `trading.transactionConfirmed` · P0
- [Transaction failed](../src/features/trading/states/TransactionFailedState.jsx) — `trading.transactionFailed` · P0
- [Transaction expired](../src/features/trading/states/TransactionExpiredState.jsx) — `trading.transactionExpired` · P0
- [Transaction reconciliation](../src/features/trading/states/TransactionReconciliationState.jsx) — `trading.transactionReconciliation` · P0
- [Transaction details/receipt](../src/features/trading/states/TransactionDetailsReceiptState.jsx) — `trading.transactionDetailsReceipt` · P0

## wallet

- [Connect-wallet modal](../src/features/wallet/states/ConnectWalletModalState.jsx) — `wallet.connectWalletModal` · P0
- [Wallet selection](../src/features/wallet/states/WalletSelectionState.jsx) — `wallet.walletSelection` · P0
- [Wallet not detected](../src/features/wallet/states/WalletNotDetectedState.jsx) — `wallet.walletNotDetected` · P0
- [Connecting](../src/features/wallet/states/ConnectingState.jsx) — `wallet.connecting` · P0
- [Connection failed](../src/features/wallet/states/ConnectionFailedState.jsx) — `wallet.connectionFailed` · P0
- [Wallet connected/account menu](../src/features/wallet/states/WalletConnectedAccountMenuState.jsx) — `wallet.walletConnectedAccountMenu` · P0
- [Wallet account changed](../src/features/wallet/states/WalletAccountChangedState.jsx) — `wallet.walletAccountChanged` · P0
- [Wallet disconnected](../src/features/wallet/states/WalletDisconnectedState.jsx) — `wallet.walletDisconnected` · P0
- [Unsupported network](../src/features/wallet/states/UnsupportedNetworkState.jsx) — `wallet.unsupportedNetwork` · P0

## auth

- [Sign-in challenge explanation](../src/features/auth/states/SignInChallengeExplanationState.jsx) — `auth.signInChallengeExplanation` · P0
- [Awaiting authentication signature](../src/features/auth/states/AwaitingAuthenticationSignatureState.jsx) — `auth.awaitingAuthenticationSignature` · P0
- [Authentication rejected](../src/features/auth/states/AuthenticationRejectedState.jsx) — `auth.authenticationRejected` · P0
- [Authentication expired](../src/features/auth/states/AuthenticationExpiredState.jsx) — `auth.authenticationExpired` · P0
- [Session expired](../src/features/auth/states/SessionExpiredState.jsx) — `auth.sessionExpired` · P0
- [Wallet-required gate](../src/features/auth/states/WalletRequiredGateState.jsx) — `auth.walletRequiredGate` · P0
- [Authentication-required gate](../src/features/auth/states/AuthenticationRequiredGateState.jsx) — `auth.authenticationRequiredGate` · P0
- [Unauthorized-access screen](../src/features/auth/states/UnauthorizedAccessScreenState.jsx) — `auth.unauthorizedAccessScreen` · P0

## portfolio

- [Wallet disconnected](../src/features/portfolio/states/WalletDisconnectedState.jsx) — `portfolio.walletDisconnected` · P0
- [Loading positions](../src/features/portfolio/states/LoadingPositionsState.jsx) — `portfolio.loadingPositions` · P0
- [No positions](../src/features/portfolio/states/NoPositionsState.jsx) — `portfolio.noPositions` · P0
- [No open positions](../src/features/portfolio/states/NoOpenPositionsState.jsx) — `portfolio.noOpenPositions` · P0
- [No resolved positions](../src/features/portfolio/states/NoResolvedPositionsState.jsx) — `portfolio.noResolvedPositions` · P0
- [No claimable positions](../src/features/portfolio/states/NoClaimablePositionsState.jsx) — `portfolio.noClaimablePositions` · P0
- [Partial data](../src/features/portfolio/states/PartialDataState.jsx) — `portfolio.partialData` · P0
- [Stale data](../src/features/portfolio/states/StaleDataState.jsx) — `portfolio.staleData` · P0
- [Position synchronization](../src/features/portfolio/states/PositionSynchronizationState.jsx) — `portfolio.positionSynchronization` · P0
- [Positions unavailable](../src/features/portfolio/states/PositionsUnavailableState.jsx) — `portfolio.positionsUnavailable` · P0
- [Position not found](../src/features/portfolio/states/PositionNotFoundState.jsx) — `portfolio.positionNotFound` · P0
- [Position belongs to another wallet](../src/features/portfolio/states/PositionBelongsToAnotherWalletState.jsx) — `portfolio.positionBelongsToAnotherWallet` · P0

## claims

- [Checking eligibility](../src/features/claims/states/CheckingEligibilityState.jsx) — `claims.checkingEligibility` · P0
- [Eligible](../src/features/claims/states/EligibleState.jsx) — `claims.eligible` · P0
- [Not eligible](../src/features/claims/states/NotEligibleState.jsx) — `claims.notEligible` · P0
- [Market unresolved](../src/features/claims/states/MarketUnresolvedState.jsx) — `claims.marketUnresolved` · P0
- [No claims available](../src/features/claims/states/NoClaimsAvailableState.jsx) — `claims.noClaimsAvailable` · P0
- [Claim review](../src/features/claims/states/ClaimReviewState.jsx) — `claims.claimReview` · P0
- [Awaiting wallet approval](../src/features/claims/states/AwaitingWalletApprovalState.jsx) — `claims.awaitingWalletApproval` · P0
- [Approval rejected](../src/features/claims/states/ApprovalRejectedState.jsx) — `claims.approvalRejected` · P0
- [Claim submitting](../src/features/claims/states/ClaimSubmittingState.jsx) — `claims.claimSubmitting` · P0
- [Claim pending](../src/features/claims/states/ClaimPendingState.jsx) — `claims.claimPending` · P0
- [Claim confirmed](../src/features/claims/states/ClaimConfirmedState.jsx) — `claims.claimConfirmed` · P0
- [Claim failed](../src/features/claims/states/ClaimFailedState.jsx) — `claims.claimFailed` · P0
- [Already claimed](../src/features/claims/states/AlreadyClaimedState.jsx) — `claims.alreadyClaimed` · P0
- [Eligibility changed](../src/features/claims/states/EligibilityChangedState.jsx) — `claims.eligibilityChanged` · P0
- [Eligibility unavailable](../src/features/claims/states/EligibilityUnavailableState.jsx) — `claims.eligibilityUnavailable` · P0
- [Claim reconciliation](../src/features/claims/states/ClaimReconciliationState.jsx) — `claims.claimReconciliation` · P0

## creation

- [Empty draft](../src/features/creation/states/EmptyDraftState.jsx) — `creation.emptyDraft` · P1
- [Draft loading](../src/features/creation/states/DraftLoadingState.jsx) — `creation.draftLoading` · P1
- [Draft saved](../src/features/creation/states/DraftSavedState.jsx) — `creation.draftSaved` · P1
- [Unsaved changes](../src/features/creation/states/UnsavedChangesState.jsx) — `creation.unsavedChanges` · P1
- [AI generating](../src/features/creation/states/AiGeneratingState.jsx) — `creation.aiGenerating` · P1
- [AI unavailable](../src/features/creation/states/AiUnavailableState.jsx) — `creation.aiUnavailable` · P1
- [Invalid AI output](../src/features/creation/states/InvalidAiOutputState.jsx) — `creation.invalidAiOutput` · P1
- [Ambiguous question](../src/features/creation/states/AmbiguousQuestionState.jsx) — `creation.ambiguousQuestion` · P1
- [Missing deadline](../src/features/creation/states/MissingDeadlineState.jsx) — `creation.missingDeadline` · P1
- [Invalid date](../src/features/creation/states/InvalidDateState.jsx) — `creation.invalidDate` · P1
- [Missing resolution source](../src/features/creation/states/MissingResolutionSourceState.jsx) — `creation.missingResolutionSource` · P1
- [Incomplete resolution criteria](../src/features/creation/states/IncompleteResolutionCriteriaState.jsx) — `creation.incompleteResolutionCriteria` · P1
- [Possible duplicate](../src/features/creation/states/PossibleDuplicateState.jsx) — `creation.possibleDuplicate` · P1
- [Draft validation passed](../src/features/creation/states/DraftValidationPassedState.jsx) — `creation.draftValidationPassed` · P1
- [Fee quote loading](../src/features/creation/states/FeeQuoteLoadingState.jsx) — `creation.feeQuoteLoading` · P1
- [Fee quote expired](../src/features/creation/states/FeeQuoteExpiredState.jsx) — `creation.feeQuoteExpired` · P1
- [Fee quote failed](../src/features/creation/states/FeeQuoteFailedState.jsx) — `creation.feeQuoteFailed` · P1
- [Insufficient balance](../src/features/creation/states/InsufficientBalanceState.jsx) — `creation.insufficientBalance` · P1
- [Creation rejected](../src/features/creation/states/CreationRejectedState.jsx) — `creation.creationRejected` · P1
- [Creation pending](../src/features/creation/states/CreationPendingState.jsx) — `creation.creationPending` · P1
- [Creation failed](../src/features/creation/states/CreationFailedState.jsx) — `creation.creationFailed` · P1
- [Creation confirmed](../src/features/creation/states/CreationConfirmedState.jsx) — `creation.creationConfirmed` · P1

## ai

- [No selected market](../src/features/ai/states/NoSelectedMarketState.jsx) — `ai.noSelectedMarket` · future
- [Empty conversation](../src/features/ai/states/EmptyConversationState.jsx) — `ai.emptyConversation` · future
- [Loading context](../src/features/ai/states/LoadingContextState.jsx) — `ai.loadingContext` · future
- [Generating response](../src/features/ai/states/GeneratingResponseState.jsx) — `ai.generatingResponse` · future
- [Response complete](../src/features/ai/states/ResponseCompleteState.jsx) — `ai.responseComplete` · future
- [Missing market history](../src/features/ai/states/MissingMarketHistoryState.jsx) — `ai.missingMarketHistory` · future
- [Unsupported question](../src/features/ai/states/UnsupportedQuestionState.jsx) — `ai.unsupportedQuestion` · future
- [Sources unavailable](../src/features/ai/states/SourcesUnavailableState.jsx) — `ai.sourcesUnavailable` · future
- [Stale analysis](../src/features/ai/states/StaleAnalysisState.jsx) — `ai.staleAnalysis` · future
- [Rate limited](../src/features/ai/states/RateLimitedState.jsx) — `ai.rateLimited` · future
- [AI service unavailable](../src/features/ai/states/AiServiceUnavailableState.jsx) — `ai.aiServiceUnavailable` · future
- [Request failed](../src/features/ai/states/RequestFailedState.jsx) — `ai.requestFailed` · future

## community

- [No rooms](../src/features/community/states/NoRoomsState.jsx) — `community.noRooms` · future
- [Room not found](../src/features/community/states/RoomNotFoundState.jsx) — `community.roomNotFound` · future
- [Room unavailable](../src/features/community/states/RoomUnavailableState.jsx) — `community.roomUnavailable` · future
- [No markets](../src/features/community/states/NoMarketsState.jsx) — `community.noMarkets` · future
- [No discussions](../src/features/community/states/NoDiscussionsState.jsx) — `community.noDiscussions` · future
- [No members](../src/features/community/states/NoMembersState.jsx) — `community.noMembers` · future
- [Join required](../src/features/community/states/JoinRequiredState.jsx) — `community.joinRequired` · future
- [Posting restricted](../src/features/community/states/PostingRestrictedState.jsx) — `community.postingRestricted` · future
- [Comment removed](../src/features/community/states/CommentRemovedState.jsx) — `community.commentRemoved` · future
- [Thread locked](../src/features/community/states/ThreadLockedState.jsx) — `community.threadLocked` · future
- [Content reported](../src/features/community/states/ContentReportedState.jsx) — `community.contentReported` · future
- [Membership request pending](../src/features/community/states/MembershipRequestPendingState.jsx) — `community.membershipRequestPending` · future

## profiles

- [Profile not found](../src/features/profiles/states/ProfileNotFoundState.jsx) — `profiles.profileNotFound` · future
- [Private/restricted profile](../src/features/profiles/states/PrivateRestrictedProfileState.jsx) — `profiles.privateRestrictedProfile` · future
- [No forecasts](../src/features/profiles/states/NoForecastsState.jsx) — `profiles.noForecasts` · future
- [No resolved forecasts](../src/features/profiles/states/NoResolvedForecastsState.jsx) — `profiles.noResolvedForecasts` · future
- [Insufficient scoring history](../src/features/profiles/states/InsufficientScoringHistoryState.jsx) — `profiles.insufficientScoringHistory` · future
- [No leaderboard entries](../src/features/profiles/states/NoLeaderboardEntriesState.jsx) — `profiles.noLeaderboardEntries` · future
- [Reputation unavailable](../src/features/profiles/states/ReputationUnavailableState.jsx) — `profiles.reputationUnavailable` · future

## creator

- [Balance loading](../src/features/creator/states/BalanceLoadingState.jsx) — `creator.balanceLoading` · future
- [No fees available](../src/features/creator/states/NoFeesAvailableState.jsx) — `creator.noFeesAvailable` · future
- [Fees available](../src/features/creator/states/FeesAvailableState.jsx) — `creator.feesAvailable` · future
- [Fee-claim review](../src/features/creator/states/FeeClaimReviewState.jsx) — `creator.feeClaimReview` · future
- [Awaiting signature](../src/features/creator/states/AwaitingSignatureState.jsx) — `creator.awaitingSignature` · future
- [Fee claim pending](../src/features/creator/states/FeeClaimPendingState.jsx) — `creator.feeClaimPending` · future
- [Fee claim confirmed](../src/features/creator/states/FeeClaimConfirmedState.jsx) — `creator.feeClaimConfirmed` · future
- [Fee claim failed](../src/features/creator/states/FeeClaimFailedState.jsx) — `creator.feeClaimFailed` · future

## saved

- [No saved content](../src/features/saved/states/NoSavedContentState.jsx) — `saved.noSavedContent` · future
- [Saved item unavailable](../src/features/saved/states/SavedItemUnavailableState.jsx) — `saved.savedItemUnavailable` · future

## notifications

- [No notifications](../src/features/notifications/states/NoNotificationsState.jsx) — `notifications.noNotifications` · future
- [All notifications read](../src/features/notifications/states/AllNotificationsReadState.jsx) — `notifications.allNotificationsRead` · future
- [Notification destination unavailable](../src/features/notifications/states/NotificationDestinationUnavailableState.jsx) — `notifications.notificationDestinationUnavailable` · future
- [Notification permissions disabled](../src/features/notifications/states/NotificationPermissionsDisabledState.jsx) — `notifications.notificationPermissionsDisabled` · future

## settings

- [Save confirmation](../src/features/settings/states/SaveConfirmationState.jsx) — `settings.saveConfirmation` · future
- [Unsaved changes](../src/features/settings/states/UnsavedChangesState.jsx) — `settings.unsavedChanges` · future
- [Settings loading](../src/features/settings/states/SettingsLoadingState.jsx) — `settings.settingsLoading` · future
- [Settings save failed](../src/features/settings/states/SettingsSaveFailedState.jsx) — `settings.settingsSaveFailed` · future
- [Session revocation confirmation](../src/features/settings/states/SessionRevocationConfirmationState.jsx) — `settings.sessionRevocationConfirmation` · future
- [Export pending](../src/features/settings/states/ExportPendingState.jsx) — `settings.exportPending` · future
- [Export available](../src/features/settings/states/ExportAvailableState.jsx) — `settings.exportAvailable` · future
- [Deletion confirmation](../src/features/settings/states/DeletionConfirmationState.jsx) — `settings.deletionConfirmation` · future

Submitting, submitted, pending confirmation, confirmation unknown, confirmed, failed, expired, and reconciliation remain distinct. Every completion is labelled simulated; nothing represents a real blockchain confirmation.
