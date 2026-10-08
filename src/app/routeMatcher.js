/** Flatten nested route metadata without rendering parent screen placeholders. */
export function flattenRoutes(tree) {
  return tree.flatMap(({ children, ...route }) => [route, ...flattenRoutes(children ?? [])])
}

const segments = (pathname) => pathname.split('/').filter(Boolean)

/** Static segments win over parameters, independently of configuration order. */
function compareSpecificity(left, right) {
  const a = segments(left.path)
  const b = segments(right.path)
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    const difference = Number(a[i].startsWith(':')) - Number(b[i].startsWith(':'))
    if (difference) return difference
  }
  return b.length - a.length
}

/** URL matching only. This does not authenticate, authorize or validate domain IDs. */
export function matchRoute(tree, pathname) {
  const rawPath = pathname.split(/[?#]/, 1)[0]
  if (!rawPath.startsWith('/') || rawPath.includes('//')) return { status: 'not-found' }
  let parts
  try {
    parts = segments(rawPath).map(segment => decodeURIComponent(segment))
  } catch {
    return { status: 'invalid-parameter' }
  }
  if (parts.some(part => !part.trim() || /[/\\]/.test(part) || [...part].some(char => char.charCodeAt(0) < 32 || char.charCodeAt(0) === 127))) {
    return { status: 'invalid-parameter' }
  }
  for (const route of flattenRoutes(tree).sort(compareSpecificity)) {
    const template = segments(route.path)
    if (template.length !== parts.length) continue
    const params = {}
    if (template.every((part, index) => {
      if (!part.startsWith(':')) return part === parts[index]
      params[part.slice(1)] = parts[index]
      return true
    })) return { status: 'matched', route, params }
  }
  return { status: 'not-found' }
}
