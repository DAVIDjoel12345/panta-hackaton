# Architecture and implementation boundary

This is a separate NestJS TypeScript application under backend/. The React source, routes, package manifest, dependencies and build remain unchanged. It follows the module/controller/service and bootstrap architecture of the [official NestJS TypeScript starter](https://github.com/nestjs/typescript-starter), inspected on 2026-10-06. The starter's optional observability, deployment, test framework and CLI dependencies were not copied. TypeScript compiles the backend directly; Node's test runner checks actual HTTP rejection behavior.

## What exists

- A Nest module graph, 34 registered feature modules, empty decorated controllers and services, compile-time request/response/state contracts and unbound repository interfaces.
- A loopback-only bootstrap requiring an explicit PORT. Only GET /api/v1/health is mounted as a rejection stub. A global ScaffoldGuard always throws HTTP 501 NOT_IMPLEMENTED for registered handlers. Unknown/proposed paths return 404. No healthy/readiness/success claim is made.
- AuthenticationGuard always throws 401 AUTH_REQUIRED. AuthorizationGuard always throws 403 ACCESS_DENIED. They are placeholders, not identity verification. The global scaffold brake must remain until real authentication and authorization are deliberately installed and verified.
- Optional email/password, verification, reset, magic-link/code, social, MFA and appeals flags are hard-disabled in config/features.ts. Environment flag names are reserved and do not activate functionality.

## What does not exist

Business logic, database queries, ORM, migrations, seeds, live clients, real identity/session verification, signatures, blockchain submissions, AI requests, workers, scheduler, delivery, telemetry export or frontend API wiring. No successful mock endpoints or repository implementations exist. TypeScript interfaces do not validate HTTP bodies.

## Future dependency direction

HTTP controller -> validated application use case/service -> repository and integration ports -> selected adapters. Controllers must not trust caller-supplied actor IDs. Resolve verified identity and scoped access before reads and writes. Domain events may eventually use a transactional outbox; no event bus is currently selected. Jobs are contract vocabulary only.

PostgreSQL is proposed for application-owned records. Provider market data, chain balances, position quantities, settlement, signatures and confirmations remain authoritative upstream. Locally stored market references, intent IDs and reconciliation observations must not become a second ledger. Optional snapshots/caches carry timestamps, source and freshness, and must not overwrite authority.

## HTTP contracts

/api/v1 is the proposed application prefix. Routes in api-contracts.md are not provider URLs. The application uses /communities internally while the existing browser URLs remain /rooms; no React route migration is required. Request IDs, pagination, validation issues, domain errors and freshness are contracts only. Authentication transport, pagination cursor signing, exception mapping and rate-limit headers are unresolved implementation work.

Changing a membership or making a room private must invalidate cached private reads, saved-content previews, subscriptions and download capabilities. Link copying never proves an external share or grants access. Moderator removal preserves author identity and does not rewrite the original text; author deletion and moderation audit are separate policies.

## Transaction boundary

Purchase/creation/claim/fee intents use stable identifiers and future idempotency keys scoped to actor and operation. Quote review binds wallet, network, market, requested outcome/amount, provider reference and expiry. Validate the unsigned transaction against that intent, expected instructions/programs, destination, amounts, fees and freshness once provider capabilities are verified. The backend must never hold user private keys or sign for users. Wallet connection is UI state; identity proof establishes ownership; the application session authorizes app access; transaction approval is a separate wallet decision.

Submitted, pending, confirmed, failed, expired and confirmation-unknown are distinct. Never retry an unknown submission by blindly constructing a second transaction. Reconcile the bound signature/network and provider evidence before deciding whether a retry is safe. Confirmation/finality policy must be agreed from current chain/provider documentation. Creation, position and claim views refresh only after authoritative reconciliation. No profit, payout, fee, reputation or manual settlement logic is supplied.

## Later release requirements, not implemented controls

Runtime allowlisted DTO validation; length/size/cursor bounds; server authorization on each read/write; membership checks within transactions; request IDs; strict per-origin CORS; HTTPS; session rotation/expiry/revocation; cookie Secure/HttpOnly/SameSite settings and CSRF protection if cookie sessions are chosen; OAuth state/PKCE; replay-resistant wallet challenges; route/actor/IP rate limits; idempotency storage; secure upload validation/scanning; secret-manager integration; log redaction; least-privilege DB access; protected audit; privacy-aware deletion/export; dependency review and real integration tests. Do not expose this scaffold as a production service.

