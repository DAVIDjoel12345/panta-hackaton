# Proposed application data model

No entities are mapped to a database and no schema/migration has been created. PostgreSQL is proposed. Repository records are application concepts, not a second blockchain ledger.

| Entity/model | Future constraints and authority |
| --- | --- |
| User, public profile | Stable IDs; normalized unique usernames; separate private email/verification fields; visibility enforcement. |
| Auth challenge / identity proof | Unique unpredictable nonce; wallet/domain/purpose/expiry binding; atomic single consumption; retention minimization. |
| Session | Private verifier storage; user association; expiry/revocation/rotation; do not expose secrets in SessionResponse. |
| Wallet association | Verified ownership and explicit linking consent; address/account association uniqueness policy must be agreed. |
| Onboarding/preferences | One current record per user; validated interests/steps; version conflicts. |
| Market metadata | Unique provider+market reference; application category/community attribution only; no independent price or settlement authority. |
| Market draft | Owner, reviewed application fields, revision, proposal-vs-reviewed status; map provider requirements later. |
| Trade/creation/claim/fee intent | Unique actor+operation+idempotency key, request hash, immutable wallet/network binding and provider references. |
| Transaction observation | Bound intent+network+signature; timestamps/evidence; never independent confirmation authority. |
| Position/eligibility | Provider/chain read models; no independent application balance or payout records. |
| Analysis/cache | Input/context version, source timestamps, missing data, schema/provider version, access-aware cache scope. |
| AI conversation/message | Owner and conversation FK, ordered messages, retained sources; all reads authorized. |
| Community | Unique normalized slug; one owner relation; policy version; archive status. |
| Membership/request | Unique community+user current membership; role separate from status; prevent competing active rows; owner transfer in one transaction. |
| Post/draft/attachment | Community/author relations; optimistic version; approval visibility; authorized attachment ownership and validation lifecycle. |
| Comment/reply | Post/author/parent relations; bounded depth and same-post parent; tombstones preserve replies; exclude removed/deleted from visible counts. |
| Like | Unique user+target-type+target-ID; desired-state idempotent updates; validate target/community access atomically. |
| Save/follow | Unique user+target bookmark or follower+followed relationship; prevent unauthorized private preview and self-follow if policy requires. |
| Forecast | Immutable forecast timestamp and market reference; methodology version; no invented performance result. |
| Report/restriction/audit | Reporter identity private; scoped actor/target/reason/time; immutable audit, explicit expiry; bans do not cascade-delete posts. |
| Notification/preferences | Unique recipient+event+channel; read state private; supported-channel consent and access-safe links. |
| Support ticket | Owner, status, retention and staff scope; no automatic external delivery. |
| Account export/deletion request | Self + reauthentication; idempotent lifecycle, ownership obligations, private expiring export access and retention review. |

Repository interfaces deliberately have no implementations or DI tokens bound to a database. Feature-specific atomic methods must be implemented with the constraints above before enabling controllers. All serialized responses should be explicit projections rather than raw internal records.

