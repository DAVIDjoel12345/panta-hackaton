## Frontend restoration

Restored route-specific market discovery/detail layouts, AI history/composer, account settings sections, mobile grouped settings, public profiles, saved tabs, notification cards, wallet/session dialog, onboarding, portfolio/claims/creator/transaction layouts, creation wizard and community moderation navigation. Connected settings, profile visibility, account export and account-scoped market drafts to the backend. Unimplemented financial, delivery and social workflows retain visible unavailable states; no simulated success is restored.

Validation: 133 routes at 1440px and 390px, 268 browser checks including settings/draft saves, no browser exceptions or horizontal overflow; backend tests and frontend build/lint passed. Provider success still requires real credentials.

> Current implementation: [Connected local application](live-backend.md). The historical demo/scaffold notes below are superseded where they conflict. Accounts, communities and external AI now use the backend; financial and wallet workflows are still unavailable.

# Frontend changes

## Authentication and landing

Added wallet-first authentication, optional email/password/code/social demos, verification and reset recovery, explicit sensitive-action reauthentication, wallet associations, session revocation, and resumable onboarding. Public browsing remains open; account routes and social actions now require a demo session, while blockchain simulations require a verified connected wallet and separate approval. Sign-in preserves safe trade/draft/comment context without submitting actions. Added the 1.3-second skippable intro, updated hero copy and Join action, explanatory sections, and FAQ. See [authentication documentation](auth-flows/README.md) for routes, capabilities, 117 new state previews, integration contracts, and verification.

## Original frontend

- Filled all 97 existing route pages with feature views, preserving their paths and priority/access metadata.
- Added the responsive public and application shells, collapsible desktop navigation, mobile navigation, contextual creator tools, and explicit demo moderator visibility.
- Implemented market discovery, comparison, details, chart ranges, source/rule presentation, and simulated trade review.
- Implemented portfolio/position views, transaction history, claims, creation wizard, draft editing, AI workspace, rooms, discussions, profiles, leaderboards, creator tools, saved content, notifications, settings, onboarding, and draft legal/support pages.
- Replaced named component/state placeholders with reusable presentation and deterministic scenario previews. Preserved existing component filenames.
- Added src/demo/fixtures.js, DemoContext.jsx, and useDemo.js for centralized fictional data and local session interactions.
- Added src/styles/app.css; retained src/index.css as the entry. Updated the HTML title and description.
- Updated AppRouter for lazy loading, query-string navigation, shared providers, and the development-only state gallery.
- Added native-dialog focus behavior, reduced motion, keyboard focus styling, form validation, settings save feedback, and local export/deletion demonstrations.
- Added compiler/fixture/contrast checks, full-route browser checks, and screenshot review scripts. Updated the original verification entry point.
- Vite ignores the isolated .browser-review directory to avoid locked Chrome-profile file errors.
- No dependency or service-adapter changes. No live APIs, wallets, payments, database connections, real authentication, or blockchain transactions.
# Mobile update

All existing routes now share the mobile shell, five-item bottom navigation, More sheet, safe-area spacing, and nested Back behavior. Discovery filters/sorting, trade review, AI history, positions, transactions, leaderboard, settings, and creation have dedicated mobile presentations. Shared dialog history preserves inputs and restores focus. Desktop layouts and demo-only service boundaries remain intact. See [mobile implementation](mobile-implementation.md) for components, state coverage, integration boundaries, and verification.


## Community workspace

Added the complete room feed, posting, comments, sharing, membership and management workspace. See [community implementation](community-implementation.md) for the authoritative routes, permission matrix, state coverage and integration boundaries. Community fixtures now live in src/mocks/community.js; community state is owned by CommunityProvider and cleared on account reset. Market discussion uses the same canonical community posts. The current application has 133 routes and 333 development state previews.
