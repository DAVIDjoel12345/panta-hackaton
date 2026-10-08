// Explicit simulation, never verifies a signature, password, code or OAuth token.
export const demoAuthAdapter = {
  challenge(account) { return { nonce: 'FICTIONAL-NONCE-NOT-A-CREDENTIAL', domain: 'panta.demo.invalid', expiresAt: '2026-10-05T16:05:00Z', account, network: 'Solana demo network', clock: 'Fixed fixture at 16:00 UTC; use Expire challenge to advance' } },
  session(method) { return { id: 'fictional-session-current', method, fictional: true } },
}
