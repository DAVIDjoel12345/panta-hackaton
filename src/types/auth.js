/**
 * Provider contracts only. A server must enforce all security decisions.
 * @typedef {'checking'|'guest'|'authenticated'|'expired'|'refreshing'|'offline'|'denied'} SessionStatus
 * @typedef {{nonce:string,domain:string,expiresAt:string,account:string,network:string}} OwnershipChallenge
 * @typedef {{id:string,method:'wallet'|'password'|'code'|'social',fictional:true}} DemoSession
 * @typedef {Object} AuthAdapter
 * @property {(account:string)=>Promise<OwnershipChallenge>} requestChallenge
 * @property {(challenge:OwnershipChallenge,signature:string)=>Promise<void>} verifyOwnership Server verification, not a client comparison.
 * @property {()=>Promise<DemoSession|null>} getSession Production sessions use secure server cookies, never browser-stored tokens.
 * @property {()=>Promise<void>} signOut
 * @property {(email:string)=>Promise<void>} requestEmailVerification Generic response required.
 * @property {(code:string)=>Promise<void>} verifyEmailCode Provider enforces expiry, attempts and resend limits.
 * @property {(provider:string)=>Promise<void>} beginOAuth Server owns state, PKCE and token exchange.
 * @property {(email:string,password:string)=>Promise<void>} passwordLogin Credentials stay in request memory; the server checks them.
 * @property {(name:string,email:string,password?:string)=>Promise<void>} register Generic response; password only for enabled password flow.
 * @property {(email:string)=>Promise<void>} requestPasswordReset Always return a generic result.
 * @property {(token:string,password:string)=>Promise<void>} resetPassword Provider validates a single-use token; does not imply login.
 * @property {()=>Promise<void>} reauthenticate Provider must require fresh proof for sensitive changes.
 * @property {(account:string)=>Promise<void>} associateWallet Requires verified ownership and explicit account-link consent.
 * @property {(account:string)=>Promise<void>} removeWallet Enforce a remaining usable authentication method.
 * @property {(id:string)=>Promise<void>} revokeSession Server revocation, not client cache removal.
 * @property {()=>Promise<void>} deleteAccount Does not delete blockchain records.
 */
export {}
