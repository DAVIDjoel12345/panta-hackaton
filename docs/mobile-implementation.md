> Community update (2026-10-06): see [current community validation](community-validation.md) for 133 routes, 333 state previews, and the new community checks. Earlier measurements below describe the preceding baseline.

# Mobile frontend

The existing React/Vite application now has a shared mobile presentation for all 97 routes. No dependencies or service integrations were added. Desktop navigation, tables, and sidebars remain available at larger widths. Phone landscape uses the mobile presentation when the viewport is at most 1000px wide and 500px high; portrait switches below 768px.

## Screens and priorities

The complete [97-route inventory](routes.md) retains its P0, P1, and future labels. These are planning labels, not permissions or claims of live availability. P0 discovery, market detail, trading, portfolio, claims, creation, community, and account journeys share the new shell. Secondary and future-labelled screens retain their existing dedicated content and deterministic failure states.

## Mobile changes

- Five fixed destinations: Explore, Rooms, Create, Portfolio, and More. More exposes AI, claims, saved items, leaderboard, creator tools, notifications, settings, help, and profile. Moderation appears only after an explicit demo role selection.
- Compact header with nested Back, search, alerts, and wallet access. Safe-area padding reserves space around fixed controls. Focused creation and open dialogs hide competing bottom navigation.
- Discovery uses one-column cards, scrolling category chips, filter and sort sheets, and a clear applied-filter summary. Desktop list selection does not force a table onto phones.
- Market details show selectable YES/NO prices and a persistent trade action. Ticket and review use full-screen mobile dialogs. Resolution criteria, lifecycle, deadline, and illustrative quote are visible before approval. Closing and reopening a ticket preserves its amount.
- Positions and transactions use cards; leaderboard rows stack into readable summaries. Desktop tables remain intact.
- Creation presents one step, compact progress, sticky Back/Continue actions, validation, and unsaved-change confirmation. The competing desktop preview is hidden on phones.
- AI conversation history uses a sheet. The composer follows viewport resizing; a detected keyboard hides bottom navigation. Settings use grouped links to dedicated preference screens.
- Native dialogs supply focus trapping. Shared overlay history makes browser Back dismiss the current sheet before leaving its page, including nested trade review. Closing restores focus to the trigger. Links inside sheets remove the overlay history entry before navigating.
- Forms use at least 16px input text and touch-sized controls. Text, sources, and references wrap. Motion follows the existing reduced-motion preference.

## Shared components and hooks

New: `MobileChrome`, `DiscoverySheets`, `PositionCard`, `TransactionList`, `ConversationHistorySheet`, `useMobileLayout`, and `useVisualViewport`.

Extended: shared `Modal`, route navigation/history, `MarketView`, `TradeTicketView`, `PortfolioView`, `SettingsView`, `CreationView`, `AiView`, `ProfilesView`, and the existing state gallery. Mobile styles live in `src/styles/mobile.css`, after the desktop stylesheet.

## State coverage

- [State checklist](states.md): 166 unique component states plus two development-gallery previews (168 total).
- Shared states include loading/skeleton, empty/no results, recoverable/unexpected errors, offline/reconnecting/stale/partial/API unavailable/rate limit, maintenance/unavailable/coming soon, wallet/auth/access gates, invalid/not-found routes, success, and confirmation.
- Transaction, claim, approval, quote expiry, creation, and failure transitions require explicit simulation controls. No random failures or timers imply live activity.
- Portfolio background-refresh, partial, stale, and synchronization scenarios keep existing content visible. Other inline feature status panels retain their surrounding content.
- Fixtures: `src/demo/fixtures.js`; memory-only session state: `src/demo/DemoContext.jsx`; state definitions: `src/app/stateManifest.js`.
- Development gallery: `/dev/ui-states`. Documented preview sizes include 320, 360, 390, 430, 768, 1280px and 844×390 landscape. The gallery is excluded from production routes.

## Integration boundaries

`src/services/**` remains empty. Wallet connection, signatures, authentication, market feeds, AI, transaction submission, settlement, claims, notifications, account persistence, and moderation authorization still require real implementations. The UI consistently identifies fixtures and simulated actions. No real funds, provider calls, or database writes occur. Reloading resets local demo state.

## Verification and reference

See [validation](validation.md), [mobile browser results](mobile-browser-results.json), and [screenshots](screenshots/). The browser script uses an isolated Chrome tab and accepts `CHROME_URL` and `APP_URL` environment variables (defaults: local ports 9223 and 5174). Start the development server and a Chrome remote-debugging session before running it.

The [Konsta UI React documentation](https://konstaui.com/react), especially [Tabbar](https://konstaui.com/react/tabbar), [List Input](https://konstaui.com/react/list-input), and [Safe Areas](https://konstaui.com/react/safe-areas), informed the mobile navigation, field sizing, and safe-area patterns. Components were implemented in the existing React/CSS system without installing Konsta.

Viewport and safe-area checks are Chrome emulation, not physical-device certification. The keyboard test resizes the viewport with a focused field; it does not operate a real iOS/Android keyboard. Large-text validation increases form text to 24px; actual system accessibility settings and screen readers still merit device testing.
