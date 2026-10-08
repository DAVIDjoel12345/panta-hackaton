# Future integrations and unresolved decisions

| Boundary | Required verification before implementation | Current state |
| --- | --- | --- |
| Panta | Obtain current official docs and credentials; verify available networks, collateral, market identifiers, lifecycle/resolution rules, filters, snapshots/history, price precision, quote expiry, construction, positions, claims, creation and creator-fee capability. Define error/rate-limit behavior. | Interface only; no guessed URL, token, network or provider field schema. |
| Solana | Select provider-supported network/RPC and transaction encoding; define signature verification, instruction/program validation, finality and reconciliation evidence. | Interface only; no SDK or signer. |
| AI | Select provider/model, enforce structured-output schemas, sources/time, missing data, caching and quotas. Treat posts, descriptions, retrieved documents and prompts as untrusted data rather than instructions. | Interface only; no requests or unsupported confidence metric. |
| Sessions | Decide opaque server sessions vs reviewed token scheme; storage, expiry, rotation, cookie/CSRF policy and revocation. | No sessions created; guard fails closed. |
| Optional auth | Review email/social/MFA providers and consent; state/PKCE, verification/reset/magic-link/code replay protection and account recovery. | All feature flags false; no provider integration. |
| PostgreSQL | Choose ORM/driver, schema, migrations, transactions, backups and retention after domain review. | Proposed DB; interfaces only, no connection. |
| Attachments | Select optional object storage, authorization, MIME/content checks, size/count limits, malware scanning, ownership and expiring reads. Confirm community revocation handling. | Storage port only; no bucket/client. |
| Notifications/email | Select supported channels and delivery provider, consent, templates, recipient deduplication, retry/backoff and safe target routing. | Delivery port only; no sender. |
| Cache | Decide whether performance needs justify it; keys include access scope, policy version, freshness and revocation invalidation. | Optional; no cache SDK or Redis assumption. |
| Queues/jobs | Decide outbox and job runner after use cases exist; retries/idempotency/dead letters for reconciliation, expiry, delivery and lifecycle tasks. | Optional; job/event contracts, no workers. |
| Observability | Choose redacted logging/metrics/tracing and retention; never log signatures, credentials, session tokens, private posts or raw provider errors. | Requirements only; no exporter. |
| Reputation/fees | Agree transparent methodology, sample thresholds and independently verified provider creator-fee entitlement. Keep forecast skill, trading returns and creator revenue distinct. | No invented scores, rankings, fee or payout calculations. |

## Wallet challenge responsibilities

Intended fields: wallet address, cryptographically random nonce, canonical allowed domain, server issuedAt, short expiresAt and intended authentication purpose. Bind proof to the challenge, exact canonical message and expected address. Verify the signature with the documented algorithm, expire and atomically consume the nonce once, reject replay/domain/purpose/address mismatches, rate limit challenge issuance/verification and avoid ambiguous serialization. Store only what the replay/retention policy needs. None of this is implemented by the scaffold.

## Environment placeholders

.env.example has names/comments and blank values only. No production defaults or credentials are committed. Only PORT is read by bootstrap, and the listener binds 127.0.0.1. No dotenv package loads the file automatically. Feature-flag environment names are reserved; setting them does not enable a flow. A future config layer must validate required values, separate environments, load secrets safely and avoid printing them. Do not place secrets in React VITE_* variables.

## Data/privacy decisions

Determine retention/deletion of moderation history and transaction references, account export format and signed download expiration, username reuse, ownership transfer during deletion, conversation/message retention, support data retention, public follower policy and appeal review policy. Account deletion cannot delete immutable chain records. No live provisioning, migrations, seed data or outside messages were performed.

