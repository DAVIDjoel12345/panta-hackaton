# Railway deployment

Create one Railway service from this repository, with its root directory set to `/`. The root `railway.json` builds the Vite frontend and Nest backend, starts Nest on Railway's `PORT`, and checks `/api/v1/runtime/health`. Nest serves the frontend and the API on the same public domain. Do not set a Vite-only start command in Railway's service settings.

Set these service variables in Railway (never commit their values):

- `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` for durable accounts, conversations, and market observations. Without these, the local SQLite database is lost on redeploy.
- `PANTA_API_KEY` for live Panta markets. Set `PANTA_API_BASE_URL` only if your Panta account uses a different supported endpoint.
- `GEMINI_API_KEY` or `OPENROUTER_API_KEY` for AI.
- `APP_PUBLIC_URL=https://<your-public-domain>` for the AI provider's site identity. If you use a custom domain, add its full origin to `FRONTEND_ORIGINS`; Railway's generated `RAILWAY_PUBLIC_DOMAIN` is accepted automatically.

Railway injects `PORT`, `RAILWAY_ENVIRONMENT`, and `RAILWAY_PUBLIC_DOMAIN`. Do not set `PORT` to a fixed value or put API keys in `VITE_` variables.

After deployment, `/api/v1/runtime/health` must return JSON with `status: "ok"`; `/api/v1/markets?status=active` must return JSON rather than `index.html`. If the health check fails, inspect the Railway deployment logs for missing database configuration or build errors. A healthy API without live markets usually means `PANTA_API_KEY` is absent or rejected.
