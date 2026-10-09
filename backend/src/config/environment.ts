/** Deployment settings; runtime validation lives beside each provider. */
export interface EnvironmentContract {
  PORT: string;
  NODE_ENV: string;
  FRONTEND_ORIGINS: string;
  DATABASE_URL?: string;
  TURSO_DATABASE_URL?: string;
  TURSO_AUTH_TOKEN?: string;
  APP_PUBLIC_URL?: string;
  VERCEL?: string;
  VERCEL_ENV?: string;
  VERCEL_URL?: string;
  VERCEL_PROJECT_PRODUCTION_URL?: string;
  SESSION_SECRET?: string;
  SESSION_TTL_SECONDS?: string;
  SESSION_COOKIE_NAME?: string;
  PANTA_CREDENTIALS?: string;
  SOLANA_NETWORK?: string;
  SOLANA_RPC_URL?: string;
  AI_PROVIDER?: string;
  AI_API_KEY?: string;
  AI_MODEL?: string;
}
