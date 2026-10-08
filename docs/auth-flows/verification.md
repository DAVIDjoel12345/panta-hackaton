# Authentication verification

**159 authentication browser checks pass**, with no runtime exceptions. This includes preserving the original destination through optional wallet verification during onboarding.

- Production build and lint pass with no warnings. No dependency changes or framework migration.
- Scaffold/compiler checks pass: **114 routes, 435 JSX files, 166 original unique state renders**, consistent fixtures, empty live-service boundaries, and **10 text contrast pairs**. The requested white-on-purple primary button is 4.63:1; secondary text is 8.22:1 on the surface background.
- Authentication checks verify safe internal redirects, rejection of external/control-character targets, capability flags, 117 unique new state definitions, fictional account-bound challenges, and absence of persistent authentication writes.
- The browser authentication suite covers wallet expiry and account changes, protected destination restoration, separate wallet disconnection/logout, last-method protection, explicit wallet-association consent, safe error recovery, password reset/matching, invalid/refreshed callbacks, cancelled social login, resend cooldown, code failure, onboarding username conflicts, returning setup, email/wallet separation, retained trade amount/outcome without automatic submission, session checking/offline content, and all 285 gallery previews.
- Authentication layouts pass at **320, 360, 390, 430, and 1280px** with no page overflow. A focused form at a resized keyboard viewport is checked. Screenshots include desktop method selection/signup and mobile login.
- Intro checks cover content mounted underneath, immediate Skip, once-per-session behavior, reduced motion, and a disabled-animation fallback. Browser Back returns code entry to masked instructions without putting a code in the URL. Direct verification refresh fails closed.
- The existing product regression suite passes **188 checks**. The mobile suite passes **217 checks**, including all 114 routes at 320px, representative tablet/desktop/landscape layouts, focus behavior, safe areas, and retained inputs.
- Production hard-navigation checks pass for markets, guarded settings, login, and invalid callback recovery. The development gallery remains excluded from production routing.

Current exact authentication count and case names are in [auth-browser-results.json](../auth-browser-results.json). Product and mobile results are in [browser-check-results.json](../browser-check-results.json) and [mobile-browser-results.json](../mobile-browser-results.json).

## Reproduce

Start Vite and an isolated Chrome remote-debugging session, then run:

```text
npm run lint
npm run build
node scripts/verify-scaffold.mjs
node scripts/verify-auth.mjs
node scripts/auth-browser-check.mjs
node scripts/frontend-browser-check.mjs
node scripts/mobile-browser-check.mjs
node scripts/production-check.mjs
```

Browser suites accept `CHROME_URL` and `APP_URL` (defaults `http://127.0.0.1:9223` and `http://127.0.0.1:5174`). Production checks use the preview on port 4173. Run browser suites against separate tabs; each creates its own tab. Compiler and local browser execution required approved execution outside the Windows sandbox. There is no TypeScript/type-check command; contracts use JSDoc and all JSX is compiled.

## Limits

Chrome viewport/keyboard resizing and simulated safe areas are not physical iOS/Android testing. Real provider email, OAuth, signatures, session cookies, MFA, blockchain approvals, and backend authorization are intentionally absent. Screen-reader and cross-browser audits remain future verification. The CSS logo has no downloadable asset dependency; animation-event failure is covered by the fail-safe check.
