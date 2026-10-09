export function mobileWalletLinks(location) {
  if (!location || !/^https?:$/.test(location.protocol)) return []
  const page = encodeURIComponent(location.origin + location.pathname)
  const ref = encodeURIComponent(location.origin)
  return [
    { name: 'Phantom', href: `https://phantom.app/ul/browse/${page}?ref=${ref}` },
    { name: 'Solflare', href: `https://solflare.com/ul/v1/browse/${page}?ref=${ref}` },
  ]
}

export function isMobileBrowser(userAgent) {
  return /Android|iPhone|iPad|iPod/i.test(userAgent || '')
}
