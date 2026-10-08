> Current implementation: [Connected local application](../docs/live-backend.md). The historical demo/scaffold notes below are superseded where they conflict. Accounts, communities and external AI now use the backend; financial and wallet workflows are still unavailable.

# Panta Signal backend scaffold

Separate NestJS TypeScript scaffold; the React app remains unchanged. Architecture reference: [official NestJS TypeScript starter](https://github.com/nestjs/typescript-starter). This project has **no implemented business operations**.

34 modules and 146 proposed application operations are documented. Empty controllers/services, unbound repository/integration interfaces, request/response placeholders and domain states compile. The only registered route, GET /api/v1/health, returns **501 NOT_IMPLEMENTED**. Other proposed routes are not registered and return 404. A global scaffold guard rejects any registered operation. Authentication and authorization placeholders fail closed. Optional auth methods are disabled.

## Local commands

Requires Node 24+ and npm. From backend/:

~~~powershell
npm ci
npm run build
npm run typecheck
npm test
$env:PORT = '3001'
npm start
~~~

The port above is an explicit local example, not an environment-file or production default. Bootstrap binds to 127.0.0.1 only. npm run start:dev watches compiled dist output; run npm run build after source edits or use npx tsc -p tsconfig.build.json --watch in another terminal. No Nest CLI is required. The bootstrap does not automatically load .env. Its example contains blank placeholders, not credentials. No live database or provider is needed for build/type-check/tests.

Do not wire React to these routes yet: proposals are not working endpoints. There is no ORM/driver, migration, seed, auth verifier, provider client, worker, email delivery, signing or fake-success handler. PostgreSQL is proposed for application metadata; provider/chain data stays authoritative. Cache, queues, storage and email remain optional future choices.

## Review documents

- [Architecture and implemented boundary](docs/architecture.md)
- [Complete backend tree](docs/project-tree.md)
- [Module inventory](docs/module-inventory.md)
- [Proposed application API inventory](docs/api-contracts.md)
- [React screens and state mapping](docs/screen-state-mapping.md)
- [Domain states and error HTTP mapping](docs/domain-states.md)
- [Permission matrix](docs/permissions.md)
- [Entity/model inventory and constraints](docs/entity-model-inventory.md)
- [Future integrations and open questions](docs/integration-open-questions.md)
- [Verification results](docs/verification.md)

Services are empty intentionally. Runtime validation, authorization policies, secure sessions, rate limits, CORS/CSRF, secret handling, redacted logs and real integration tests must be implemented before deployment. The backend must never hold user private keys or sign user transactions.

