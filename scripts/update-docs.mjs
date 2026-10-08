import fs from 'node:fs'
import { routeTree } from '../src/app/routes.js'
import { flattenRoutes } from '../src/app/routeMatcher.js'
import { stateManifest } from '../src/app/stateManifest.js'
const routes=flattenRoutes(routeTree)
// Preserve reviewed prose; only inventories are regenerated on subsequent runs.
const inventories = new Set(['docs/routes.md', 'docs/states.md', 'docs/scaffold-map.md', 'docs/project-tree.md'])
const write=(file,text)=>{if(inventories.has(file)||!fs.existsSync(file))fs.writeFileSync(file,text)}
write('README.md',`# Panta Signal

A responsive React/Vite demonstration of a social prediction-market product. All 133 scaffold routes have frontend views; P0, P1, and future labels remain planning metadata.

## Run locally

- npm install — install the existing dependencies.
- npm run dev — start Vite.
- npm run build — create the production build.
- npm run preview — preview the production build.
- npm run lint — run the existing lint check.
- node scripts/verify-scaffold.mjs — verify routes, JSX, state rendering, fixture consistency, service boundaries, and contrast.

No additional dependencies were introduced. There is no configured TypeScript/type-check command.

## Demonstration behavior

Fixtures are in [src/demo/fixtures.js](src/demo/fixtures.js); session state is in [src/demo/DemoContext.jsx](src/demo/DemoContext.jsx). Saves, comments, replies, drafts, notifications, settings, and simulated actions live in memory and reset on reload. Wallets, authentication, trades, claims, creation, and creator fee claims are explicitly simulated. No real signatures, funds, provider requests, AI calls, or database writes occur.

The development-only [UI state gallery](http://localhost:5173/dev/ui-states) contains 333 deterministic previews. It is excluded from production routing and navigation. Start the dev server before opening it.

## Documentation

- [Route inventory with priorities](docs/routes.md)
- [Implemented states](docs/states.md)
- [Implementation and integration boundaries](docs/implementation-notes.md)
- [Changes](docs/changes.md)
- [Validation](docs/validation.md)
- [Source tree](docs/project-tree.md)
- [Screenshots](docs/screenshots)

Access metadata and the explicit demo moderator role are not real authorization. Legal pages contain draft text requiring review. Production hosting must rewrite application routes to index.html.
`)
write('docs/implementation-notes.md',`# Frontend implementation

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
`)
write('docs/changes.md',`# Frontend changes

- Filled all 133 existing route pages with feature views, preserving their paths and priority/access metadata.
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
`)
write('docs/routes.md','# Route-to-screen inventory\n\nAll 133 application routes have frontend presentation. Access and priority are descriptive metadata, not authorization. Future modules are visibly labelled.\n\n| Path | Screen | Priority | Access | Layout |\n| --- | --- | --- | --- | --- |\n'+routes.map(r=>`| \`${r.path}\` | [${r.component}](../${r.file}) | ${r.priority} | ${r.access} | ${r.layout} |`).join('\n')+'\n\nDevelopment-only: `/dev/ui-states` → `StateGallery` (333 previews). It is gated by `import.meta.env.DEV`, excluded from the production page glob, and absent from production navigation.\n\nLoading, empty, and error state mappings remain in `src/app/routes.js`. Unknown URLs render NotFoundState; invalid URL parameters render InvalidRouteParameterState; render failures use RouteErrorBoundary.\n')
write('docs/states.md','# Implemented state screens\n\nCommunity adds 48 states; see [community implementation](community-implementation.md). Authentication adds 117 states; see [authentication state checklist](auth-flows/states.md). All existing state component files now use meaningful titles, contextual explanations, status styling, and recovery/navigation actions. Feature scenario controls preserve the form underneath; no artificial network timers run.\n\nThe development-only `/dev/ui-states` gallery shows all 166 scaffold states plus `trading.quoteReady`, `trading.invalidAmount`, and 117 authentication states and 48 community states (333 total).\n\n'+[...new Set(stateManifest.map(s=>s.id.split('.')[0]))].map(feature=>`## ${feature}\n\n`+stateManifest.filter(s=>s.id.startsWith(feature+'.')).map(s=>`- [${s.name}](../${s.file}) — \`${s.id}\` · ${s.priority}`).join('\n')).join('\n\n')+'\n\nSubmitting, submitted, pending confirmation, confirmation unknown, confirmed, failed, expired, and reconciliation remain distinct. Every completion is labelled simulated; nothing represents a real blockchain confirmation.\n')
write('docs/scaffold-map.md',`# Frontend map

| Area | Responsibility |
| --- | --- |
| src/app | Route configuration, matching, lazy loading, providers, and error boundary |
| src/layouts | Existing public, application, creator, settings, and moderation boundaries |
| src/pages | Existing route entries and development-only gallery |
| src/features | Feature views, local flows, reusable states, and creation steps |
| src/components | Shared UI primitives, small presentation components, charts, market cards, navigation, and state presentation |
| src/demo | Fixed fictional fixtures and in-memory demonstration state |
| src/styles/app.css | Design tokens, responsive styles, focus and reduced motion |
| src/styles/mobile.css | Phone layouts, sheets, fixed navigation and safe-area spacing |
| src/hooks | Shared mobile viewport and unsaved-change behavior |
| src/services | Empty live integration boundaries |
| scripts | Frontend verification, browser flows, screenshots, and documentation inventory |
| docs | Route/state inventories, notes, validation, and review artifacts |

See [routes](routes.md), [states](states.md), [implementation notes](implementation-notes.md), and [validation](validation.md).
`)
function tree(dir,prefix=''){return fs.readdirSync(dir,{withFileTypes:true}).filter(e=>!e.name.startsWith('.browser-review')&&!['node_modules','dist','.git','.agents','.codex','.aws'].includes(e.name)).sort((a,b)=>Number(b.isDirectory())-Number(a.isDirectory())||a.name.localeCompare(b.name)).flatMap(e=>[prefix+'|-- '+e.name+(e.isDirectory()?'/':''),...(e.isDirectory()?tree(dir+'/'+e.name,prefix+'|   '):[])])}
write('docs/project-tree.md','# Final source tree\n\nGenerated build, installed dependencies, and isolated browser profile contents are omitted.\n\n```text\nhackaton/\n'+tree('.').join('\n')+'\n```\n')
console.log('Updated frontend documentation and route/state inventories.')
