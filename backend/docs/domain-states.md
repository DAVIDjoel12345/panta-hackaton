# Domain states and transport errors

Unions are vocabulary, not implemented transitions.

## health

`unavailable`.

## auth

`challenge-issued`, `verification-pending`, `verified`, `expired`, `consumed`, `rejected`.

## sessions

`active`, `expired`, `revoked`.

## users

`active`, `deletion-requested`, `disabled`.

## profiles

`incomplete`, `published`.

## onboarding

`not-started`, `in-progress`, `complete`.

## wallets

`unverified`, `verified`, `revoked`.

## markets

`unavailable`, `open`, `closed`, `resolved`, `cancelled`.

## market-data

`unavailable`, `available`, `stale`.

## market-drafts

`draft`, `review-required`, `validated`, `deleted`.

## market-creation

`draft`, `quote-requested`, `quote-ready`, `quote-expired`, `awaiting-approval`, `submitted`, `pending`, `confirmed`, `failed`, `expired`, `confirmation-unknown`.

## trading

`draft`, `quote-requested`, `quote-ready`, `quote-expired`, `awaiting-approval`, `submitted`, `pending`, `confirmed`, `failed`, `expired`, `confirmation-unknown`.

## transactions

`draft`, `quote-requested`, `quote-ready`, `quote-expired`, `awaiting-approval`, `submitted`, `pending`, `confirmed`, `failed`, `expired`, `confirmation-unknown`.

## positions

`unavailable`, `open`, `resolved`.

## claims

`draft`, `quote-requested`, `quote-ready`, `quote-expired`, `awaiting-approval`, `submitted`, `pending`, `confirmed`, `failed`, `expired`, `confirmation-unknown`.

## ai-analysis

`requested`, `pending`, `available`, `failed`, `stale`.

## ai-conversations

`active`, `archived`, `deleted`.

## communities

`active`, `archived`.

## memberships

`not-joined`, `pending`, `active`, `muted`, `posting-restricted`, `banned`, `left`, `rejected`, `revoked`.

## posts

`draft`, `pending-approval`, `published`, `rejected`, `removed`, `deleted`.

## comments

`published`, `edited`, `removed`, `deleted`.

## likes

`liked`, `not-liked`.

## saved-content

`saved`, `removed`, `unavailable`.

## sharing

`available`, `unavailable`.

## follows

`following`, `not-following`.

## reputation

`unavailable`, `methodology-pending`, `available`.

## leaderboards

`unavailable`, `pending`, `available`.

## creators

`unavailable`, `available`.

## creator-fees

`draft`, `quote-requested`, `quote-ready`, `quote-expired`, `awaiting-approval`, `submitted`, `pending`, `confirmed`, `failed`, `expired`, `confirmation-unknown`.

## moderation

`open`, `under-review`, `resolved`, `dismissed`.

## notifications

`unread`, `read`, `delivery-pending`, `delivered`, `delivery-failed`.

## settings

`default`, `customized`.

## support

`open`, `in-review`, `closed`.

## account-lifecycle

`requested`, `review-required`, `pending`, `complete`, `failed`, `cancelled`.

Claim eligibility is separate: unknown, eligible, ineligible, already-claimed. Quote states and chain-observation states are distinct; submitted is never synonymous with confirmed. Community roles are owner/moderator/member; visitor means no authenticated membership, not a stored role.

## Proposed error mapping

| Code | HTTP |
| --- | --- |
| AUTH_REQUIRED | 401 |
| SESSION_EXPIRED | 401 |
| ACCESS_DENIED | 403 |
| VALIDATION_FAILED | 400 |
| NOT_FOUND | 404 |
| RATE_LIMITED | 429 |
| UPSTREAM_UNAVAILABLE | 503 |
| STALE_DATA | 409 |
| MEMBERSHIP_REQUIRED | 403 |
| MEMBERSHIP_PENDING | 403 |
| MEMBER_MUTED | 403 |
| POSTING_RESTRICTED | 403 |
| MEMBER_BANNED | 403 |
| POST_PENDING_APPROVAL | 409 |
| COMMENTS_LOCKED | 409 |
| QUOTE_EXPIRED | 409 |
| MARKET_CLOSED | 409 |
| CLAIM_NOT_ELIGIBLE | 409 |
| TRANSACTION_PENDING | 409 |
| NOT_IMPLEMENTED | 501 |
| CONFLICT | 409 |

The common error envelope defines code/message, optional request ID, field validation issues and retry-after seconds. No automatic mapper/request-ID middleware is installed. STALE_DATA is 409 when freshness prevents an action; a readable snapshot may instead return 200 with explicit freshness metadata. TRANSACTION_PENDING is 409 for an invalid conflicting action, while a successful status read may return 200 with pending state, and future asynchronous acceptance may use 202. Errors must not all become HTTP 200. Unknown paths use Nest's default 404 shape today.

