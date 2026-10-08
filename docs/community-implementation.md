# Community frontend

The community workspace extends the existing Panta Signal React app. All interactions below run against centralized in-memory state and reset on reload. Existing market discussions link to the same post records, replies, permissions, and moderation as room feeds. No dependencies were added.

## Routes

| Route | Screen |
| --- | --- |
| `/rooms/joined` | JoinedRoomsPage |
| `/rooms/:roomSlug/posts` | RoomPostsPage |
| `/rooms/:roomSlug/posts/new` | CreatePostPage |
| `/rooms/:roomSlug/posts/:postId` | PostDetailsPage |
| `/rooms/:roomSlug/posts/:postId/edit` | EditPostPage |
| `/rooms/:roomSlug/my-posts` | MyRoomPostsPage |
| `/rooms/:roomSlug/membership` | RoomMembershipPage |
| `/rooms/:roomSlug/manage/settings` | RoomManageSettingsPage |
| `/rooms/:roomSlug/manage/rules` | RoomManageRulesPage |
| `/rooms/:roomSlug/manage/members` | RoomManageMembersPage |
| `/rooms/:roomSlug/manage/requests` | RoomManageRequestsPage |
| `/rooms/:roomSlug/manage/moderators` | RoomManageModeratorsPage |
| `/rooms/:roomSlug/manage/pending-posts` | RoomManagePendingPostsPage |
| `/rooms/:roomSlug/manage/reports` | RoomManageReportsPage |
| `/rooms/:roomSlug/manage/restrictions` | RoomManageRestrictionsPage |
| `/rooms/:roomSlug/manage/bans` | RoomManageBansPage |
| `/rooms/:roomSlug/manage/activity` | RoomManageActivityPage |
| `/rooms/:roomSlug/manage/reports/:reportId` | RoomReportDetailPage |
| `/saved/posts` | SavedCommunityPostsPage |
| `/rooms` | RoomsDirectoryPage |
| `/rooms/:roomSlug` | RoomOverviewPage |
| `/rooms/:roomSlug/markets` | RoomMarketsPage |
| `/rooms/:roomSlug/discussion` | RoomDiscussionPage |
| `/rooms/:roomSlug/members` | RoomMembersPage |
| `/rooms/:roomSlug/about` | RoomAboutRulesPage |
| `/rooms/:roomSlug/discussion/:threadId` | DiscussionThreadPage |
| `/rooms/create` | CreateRoomPage |
| `/rooms/:roomSlug/manage` | ManageRoomPage |

The original discussion and thread URLs remain supported. Canonical shared links use /rooms/:roomSlug/posts/:postId. Saved posts also appear under the existing /saved view. Room management requires its community role; the older global moderati`on preview remains a separate platform-admin preview.

## Role and permission matrix

| Capability | Visitor | Active member | Moderator | Owner |
| --- | --- | --- | --- | --- |
| Read public posts | Yes | Yes | Yes | Yes |
| Read private posts | No | Approved membership | Approved membership | Yes |
| Join / request / cancel | Sign in first | Yes | Yes | Transfer ownership before leaving |
| Publish / comment | No | Subject to policy and restrictions | Subject to membership and archive | Subject to archive |
| Edit body | No | Own post only | Own post only | Own post only |
| Like / save / share | Sign in and join | Yes | Yes | Yes |
| Delete own post/comment | No | Yes | Yes | Yes |
| Pin / announce / lock / review / remove / restore | No | No | Yes | Yes |
| Restrict / mute / ban | No | No | Regular members only | Other non-owner members |
| Settings / archive / moderators / transfer ownership | No | No | No | Yes |

Status overrides: pending/not-joined/rejected/revoked cannot participate; posting-restricted members may comment but cannot publish; muted members cannot post or comment until expiry; banned members cannot participate or rejoin, but retain public reading. Private access is lost immediately on leave, revoke, or ban. Muted/restricted active members can still like, save, and share. Archived rooms are read-only. Owners are protected from restriction actions.

## Flows

- Directory: search, category, sorting, load more, joined rooms, join/request/cancel/leave. Private member lists and posts are gated. No private post fixture ships to visitor views.
- Create/settings: unique stable slug, description, category, color/initial branding, rules, privacy, approval, post policy and comment policy. Form validation, dirty-navigation protection, and explicit local save success/failure preserve input.
- Composer: plain text, optional title/link, category, market reference, preview, session draft, edit own post, approval queue, publication failure/retry. Links allow only HTTP(S). No raw HTML rendering.
- Images: up to four JPEG/PNG/WebP files, 5 MB each; local preparation/failure/retry/remove. FileReader retains prepared data in memory. Object URLs are revoked when removed or the composer unmounts; pending readers abort. This does not upload a file.
- Feed: pinned content, latest/popular/announcement sorting, search/category, load more, market links, edited timestamps, own-post views and feed scroll restoration.
- Likes: unique actor membership, optimistic update, pending duplicate protection, explicit failure rollback. Losing permission cancels a pending reaction. No fabricated share totals.
- Comments: root comments and bounded replies, edit own, author delete vs moderator removal, reason/confirmation, tombstones, visible counts and incremental loading. Failed submission retains unsent text.
- Sharing: canonical post/community links, clipboard and selectable manual fallback, native-share cancellation as a neutral outcome. Private links explicitly do not grant access.
- Management: overview, policies, members, requests, moderator assignment, transfer, pending/rejected/removed posts, reports/detail, restrictions, bans and audit. Filters and pagination; desktop tables become mobile member cards.
- Reports: category/context, contextual content and rules, notes, dismiss/resolve, confirmed removal, author restriction. Reporter identity is not exposed publicly.
- Membership enforcement: reasoned confirmed restriction/mute/ban/lift/revoke/unban, explicit mute expiry, protected owner/moderator targets and history. Existing contributions are retained. Unbanning requires a new join/request.
- Notifications: recipient-scoped community updates join the existing notifications screen; per-event deduplication and read state are local. No push or external message is sent.

## States

48 community previews extend 285 existing previews to 333. Each preview supplies context and a recovery/navigation action. The state gallery is development-only. Scenario previews do not fabricate requests; real local flows have their own result controls.

- [x] Loading community ? `communityUX.loadingCommunity`
- [x] Loading feed ? `communityUX.loadingFeed`
- [x] Empty community directory ? `communityUX.emptyCommunityDirectory`
- [x] No search results ? `communityUX.noSearchResults`
- [x] No posts ? `communityUX.noPosts`
- [x] No comments ? `communityUX.noComments`
- [x] No members ? `communityUX.noMembers`
- [x] No pending requests ? `communityUX.noPendingRequests`
- [x] No reports ? `communityUX.noReports`
- [x] No banned members ? `communityUX.noBannedMembers`
- [x] Community not found ? `communityUX.communityNotFound`
- [x] Community archived ? `communityUX.communityArchived`
- [x] Private community ? `communityUX.privateCommunity`
- [x] Membership required ? `communityUX.membershipRequired`
- [x] Join pending ? `communityUX.joinPending`
- [x] Login required ? `communityUX.loginRequired`
- [x] Posting disabled ? `communityUX.postingDisabled`
- [x] Approval required ? `communityUX.approvalRequired`
- [x] Temporarily muted ? `communityUX.temporarilyMuted`
- [x] Posting restricted ? `communityUX.postingRestricted`
- [x] Banned ? `communityUX.banned`
- [x] Post pending approval ? `communityUX.postPendingApproval`
- [x] Post rejected ? `communityUX.postRejected`
- [x] Post removed ? `communityUX.postRemoved`
- [x] Post deleted ? `communityUX.postDeleted`
- [x] Comments locked ? `communityUX.commentsLocked`
- [x] Attachment upload failed ? `communityUX.attachmentUploadFailed`
- [x] Offline ? `communityUX.offline`
- [x] Stale feed ? `communityUX.staleFeed`
- [x] Rate limited ? `communityUX.rateLimited`
- [x] Recoverable request error ? `communityUX.recoverableRequestError`
- [x] Access denied ? `communityUX.accessDenied`
- [x] Action success ? `communityUX.actionSuccess`
- [x] Membership rejected ? `communityUX.membershipRejected`
- [x] Invite invalid or expired ? `communityUX.inviteInvalidOrExpired`
- [x] Membership revoked ? `communityUX.membershipRevoked`
- [x] Like pending ? `communityUX.likePending`
- [x] Like failed ? `communityUX.likeFailed`
- [x] Comment posting ? `communityUX.commentPosting`
- [x] Comment validation error ? `communityUX.commentValidationError`
- [x] Comment submission failed ? `communityUX.commentSubmissionFailed`
- [x] Comment editing ? `communityUX.commentEditing`
- [x] Comment deleted ? `communityUX.commentDeleted`
- [x] Comment removed ? `communityUX.commentRemoved`
- [x] Restriction expired ? `communityUX.restrictionExpired`
- [x] Restriction action failed ? `communityUX.restrictionActionFailed`
- [x] Share copy failed ? `communityUX.shareCopyFailed`
- [x] Share cancelled ? `communityUX.shareCancelled`

## Files and fixtures

- src/mocks/community.js: seven actor fixtures, memberships, public posts and a private room with no preloaded private posts.
- src/features/community/permissions.js and model.js: centralized selectors and guarded state transitions.
- src/features/community/CommunityProvider.jsx and useCommunity.js: account-reset-scoped state, pending requests, view preferences and scroll memory.
- src/features/community/CommunityWorkspace.jsx and CommunityManagement.jsx: directory, feed, post destinations and management screens.
- src/components/community, posts, comments, moderation: header, membership, forms, cards, composer, comments and confirmation dialogs.
- src/app/communityRoutes.js and src/pages/community: 19 additional route entries, including saved posts; original room routes are preserved.
- src/styles/community.css: original responsive UI extending existing tokens and primitives.
- src/types/community.js: documented JSDoc models and future service contracts; src/services remains empty.
- Existing Providers, DemoContext, SavedView, NotificationsView, Discussion, StateGallery and index.css integrate the module.
- scripts/verify-community.mjs and community-browser-check.mjs: permission and browser regressions. docs/community-browser-checks.json records the browser results.

## Backend requirements

Replace the in-memory adapter with authenticated, authorized services for communities, membership, settings, posts, comments, attachments, reactions, saves, reports, moderation, audit and notifications. The server must enforce every role/status and private-content read, ownership transfer atomically, idempotent reaction/request writes, canonical identity, authoritative mute timestamps, cursor pagination, conflict/version handling, rate limits and abuse controls. Uploads require MIME/content validation, malware scanning, ownership, storage quotas and approved delivery URLs. Real-time subscriptions need authorization on initial read, every event, membership revocation and reconnect. Session expiry/account changes must clear cached private content. Reporter identity and audit access require server privacy enforcement.

Current labels deliberately say local/demo: there are no live APIs, persistent database writes, realtime subscriptions, production auth proofs, uploads, push delivery or appeal/invitation services. Invite-invalid and offline/rate-limit states are design previews. Frontend selectors are not a security boundary.

## Design and verification

Original components take layout inspiration from [Tailwind Plus Application UI](https://tailwindcss.com/plus/ui-blocks/application-ui): feeds, stacked lists, multi-column pages, form groups, and tables. No licensed source was copied. Existing Panta colors, shared native dialogs, focus styles, reduced motion, and mobile navigation are retained.

Verification results are recorded in docs/community-validation.md. The project is JavaScript/JSDoc and has no TypeScript compiler or configured type-check command.
