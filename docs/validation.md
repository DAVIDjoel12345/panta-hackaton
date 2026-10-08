> Community update (2026-10-06): see [current community validation](community-validation.md) for 133 routes, 333 state previews, and the new community checks. Earlier measurements below describe the preceding baseline.

# Frontend validation

## Authentication and landing update

Current checks pass for 114 routes, 435 JSX files, 285 gallery previews, 188 product browser cases, and 217 mobile cases. The new [authentication verification report](auth-flows/verification.md) and [authentication browser results](auth-browser-results.json) cover wallet/email/recovery, guarded routes, account association, onboarding, and intro behavior. Build, lint, redirect/storage checks, production deep links, and ten contrast pairs pass. Earlier sections below describe the preceding implementation phases.

## Mobile update

- Final production build, lint (zero warnings), and scaffold/JSX checks pass: 97 routes, 408 JSX files, 166 unique state renders, consistent fixtures, empty service boundaries, and seven contrast pairs.
- **200 mobile browser checks pass**, with no runtime exceptions. All 97 routes fit at 320px; 12 representative routes also pass at 360, 390, 430, 768, and 1280px, plus 844×390 landscape.
- Mobile interactions verify More navigation, sheet links without leftover history entries, nested Back behavior, native focus trapping/restoration, visible keyboard focus, filter persistence, position/transaction cards, preserved trade amounts, full-screen review criteria, creation navigation and unsaved Back confirmation, AI history, and keyboard viewport resizing.
- Long questions, source URLs, and wallet references wrap. Simulated 20px top/34px bottom safe areas fit. Form text enlarged to 24px has no page overflow. Reduced-motion preference is honored.
- The existing **171-check regression suite** passes. Production deep links and development-gallery exclusion pass against the rebuilt output.
- [Mobile check results](mobile-browser-results.json) and [implementation details](mobile-implementation.md) include scope and limitations. Tests use desktop Chrome viewport emulation; physical iOS/Android keyboard, accessibility settings, and screen-reader audits remain unverified.

## Original frontend checks

- `npm run build`: passed; production output is in `dist/`. Feature views are lazy-loaded.
- `npm run lint`: passed without warnings.
- `node scripts/verify-scaffold.mjs`: originally passed for all 97 routes, 403 JSX files, 166 unique state component renders, fixture/position relationships, chart endpoints, empty service boundaries, and seven text contrast combinations; see the mobile update above for the current file count.
- `node scripts/frontend-browser-check.mjs`: **171 browser checks passed**, including all 97 routes and all 168 development state previews. No runtime exceptions were recorded.
- Responsive checks covered 14 representative route families at 360px, 768px, and 1280px. No page-level horizontal overflow was detected. Tables and tabs use contained scrolling.
- Interaction checks covered search/clear, category filtering, grid/list view, load more, sidebar collapse, invalid trade amounts, insufficient balance, quote expiry, submitting/submitted/pending/simulated confirmation, transaction records, claim history, read/unread notifications, comments/replies/reports, explicit moderator access, settings save/unsaved state, profile updates, creation completion, fixed AI responses, mobile trade dialogs, Escape dismissal, and mobile navigation focus restoration.
- `node scripts/production-check.mjs`: passed production hard-navigation deep links and confirmed `/dev/ui-states` renders Not found in production. No StateGallery or UI state laboratory code is present in the production assets.
- `node scripts/browser-review.mjs`: captured representative desktop, tablet, and mobile screenshots under `docs/screenshots/`. The review caught and corrected mobile landing-title overflow.
- Primary, secondary, muted, accent, positive, negative, and primary-button text combinations exceed 4.5:1. Exact ratios are in `contrast-checks.json`.
- No separate type-check command exists in this JavaScript project. JSX compilation and the existing lint checks were used without a language migration.

## Review artifacts

- [Mobile discovery, 390px](screenshots/mobile-explore-390.png)
- [Mobile trade review, 390px](screenshots/mobile-trade-review-390.png)
- [Mobile portfolio, 390px](screenshots/mobile-portfolio-390.png)
- [Mobile landing, 320px](screenshots/mobile-landing-320.png)
- [Phone landscape, 844×390](screenshots/mobile-landscape-844.png)
- [Browser check results](browser-check-results.json)
- [Contrast checks](contrast-checks.json)
- [Desktop discovery](screenshots/explore-desktop.png)
- [Mobile discovery](screenshots/explore-mobile.png)
- [Desktop market detail](screenshots/market-desktop.png)
- [Mobile market detail](screenshots/market-mobile.png)
- [Desktop landing](screenshots/landing-desktop.png)
- [Mobile landing](screenshots/landing-mobile.png)
- [AI workspace](screenshots/ai-desktop.png)
- [Tablet creation](screenshots/creation-tablet.png)

## Limits

Validation used local Chrome and the existing dependencies, not a full cross-browser or assistive-technology audit. Native dialogs provide focus trapping and keyboard dismissal; visible focus and reduced-motion styles are included. No live provider, wallet, auth, AI, payment, settlement, or database integration was tested because those integrations remain deliberately unimplemented.

Compiler and browser checks required approved execution outside the Windows sandbox.
