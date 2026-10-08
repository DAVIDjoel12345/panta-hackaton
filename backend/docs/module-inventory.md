# Module inventory

34 registered Nest modules. Controllers and services are empty; only the health rejection stub has a handler. No repository or adapter implementation is registered.

| Module | Responsibility | Proposed application record | Operations |
| --- | --- | --- | --- |
| health | Operational readiness boundary | None; derived/provider read boundary | 1 |
| auth | Identity proof and optional authentication methods | AuthChallengeRecord | 15 |
| sessions | Application session lifecycle | SessionRecord | 6 |
| users | Private current-user identity | UserRecord | 1 |
| profiles | Public profile and private editing | ProfileRecord | 3 |
| onboarding | Interests and setup progress | OnboardingResponse | 2 |
| wallets | Verified wallet associations, not connection state | WalletAssociationResponse | 3 |
| markets | Application discovery and provider reference metadata | MarketMetadata | 6 |
| market-data | Optional provider snapshots and history | None; derived/provider read boundary | 2 |
| market-drafts | User-reviewed market proposals | MarketDraftResponse | 8 |
| market-creation | Creation intents, fees and reconciliation | CreationIntentResponse | 4 |
| trading | Purchase intents and bound quote review | TradeIntentResponse | 4 |
| transactions | Submission evidence and chain reconciliation | TransactionObservation | 4 |
| positions | Authoritative wallet-position reads | None; derived/provider read boundary | 2 |
| claims | Claim eligibility separate from transaction state | ClaimIntentResponse | 7 |
| ai-analysis | Structured explanations, sources and missing data | AnalysisResponse | 3 |
| ai-conversations | Private conversation history and prompts | ConversationResponse | 5 |
| communities | Room directory, settings and ownership | CommunityResponse | 7 |
| memberships | Membership status separate from scoped role | MembershipResponse | 8 |
| posts | Posts, own drafts, approval and attachments | PostResponse | 11 |
| comments | Comments and bounded replies | CommentResponse | 5 |
| likes | Unique idempotent post and comment reactions | LikeRecord | 1 |
| saved-content | Private bookmarks for markets, posts and analyses | SavedContentResponse | 2 |
| sharing | Canonical links without granting access | None; derived/provider read boundary | 1 |
| follows | Public profile follow relationships | FollowResponse | 3 |
| reputation | Forecast evidence and versioned methodology | ForecastRecord | 3 |
| leaderboards | Aggregation boundary without invented rankings | None; derived/provider read boundary | 1 |
| creators | Creator-owned markets and optional analytics | None; derived/provider read boundary | 2 |
| creator-fees | Provider-supported fee claims only | CreatorFeeIntentResponse | 4 |
| moderation | Scoped moderation, restrictions and private audit | ModerationReportRecord | 10 |
| notifications | Recipient-scoped events and delivery preferences | NotificationResponse | 5 |
| settings | Private account preferences | SettingsResponse | 2 |
| support | Authenticated support intake | SupportTicketResponse | 2 |
| account-lifecycle | Export/deletion requests without deleting chain records | AccountLifecycleResponse | 3 |

Each module contains module/controller/service, request and response contracts, a state union and public exports. Persistence modules also declare a repository interface; minimal find/save signatures are unimplemented and must gain scoped query/transaction methods when use cases are implemented. DTO interfaces are compile-time placeholders, not runtime input validation. Provider data and application metadata remain separate.

