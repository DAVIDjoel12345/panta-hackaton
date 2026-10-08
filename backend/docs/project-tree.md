# Backend project tree

Dependency folders and generated dist output are excluded. The frontend remains at the repository root.

```text
backend/
|-- docs/
|   |-- api-contracts.json
|   |-- api-contracts.md
|   |-- architecture.md
|   |-- domain-states.md
|   |-- entity-model-inventory.md
|   |-- error-codes.json
|   |-- integration-open-questions.md
|   |-- module-inventory.json
|   |-- module-inventory.md
|   |-- permissions.md
|   |-- project-tree.md
|   |-- screen-state-mapping.md
|   |-- verification.md
|-- src/
|   |-- common/
|   |   |-- contracts/
|   |   |   |-- index.ts
|   |   |   |-- primitives.ts
|   |   |-- decorators/
|   |   |   |-- README.md
|   |   |-- errors/
|   |   |   |-- domain-error.ts
|   |   |-- filters/
|   |   |   |-- README.md
|   |   |-- guards/
|   |   |   |-- authentication.guard.ts
|   |   |   |-- authorization.guard.ts
|   |   |   |-- scaffold.guard.ts
|   |   |-- interceptors/
|   |   |   |-- README.md
|   |   |-- pagination/
|   |   |   |-- index.ts
|   |   |-- validation/
|   |   |   |-- index.ts
|   |-- config/
|   |   |-- environment.ts
|   |   |-- features.ts
|   |-- events/
|   |   |-- domain-event.contract.ts
|   |-- infrastructure/
|   |   |-- database/
|   |   |   |-- repository-context.ts
|   |   |-- README.md
|   |-- integrations/
|   |   |-- ai/
|   |   |   |-- ai.adapter.ts
|   |   |-- auth-providers/
|   |   |   |-- auth-provider.adapter.ts
|   |   |-- panta/
|   |   |   |-- panta.adapter.ts
|   |   |-- solana/
|   |   |   |-- solana.adapter.ts
|   |   |-- attachment-storage.port.ts
|   |   |-- notification-delivery.port.ts
|   |-- jobs/
|   |   |-- job.contract.ts
|   |-- modules/
|   |   |-- account-lifecycle/
|   |   |   |-- account-lifecycle.controller.ts
|   |   |   |-- account-lifecycle.module.ts
|   |   |   |-- account-lifecycle.repository.ts
|   |   |   |-- account-lifecycle.request.ts
|   |   |   |-- account-lifecycle.response.ts
|   |   |   |-- account-lifecycle.service.ts
|   |   |   |-- account-lifecycle.state.ts
|   |   |   |-- index.ts
|   |   |-- ai-analysis/
|   |   |   |-- ai-analysis.controller.ts
|   |   |   |-- ai-analysis.module.ts
|   |   |   |-- ai-analysis.repository.ts
|   |   |   |-- ai-analysis.request.ts
|   |   |   |-- ai-analysis.response.ts
|   |   |   |-- ai-analysis.service.ts
|   |   |   |-- ai-analysis.state.ts
|   |   |   |-- index.ts
|   |   |-- ai-conversations/
|   |   |   |-- ai-conversations.controller.ts
|   |   |   |-- ai-conversations.module.ts
|   |   |   |-- ai-conversations.repository.ts
|   |   |   |-- ai-conversations.request.ts
|   |   |   |-- ai-conversations.response.ts
|   |   |   |-- ai-conversations.service.ts
|   |   |   |-- ai-conversations.state.ts
|   |   |   |-- index.ts
|   |   |-- auth/
|   |   |   |-- auth.controller.ts
|   |   |   |-- auth.module.ts
|   |   |   |-- auth.repository.ts
|   |   |   |-- auth.request.ts
|   |   |   |-- auth.response.ts
|   |   |   |-- auth.service.ts
|   |   |   |-- auth.state.ts
|   |   |   |-- index.ts
|   |   |-- claims/
|   |   |   |-- claims.controller.ts
|   |   |   |-- claims.module.ts
|   |   |   |-- claims.repository.ts
|   |   |   |-- claims.request.ts
|   |   |   |-- claims.response.ts
|   |   |   |-- claims.service.ts
|   |   |   |-- claims.state.ts
|   |   |   |-- index.ts
|   |   |-- comments/
|   |   |   |-- comments.controller.ts
|   |   |   |-- comments.module.ts
|   |   |   |-- comments.repository.ts
|   |   |   |-- comments.request.ts
|   |   |   |-- comments.response.ts
|   |   |   |-- comments.service.ts
|   |   |   |-- comments.state.ts
|   |   |   |-- index.ts
|   |   |-- communities/
|   |   |   |-- communities.controller.ts
|   |   |   |-- communities.module.ts
|   |   |   |-- communities.repository.ts
|   |   |   |-- communities.request.ts
|   |   |   |-- communities.response.ts
|   |   |   |-- communities.service.ts
|   |   |   |-- communities.state.ts
|   |   |   |-- index.ts
|   |   |-- creator-fees/
|   |   |   |-- creator-fees.controller.ts
|   |   |   |-- creator-fees.module.ts
|   |   |   |-- creator-fees.repository.ts
|   |   |   |-- creator-fees.request.ts
|   |   |   |-- creator-fees.response.ts
|   |   |   |-- creator-fees.service.ts
|   |   |   |-- creator-fees.state.ts
|   |   |   |-- index.ts
|   |   |-- creators/
|   |   |   |-- creators.controller.ts
|   |   |   |-- creators.module.ts
|   |   |   |-- creators.request.ts
|   |   |   |-- creators.response.ts
|   |   |   |-- creators.service.ts
|   |   |   |-- creators.state.ts
|   |   |   |-- index.ts
|   |   |-- follows/
|   |   |   |-- follows.controller.ts
|   |   |   |-- follows.module.ts
|   |   |   |-- follows.repository.ts
|   |   |   |-- follows.request.ts
|   |   |   |-- follows.response.ts
|   |   |   |-- follows.service.ts
|   |   |   |-- follows.state.ts
|   |   |   |-- index.ts
|   |   |-- health/
|   |   |   |-- health.controller.ts
|   |   |   |-- health.module.ts
|   |   |   |-- health.request.ts
|   |   |   |-- health.response.ts
|   |   |   |-- health.service.ts
|   |   |   |-- health.state.ts
|   |   |   |-- index.ts
|   |   |-- leaderboards/
|   |   |   |-- index.ts
|   |   |   |-- leaderboards.controller.ts
|   |   |   |-- leaderboards.module.ts
|   |   |   |-- leaderboards.request.ts
|   |   |   |-- leaderboards.response.ts
|   |   |   |-- leaderboards.service.ts
|   |   |   |-- leaderboards.state.ts
|   |   |-- likes/
|   |   |   |-- index.ts
|   |   |   |-- likes.controller.ts
|   |   |   |-- likes.module.ts
|   |   |   |-- likes.repository.ts
|   |   |   |-- likes.request.ts
|   |   |   |-- likes.response.ts
|   |   |   |-- likes.service.ts
|   |   |   |-- likes.state.ts
|   |   |-- market-creation/
|   |   |   |-- index.ts
|   |   |   |-- market-creation.controller.ts
|   |   |   |-- market-creation.module.ts
|   |   |   |-- market-creation.repository.ts
|   |   |   |-- market-creation.request.ts
|   |   |   |-- market-creation.response.ts
|   |   |   |-- market-creation.service.ts
|   |   |   |-- market-creation.state.ts
|   |   |-- market-data/
|   |   |   |-- index.ts
|   |   |   |-- market-data.controller.ts
|   |   |   |-- market-data.module.ts
|   |   |   |-- market-data.request.ts
|   |   |   |-- market-data.response.ts
|   |   |   |-- market-data.service.ts
|   |   |   |-- market-data.state.ts
|   |   |-- market-drafts/
|   |   |   |-- index.ts
|   |   |   |-- market-drafts.controller.ts
|   |   |   |-- market-drafts.module.ts
|   |   |   |-- market-drafts.repository.ts
|   |   |   |-- market-drafts.request.ts
|   |   |   |-- market-drafts.response.ts
|   |   |   |-- market-drafts.service.ts
|   |   |   |-- market-drafts.state.ts
|   |   |-- markets/
|   |   |   |-- index.ts
|   |   |   |-- markets.controller.ts
|   |   |   |-- markets.module.ts
|   |   |   |-- markets.repository.ts
|   |   |   |-- markets.request.ts
|   |   |   |-- markets.response.ts
|   |   |   |-- markets.service.ts
|   |   |   |-- markets.state.ts
|   |   |-- memberships/
|   |   |   |-- index.ts
|   |   |   |-- memberships.controller.ts
|   |   |   |-- memberships.module.ts
|   |   |   |-- memberships.repository.ts
|   |   |   |-- memberships.request.ts
|   |   |   |-- memberships.response.ts
|   |   |   |-- memberships.service.ts
|   |   |   |-- memberships.state.ts
|   |   |-- moderation/
|   |   |   |-- index.ts
|   |   |   |-- moderation.controller.ts
|   |   |   |-- moderation.module.ts
|   |   |   |-- moderation.repository.ts
|   |   |   |-- moderation.request.ts
|   |   |   |-- moderation.response.ts
|   |   |   |-- moderation.service.ts
|   |   |   |-- moderation.state.ts
|   |   |-- notifications/
|   |   |   |-- index.ts
|   |   |   |-- notifications.controller.ts
|   |   |   |-- notifications.module.ts
|   |   |   |-- notifications.repository.ts
|   |   |   |-- notifications.request.ts
|   |   |   |-- notifications.response.ts
|   |   |   |-- notifications.service.ts
|   |   |   |-- notifications.state.ts
|   |   |-- onboarding/
|   |   |   |-- index.ts
|   |   |   |-- onboarding.controller.ts
|   |   |   |-- onboarding.module.ts
|   |   |   |-- onboarding.repository.ts
|   |   |   |-- onboarding.request.ts
|   |   |   |-- onboarding.response.ts
|   |   |   |-- onboarding.service.ts
|   |   |   |-- onboarding.state.ts
|   |   |-- positions/
|   |   |   |-- index.ts
|   |   |   |-- positions.controller.ts
|   |   |   |-- positions.module.ts
|   |   |   |-- positions.request.ts
|   |   |   |-- positions.response.ts
|   |   |   |-- positions.service.ts
|   |   |   |-- positions.state.ts
|   |   |-- posts/
|   |   |   |-- index.ts
|   |   |   |-- posts.controller.ts
|   |   |   |-- posts.module.ts
|   |   |   |-- posts.repository.ts
|   |   |   |-- posts.request.ts
|   |   |   |-- posts.response.ts
|   |   |   |-- posts.service.ts
|   |   |   |-- posts.state.ts
|   |   |-- profiles/
|   |   |   |-- index.ts
|   |   |   |-- profiles.controller.ts
|   |   |   |-- profiles.module.ts
|   |   |   |-- profiles.repository.ts
|   |   |   |-- profiles.request.ts
|   |   |   |-- profiles.response.ts
|   |   |   |-- profiles.service.ts
|   |   |   |-- profiles.state.ts
|   |   |-- reputation/
|   |   |   |-- index.ts
|   |   |   |-- reputation.controller.ts
|   |   |   |-- reputation.module.ts
|   |   |   |-- reputation.repository.ts
|   |   |   |-- reputation.request.ts
|   |   |   |-- reputation.response.ts
|   |   |   |-- reputation.service.ts
|   |   |   |-- reputation.state.ts
|   |   |-- saved-content/
|   |   |   |-- index.ts
|   |   |   |-- saved-content.controller.ts
|   |   |   |-- saved-content.module.ts
|   |   |   |-- saved-content.repository.ts
|   |   |   |-- saved-content.request.ts
|   |   |   |-- saved-content.response.ts
|   |   |   |-- saved-content.service.ts
|   |   |   |-- saved-content.state.ts
|   |   |-- sessions/
|   |   |   |-- index.ts
|   |   |   |-- sessions.controller.ts
|   |   |   |-- sessions.module.ts
|   |   |   |-- sessions.repository.ts
|   |   |   |-- sessions.request.ts
|   |   |   |-- sessions.response.ts
|   |   |   |-- sessions.service.ts
|   |   |   |-- sessions.state.ts
|   |   |-- settings/
|   |   |   |-- index.ts
|   |   |   |-- settings.controller.ts
|   |   |   |-- settings.module.ts
|   |   |   |-- settings.repository.ts
|   |   |   |-- settings.request.ts
|   |   |   |-- settings.response.ts
|   |   |   |-- settings.service.ts
|   |   |   |-- settings.state.ts
|   |   |-- sharing/
|   |   |   |-- index.ts
|   |   |   |-- sharing.controller.ts
|   |   |   |-- sharing.module.ts
|   |   |   |-- sharing.request.ts
|   |   |   |-- sharing.response.ts
|   |   |   |-- sharing.service.ts
|   |   |   |-- sharing.state.ts
|   |   |-- support/
|   |   |   |-- index.ts
|   |   |   |-- support.controller.ts
|   |   |   |-- support.module.ts
|   |   |   |-- support.repository.ts
|   |   |   |-- support.request.ts
|   |   |   |-- support.response.ts
|   |   |   |-- support.service.ts
|   |   |   |-- support.state.ts
|   |   |-- trading/
|   |   |   |-- index.ts
|   |   |   |-- trading.controller.ts
|   |   |   |-- trading.module.ts
|   |   |   |-- trading.repository.ts
|   |   |   |-- trading.request.ts
|   |   |   |-- trading.response.ts
|   |   |   |-- trading.service.ts
|   |   |   |-- trading.state.ts
|   |   |-- transactions/
|   |   |   |-- index.ts
|   |   |   |-- transactions.controller.ts
|   |   |   |-- transactions.module.ts
|   |   |   |-- transactions.repository.ts
|   |   |   |-- transactions.request.ts
|   |   |   |-- transactions.response.ts
|   |   |   |-- transactions.service.ts
|   |   |   |-- transactions.state.ts
|   |   |-- users/
|   |   |   |-- index.ts
|   |   |   |-- users.controller.ts
|   |   |   |-- users.module.ts
|   |   |   |-- users.repository.ts
|   |   |   |-- users.request.ts
|   |   |   |-- users.response.ts
|   |   |   |-- users.service.ts
|   |   |   |-- users.state.ts
|   |   |-- wallets/
|   |   |   |-- index.ts
|   |   |   |-- wallets.controller.ts
|   |   |   |-- wallets.module.ts
|   |   |   |-- wallets.repository.ts
|   |   |   |-- wallets.request.ts
|   |   |   |-- wallets.response.ts
|   |   |   |-- wallets.service.ts
|   |   |   |-- wallets.state.ts
|   |-- types/
|   |   |-- index.ts
|   |-- app.module.ts
|   |-- main.ts
|-- test/
|   |-- scaffold-boundary.test.mjs
|-- .env.example
|-- .gitignore
|-- package-lock.json
|-- package.json
|-- README.md
|-- tsconfig.build.json
|-- tsconfig.json
```
