/** Contract for later configuration validation. Only PORT is read by main.ts. */
export interface EnvironmentContract {
  PORT: string;
  NODE_ENV: string;
  FRONTEND_ORIGINS: string;
  DATABASE_URL?: string;
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

