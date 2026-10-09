export function allowedOrigins(env = process.env) {
  const origins = (env.FRONTEND_ORIGINS || (env.VERCEL === '1' ? '' : 'http://127.0.0.1:5174,http://localhost:5173,http://127.0.0.1:5173')).split(',').map(value => value.trim()).filter(Boolean);
  for (const domain of [env.VERCEL_URL, env.VERCEL_PROJECT_PRODUCTION_URL]) {
    if (domain) origins.push(`https://${domain}`);
  }
  return [...new Set(origins)];
}
