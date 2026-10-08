> Live Panta update: catalog, market detail and trade endpoints are connected and verified against the configured Panta account. Active pages check every 10 seconds, refresh on reconnect/focus, pause when hidden and back off after errors. Stale responses retain their original retrieval timestamp. Requests never overlap; slow provider responses and failures can delay updates. Each worker's cache expires after 500 ms. This supersedes older refresh intervals and missing-Panta-key notes below.

## Local load balancer

Build with `npm run build --prefix backend`, then run `npm run dev:full`. Vite proxies `/api` to the gateway on port 3000. The gateway balances market GET requests across Nest workers on ports 3001 and 3002, choosing the worker with fewer active requests and rotating equal choices. Connection failures temporarily remove a worker for 10 seconds and retry a market read on the other worker. Provider HTTP errors pass through to the client's backoff logic.

Account, AI, community writes, and SSE remain on port 3001 because the community event bus and rate limits are process-local. Cookies and streaming responses pass through the gateway. Mutations are never replayed. Both workers use the same local SQLite database; this is a local market-read load balancer, not distributed database or full application failover. Do not expose workers directly in a production deployment. Market polling does not imply that the external provider produces new prices every ten seconds.

For separately managed services, start the primary with `npm start --prefix backend`, start another backend with `PORT=3002`, and run `node scripts/api-gateway.mjs` before starting Vite. Run `node --test --test-isolation=none scripts/api-gateway.test.mjs` to check balancing, read failover, cookie forwarding, mutation routing, and unbuffered events.

> Current AI configuration: external Gemini API only. Set GEMINI_API_KEY and optionally AI_MODEL in backend/.env, then restart the backend. No local inference fallback or ai:start command remains. The old local-installation notes below describe historical work only. Both external keys were missing during the latest check, so successful live provider responses have not been verified.

# Connected local application

This document supersedes the earlier demo/scaffold implementation notes. The default app uses the existing Nest backend; it does not load seeded demo accounts or community data.

## Run

Requires Node 24 or later. Dependencies are already installed in this workspace.

```powershell
npm run build --prefix backend
npm run dev:full
```

Open http://127.0.0.1:5173. The backend listens only on 127.0.0.1:3001. Vite proxies `/api` to it. AI calls go from the backend to Google's Gemini API. Stop an existing backend/frontend process before starting another on the same ports.

The backend reads `backend/.env`. It stores accounts, password hashes, sessions, communities, drafts, images, comments, likes, reports, moderation history, notifications, settings and AI conversations in `backend/data/panta.sqlite`. This path is relative to the backend working directory. `APP_DATABASE_PATH` can override it. Restarting preserves data. Back up SQLite with its WAL consistently; do not copy a live database file alone.

## Implemented behavior

- Email/password registration and sign-in, random server-side sessions in HttpOnly cookies, logout and password hashing with scrypt. Email ownership is **not verified**.
- Community creation/settings, membership requests/approval, posts and images, drafts, comments/replies, likes, bookmarks, reports, moderation, roles and ownership transfer. Server permissions determine access; changing frontend state cannot grant a role.
- Private content filtering on the server, scoped notification reads, account profile/preferences and membership review requests recorded in staff activity with notifications.
- Server-sent events invalidate connected views; reconnect, focus and heartbeat refresh from server storage. The event stream contains no private content. This implementation targets a single local backend process.
- External Gemini API generation with account-scoped conversation history. Failed requests preserve the user's input and do not fabricate an answer.
- Panta catalog/detail API adapter with server-only credentials and 30-second page refresh. List responses do not contain live prices; detail displays provider prices when available.

## Panta configuration

Set `PANTA_API_KEY` in `backend/.env` and restart the backend. Never use a `VITE_` variable for a secret. Default base URL is `https://live-api.panta.market/api/v1`; the documented staging URL is also accepted. The user is configuring this key separately. Provider authentication and successful market retrieval have not yet been verified against a configured account.

Official references: [authentication](https://docs.panta.market/guides/authentication), [market list](https://docs.panta.market/api-reference/markets/list), [market detail](https://docs.panta.market/api-reference/markets/get). Provider pages show “Powered by Panta.” No external account was registered on the user's behalf.

## AI runtime

AI uses the external Gemini API only. The previously downloaded model files are unused and ignored by version control. The local inference process has been stopped and its startup command removed. Recent conversation context is sent to Google; conversation history remains account-scoped in SQLite.

## Not implemented / deployment limits

Wallet ownership verification, transaction signing/broadcast/confirmation, trading, portfolio/positions, claims, market creation, creator fees, email verification/recovery, social login, delivery of email/push, global moderation and support handling remain unavailable. Their old simulated success paths are gated out of the default app. A Panta key alone does not implement these workflows. Legal/help pages remain draft product content.

This is a working local application, not a production deployment. Production needs TLS, a same-origin reverse proxy, secure cookie deployment settings, backups, operational monitoring, account recovery, attachment lifecycle/scanning and a database/concurrency strategy appropriate to its scale. Attachments are limited raster data URLs stored with posts; no external object-storage account was provisioned. Existing JSON contracts and empty domain modules describe future endpoints; live endpoints reside in `backend/src/runtime/`.

## Verification

```powershell
npm run lint
npm run build
npm test --prefix backend
node scripts/live-browser-check.mjs
```

Backend tests use their own temporary SQLite database and verify sessions, CSRF origin rejection, exact passwords, private access, moderation, idempotency, event invalidation, notifications, logout and persistence after reopening the database. The browser script needs a separate Chrome debugging profile on port 9223, frontend on 5174, backend on 3001 and an isolated backend database. Run browser checks against an isolated test database: they create actual accounts and content. Historical demo browser scripts exercise the old fixture mode and are not live integration tests.

## External API setup and status

Use a server-only GEMINI_API_KEY from https://aistudio.google.com/api-keys. AI_MODEL defaults to gemini-3.1-flash-lite and is configurable. Official API contract: https://ai.google.dev/gemini-api/docs/openai. Pricing and free-tier limits: https://ai.google.dev/gemini-api/docs/pricing. Free-tier data-use terms differ from paid tiers; review them before sending private content. The app discloses that prompts and recent chat context are sent to Google. No billing plan was enabled.

GET /api/v1/runtime/health checks database access and returns server time plus credential configuration status, without secrets. The home page refreshes this every 30 seconds. This is not evidence of provider authentication. Community updates use SSE. Panta market polling is 30 seconds, not an exchange tick stream; retrievedAt is retrieval time, not a provider trade timestamp.

External AI contract tests use mocked HTTP responses and are not proof of live provider connectivity. Set RUN_LIVE_AI=1 for an optional browser inference check after configuring a real key.

## Repeated startup

Starting the backend again checks port ownership through its health endpoint. An existing Panta backend is reused; unrelated services are never terminated automatically. Reuse does not reload configuration: stop the owning backend and start it again after editing backend/.env. The full-stack launcher preserves failure exit codes and only stops processes it created.


## Live Panta verification

The backend retrieved 20 catalog markets, an actual detail response with provider YES/NO prices, and a trade feed with 3 records during verification. These counts are observations, not fixed application data. Five-second bounded server caching and request coalescing reduce repeated upstream reads. History and Activity show the latest 50 catalog trades, not a fabricated price chart. Source contracts: https://docs.panta.market/api-reference/markets/list, https://docs.panta.market/api-reference/markets/get, https://docs.panta.market/api-reference/markets/trades.

Landing-page market previews now use Panta data while retaining the original splash and page structure. Catalog rows do not supply current prices; detail pages and the landing spotlight fetch them separately. Wallet transactions, positions, claims, and creator fees still require the remaining wallet/provider implementation. No claims of tick-by-tick streaming or completed transaction integration are made.

Market freshness: active grid cards fetch the market-detail endpoint separately from the catalog every 10 seconds. Cards show quote-check time, settled/cancelled status, and last-trade price provenance when Panta supplies it. A check timestamp is not a trade timestamp. Browser requests time out after 20 seconds and retain earlier data; retries back off after failures. Gateway worker connections are limited to 2 seconds before read failover. Panta's published documentation describes REST catalog/detail/trade endpoints, with no documented market streaming subscription. This remains polling, not a tick-by-tick stream.
