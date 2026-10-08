# Authentication route inventory

Access describes frontend UX, not backend authorization. Optional MFA/recovery routes render an unavailable state.

| Route | Access | Availability | Priority |
| --- | --- | --- | --- |
| `/auth` | public | demo | P0 |
| `/auth/login` | public | demo | P0 |
| `/auth/signup` | public | demo | P0 |
| `/auth/wallet` | public | demo | P0 |
| `/auth/check-email` | public | demo | P0 |
| `/auth/verify-email` | public | demo | P0 |
| `/auth/verify-code` | public | demo | P0 |
| `/auth/forgot-password` | public | demo | P0 |
| `/auth/reset-password` | public | demo | P0 |
| `/auth/callback` | public | demo | P0 |
| `/auth/error` | public | demo | P0 |
| `/auth/session-expired` | public | demo | P0 |
| `/auth/mfa` | public | unavailable | future |
| `/auth/recovery` | public | unavailable | future |
| `/onboarding/wallet` | authenticated | demo | P0 |
| `/settings/account` | authenticated | demo | P0 |
| `/settings/security/mfa` | authenticated | unavailable | future |
| `/onboarding` | authenticated | demo | P0 |
| `/onboarding/profile` | authenticated | demo | P0 |
| `/onboarding/interests` | authenticated | demo | P0 |
| `/onboarding/complete` | authenticated | demo | P0 |
| `/settings/wallet` | authenticated | demo | future |
| `/settings/security` | authenticated | demo | future |
| `/settings/delete-account` | authenticated | demo | future |
