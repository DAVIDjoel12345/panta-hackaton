import { lazy, Suspense, useSyncExternalStore } from 'react'
import { routeTree } from './routes.js'
import { matchRoute } from './routeMatcher.js'
import Providers from './Providers.jsx'
import RouteErrorBoundary from './RouteErrorBoundary.jsx'
import NotFoundState from '../components/states/NotFoundState.jsx'
import InvalidRouteParameterState from '../components/states/InvalidRouteParameterState.jsx'
import PublicLayout from '../layouts/PublicLayout.jsx'
import ApplicationLayout from '../layouts/ApplicationLayout.jsx'
import CreatorLayout from '../layouts/CreatorLayout.jsx'
import SettingsLayout from '../layouts/SettingsLayout.jsx'
import ModerationLayout from '../layouts/ModerationLayout.jsx'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import LiveScreen from './LiveScreen.jsx'
import SessionGate from '../components/auth/SessionGate.jsx'
import LandingPage from '../pages/discovery/LandingPage.jsx'

const loaders = import.meta.glob(['../pages/**/*.jsx', '!../pages/dev/**', '!../pages/discovery/LandingPage.jsx'])
const pages = Object.fromEntries(Object.entries(loaders).map(([file, loader]) => [file, lazy(loader)]))
const StateGallery = import.meta.env.DEV ? lazy(() => import('../pages/dev/StateGallery.jsx')) : null
const layouts = { PublicLayout, ApplicationLayout, CreatorLayout, SettingsLayout, ModerationLayout, AuthLayout }
const getPathname = () => window.location.pathname + window.location.search
const getServerPathname = () => '/'
function subscribe(listener) {
  window.addEventListener('popstate', listener)
  return () => window.removeEventListener('popstate', listener)
}

function RouteScreen({ pathname }) {
  if (pathname.split('?')[0] === '/dev/ui-states' && import.meta.env.DEV && import.meta.env.VITE_ENABLE_DEMO_PREVIEWS === 'true') return <ApplicationLayout route={{ path: '/dev/ui-states', name: 'UI states', feature: 'dev', priority: 'future' }}><StateGallery /></ApplicationLayout>
  const match = matchRoute(routeTree, pathname)
  if (match.status === 'not-found') return <NotFoundState />
  if (match.status === 'invalid-parameter') return <InvalidRouteParameterState />
  // Load the entry page eagerly so its splash is the first rendered screen.
  const Screen = match.route.path === '/' ? LandingPage : pages[match.route.file.replace('src/', '../')]
  const Layout = layouts[match.route.layout]
  return <Layout route={match.route}><SessionGate route={match.route}><LiveScreen key={pathname} route={match.route} params={match.params}><Screen route={match.route} params={match.params} /></LiveScreen></SessionGate></Layout>
}

export default function AppRouter() {
  const pathname = useSyncExternalStore(subscribe, getPathname, getServerPathname)
  return (
    <Providers>
      <RouteErrorBoundary key={pathname}>
        <Suspense fallback={<div className="route-loading" role="status">Loading workspace…</div>}><RouteScreen pathname={pathname} /></Suspense>
      </RouteErrorBoundary>
    </Providers>
  )
}
