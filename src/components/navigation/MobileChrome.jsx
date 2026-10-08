import {useCommunity} from '../../features/community/useCommunity.js'
import { useState } from 'react'
import { useDemo } from '../../demo/useDemo.js'
import { goBack } from '../../app/navigation.js'
import WalletControl from '../../features/wallet/WalletControl.jsx'
import { Link, Button, Modal } from '../ui/primitives.jsx'
import Icon from '../ui/Icon.jsx'

const links = [
  ['Signal AI', '/ai', 'sparkles'], ['Claims', '/claims', 'gift'],
  ['Saved', '/saved', 'bookmark'], ['Leaderboard', '/leaderboard', 'trophy'],
  ['Creator Dashboard', '/creator', 'chart'], ['Notifications', '/notifications', 'bell'],
  ['Settings', '/settings', 'settings'], ['Help', '/help', 'help'], ['Profile', '/profile', 'users'],
]
const mainLinks = [['Explore', '/markets', 'compass'], ['Rooms', '/rooms', 'users'], ['Create', '/create', 'plus'], ['Portfolio', '/portfolio', 'wallet']]
export default function MobileChrome({ route }) {
  const demo = useDemo(), community = useCommunity()
  const [more, setMore] = useState(false)
  const root = mainLinks.some(([, href]) => route.path === href) || route.path === '/'
  const isExplore = ['discovery', 'markets', 'transactions'].includes(route.feature)
  const active = isExplore ? '/markets' : route.feature === 'community' ? '/rooms' : route.feature === 'creation' ? '/create' : ['portfolio', 'positions'].includes(route.feature) ? '/portfolio' : 'more'
  const fallback = route.feature === 'settings' ? '/settings' : active === 'more' ? '/markets' : active
  const title = route.path === '/markets' ? 'Explore' : route.path === '/rooms' ? 'Signal Rooms' : route.path === '/create' ? 'Create market' : route.name
  return <>
    <header className="mobile-topbar">
      {!root && <Button className="mobile-back icon-button" aria-label="Go back" onClick={() => goBack(fallback)}><Icon name="chevron" /><span className="sr-only">Back</span></Button>}
      <div className="mobile-page-title"><strong>{title}</strong><span>Connected workspace</span></div>
      <Link className="mobile-header-action" href="/search" aria-label="Search markets"><Icon name="search" /><span>Search</span></Link>
      <Link className="mobile-header-action" href="/notifications" aria-label="Notifications"><Icon name="bell" /><span>Alerts</span>{[...demo.notifications,...community.notifications].some(n => !n.read) && <i className="unread-dot" />}</Link>
      <div className="mobile-wallet"><WalletControl /></div>
    </header>
    <nav className="bottom-navigation" aria-label="Primary mobile navigation">
      {mainLinks.map(([label, href, icon]) => <Link key={href} href={href} className={active === href ? 'active' : ''} aria-current={active === href ? 'page' : undefined}><span className={label === 'Create' ? 'create-nav-icon' : ''}><Icon name={icon} size={22} /></span><span>{label}</span></Link>)}
      <button onClick={() => setMore(true)} className={active === 'more' || more ? 'active' : ''} aria-label="Open More menu" aria-expanded={more}><Icon name="menu" size={22} /><span>More</span></button>
    </nav>
    <Modal open={more} onClose={() => setMore(false)} title="Your workspace">
      <div className="more-account"><span className="avatar purple">{(demo.settings.name||"Guest").slice(0,2).toUpperCase()}</span><div><strong>{demo.settings.name}</strong><p>{demo.authenticated?'Signed-in account':'Guest account'}</p></div></div>
      <nav className="more-list" aria-label="More destinations">{links.map(([label, href, icon]) => <Link href={href} key={href}><Icon name={icon} /><span>{label}</span><Icon name="chevron" size={16} /></Link>)}{demo.role === 'moderator' && <Link href="/moderation"><Icon name="shield" /><span>Moderation</span><Icon name="chevron" size={16} /></Link>}</nav>
    </Modal>
  </>
}
