> Current implementation: [Connected local application](live-backend.md). The historical demo/scaffold notes below are superseded where they conflict. Accounts, communities and external AI now use the backend; financial and wallet workflows are still unavailable.

# Frontend implementation

The latest [authentication implementation](auth-flows/README.md) adds 17 routes, session gates, wallet ownership verification demos, optional email/social flows, account security, and a skippable landing intro. Current totals are 114 routes and 285 gallery previews; earlier architecture notes below remain applicable unless superseded there.

The subsequent [mobile implementation](mobile-implementation.md) adds phone navigation, sheets, cards, keyboard-aware layout, and safe-area styles while retaining the architecture below.

The existing React 19, Vite, JavaScript/JSX, npm, routes, and folders are retained. No packages were added. Small SVG icons and charts avoid an additional icon/chart library. Styling is in src/styles/app.css, imported by the existing src/index.css entry.

## Design reference

The official [shadcn/ui Dashboard-01](https://ui.shadcn.com/blocks?category=dashboard) informed the application shell, navigation hierarchy, restrained panel spacing, and data-table structure. No shadcn installation or framework migration was performed. The product uses the requested dark surfaces, purple accent, and distinct YES/NO colors. Muted text is lightened to #929BAB for contrast; tested combinations are in contrast-checks.json.

## Architecture

- Existing page files delegate to feature views. Routes lazy-load page modules; related pages share feature chunks.
- Providers owns a demonstration React context, with no state-management package or real authentication provider.
- Public information pages use PublicShell; market and workspace routes use AppShell. Creator tools have contextual navigation. Moderation navigation appears only after an explicit demo role switch in wallet/security settings or the moderation screen.
- The custom route resolver supports static and parameterized paths, nested market metadata, deep links, browser back/forward, query strings, and not-found/error handling. Internal links preserve local state.
- Shared primitives provide buttons, fields, panels, tabs, status labels, and native dialogs. Dialogs use browser focus trapping, Escape dismissal, backdrop dismissal, and focus restoration.
- Existing small component files remain importable. FeatureWidget shares their reusable presentation; larger components have dedicated implementations. Existing state component files render the shared StatePanel with stable IDs.
- Styling covers 360px mobile, 768px tablet, and desktop. Tables and tabs scroll inside their own containers. Mobile trade review uses a dialog rather than covering essential page content.

## Demo data and local interactions

- src/demo/fixtures.js is the only fixed market/profile/room/position/transaction/analysis fixture layer. Chart endpoints and quoted prices use the same records; absent metrics show Unavailable.
- src/demo/DemoContext.jsx owns saves, follows, comments, replies, notifications, draft edits, created demo markets, settings, claims, and simulated transaction records. State lasts only for the current app session.
- Trade review keeps amount/outcome input during recoverable scenarios, validates amount and token balance, lists explicit fees, and advances through submitting, submitted, pending, and simulated confirmation. Quote expiry is an explicit scenario; the quote clock is visibly paused. There is no unsupported slippage field.
- Claims distinguish eligibility, pending, and simulated completion. References starting with demo- are fictional, never Solana transaction signatures.
- Market creation uses an editable 14-stage wizard. The original 15 scaffold step components remain reusable; opening the created market is a completion action. Draft generation loads a fixed, labelled fixture. Created markets are local-only cards.
- Signal AI displays fixed analysis, sources, caveats, and missing information rather than invented outcome predictions or causes for price movement.
- Settings validate input and show save feedback; dirty forms trigger internal-navigation and unload warnings. Export downloads only local demo JSON. Deletion affects demonstration profile preferences only and does not remove blockchain records.
- Every feature has deterministic scenario controls. src/pages/dev/StateGallery.jsx covers all 166 existing state IDs plus quote-ready and invalid-amount previews. import.meta.env.DEV gates the gallery, and the production page glob excludes it.

## Integration boundaries

All src/services modules remain non-executable boundaries. Panta endpoints, provider response schemas, wallet adapters, auth challenges/sessions, AI requests, social persistence, notification delivery, analytics emission, signing, and database access still require future integration. Access labels and role switches are not security controls. There are no market settlement overrides, private-key forms, or seed-phrase inputs.

P0/P1/future priorities are preserved in route metadata and the route inventory. Future-module pages are labelled in the application shell. Forecast accuracy, reputation, and trading returns remain distinct; small fictional samples are not presented as evidence of profitability.

## Review

See validation.md for checks and limitations. Browser checks require a local Vite server at 127.0.0.1:5173 and an isolated Chrome debugging session on port 9222. The scripts use Node's built-in WebSocket and Chrome DevTools Protocol; no browser-testing package is installed.


## Community workspace

Added the complete room feed, posting, comments, sharing, membership and management workspace. See [community implementation](community-implementation.md) for the authoritative routes, permission matrix, state coverage and integration boundaries. Community fixtures now live in src/mocks/community.js; community state is owned by CommunityProvider and cleared on account reset. Market discussion uses the same canonical community posts. The current application has 133 routes and 333 development state previews.
