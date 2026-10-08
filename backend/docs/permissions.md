# Intended permissions ? not an implemented policy engine

| Action | Visitor | Active member | Scoped moderator | Owner |
| --- | --- | --- | --- | --- |
| Read public content | Yes | Yes | Yes | Yes |
| Read private content | No | Current approved membership | Current approved membership | Current ownership/membership |
| Join/request/cancel | Authenticate first | Own request | Own request | Must transfer before leaving |
| Post/comment/reply/like/save | No | Subject to state and policy | Subject to state and policy | Subject to archive/policy |
| Edit or delete author content | No | Own content only | Own content only | Own content only |
| Approve/reject/remove/restore/pin/lock | No | No | Explicit community scope | Yes |
| Restrict/mute/ban/lift | No | No | Explicit scope; owner and peer moderators protected | Other members; owner protected |
| Assign/remove moderators or transfer owner | No | No | No | Yes; atomic transfer and verified consent |
| General settings/rules/archive | No | No | No | Yes |
| Reports and audit | No | Own status if later exposed | Scoped private review | Scoped private review |

Roles: owner, moderator, member. Anonymous visitor is not a persisted role. Membership statuses: not-joined, pending, active, muted, posting-restricted, banned, left, rejected, revoked. The frontend currently uses restricted for posting-restricted and not-joined after leave; map these explicitly when replacing its in-memory adapter.

A posting restriction blocks new posts while allowing comments if enabled. A temporary mute blocks posts and comments until authoritative expiry. Active muted/restricted members may retain read/like/save/share permission according to community policy. A ban blocks participation and rejoining but does not automatically remove historical posts. Public content may remain publicly readable; private reads require current valid membership. A community ban is not a global application ban. Archived rooms are read-only. Pending/rejected posts are visible only to their author and authorized reviewers.

An owner cannot leave before an atomic ownership transfer. A moderator cannot restrict the owner or assign moderators. Recheck scope, target role, membership version, reason and expiry at commit time; hiding React controls is insufficient. Restrictions store community, target, action, duration/expiry, reason, verified acting user and server timestamp. Actor/time are not caller-authoritative fields. Expiry is future worker/read-time reconciliation work, not an active timer.

Public profile fields: user ID, username, display name, biography and approved avatar reference, subject to profile visibility. Private fields: email/verification status, wallet associations, interests/onboarding, preferences, session details, exports/deletion requests, saved items and AI conversations. Never infer wallet ownership from email/social identity. Linking a wallet requires an ownership proof bound to association purpose plus explicit consent.

ReportResponse deliberately has no reporterId. The internal ModerationReportRecord contains it and must never be serialized as a public object. Review notes/restriction reasons/audit are role-scoped; member-facing notices may expose only their own relevant decision. Private content in bookmarks, notifications, AI context, search, media URLs and live events requires the same current access check.

AuthenticationGuard and AuthorizationGuard deny every invocation; ScaffoldGuard rejects all mounted HTTP operations. None of the intended matrix is implemented yet.

