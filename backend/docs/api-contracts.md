# Proposed application API inventory

Every route below is an **application API proposal**, never a Panta/provider endpoint. None is an implemented business operation. The only registered handler is GET /api/v1/health, which always rejects with 501 NOT_IMPLEMENTED. Other proposals currently return Nest 404 because they are not mounted. A global ScaffoldGuard additionally rejects every mounted handler with 501 until deliberately replaced.

Request/response names link conceptually to each module's .request.ts and .response.ts. Shared types live in common/contracts/primitives.ts. Path parameters are application identifiers unless explicitly named provider references. Authentication/actor IDs must come from trusted server context. Methods such as PUT likes represent desired state, not a toggle. JSON inventory: [api-contracts.json](api-contracts.json).

| Module | Method | Proposed path | Request | Proposed response | Intended access | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| health | GET | `/api/v1/health` | ReadinessRequest | ReadinessResponse | public | Only registered route; always 501, not a working health check. |
| auth | POST | `/api/v1/auth/wallet/challenges` | WalletChallengeRequest | WalletChallengeResponse | public; rate limited |  |
| auth | POST | `/api/v1/auth/wallet/verify` | VerifyWalletRequest | IdentityProofResponse | single-use challenge |  |
| auth | POST | `/api/v1/auth/email/register` | EmailCredentialsRequest | AcceptedRequest | flag:emailPassword |  |
| auth | POST | `/api/v1/auth/email/login` | EmailCredentialsRequest | IdentityProofResponse | flag:emailPassword |  |
| auth | POST | `/api/v1/auth/email/verification` | EmailActionRequest | AcceptedRequest | flag:emailVerification |  |
| auth | POST | `/api/v1/auth/email/verify` | VerifyEmailRequest | IdentityProofResponse | flag:emailVerification |  |
| auth | POST | `/api/v1/auth/password/reset-requests` | EmailActionRequest | AcceptedRequest | flag:passwordReset |  |
| auth | POST | `/api/v1/auth/password/reset` | PasswordResetRequest | AcceptedRequest | flag:passwordReset |  |
| auth | POST | `/api/v1/auth/magic-link` | EmailActionRequest | AcceptedRequest | flag:magicLink |  |
| auth | POST | `/api/v1/auth/magic-link/verify` | VerifyEmailRequest | IdentityProofResponse | flag:magicLink |  |
| auth | POST | `/api/v1/auth/email/code` | EmailActionRequest | AcceptedRequest | flag:emailCode |  |
| auth | POST | `/api/v1/auth/email/code/verify` | CodeVerificationRequest | IdentityProofResponse | flag:emailCode |  |
| auth | POST | `/api/v1/auth/social/:provider/callback` | SocialCallbackRequest | IdentityProofResponse | flag:socialAuth; state/PKCE validation |  |
| auth | POST | `/api/v1/auth/reauthenticate` | ReauthenticationRequest | IdentityProofResponse | authenticated |  |
| auth | POST | `/api/v1/auth/mfa/verify` | MfaRequest | IdentityProofResponse | flag:mfa |  |
| sessions | POST | `/api/v1/sessions` | CreateSessionRequest | SessionResponse | verified one-use identity proof |  |
| sessions | GET | `/api/v1/sessions/current` | none | SessionResponse | authenticated |  |
| sessions | GET | `/api/v1/sessions` | CursorQuery | Page<SessionResponse> | self |  |
| sessions | DELETE | `/api/v1/sessions/:sessionId` | RevokeSessionRequest | void | self |  |
| sessions | POST | `/api/v1/sessions/logout` | none | void | authenticated |  |
| sessions | POST | `/api/v1/sessions/logout-all` | RevokeAllSessionsRequest | void | self; reauthentication |  |
| users | GET | `/api/v1/users/me` | CurrentUserRequest | CurrentUserResponse | self |  |
| profiles | GET | `/api/v1/profiles/:userId` | none | PublicProfileResponse | public; published fields only |  |
| profiles | PATCH | `/api/v1/profiles/me` | ProfileUpdateRequest | PublicProfileResponse | self |  |
| profiles | GET | `/api/v1/profiles/username-availability` | UsernameAvailabilityRequest | UsernameAvailabilityResponse | public; rate limited |  |
| onboarding | GET | `/api/v1/onboarding/me` | none | OnboardingResponse | self |  |
| onboarding | PATCH | `/api/v1/onboarding/me` | OnboardingUpdateRequest | OnboardingResponse | self |  |
| wallets | GET | `/api/v1/wallets` | none | WalletAssociationResponse[] | self |  |
| wallets | POST | `/api/v1/wallets` | AssociateWalletRequest | WalletAssociationResponse | self; verified ownership; explicit linking consent |  |
| wallets | DELETE | `/api/v1/wallets/:associationId` | RemoveWalletRequest | void | self; reauthentication |  |
| markets | GET | `/api/v1/markets` | MarketListRequest | Page<MarketDetailResponse> | public |  |
| markets | GET | `/api/v1/markets/categories` | none | CategoriesResponse | public |  |
| markets | POST | `/api/v1/markets/compare` | MarketComparisonRequest | MarketDetailResponse[] | public |  |
| markets | GET | `/api/v1/markets/:marketId` | none | MarketDetailResponse | public |  |
| markets | GET | `/api/v1/markets/:marketId/related` | CursorQuery | Page<MarketDetailResponse> | public |  |
| markets | GET | `/api/v1/markets/:marketId/rules` | none | UnresolvedProviderData | public; verified provider resolution criteria |  |
| market-data | GET | `/api/v1/markets/:marketId/snapshot` | none | PriceSnapshotResponse | public |  |
| market-data | GET | `/api/v1/markets/:marketId/history` | MarketHistoryRequest | PriceHistoryResponse | public; only if provider supports history |  |
| market-drafts | POST | `/api/v1/market-drafts` | SaveMarketDraftRequest | MarketDraftResponse | self |  |
| market-drafts | GET | `/api/v1/market-drafts` | CursorQuery | Page<MarketDraftResponse> | self |  |
| market-drafts | GET | `/api/v1/market-drafts/:draftId` | none | MarketDraftResponse | owner |  |
| market-drafts | PATCH | `/api/v1/market-drafts/:draftId` | SaveMarketDraftRequest | MarketDraftResponse | owner |  |
| market-drafts | DELETE | `/api/v1/market-drafts/:draftId` | none | void | owner |  |
| market-drafts | POST | `/api/v1/market-drafts/ai-proposals` | AiDraftRequest | MarketDraftResponse | self; AI proposal requires user review |  |
| market-drafts | POST | `/api/v1/market-drafts/:draftId/validate` | none | DraftValidationResponse | owner |  |
| market-drafts | POST | `/api/v1/market-drafts/:draftId/duplicate-check` | none | DraftValidationResponse | owner |  |
| market-creation | POST | `/api/v1/market-creation/fee-quotes` | CreationIntentRequest | CreationFeeResponse | verified wallet owner |  |
| market-creation | POST | `/api/v1/market-creation/intents` | CreationIntentRequest | CreationIntentResponse | verified wallet owner; draft owner |  |
| market-creation | POST | `/api/v1/market-creation/intents/:intentId/transaction` | none | CreationTransactionResponse | intent owner |  |
| market-creation | POST | `/api/v1/market-creation/intents/:intentId/reconcile` | CreationReconcileRequest | CreationIntentResponse | intent owner |  |
| trading | POST | `/api/v1/trading/intents` | PurchaseIntentRequest | TradeIntentResponse | verified wallet owner |  |
| trading | POST | `/api/v1/trading/quotes` | QuoteRequest | QuoteReviewResponse | intent owner |  |
| trading | POST | `/api/v1/trading/transactions` | ConstructTradeRequest | TradeTransactionResponse | intent owner; unexpired bound quote |  |
| trading | POST | `/api/v1/trading/submissions` | TrackSubmissionRequest | TradeIntentResponse | intent owner; signature validation |  |
| transactions | GET | `/api/v1/transactions` | TransactionListRequest | Page<TransactionResponse> | self; verified associated wallet |  |
| transactions | GET | `/api/v1/transactions/:transactionId` | none | TransactionResponse | self |  |
| transactions | GET | `/api/v1/transactions/by-signature/:signature` | none | TransactionResponse | self; bound network |  |
| transactions | POST | `/api/v1/transactions/reconcile` | ReconcileTransactionRequest | TransactionResponse | self; idempotent reconciliation |  |
| positions | GET | `/api/v1/positions` | PositionListRequest | Page<PositionResponse> | verified wallet owner |  |
| positions | GET | `/api/v1/positions/:positionId` | none | PositionResponse | verified wallet owner |  |
| claims | GET | `/api/v1/claims/eligibility/:positionId` | none | ClaimEligibilityResponse | verified wallet owner |  |
| claims | GET | `/api/v1/claims` | CursorQuery | Page<ClaimIntentResponse> | self |  |
| claims | GET | `/api/v1/claims/:claimId` | none | ClaimIntentResponse | self |  |
| claims | POST | `/api/v1/claims/intents` | ClaimIntentRequest | ClaimIntentResponse | verified wallet owner; eligibility checked |  |
| claims | POST | `/api/v1/claims/intents/:intentId/transaction` | none | ClaimTransactionResponse | intent owner |  |
| claims | POST | `/api/v1/claims/intents/:intentId/reconcile` | ClaimReconcileRequest | ClaimIntentResponse | intent owner |  |
| ai-analysis | POST | `/api/v1/ai/analyses` | AnalysisRequest | AnalysisResponse | authenticated; quota policy TBD |  |
| ai-analysis | GET | `/api/v1/ai/analyses/:analysisId` | none | AnalysisResponse | authorized reader |  |
| ai-analysis | GET | `/api/v1/ai/context/:marketId` | AnalysisContextRequest | AnalysisContextResponse | authorized reader |  |
| ai-conversations | POST | `/api/v1/ai/conversations` | ConversationCreateRequest | ConversationResponse | self |  |
| ai-conversations | GET | `/api/v1/ai/conversations` | CursorQuery | Page<ConversationResponse> | self |  |
| ai-conversations | GET | `/api/v1/ai/conversations/:conversationId/messages` | CursorQuery | Page<ConversationMessageResponse> | owner |  |
| ai-conversations | POST | `/api/v1/ai/conversations/:conversationId/messages` | ConversationMessageRequest | ConversationMessageResponse | owner; quota policy TBD |  |
| ai-conversations | DELETE | `/api/v1/ai/conversations/:conversationId` | none | void | owner |  |
| communities | GET | `/api/v1/communities` | CommunityListRequest | Page<PublicCommunitySummary> | public metadata; joined requires self |  |
| communities | POST | `/api/v1/communities` | CommunityInput | CommunityResponse | authenticated creator |  |
| communities | GET | `/api/v1/communities/:communityId` | none | CommunityResponse | public or current approved member |  |
| communities | PATCH | `/api/v1/communities/:communityId` | CommunityUpdateRequest | CommunityResponse | owner |  |
| communities | POST | `/api/v1/communities/:communityId/transfer-ownership` | TransferOwnershipRequest | CommunityResponse | owner; atomic transfer; consent |  |
| communities | POST | `/api/v1/communities/:communityId/archive` | none | CommunityResponse | owner |  |
| communities | POST | `/api/v1/communities/:communityId/reopen` | none | CommunityResponse | owner |  |
| memberships | POST | `/api/v1/communities/:communityId/memberships` | JoinCommunityRequest | MembershipResponse | authenticated; not banned |  |
| memberships | GET | `/api/v1/communities/:communityId/memberships/me` | none | MembershipResponse | self |  |
| memberships | DELETE | `/api/v1/communities/:communityId/memberships/me` | none | void | self; owner must transfer first |  |
| memberships | DELETE | `/api/v1/communities/:communityId/membership-requests/me` | none | void | self; pending request |  |
| memberships | GET | `/api/v1/communities/:communityId/members` | MembershipListRequest | Page<PublicMemberResponse> | public or current private member |  |
| memberships | GET | `/api/v1/communities/:communityId/membership-requests` | CursorQuery | Page<MembershipResponse> | owner or scoped moderator |  |
| memberships | POST | `/api/v1/communities/:communityId/membership-reviews` | ReviewMembershipRequest | MembershipResponse | owner or scoped moderator |  |
| memberships | PUT | `/api/v1/communities/:communityId/moderators/:userId` | AssignModeratorRequest | MembershipResponse | owner only |  |
| posts | GET | `/api/v1/communities/:communityId/posts` | PostFeedRequest | Page<PostResponse> | public/approved member; approval visibility |  |
| posts | POST | `/api/v1/communities/:communityId/posts` | PostWriteRequest | PostResponse | active permitted member |  |
| posts | GET | `/api/v1/posts/:postId` | none | PostResponse | current community access |  |
| posts | PATCH | `/api/v1/posts/:postId` | PostWriteRequest | PostResponse | author; current posting permission |  |
| posts | DELETE | `/api/v1/posts/:postId` | none | void | author; moderator removal is separate |  |
| posts | POST | `/api/v1/communities/:communityId/post-drafts` | PostWriteRequest | PostResponse | self; current community access |  |
| posts | GET | `/api/v1/communities/:communityId/posts/mine` | CursorQuery | Page<PostResponse> | self; includes own draft/review state |  |
| posts | GET | `/api/v1/communities/:communityId/posts/pending` | CursorQuery | Page<PostResponse> | owner or scoped moderator |  |
| posts | POST | `/api/v1/posts/:postId/review` | PostReviewRequest | PostResponse | owner or scoped moderator |  |
| posts | PATCH | `/api/v1/posts/:postId/policy` | PostPolicyRequest | PostResponse | owner or scoped moderator |  |
| posts | POST | `/api/v1/attachments/authorizations` | AttachmentAuthorizationRequest | AttachmentAuthorizationResponse | authorized author; validation/storage boundary |  |
| comments | GET | `/api/v1/posts/:postId/comments` | CursorQuery | Page<CommentResponse> | current post read access |  |
| comments | POST | `/api/v1/posts/:postId/comments` | CommentWriteRequest | CommentResponse | member; not muted/banned; comments unlocked |  |
| comments | PATCH | `/api/v1/comments/:commentId` | CommentWriteRequest | CommentResponse | author; current comment permission |  |
| comments | DELETE | `/api/v1/comments/:commentId` | none | void | author; tombstone preserves replies |  |
| comments | GET | `/api/v1/comments/:commentId/replies` | CursorQuery | Page<CommentResponse> | current post read access |  |
| likes | PUT | `/api/v1/likes` | SetLikeRequest | LikeResponse | current permitted community member |  |
| saved-content | GET | `/api/v1/saved-content` | CursorQuery | Page<SavedContentResponse> | self; recheck private target access |  |
| saved-content | PUT | `/api/v1/saved-content` | SaveContentRequest | SavedContentResponse | self; target access; allow removing unavailable bookmark |  |
| sharing | GET | `/api/v1/sharing/canonical-link` | CanonicalLinkRequest | CanonicalLinkResponse | current target read access | May remain frontend-only if canonical links need no server resolution. No external share counter. |
| follows | PUT | `/api/v1/follows` | SetFollowRequest | FollowResponse | self |  |
| follows | GET | `/api/v1/profiles/:userId/followers` | CursorQuery | Page<FollowResponse> | profile visibility policy |  |
| follows | GET | `/api/v1/profiles/:userId/following` | CursorQuery | Page<FollowResponse> | profile visibility policy |  |
| reputation | POST | `/api/v1/forecasts` | ForecastRequest | ForecastRecord | self; validation methodology TBD |  |
| reputation | GET | `/api/v1/profiles/:userId/forecasts` | CursorQuery | Page<ForecastRecord> | profile visibility policy |  |
| reputation | GET | `/api/v1/profiles/:userId/reputation` | ReputationRequest | ReputationResponse | public; methodology verified before displaying a score |  |
| leaderboards | GET | `/api/v1/leaderboards` | LeaderboardRequest | LeaderboardResponse | public; methodology verified |  |
| creators | GET | `/api/v1/creators/:creatorId/markets` | CreatorMarketsRequest | Page<CreatorMarketResponse> | public approved attribution |  |
| creators | GET | `/api/v1/creators/me/analytics` | none | CreatorAnalyticsResponse | verified creator |  |
| creator-fees | GET | `/api/v1/creator-fees` | none | CreatorFeeResponse[] | verified creator; provider capability required |  |
| creator-fees | POST | `/api/v1/creator-fees/intents` | CreatorFeeClaimRequest | CreatorFeeIntentResponse | verified creator wallet |  |
| creator-fees | POST | `/api/v1/creator-fees/intents/:intentId/transaction` | none | CreatorFeeTransactionResponse | intent owner |  |
| creator-fees | POST | `/api/v1/creator-fees/intents/:intentId/reconcile` | CreatorFeeReconcileRequest | CreatorFeeIntentResponse | intent owner |  |
| moderation | POST | `/api/v1/reports` | ReportRequest | ReportResponse | authenticated target reader; abuse controls |  |
| moderation | GET | `/api/v1/communities/:communityId/reports` | CursorQuery | Page<ReportResponse> | owner or scoped moderator |  |
| moderation | GET | `/api/v1/reports/:reportId` | none | ReportResponse | owner or scoped moderator |  |
| moderation | POST | `/api/v1/reports/:reportId/review` | ReviewReportRequest | ReportResponse | owner or scoped moderator |  |
| moderation | POST | `/api/v1/communities/:communityId/content-moderation` | ContentModerationRequest | void | owner or scoped moderator; cannot rewrite author body |  |
| moderation | POST | `/api/v1/communities/:communityId/restrictions` | RestrictionRequest | RestrictionRecord | owner or explicit scoped moderator; owner immune |  |
| moderation | GET | `/api/v1/communities/:communityId/restrictions` | CursorQuery | Page<RestrictionRecord> | owner or scoped moderator |  |
| moderation | GET | `/api/v1/communities/:communityId/bans` | CursorQuery | Page<RestrictionRecord> | owner or scoped moderator |  |
| moderation | GET | `/api/v1/communities/:communityId/moderation-history` | CursorQuery | Page<ModerationAuditRecord> | owner or scoped moderator |  |
| moderation | POST | `/api/v1/moderation/appeals` | AppealRequest | AcceptedRequest | flag:appeals; affected member |  |
| notifications | GET | `/api/v1/notifications` | CursorQuery | Page<NotificationResponse> | self |  |
| notifications | PATCH | `/api/v1/notifications/:notificationId` | NotificationReadRequest | NotificationResponse | recipient |  |
| notifications | POST | `/api/v1/notifications/read-all` | none | void | self |  |
| notifications | GET | `/api/v1/notifications/preferences` | none | NotificationPreferencesResponse | self |  |
| notifications | PATCH | `/api/v1/notifications/preferences` | NotificationPreferencesRequest | NotificationPreferencesResponse | self; supported channels only |  |
| settings | GET | `/api/v1/settings/me` | none | SettingsResponse | self |  |
| settings | PATCH | `/api/v1/settings/me` | SettingsUpdateRequest | SettingsResponse | self |  |
| support | POST | `/api/v1/support/tickets` | SupportRequest | SupportTicketResponse | self; rate limited |  |
| support | GET | `/api/v1/support/tickets` | CursorQuery | Page<SupportTicketResponse> | self |  |
| account-lifecycle | POST | `/api/v1/account/export-requests` | AccountExportRequest | AccountLifecycleResponse | self; reauthentication |  |
| account-lifecycle | POST | `/api/v1/account/deletion-requests` | AccountDeletionRequest | AccountLifecycleResponse | self; reauthentication; ownership obligations |  |
| account-lifecycle | GET | `/api/v1/account/requests/:requestId` | none | AccountLifecycleResponse | self |  |
| claims | GET | `/api/v1/claims/claimable` | ClaimablePositionsRequest | Page<ClaimablePositionResponse> | verified wallet owner; authoritative eligibility | No local payout calculation. |

No settlement override or user-transaction signing endpoint is proposed. Client wallet connection, clipboard copying, native sharing, open dialogs, untouched forms, responsive layout, splash/animation and browser-offline detection require no API endpoint. Optional integrations and flags must be implemented before their proposed operations can be registered.

