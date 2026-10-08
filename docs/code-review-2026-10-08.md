# Application review — 8 October 2026

## Fixes

- Gateway no longer returns a catalog beyond its allowed stale lifetime after provider failure; failure checks use the current age after the attempted refresh.
- Catalog requests time out after 30 seconds and enter retry handling instead of hanging indefinitely.
- Opening an existing AI conversation no longer substitutes the market from the previous page URL or automatically starts another analysis. Auto-analysis clears its pending state before displaying its result.
- Creator records without a published market address no longer link to `/markets/undefined`.
- Transaction history uses terminal chain status, so confirmed transactions awaiting provider reporting remain visible.
- Mobile account initials now reflect the current user. Corrupted account/moderation labels and obsolete demonstration wording in unsaved-change prompts are corrected.
- Frontend verification recognizes the implemented API modules while retaining checks for the remaining placeholder service boundaries.

## Validation

- 16 backend tests: provider contracts, transaction safeguards/recovery, sessions, permissions, persistence, AI context, news parsing, startup.
- 14 frontend/service/gateway tests, including a new expired-cache regression.
- Backend type check and build; frontend lint and production build.
- Frontend verification: 133 routes, 487 JSX files, 166 state renders, 10 text contrast pairs.
- Browser route sweep: 133 routes at widths 1440 and 390, 268 assertions including persisted settings/drafts; no reported browser exceptions or horizontal overflow. Parameterized routes use missing-record references to exercise safe empty/error states.
- Browser community workflow: signup, creation, post/comment persistence, session reload, mobile layout.
- Browser wallet workflow: test-wallet selection, account switching, disconnect, financial screen layout; no funded transaction submitted.
- Live provider browser workflow: market-card AI action, chart updates, contextual external AI answer, linked discussion, mobile overview, conversation deletion.

## Remaining limits

Rendering and automated checks are not proof that every external action will succeed. Real wallet-signed buys, creation fees, claims and creator-fee claims were not executed. They depend on wallet approval, funds, deployment configuration and provider eligibility.

Email verification/change, password recovery, MFA, email/push delivery, account deletion, separate AI bookmarks and some social/analytics features remain explicitly unavailable in the current UI. They require implementation and, in some cases, external services. The Panta integration uses REST polling; provider outages and synchronization delays remain possible. The initial JavaScript bundle remains above Vite's 500 KB advisory threshold.

The original browser route sweep lost its debugger connection; a fresh run completed successfully. The original scaffold verifier expected all new service modules to be placeholders; it was updated to validate the current live integration rather than reverting working code.

## Follow-up reliability pass

News searches now retain successful recent/earlier results when the other lookup fails, disclose partial coverage, and retry failed searches after 30 seconds instead of caching failures for ten minutes. Separate general topics keep independent cache entries. The recent-news window now consistently uses seven days. Chart indicators label cached snapshots as delayed even when their quote timestamp is recent. Two regression tests cover news recovery and topic isolation.
