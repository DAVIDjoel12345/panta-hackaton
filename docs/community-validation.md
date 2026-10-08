# Community validation ? 2026-10-06

| Check | Result |
| --- | --- |
| npm run build | Passed; Vite production build, 253 modules |
| npm run lint | Passed |
| node scripts/verify-frontend.mjs | Passed; 133 unique routes, 468 JSX files, 166 original state renders, fixture consistency, empty service boundaries, 10 contrast pairs |
| node scripts/verify-auth.mjs | Passed; redirect validation, 117 auth states, capability/storage boundaries |
| node scripts/verify-community.mjs | Passed; 54 role, membership, private access, approval, ownership, reaction and comment assertions |
| node scripts/frontend-browser-check.mjs | Passed; 207 route and existing-product interaction checks |
| node scripts/auth-browser-check.mjs | Passed; 159 authentication checks |
| node scripts/community-browser-check.mjs | Passed; 91 community interaction and responsive checks |
| node scripts/mobile-browser-check.mjs | Passed; 236 mobile checks, including all 133 routes at 320px |
| node scripts/production-check.mjs | Passed; public/private community deep links, auth gates, development gallery and actor-control exclusion |
| TypeScript type-check | Not configured; JavaScript/JSDoc project. JSX compile and runtime checks passed. |

Community browser coverage includes browser Back/feed-position restoration, likes/pending/failure rollback, saves, comments/replies/edit/delete, preserved failed submissions, canonical share fallback and native cancellation, report confirmation/removal/restore, recipient notification deduplication and read toggles, private membership approval, local post publication and draft recovery, invalid/oversized image rejection, retry and object URL cleanup, community creation/settings, and permission-denied composer routes. Community screens fit 320, 360, 390, 430, 768 and 1280px. The broader mobile suite also covers landscape, keyboard resize, dialog Back/Escape, focus, reduced motion and long text. No runtime exceptions were recorded in the passing suites.

The initial concurrent mobile run lost focus during its keyboard check; running browser suites sequentially passed all 236 checks. Community testing found and fixed dialog remount closure, duplicated image-preview allocation under React development checks, pending-like rollback after permission revocation, and community notification read routing.

Visual review: [390px community](screenshots/community-390.png), [1280px community](screenshots/community-1280.png). Machine-readable results: [community](community-browser-checks.json), [product](browser-check-results.json), [mobile](mobile-browser-results.json). Broader auth checks retain their existing report.

These checks validate the local frontend, not real backend authorization, realtime data, upload storage, wallet ownership, provider authentication, notification delivery, or assistive-technology certification. Native sharing was exercised with a deterministic cancellation capability mock; actual device share targets and real provider failures require integration/device testing.
