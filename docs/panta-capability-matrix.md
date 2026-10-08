# Panta capability matrix

Checked against the [Panta documentation index](https://docs.panta.market/llms.txt) and the [official playground](https://github.com/Kaito-HQ/panta-api-playground) on 2026-10-07. The centralized adapter is `backend/src/panta/client.ts`; server routes are in `backend/src/runtime/runtime.module.ts`. “Integrated” means the request and response are wired; it does not imply a funded Solana transaction has been completed.

| Panta API | Auth / environment | Signal screen or use | Status / evidence |
| --- | --- | --- | --- |
| `GET /markets/`, `GET /markets/{id}/` | Server API key, official live/staging base | Discovery, market overview, cards, AI context | Integrated; live catalog and detail browser checked. Detail refreshes every 10 seconds while visible. |
| `GET /categories/` | Server API key | Discovery filters, creation category | Integrated; categories read from provider. |
| `GET /markets/{id}/trades/` | Server API key | Market activity/chart observation | Integrated; actual reported trades, no invented candle history. |
| `GET /wallets/{wallet}/trades/` | Server API key + Signal account | Portfolio activity | Integrated; read only. |
| `GET /positions/?wallet=` | Server API key + Signal account | Positions and claim eligibility | Integrated; provider position read. |
| `GET /account/` | Server API key | Creation permission and connection status | Integrated; permission checked. |
| `GET /account/dashboard/`, `/metrics/`, `/creates/`, `/trades/` | Server API key, explicit operator account | Operator data | Adapter implemented; dashboard/metrics/creates exposed only to configured operator IDs; trades available in operator CLI. |
| `GET/POST /account/keys/`, `POST /account/keys/{id}/revoke/`, `PATCH /account/` | Server API key or provider bearer | Local operator CLI | Implemented with server-only credentials; key secret is written once to an ignored local file. No public browser route. |
| `POST /auth/token/`, `/auth/register/`, `/auth/token/refresh/` | Panta provider account credentials/bearer | Local operator bootstrap | Implemented in CLI; distinct from Signal user login. |
| `POST /markets/create/image-upload/` | Server API key | Creation image upload signing | Adapter/route implemented; UI upload remains unavailable until the signed Cloudinary form flow is wired and verified. |
| `POST /markets/create/quote/`, `/markets/create/build/`, `/markets/register/` | Server API key + authorized wallet; verified deployment for signing | Creation wizard | Quote/build/register intent path implemented. Signing blocked until verified program/IDL/RPC configuration exists. No funded E2E. |
| `POST /primaryorderquote/`, `/primaryorderbuild/`, `/primaryordersubmit/`, `/primaryorderverify/` | Server API key + wallet; verified deployment for signing | Buy ticket | Quote/review/build/submit/verify path implemented. Signing blocked pending deployment verification. No funded E2E. |
| `POST /claim/build/`, `/claim/creator-fees/build/` | Server API key + wallet; verified deployment for signing | Claim and creator fees | Build/review path implemented. Claim eligibility checked against positions; creator fee on-chain eligibility is provider enforced. No funded E2E. |
| `POST /trades/`, `GET /trades/{signature}/` | Server API key + verified signature | Reconciliation/history | Adapter implemented; report/status used in intent reconciliation. No funded E2E. |

The public docs do not give this integration a verified deployment genesis hash, program ID, IDL, USDC mint, share decimals and instruction account/argument policy. A Panta API key, including a `pk_test_` key accepted by the public API, does not establish the Solana network for funded transactions. Those actions remain disabled until a verified deployment file and matching RPC are provided. The live market catalog does not provide a streaming quote feed or provider OHLC chart; the UI labels its 10-second polling and observed trade snapshots accordingly.
