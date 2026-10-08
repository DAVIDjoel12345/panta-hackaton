# Panta Signal

React/Vite frontend with a Nest backend, persisted Signal accounts and communities, live Panta market reads, external Gemini conversations, Wallet Standard connection, and a guarded Solana transaction-intent flow.

Install dependencies in the root and `backend`, set `PANTA_API_KEY` and `GEMINI_API_KEY` in ignored `backend/.env` using [the example](backend/.env.example), then run:

```powershell
npm run build --prefix backend
npm run dev:full
```

Open `http://127.0.0.1:5173`. The backend workers use ports 3001/3002 and the read gateway uses 3000. The original landing splash, discovery and market overview remain in the frontend. Live market details, activity, linked community posts and AI context refresh or stream as described in [the integration guide](docs/panta-integration.md).

Wallet signing for funded buy, create, claim and creator-fee operations is gated until an official Panta deployment/IDL policy and matching Solana RPC are supplied. The Panta API key alone does not authorize a guessed on-chain program. See the [capability matrix](docs/panta-capability-matrix.md) for implemented endpoints and exact validation status.

Checks: `npm test --prefix backend`, `npm run build`, `npm run lint`, `node scripts/verify-frontend.mjs`. Browser checks require the running stack and Chrome remote debugging on port 9223: `node scripts/panta-ui-check.mjs` and `node scripts/panta-ai-browser-check.mjs`.

The older implementation notes in `docs/` describe earlier demo stages and can be stale; use the integration guide and capability matrix for current live-service boundaries.
