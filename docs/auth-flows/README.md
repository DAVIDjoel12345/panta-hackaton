# Authentication and first-time experience

Panta Signal now has 114 routes: the original 97 plus 17 authentication, onboarding-wallet, and security routes. Existing desktop and mobile product screens remain in place. Public market browsing stays available without a session. Account-specific routes use a frontend session gate; social actions request sign-in, and blockchain simulations require a connected, verified demo wallet plus a separate approval.

## Design and composition

The official [shadcn Authentication Blocks](https://ui.shadcn.com/blocks/authentication), especially Login-04 and the matching signup composition, informed the balanced form/product-visual layout. The implementation uses the existing React components, CSS, native dialogs, route matcher, and state conventions. No packages or framework migration were introduced. Phones use a single-column form with 16px fields, touch-sized controls, and viewport-aware keyboard behavior.

## Routes and flows

See [route inventory](routes.md) for access and availability, and [state checklist](states.md) for all 117 new deterministic previews.

- **Wallet:** choose fictional wallet → connect account → explain and load challenge → simulate signing → simulate verification → create fictional session → restore destination or start new-account onboarding. Account changes, expiry, rejection, and failure discard the pending challenge. The contract represents nonce, domain, ISO expiry, account, and network binding. The demo clock is fixed; no client comparison is represented as real signature verification.
- **Email signup:** enter safe profile details and email, choose either password or code, review terms, submit explicitly, inspect generic check-email instructions, simulate verification, then complete onboarding. Passwords are cleared after submission; email/name remain only in memory after recoverable errors. No marketing consent is preselected.
- **Login:** wallet is the primary method. Optional password, email-code, and fictional social-provider modules are clearly labelled demos. Email login clears simulated wallet-verification associations; it never establishes wallet ownership. There is no “remember me” promise.
- **Verification:** masked email, mobile autofill/paste code field, resend state and explicitly advanced cooldown, change-email link, success/failure, and expired/used-link recovery. Reloading a verification route loses its demo request and fails closed. Codes are never added to URLs, logs, or storage.
- **Recovery:** generic reset request → check-email instructions → fictional link route → password policy/matching checks → explicit reset result → return to login. Resetting does not create a session.
- **Social:** one configured fictional provider. An explicit redirecting step leads to the demo callback; missing local request state or a refreshed callback is rejected. Cancellation and failure are visible. No external redirect, token exchange, automatic email-based account merge, or live OAuth occurs.
- **Onboarding:** welcome/resume → profile and simulated unique username → optional interests → optional wallet → completion. Name, initials, interests, and progress remain in memory. Returning users with completed local setup are not restarted. Logout clears profile entries while retaining only the fictional completed-setup marker for this demonstration identity.
- **Security:** identity/email, verified wallet associations, password change, session list/revocation, sign out everywhere, and deletion confirmation. Sensitive actions use a separate explicit reauthentication step. The last usable sign-in method cannot be removed without another verified method. Application deletion never implies deletion of on-chain records.

## Feature flags

`src/features/auth/config.js` is the capability source:

| Capability | Setting | Behavior |
| --- | --- | --- |
| Live authentication | `false` | No provider or backend integration |
| Wallet | `demo` | Primary fictional wallet flow |
| Email password | `demo` | Optional, explicitly labelled; minimum 12 characters |
| Email code/link preview | `demo` | Optional; no delivery or provider verification |
| Social | `demo` | Panta Example Provider only |
| Sign out everywhere | `demo` | Clears local sessions/caches only |
| MFA | `false` | Hidden from normal navigation; unavailable route and design previews |
| Account recovery factor | `false` | Unavailable route and design previews |

Optional email screens are selected using a non-sensitive `?demo=code` or `?demo=password` flag. No real providers are advertised as working. Disabling a method in the capability source hides its entry and rejects its form route. A production provider must supply its actual policy and supported methods before enabling live behavior.

## Session and interruption behavior

`AuthProvider` owns in-memory session status, selected account, verified demo associations, pending email/callback requests, onboarding progress, and return destination. Demo product state remains in the existing `DemoProvider`. Typed JSDoc contracts are in `src/types/auth.js`; the explicitly fictional adapter is `src/mocks/authAdapter.js`. All existing `src/services/**` boundaries remain unimplemented.

Wallet ownership proofs and account associations are separate collections. Adding a wallet to an existing session requires explicit association confirmation after verification. Onboarding keeps its original destination separately from the temporary wallet-verification return route.

`safeReturnPath` accepts internal paths only and rejects external/protocol-relative targets, backslashes, malformed escapes, control characters, and auth loops. Protected content is withheld for unresolved/guest/expired/denied sessions. Refreshing and offline states retain previously displayed content. Security changes require restoration of a valid session.

Trade amount/outcome, creation draft/review step, and unsent discussion text can survive sign-in in memory. Return is always to a reviewable screen; no transaction or social action is automatically submitted. Wallet disconnection and application sign-out are separately labelled actions. Logout clears account-specific local caches, conversations, drafts, settings, and simulated transaction records, while leaving the independent wallet connection unchanged.

## Landing and intro

`SplashOverlay` keeps the landing mounted beneath a lightweight CSS overlay: logo reveal, signal line, subtle pulse, tagline, then fade. Duration is 1.3 seconds, with a 1.5-second fail-safe ceiling if animation events fail. “Skip intro” works immediately; pointer or keyboard interaction also dismisses it. It does not trap focus, wait for authentication, or depend on downloaded images. Reduced motion, authenticated users, and deep links skip it.

The sole browser-storage write is the non-sensitive `panta-intro-seen=1` session marker. Authentication values, passwords, codes, tokens, and session identity are never persisted. The hero now uses the requested supporting copy and Join Panta Signal action, with sections for discovery, explanations, criteria, rooms, drafting, explicit wallet approvals, FAQ, and legal/support links. Market visuals are labelled illustrative.

## Live integration work still required

A real implementation must supply server-issued single-use challenges, domain/account/network binding and expiry, cryptographic signature verification, secure session cookies and refresh, backend authorization, email delivery and verification, generic account responses, password policy enforcement and hashing, rate limits, reset tokens, OAuth state/PKCE/token exchange, reauthentication, account association conflicts, session revocation, and account deletion. Optional MFA/recovery requires a supported provider. Frontend gates and local confirmations are not security enforcement.

## Verification

See [verification report](verification.md), [browser results](../auth-browser-results.json), and [screenshots](../screenshots/). Tests run against isolated Chrome tabs. Physical mobile keyboards, Safari, provider interoperability, and assistive-technology audits remain outside this local verification; no live authentication or blockchain action was tested.
