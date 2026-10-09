# Vercel deployment

The root `vercel.json` defines two services in one Vercel project:

| Service | Root | Runtime | Public routing |
| --- | --- | --- | --- |
| `app` | `.` | Vite static frontend | All paths except `/api`; SPA fallback to `index.html` |
| `backend` | `backend` | NestJS, Node 24 | `/api/:path*`; controllers retain `/api/v1` |

There are no internal-only services and no bindings. React executes in the browser and calls relative `/api/v1` URLs. Vercel bindings are available only to server functions at runtime; putting a bound URL in `VITE_*` would not work. The backend calls external Panta, AI, news, Solana RPC and Turso endpoints. The local gateway and extra local backend worker are development tools, not deployment services.

The backend service sets `entrypoint: "src/main.ts"` and `outputDirectory: "."`. This makes Vercel bundle the NestJS source with its ESM package context. Building `dist/main.js` into the function root instead has caused `Cannot use import statement outside a module` in [Vercel Services issue #17651](https://github.com/vercel/vercel/issues/17651).

The backend lockfile pins `uuid@11` only below `rpc-websockets`. Its CommonJS build is needed by Solana's websocket dependency in Vercel's function loader; [uuid 12 and later dropped CommonJS support](https://github.com/uuidjs/uuid).

## Environment

Create a Turso database and add these **server-only** variables in Vercel Project Settings. Use separate databases and provider keys for Preview and Production.

- `TURSO_DATABASE_URL`: hosted `libsql://...` or `https://...` URL.
- `TURSO_AUTH_TOKEN`: database read/write token.
- `PANTA_API_KEY` and `PANTA_API_BASE_URL`: existing Panta configuration.
- `GEMINI_API_KEY` or `OPENROUTER_API_KEY`, plus the corresponding model setting from `backend/.env.example`.
- `FRONTEND_ORIGINS`: comma-separated exact HTTPS origins for your custom domains. Current deployment and Vercel production domains are automatically accepted from Vercel's system variables.
- `APP_PUBLIC_URL`: canonical HTTPS origin used for the AI provider's referer.
- Existing `SOLANA_RPC_URL`, `PANTA_DEPLOYMENT_FILE` and `PANTA_OPERATOR_USER_IDS` only if those features have been configured. A deployment file must exist in the deployed backend; a local absolute Windows path will not work. Transaction signing remains disabled without the verified deployment configuration.

Vercel supplies `PORT`, `VERCEL`, `VERCEL_ENV` and deployment URL variables. Do not copy local `PORT`, `APP_DATABASE_PATH` or localhost origins into Production. Do not prefix secrets with `VITE_`. Local `.env` files are excluded from deployment uploads and Git. Set Node.js 24 in Vercel if the project has an existing override.

The backend initializes its schema on first connection. Production/Preview fail closed when hosted credentials are missing. Local development can still use SQLite. Database operations are asynchronous; community updates and settings updates use transactions. Database-backed leases serialize transaction-intent operations and AI requests across backend instances.

## Import existing data (optional)

Do this **before the first deployment** against a new, empty hosted database. Stop local writers and back up the SQLite database first. The import includes accounts, password hashes, sessions, communities, conversations, drafts, market observations and transaction intents. It never prints records or credentials.

From `backend`, configure Turso credentials in your ignored `.env`, then run:

```sh
npm ci
npm run build
node --env-file-if-exists=.env scripts/migrate-to-turso.mjs data/panta.sqlite
```

The importer reads the source without changing it. It refuses a nonempty destination and rolls back the import on error. Very large imports may exceed the hosted transaction duration; use Turso's database import tooling for those instead of retrying partial manual SQL. The application can also start with an empty database if you do not need local development records.

## Validate and deploy

```sh
npm ci
npm ci --prefix backend
npm run build
npm run build --prefix backend
npm run lint
node --test backend/test/*.test.mjs
npx vercel dev -L
```

`vercel dev` starts both services and routes browser requests through one origin. Add that development origin to `FRONTEND_ORIGINS`. For an unlinked local run, set `VERCEL_ENV=development` to use SQLite, or provide dedicated hosted development credentials. Do not use production credentials for automated tests.

After deployment, verify `/api/v1/runtime/health`, reload a deep link such as `/markets`, register/sign in, save a community change, and reload it through another browser. Check an AI conversation with configured provider credentials. A successful build alone does not verify a hosted database or external provider account.

## Runtime limits

- Events reconnect after 55 seconds. Ten-second heartbeats refresh shared database state even when another Vercel instance handled a mutation. Market polling retains its existing intervals; upstream data is a Panta snapshot, not a guaranteed tick stream.
- Cache and request-rate counters remain per instance. Use Vercel Firewall rate limits for deployment-wide abuse controls; in-memory counters are not a global quota.
- Backend requests have a 120-second function limit. Inline uploads must fit the hosted request limit (4 MB application limit); large assets need direct external storage uploads. Existing local-only 30 MB request support does not apply on Vercel.
- Choose a database region near the backend's Vercel region. Remote round trips add latency; this migration does not guarantee faster upstream Panta responses.

References: [Services](https://vercel.com/docs/services), [Bindings](https://vercel.com/docs/services/bindings), [NestJS](https://vercel.com/docs/frameworks/backend/nestjs), [SQLite persistence](https://vercel.com/kb/guide/is-sqlite-supported-in-vercel), [libSQL client](https://github.com/tursodatabase/libsql-client-ts).
