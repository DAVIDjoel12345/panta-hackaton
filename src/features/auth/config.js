// Optional methods are available ONLY inside visibly selected demo scenarios.
export const authCapabilities = Object.freeze({ live: false, wallet: 'demo', emailPassword: 'demo', emailCode: 'demo', social: 'demo', providers: ['Panta Example Provider'], mfa: false, recovery: false, signOutEverywhere: 'demo' })
export const passwordPolicy = { minLength: 12, description: 'Demo policy: at least 12 characters. Use a fictional password; this is not sent or saved.' }
/* Control characters must be rejected in redirect targets. */
/* eslint-disable no-control-regex */
export function safeReturnPath(value, fallback = '/markets') {
  if (typeof value !== 'string' || !value.startsWith('/') || value.startsWith('//') || /[\\\u0000-\u0020]/.test(value)) return fallback
  try {
    const decoded = decodeURIComponent(value)
    if (decoded.startsWith('//') || /[\\\u0000-\u0020]/.test(decoded)) return fallback
    const url = new URL(value, 'https://panta.invalid')
    if (url.origin !== 'https://panta.invalid' || /^\/auth(?:\/|$)/.test(url.pathname)) return fallback
    return url.pathname + url.search + url.hash
  } catch { return fallback }
}
export const maskEmail = email => { const [name,domain] = email.split('@'); return domain ? `${name.slice(0,1)}•••@${domain}` : 'your demo address' }
