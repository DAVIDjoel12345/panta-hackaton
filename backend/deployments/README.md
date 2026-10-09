# Verified Panta transaction policy

This directory is reserved for a Panta-authorized deployment policy and its matching program IDL. Do not invent a program ID, IDL, mint, or instruction mapping from a market API response. The market detail endpoint currently exposes a program ID, but it does not supply the complete policy required to verify a funded transaction.

Before enabling live buy, creation, claims, or creator fees:

1. Obtain Panta's official deployment details and matching IDL for the intended Solana cluster: genesis hash, program ID, USDC mint, share decimals, instruction names, account mapping, and argument mapping for each action.
2. Review and commit only the public policy and IDL files in this directory. Set `PANTA_DEPLOYMENT_FILE` to the policy path inside the Railway image, for example `/app/backend/deployments/panta-mainnet.json`.
3. Set `SOLANA_RPC_URL` to an HTTPS RPC endpoint for that cluster. The backend checks the genesis hash and validates every transaction instruction before asking the wallet to sign.
4. Use a fresh, minimally funded wallet and a small user-approved test amount. Verify Panta reporting and on-chain confirmation before using larger amounts.

The backend reports `ready: false` at `/api/v1/panta/config` until the policy and RPC are configured. A Panta API key alone enables live market reads and quotes, not wallet approval.
