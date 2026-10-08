# Final source tree

Generated build, installed dependencies, and isolated browser profile contents are omitted.

```text
hackaton/
|-- docs/
|   |-- auth-flows/
|   |   |-- README.md
|   |   |-- routes.md
|   |   |-- states.md
|   |   |-- verification.md
|   |-- screenshots/
|   |   |-- ai-desktop.png
|   |   |-- auth-login-mobile.png
|   |   |-- auth-methods-desktop.png
|   |   |-- auth-signup-desktop.png
|   |   |-- community-1280.png
|   |   |-- community-390.png
|   |   |-- creation-tablet.png
|   |   |-- explore-desktop.png
|   |   |-- explore-mobile.png
|   |   |-- landing-desktop.png
|   |   |-- landing-mobile.png
|   |   |-- market-desktop.png
|   |   |-- market-mobile.png
|   |   |-- mobile-explore-390.png
|   |   |-- mobile-landing-320.png
|   |   |-- mobile-landscape-844.png
|   |   |-- mobile-portfolio-390.png
|   |   |-- mobile-trade-review-390.png
|   |-- auth-browser-results.json
|   |-- browser-check-results.json
|   |-- changes.md
|   |-- community-browser-checks.json
|   |-- community-implementation.md
|   |-- community-validation.md
|   |-- contrast-checks.json
|   |-- implementation-notes.md
|   |-- mobile-browser-results.json
|   |-- mobile-implementation.md
|   |-- project-tree.md
|   |-- routes.md
|   |-- scaffold-map.md
|   |-- states.md
|   |-- validation.md
|-- public/
|-- scripts/
|   |-- auth-browser-check.mjs
|   |-- browser-review.mjs
|   |-- community-browser-check.mjs
|   |-- frontend-browser-check.mjs
|   |-- mobile-browser-check.mjs
|   |-- production-check.mjs
|   |-- update-auth-docs.mjs
|   |-- update-docs.mjs
|   |-- verify-auth.mjs
|   |-- verify-community.mjs
|   |-- verify-frontend.mjs
|   |-- verify-scaffold.mjs
|-- src/
|   |-- app/
|   |   |-- AppRouter.jsx
|   |   |-- authRoutes.js
|   |   |-- communityRoutes.js
|   |   |-- navigation.js
|   |   |-- Providers.jsx
|   |   |-- RouteErrorBoundary.jsx
|   |   |-- routeMatcher.js
|   |   |-- routes.js
|   |   |-- stateManifest.js
|   |-- assets/
|   |   |-- fonts/
|   |   |   |-- .gitkeep
|   |   |-- icons/
|   |   |   |-- .gitkeep
|   |   |-- images/
|   |   |   |-- .gitkeep
|   |-- components/
|   |   |-- ai/
|   |   |   |-- AnalysisHistory.jsx
|   |   |   |-- AnalysisResult.jsx
|   |   |   |-- CaveatPanel.jsx
|   |   |   |-- ConversationHistorySheet.jsx
|   |   |   |-- ConversationSidebar.jsx
|   |   |   |-- MarketContextSelector.jsx
|   |   |   |-- MessageList.jsx
|   |   |   |-- MissingDataNotice.jsx
|   |   |   |-- PromptComposer.jsx
|   |   |   |-- PromptInput.jsx
|   |   |   |-- ResponsePanel.jsx
|   |   |   |-- SourceList.jsx
|   |   |   |-- SourceReferences.jsx
|   |   |-- auth/
|   |   |   |-- AuthFields.jsx
|   |   |   |-- AuthLayout.jsx
|   |   |   |-- AuthStatus.jsx
|   |   |   |-- SessionGate.jsx
|   |   |-- comments/
|   |   |   |-- CommunityComments.jsx
|   |   |-- community/
|   |   |   |-- CommunityControls.jsx
|   |   |   |-- CommunityForm.jsx
|   |   |   |-- CommunityHeader.jsx
|   |   |   |-- CommunityState.jsx
|   |   |   |-- MembershipButton.jsx
|   |   |-- data/
|   |   |   |-- ChartPlaceholder.jsx
|   |   |   |-- MetricCard.jsx
|   |   |   |-- SourceLink.jsx
|   |   |   |-- TablePlaceholder.jsx
|   |   |   |-- Timestamp.jsx
|   |   |-- feedback/
|   |   |   |-- Alert.jsx
|   |   |   |-- ErrorPanel.jsx
|   |   |   |-- LoadingIndicator.jsx
|   |   |   |-- StatePanel.jsx
|   |   |   |-- StatusBadge.jsx
|   |   |   |-- ToastBoundary.jsx
|   |   |-- landing/
|   |   |   |-- LandingDetails.jsx
|   |   |-- layout/
|   |   |   |-- AppShell.jsx
|   |   |   |-- PageShell.jsx
|   |   |   |-- PublicShell.jsx
|   |   |   |-- ResponsiveContainer.jsx
|   |   |   |-- SectionShell.jsx
|   |   |-- market/
|   |   |   |-- AiSourcesAndCaveats.jsx
|   |   |   |-- AiSummaryPanel.jsx
|   |   |   |-- CategoryFilter.jsx
|   |   |   |-- DataFreshnessLabel.jsx
|   |   |   |-- DiscoverySheets.jsx
|   |   |   |-- MarketCard.jsx
|   |   |   |-- MarketHeader.jsx
|   |   |   |-- MarketLifecycleBadge.jsx
|   |   |   |-- MarketList.jsx
|   |   |   |-- PriceChart.jsx
|   |   |   |-- RelatedMarketList.jsx
|   |   |   |-- ResolutionSourcePanel.jsx
|   |   |   |-- SearchField.jsx
|   |   |   |-- SortControl.jsx
|   |   |   |-- YesNoPriceDisplay.jsx
|   |   |-- moderation/
|   |   |   |-- MemberActionDialog.jsx
|   |   |-- navigation/
|   |   |   |-- Breadcrumbs.jsx
|   |   |   |-- Header.jsx
|   |   |   |-- MobileChrome.jsx
|   |   |   |-- MobileNavigation.jsx
|   |   |   |-- Sidebar.jsx
|   |   |   |-- Tabs.jsx
|   |   |-- overlays/
|   |   |   |-- ConfirmationDialog.jsx
|   |   |   |-- Drawer.jsx
|   |   |   |-- Modal.jsx
|   |   |   |-- WalletGate.jsx
|   |   |-- positions/
|   |   |   |-- AssociatedMarket.jsx
|   |   |   |-- AvailableEntryCostInformation.jsx
|   |   |   |-- ClaimStatus.jsx
|   |   |   |-- CurrentPositionInformation.jsx
|   |   |   |-- PositionCard.jsx
|   |   |   |-- PositionOverview.jsx
|   |   |   |-- ResolutionResult.jsx
|   |   |   |-- TransactionHistory.jsx
|   |   |-- posts/
|   |   |   |-- LikeButton.jsx
|   |   |   |-- PostCard.jsx
|   |   |   |-- PostComposer.jsx
|   |   |   |-- PostDialogs.jsx
|   |   |-- profiles/
|   |   |   |-- ForecastHistory.jsx
|   |   |   |-- LeaderboardFilters.jsx
|   |   |   |-- LeaderboardList.jsx
|   |   |   |-- ProfileHeader.jsx
|   |   |   |-- ReputationExplanation.jsx
|   |   |   |-- SampleSizeNotice.jsx
|   |   |   |-- ScoreBreakdown.jsx
|   |   |-- roomManagement/
|   |   |   |-- GeneralDetails.jsx
|   |   |   |-- MarketAssociation.jsx
|   |   |   |-- MemberManagement.jsx
|   |   |   |-- ModerationQueue.jsx
|   |   |   |-- RolesAndPermissions.jsx
|   |   |   |-- RoomRules.jsx
|   |   |-- social/
|   |   |   |-- Avatar.jsx
|   |   |   |-- Comment.jsx
|   |   |   |-- CommentComposer.jsx
|   |   |   |-- CommentReplyThread.jsx
|   |   |   |-- DiscussionList.jsx
|   |   |   |-- FollowControl.jsx
|   |   |   |-- ProfileCard.jsx
|   |   |   |-- ReplyList.jsx
|   |   |   |-- ReportContentDialog.jsx
|   |   |   |-- ReportDialog.jsx
|   |   |-- splash/
|   |   |   |-- SplashOverlay.jsx
|   |   |-- states/
|   |   |   |-- AccessDeniedState.jsx
|   |   |   |-- ApiUnavailableState.jsx
|   |   |   |-- AuthenticationRequiredState.jsx
|   |   |   |-- ComingSoonState.jsx
|   |   |   |-- ConfirmationRequiredState.jsx
|   |   |   |-- EmptyStateState.jsx
|   |   |   |-- FeatureUnavailableState.jsx
|   |   |   |-- index.js
|   |   |   |-- InvalidRouteParameterState.jsx
|   |   |   |-- MaintenanceState.jsx
|   |   |   |-- NoSearchResultsState.jsx
|   |   |   |-- NotFoundState.jsx
|   |   |   |-- OfflineState.jsx
|   |   |   |-- PageLoadingState.jsx
|   |   |   |-- PartialDataState.jsx
|   |   |   |-- RateLimitedState.jsx
|   |   |   |-- ReconnectingState.jsx
|   |   |   |-- RecoverableErrorState.jsx
|   |   |   |-- SectionLoadingState.jsx
|   |   |   |-- SkeletonPlaceholderState.jsx
|   |   |   |-- StaleDataState.jsx
|   |   |   |-- SuccessState.jsx
|   |   |   |-- UnexpectedErrorState.jsx
|   |   |   |-- WalletRequiredState.jsx
|   |   |-- transactions/
|   |   |   |-- AmountInput.jsx
|   |   |   |-- FeeSummary.jsx
|   |   |   |-- OutcomeSelector.jsx
|   |   |   |-- QuotePanel.jsx
|   |   |   |-- QuoteReview.jsx
|   |   |   |-- Receipt.jsx
|   |   |   |-- TradeTicket.jsx
|   |   |   |-- TransactionList.jsx
|   |   |   |-- TransactionReceipt.jsx
|   |   |-- ui/
|   |   |   |-- FeatureWidget.jsx
|   |   |   |-- Icon.jsx
|   |   |   |-- primitives.jsx
|   |-- constants/
|   |   |-- features.js
|   |   |-- routes.js
|   |   |-- uiStates.js
|   |-- demo/
|   |   |-- DemoContext.jsx
|   |   |-- fixtures.js
|   |   |-- useDemo.js
|   |-- features/
|   |   |-- ai/
|   |   |   |-- states/
|   |   |   |   |-- AiServiceUnavailableState.jsx
|   |   |   |   |-- EmptyConversationState.jsx
|   |   |   |   |-- GeneratingResponseState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- LoadingContextState.jsx
|   |   |   |   |-- MissingMarketHistoryState.jsx
|   |   |   |   |-- NoSelectedMarketState.jsx
|   |   |   |   |-- RateLimitedState.jsx
|   |   |   |   |-- RequestFailedState.jsx
|   |   |   |   |-- ResponseCompleteState.jsx
|   |   |   |   |-- SourcesUnavailableState.jsx
|   |   |   |   |-- StaleAnalysisState.jsx
|   |   |   |   |-- UnsupportedQuestionState.jsx
|   |   |   |-- AiView.jsx
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- auth/
|   |   |   |-- states/
|   |   |   |   |-- AuthenticationExpiredState.jsx
|   |   |   |   |-- AuthenticationRejectedState.jsx
|   |   |   |   |-- AuthenticationRequiredGateState.jsx
|   |   |   |   |-- AwaitingAuthenticationSignatureState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- SessionExpiredState.jsx
|   |   |   |   |-- SignInChallengeExplanationState.jsx
|   |   |   |   |-- UnauthorizedAccessScreenState.jsx
|   |   |   |   |-- WalletRequiredGateState.jsx
|   |   |   |-- AccountSecurity.jsx
|   |   |   |-- AuthContext.jsx
|   |   |   |-- authStates.js
|   |   |   |-- AuthView.jsx
|   |   |   |-- config.js
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |   |-- useAuth.js
|   |   |   |-- WalletAuth.jsx
|   |   |-- claims/
|   |   |   |-- states/
|   |   |   |   |-- AlreadyClaimedState.jsx
|   |   |   |   |-- ApprovalRejectedState.jsx
|   |   |   |   |-- AwaitingWalletApprovalState.jsx
|   |   |   |   |-- CheckingEligibilityState.jsx
|   |   |   |   |-- ClaimConfirmedState.jsx
|   |   |   |   |-- ClaimFailedState.jsx
|   |   |   |   |-- ClaimPendingState.jsx
|   |   |   |   |-- ClaimReconciliationState.jsx
|   |   |   |   |-- ClaimReviewState.jsx
|   |   |   |   |-- ClaimSubmittingState.jsx
|   |   |   |   |-- EligibilityChangedState.jsx
|   |   |   |   |-- EligibilityUnavailableState.jsx
|   |   |   |   |-- EligibleState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- MarketUnresolvedState.jsx
|   |   |   |   |-- NoClaimsAvailableState.jsx
|   |   |   |   |-- NotEligibleState.jsx
|   |   |   |-- ClaimsView.jsx
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- community/
|   |   |   |-- states/
|   |   |   |   |-- CommentRemovedState.jsx
|   |   |   |   |-- ContentReportedState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- JoinRequiredState.jsx
|   |   |   |   |-- MembershipRequestPendingState.jsx
|   |   |   |   |-- NoDiscussionsState.jsx
|   |   |   |   |-- NoMarketsState.jsx
|   |   |   |   |-- NoMembersState.jsx
|   |   |   |   |-- NoRoomsState.jsx
|   |   |   |   |-- PostingRestrictedState.jsx
|   |   |   |   |-- RoomNotFoundState.jsx
|   |   |   |   |-- RoomUnavailableState.jsx
|   |   |   |   |-- ThreadLockedState.jsx
|   |   |   |-- CommunityManagement.jsx
|   |   |   |-- CommunityProvider.jsx
|   |   |   |-- communityStates.js
|   |   |   |-- CommunityView.jsx
|   |   |   |-- CommunityWorkspace.jsx
|   |   |   |-- Discussion.jsx
|   |   |   |-- hooks.js
|   |   |   |-- model.js
|   |   |   |-- permissions.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |   |-- useCommunity.js
|   |   |-- creation/
|   |   |   |-- states/
|   |   |   |   |-- AiGeneratingState.jsx
|   |   |   |   |-- AiUnavailableState.jsx
|   |   |   |   |-- AmbiguousQuestionState.jsx
|   |   |   |   |-- CreationConfirmedState.jsx
|   |   |   |   |-- CreationFailedState.jsx
|   |   |   |   |-- CreationPendingState.jsx
|   |   |   |   |-- CreationRejectedState.jsx
|   |   |   |   |-- DraftLoadingState.jsx
|   |   |   |   |-- DraftSavedState.jsx
|   |   |   |   |-- DraftValidationPassedState.jsx
|   |   |   |   |-- EmptyDraftState.jsx
|   |   |   |   |-- FeeQuoteExpiredState.jsx
|   |   |   |   |-- FeeQuoteFailedState.jsx
|   |   |   |   |-- FeeQuoteLoadingState.jsx
|   |   |   |   |-- IncompleteResolutionCriteriaState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- InsufficientBalanceState.jsx
|   |   |   |   |-- InvalidAiOutputState.jsx
|   |   |   |   |-- InvalidDateState.jsx
|   |   |   |   |-- MissingDeadlineState.jsx
|   |   |   |   |-- MissingResolutionSourceState.jsx
|   |   |   |   |-- PossibleDuplicateState.jsx
|   |   |   |   |-- UnsavedChangesState.jsx
|   |   |   |-- steps/
|   |   |   |   |-- ApproveWalletTransactionStep.jsx
|   |   |   |   |-- ChooseCategoryAndRoomStep.jsx
|   |   |   |   |-- CreationConfirmedStep.jsx
|   |   |   |   |-- DefineClosingDeadlineAndTimezoneStep.jsx
|   |   |   |   |-- DefineResolutionSourceAndObservationRulesStep.jsx
|   |   |   |   |-- EditTitleAndDescriptionStep.jsx
|   |   |   |   |-- EnterPredictionQuestionStep.jsx
|   |   |   |   |-- GenerateAiDraftStep.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- OpenCreatedMarketStep.jsx
|   |   |   |   |-- PendingConfirmationStep.jsx
|   |   |   |   |-- PreviewMarketStep.jsx
|   |   |   |   |-- RequestCreationFeeQuoteStep.jsx
|   |   |   |   |-- ReviewAmbiguityAndDuplicateWarningsStep.jsx
|   |   |   |   |-- ReviewFeesAndTransactionStep.jsx
|   |   |   |   |-- ReviewYesNoOutcomesStep.jsx
|   |   |   |-- CreationStep.jsx
|   |   |   |-- CreationView.jsx
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |   |-- wizard.js
|   |   |-- creator/
|   |   |   |-- states/
|   |   |   |   |-- AwaitingSignatureState.jsx
|   |   |   |   |-- BalanceLoadingState.jsx
|   |   |   |   |-- FeeClaimConfirmedState.jsx
|   |   |   |   |-- FeeClaimFailedState.jsx
|   |   |   |   |-- FeeClaimPendingState.jsx
|   |   |   |   |-- FeeClaimReviewState.jsx
|   |   |   |   |-- FeesAvailableState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- NoFeesAvailableState.jsx
|   |   |   |-- CreatorView.jsx
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- discovery/
|   |   |   |-- DiscoveryView.jsx
|   |   |   |-- hooks.js
|   |   |   |-- LandingView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- information/
|   |   |   |-- InformationView.jsx
|   |   |-- markets/
|   |   |   |-- hooks.js
|   |   |   |-- MarketView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- moderation/
|   |   |   |-- hooks.js
|   |   |   |-- ModerationView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- notifications/
|   |   |   |-- states/
|   |   |   |   |-- AllNotificationsReadState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- NoNotificationsState.jsx
|   |   |   |   |-- NotificationDestinationUnavailableState.jsx
|   |   |   |   |-- NotificationPermissionsDisabledState.jsx
|   |   |   |-- hooks.js
|   |   |   |-- NotificationsView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- onboarding/
|   |   |   |-- hooks.js
|   |   |   |-- OnboardingView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- portfolio/
|   |   |   |-- states/
|   |   |   |   |-- index.js
|   |   |   |   |-- LoadingPositionsState.jsx
|   |   |   |   |-- NoClaimablePositionsState.jsx
|   |   |   |   |-- NoOpenPositionsState.jsx
|   |   |   |   |-- NoPositionsState.jsx
|   |   |   |   |-- NoResolvedPositionsState.jsx
|   |   |   |   |-- PartialDataState.jsx
|   |   |   |   |-- PositionBelongsToAnotherWalletState.jsx
|   |   |   |   |-- PositionNotFoundState.jsx
|   |   |   |   |-- PositionsUnavailableState.jsx
|   |   |   |   |-- PositionSynchronizationState.jsx
|   |   |   |   |-- StaleDataState.jsx
|   |   |   |   |-- WalletDisconnectedState.jsx
|   |   |   |-- hooks.js
|   |   |   |-- PortfolioView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- positions/
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- profiles/
|   |   |   |-- states/
|   |   |   |   |-- index.js
|   |   |   |   |-- InsufficientScoringHistoryState.jsx
|   |   |   |   |-- NoForecastsState.jsx
|   |   |   |   |-- NoLeaderboardEntriesState.jsx
|   |   |   |   |-- NoResolvedForecastsState.jsx
|   |   |   |   |-- PrivateRestrictedProfileState.jsx
|   |   |   |   |-- ProfileNotFoundState.jsx
|   |   |   |   |-- ReputationUnavailableState.jsx
|   |   |   |-- hooks.js
|   |   |   |-- ProfilesView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- saved/
|   |   |   |-- states/
|   |   |   |   |-- index.js
|   |   |   |   |-- NoSavedContentState.jsx
|   |   |   |   |-- SavedItemUnavailableState.jsx
|   |   |   |-- hooks.js
|   |   |   |-- SavedView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- settings/
|   |   |   |-- states/
|   |   |   |   |-- DeletionConfirmationState.jsx
|   |   |   |   |-- ExportAvailableState.jsx
|   |   |   |   |-- ExportPendingState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- SaveConfirmationState.jsx
|   |   |   |   |-- SessionRevocationConfirmationState.jsx
|   |   |   |   |-- SettingsLoadingState.jsx
|   |   |   |   |-- SettingsSaveFailedState.jsx
|   |   |   |   |-- UnsavedChangesState.jsx
|   |   |   |-- hooks.js
|   |   |   |-- SettingsView.jsx
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |-- trading/
|   |   |   |-- states/
|   |   |   |   |-- AwaitingWalletApprovalState.jsx
|   |   |   |   |-- ChooseYesNoState.jsx
|   |   |   |   |-- ConfirmationStatusUnknownState.jsx
|   |   |   |   |-- EnterAmountState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- InsufficientNetworkFeeBalanceState.jsx
|   |   |   |   |-- InsufficientTokenBalanceState.jsx
|   |   |   |   |-- MarketClosedState.jsx
|   |   |   |   |-- QuoteExpiredState.jsx
|   |   |   |   |-- QuoteLoadingState.jsx
|   |   |   |   |-- QuoteReviewState.jsx
|   |   |   |   |-- QuoteUnavailableState.jsx
|   |   |   |   |-- TradingUnavailableState.jsx
|   |   |   |   |-- TransactionConfirmedState.jsx
|   |   |   |   |-- TransactionDetailsReceiptState.jsx
|   |   |   |   |-- TransactionExpiredState.jsx
|   |   |   |   |-- TransactionFailedState.jsx
|   |   |   |   |-- TransactionPendingConfirmationState.jsx
|   |   |   |   |-- TransactionReconciliationState.jsx
|   |   |   |   |-- TransactionSubmittedState.jsx
|   |   |   |   |-- TransactionSubmittingState.jsx
|   |   |   |   |-- TransactionValidationFailureState.jsx
|   |   |   |   |-- UnsupportedNetworkState.jsx
|   |   |   |   |-- WalletApprovalRejectedState.jsx
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- TradeTicketView.jsx
|   |   |   |-- types.js
|   |   |-- transactions/
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- TransactionsView.jsx
|   |   |   |-- types.js
|   |   |-- wallet/
|   |   |   |-- states/
|   |   |   |   |-- ConnectingState.jsx
|   |   |   |   |-- ConnectionFailedState.jsx
|   |   |   |   |-- ConnectWalletModalState.jsx
|   |   |   |   |-- index.js
|   |   |   |   |-- UnsupportedNetworkState.jsx
|   |   |   |   |-- WalletAccountChangedState.jsx
|   |   |   |   |-- WalletConnectedAccountMenuState.jsx
|   |   |   |   |-- WalletDisconnectedState.jsx
|   |   |   |   |-- WalletNotDetectedState.jsx
|   |   |   |   |-- WalletSelectionState.jsx
|   |   |   |-- hooks.js
|   |   |   |-- state.js
|   |   |   |-- types.js
|   |   |   |-- WalletControl.jsx
|   |-- hooks/
|   |   |-- useFeatureState.js
|   |   |-- useMobileLayout.js
|   |   |-- useSession.js
|   |   |-- useUnsavedChanges.js
|   |   |-- useVisualViewport.js
|   |   |-- useWallet.js
|   |-- layouts/
|   |   |-- ApplicationLayout.jsx
|   |   |-- CreatorLayout.jsx
|   |   |-- ModerationLayout.jsx
|   |   |-- PublicLayout.jsx
|   |   |-- SettingsLayout.jsx
|   |-- mocks/
|   |   |-- authAdapter.js
|   |   |-- community.js
|   |-- pages/
|   |   |-- ai/
|   |   |   |-- AiConversationPage.jsx
|   |   |   |-- AiWorkspacePage.jsx
|   |   |   |-- SavedAnalysesPage.jsx
|   |   |-- auth/
|   |   |   |-- AuthCallbackPage.jsx
|   |   |   |-- AuthErrorPage.jsx
|   |   |   |-- AuthMethodsPage.jsx
|   |   |   |-- CheckEmailPage.jsx
|   |   |   |-- ForgotPasswordPage.jsx
|   |   |   |-- LoginPage.jsx
|   |   |   |-- MfaPage.jsx
|   |   |   |-- RecoveryPage.jsx
|   |   |   |-- ResetPasswordPage.jsx
|   |   |   |-- SessionExpiredPage.jsx
|   |   |   |-- SignupPage.jsx
|   |   |   |-- VerifyCodePage.jsx
|   |   |   |-- VerifyEmailPage.jsx
|   |   |   |-- WalletAuthPage.jsx
|   |   |-- claims/
|   |   |   |-- AvailableClaimsPage.jsx
|   |   |   |-- ClaimDetailsPage.jsx
|   |   |   |-- ClaimHistoryPage.jsx
|   |   |   |-- ClaimsOverviewPage.jsx
|   |   |   |-- PendingClaimsPage.jsx
|   |   |-- community/
|   |   |   |-- CreatePostPage.jsx
|   |   |   |-- CreateRoomPage.jsx
|   |   |   |-- DiscussionThreadPage.jsx
|   |   |   |-- EditPostPage.jsx
|   |   |   |-- JoinedRoomsPage.jsx
|   |   |   |-- ManageRoomPage.jsx
|   |   |   |-- MyRoomPostsPage.jsx
|   |   |   |-- PostDetailsPage.jsx
|   |   |   |-- RoomAboutRulesPage.jsx
|   |   |   |-- RoomDiscussionPage.jsx
|   |   |   |-- RoomManageActivityPage.jsx
|   |   |   |-- RoomManageBansPage.jsx
|   |   |   |-- RoomManageMembersPage.jsx
|   |   |   |-- RoomManageModeratorsPage.jsx
|   |   |   |-- RoomManagePendingPostsPage.jsx
|   |   |   |-- RoomManageReportsPage.jsx
|   |   |   |-- RoomManageRequestsPage.jsx
|   |   |   |-- RoomManageRestrictionsPage.jsx
|   |   |   |-- RoomManageRulesPage.jsx
|   |   |   |-- RoomManageSettingsPage.jsx
|   |   |   |-- RoomMarketsPage.jsx
|   |   |   |-- RoomMembershipPage.jsx
|   |   |   |-- RoomMembersPage.jsx
|   |   |   |-- RoomOverviewPage.jsx
|   |   |   |-- RoomPostsPage.jsx
|   |   |   |-- RoomReportDetailPage.jsx
|   |   |   |-- RoomsDirectoryPage.jsx
|   |   |-- creation/
|   |   |   |-- CreationEntryPage.jsx
|   |   |   |-- EditDraftPage.jsx
|   |   |   |-- MyDraftsPage.jsx
|   |   |-- creator/
|   |   |   |-- CreatedMarketsPage.jsx
|   |   |   |-- CreatorAnalyticsPage.jsx
|   |   |   |-- CreatorFeeHistoryPage.jsx
|   |   |   |-- CreatorFeesPage.jsx
|   |   |   |-- CreatorMarketDetailsPage.jsx
|   |   |   |-- CreatorOverviewPage.jsx
|   |   |   |-- CreatorSettingsPage.jsx
|   |   |   |-- PublicCreatorProfilePage.jsx
|   |   |-- dev/
|   |   |   |-- StateGallery.jsx
|   |   |-- discovery/
|   |   |   |-- CategoryMarketsPage.jsx
|   |   |   |-- EndingSoonMarketsPage.jsx
|   |   |   |-- ExploreMarketsPage.jsx
|   |   |   |-- GlobalSearchResultsPage.jsx
|   |   |   |-- HighVolumeMarketsPage.jsx
|   |   |   |-- LandingPage.jsx
|   |   |   |-- MarketComparisonPage.jsx
|   |   |   |-- NewMarketsPage.jsx
|   |   |   |-- ProbabilityMoversPage.jsx
|   |   |   |-- ResolvedMarketsPage.jsx
|   |   |   |-- TrendingMarketsPage.jsx
|   |   |-- information/
|   |   |   |-- ContactSupportPage.jsx
|   |   |   |-- FaqPage.jsx
|   |   |   |-- HelpArticlePage.jsx
|   |   |   |-- HelpCenterPage.jsx
|   |   |   |-- HowItWorksPage.jsx
|   |   |   |-- PrivacyPage.jsx
|   |   |   |-- RiskDisclosurePage.jsx
|   |   |   |-- TermsPage.jsx
|   |   |-- markets/
|   |   |   |-- AiExplanationPage.jsx
|   |   |   |-- DiscussionPage.jsx
|   |   |   |-- MarketActivityPage.jsx
|   |   |   |-- MarketOverviewPage.jsx
|   |   |   |-- MarketResolutionResultPage.jsx
|   |   |   |-- PriceHistoryPage.jsx
|   |   |   |-- RelatedMarketsPage.jsx
|   |   |   |-- ResolutionCriteriaAndSourcesPage.jsx
|   |   |-- moderation/
|   |   |   |-- ModerationActionHistoryPage.jsx
|   |   |   |-- ModerationDashboardPage.jsx
|   |   |   |-- ReportDetailsPage.jsx
|   |   |   |-- ReportsQueuePage.jsx
|   |   |   |-- RoomModerationPage.jsx
|   |   |   |-- UserModerationPage.jsx
|   |   |-- notifications/
|   |   |   |-- NotificationsPage.jsx
|   |   |-- onboarding/
|   |   |   |-- OnboardingCompletePage.jsx
|   |   |   |-- OnboardingInterestsPage.jsx
|   |   |   |-- OnboardingPage.jsx
|   |   |   |-- OnboardingProfilePage.jsx
|   |   |   |-- OnboardingWalletPage.jsx
|   |   |-- portfolio/
|   |   |   |-- ClaimablePositionsPage.jsx
|   |   |   |-- OpenPositionsPage.jsx
|   |   |   |-- PortfolioActivityPage.jsx
|   |   |   |-- PortfolioOverviewPage.jsx
|   |   |   |-- ResolvedPositionsPage.jsx
|   |   |-- positions/
|   |   |   |-- PositionDetailsPage.jsx
|   |   |-- profiles/
|   |   |   |-- CategoryLeaderboardPage.jsx
|   |   |   |-- EditProfilePage.jsx
|   |   |   |-- LeaderboardPage.jsx
|   |   |   |-- MyProfilePage.jsx
|   |   |   |-- PublicUserProfilePage.jsx
|   |   |   |-- ReputationDetailsPage.jsx
|   |   |   |-- UserActivityPage.jsx
|   |   |   |-- UserFollowersPage.jsx
|   |   |   |-- UserFollowingPage.jsx
|   |   |   |-- UserForecastsPage.jsx
|   |   |-- saved/
|   |   |   |-- SavedCommunityPostsPage.jsx
|   |   |   |-- SavedContentAnalysesPage.jsx
|   |   |   |-- SavedContentPage.jsx
|   |   |   |-- SavedMarketsPage.jsx
|   |   |   |-- SavedRoomsPage.jsx
|   |   |-- settings/
|   |   |   |-- AccountDeletionRequestPage.jsx
|   |   |   |-- AccountSettingsPage.jsx
|   |   |   |-- AppearancePage.jsx
|   |   |   |-- DataExportPage.jsx
|   |   |   |-- NotificationPreferencesPage.jsx
|   |   |   |-- PrivacySettingsPage.jsx
|   |   |   |-- ProfileSettingsPage.jsx
|   |   |   |-- SecurityMfaPage.jsx
|   |   |   |-- SecuritySessionManagementPage.jsx
|   |   |   |-- SettingsOverviewPage.jsx
|   |   |   |-- WalletSessionSettingsPage.jsx
|   |   |-- transactions/
|   |   |   |-- TransactionDetailsPage.jsx
|   |   |   |-- TransactionHistoryPage.jsx
|   |-- services/
|   |   |-- ai/
|   |   |   |-- analysis.js
|   |   |   |-- marketDrafting.js
|   |   |-- analytics/
|   |   |   |-- events.js
|   |   |-- auth/
|   |   |   |-- challenge.js
|   |   |   |-- session.js
|   |   |-- notifications/
|   |   |   |-- notifications.js
|   |   |-- panta/
|   |   |   |-- claims.js
|   |   |   |-- creator.js
|   |   |   |-- markets.js
|   |   |   |-- positions.js
|   |   |   |-- trading.js
|   |   |-- social/
|   |   |   |-- discussions.js
|   |   |   |-- follows.js
|   |   |   |-- profiles.js
|   |   |   |-- rooms.js
|   |   |-- wallet/
|   |   |   |-- transactions.js
|   |   |   |-- wallet.js
|   |-- state/
|   |   |-- session.js
|   |   |-- ui.js
|   |   |-- wallet.js
|   |-- styles/
|   |   |-- app.css
|   |   |-- auth.css
|   |   |-- community.css
|   |   |-- mobile.css
|   |   |-- README.md
|   |-- types/
|   |   |-- auth.js
|   |   |-- community.js
|   |   |-- domain.js
|   |   |-- scaffold.js
|   |-- utils/
|   |   |-- dates.js
|   |   |-- formatting.js
|   |   |-- identifiers.js
|   |-- App.css
|   |-- App.jsx
|   |-- index.css
|   |-- main.jsx
|-- .gitignore
|-- .oxlintrc.json
|-- index.html
|-- package-lock.json
|-- package.json
|-- README.md
|-- vite.config.js
```
