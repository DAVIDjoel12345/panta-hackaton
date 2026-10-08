// Route and overlay history share one stack so Back closes a sheet before leaving.
let index = 0
let acceptedUrl = ''
let restoring = false
let nextOverlay = 0
let pendingRoute = null
const overlays = []

function publishRoute(href) {
  index += 1
  window.history.pushState({ pantaIndex: index }, '', href)
  acceptedUrl = window.location.href
  window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }))
  window.scrollTo({ top: 0, behavior: 'instant' })
}

function onHistory(event) {
  const nextIndex = event.state?.pantaIndex ?? 0
  if (restoring) {
    restoring = false
    event.stopImmediatePropagation()
    return
  }
  const samePage = window.location.href === acceptedUrl
  while (overlays.length && overlays.at(-1).id !== event.state?.pantaOverlay) {
    overlays.pop().onClose()
  }
  if (pendingRoute !== null) {
    const href = pendingRoute
    pendingRoute = null
    index = nextIndex
    event.stopImmediatePropagation()
    publishRoute(href)
    return
  }
  if (!samePage && window.__pantaDirty) {
    if (!window.confirm('Leave this page? Unsaved changes will be lost.')) {
      event.stopImmediatePropagation()
      restoring = true
      window.history.go(index - nextIndex)
      return
    }
    window.__pantaDirty = false
  }
  index = nextIndex
  acceptedUrl = window.location.href
}

if (typeof window !== 'undefined') {
  index = window.history.state?.pantaIndex ?? 0
  acceptedUrl = window.location.href
  window.history.replaceState({ ...window.history.state, pantaIndex: index }, '')
  window.addEventListener('popstate', onHistory, true)
  if (import.meta.hot) import.meta.hot.dispose(() => window.removeEventListener('popstate', onHistory, true))
}

export function navigate(href) {
  if (window.__pantaDirty && !window.confirm('Leave this page? Unsaved changes will be lost.')) return false
  window.__pantaDirty = false
  if (overlays.length) {
    pendingRoute = href
    window.history.go(-overlays.length)
  } else publishRoute(href)
  return true
}

export function goBack(fallback = '/markets') {
  if (index > 0) window.history.back()
  else navigate(fallback)
}

export function registerOverlay(onClose) {
  const id = ++nextOverlay
  const overlay = { id, onClose, closing: false }
  overlays.push(overlay)
  index += 1
  window.history.pushState({ ...window.history.state, pantaIndex: index, pantaOverlay: id }, '')
  const close = () => {
    if (overlays.at(-1)?.id === id && !overlay.closing && pendingRoute === null) {
      overlay.closing = true
      window.history.back()
    }
  }
  return { close, dispose: close }
}
