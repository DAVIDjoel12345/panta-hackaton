import { useCommunity } from '../../features/community/useCommunity.js'
import { useDemo } from '../../demo/useDemo.js'
import { goBack } from '../../app/navigation.js'
import WalletControl from '../../features/wallet/WalletControl.jsx'
import { Link, Button } from '../ui/primitives.jsx'
import Icon from '../ui/Icon.jsx'
import BottomNavigation from './BottomNavigation.jsx'
import { primaryMobileDestination } from './mobileNavigation.js'

const rootPaths = new Set(['/markets', '/rooms', '/create', '/portfolio', '/'])

export default function MobileChrome({ route }) {
  const demo = useDemo(), community = useCommunity()
  const root = rootPaths.has(route.path)
  const active = primaryMobileDestination(route)
  const fallback = route.feature === 'settings' ? '/settings' : active === 'more' ? '/markets' : active
  const title = route.path === '/markets' ? 'Explore' : route.path === '/rooms' ? 'Signal Rooms' : route.path === '/create' ? 'Create market' : route.name

  return <>
    <header className="mobile-topbar">
      {!root && <Button className="mobile-back icon-button" aria-label="Go back" onClick={() => goBack(fallback)}><Icon name="chevron" /><span className="sr-only">Back</span></Button>}
      <div className="mobile-page-title"><strong>{title}</strong><span>Connected workspace</span></div>
      <Link className="mobile-header-action" href="/search" aria-label="Search markets"><Icon name="search" /><span>Search</span></Link>
      <Link className="mobile-header-action" href="/notifications" aria-label="Notifications"><Icon name="bell" /><span>Alerts</span>{[...demo.notifications, ...community.notifications].some(n => !n.read) && <i className="unread-dot" />}</Link>
      <div className="mobile-wallet"><WalletControl /></div>
    </header>
    <BottomNavigation route={route} />
  </>
}
