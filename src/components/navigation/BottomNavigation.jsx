import { useState } from 'react'
import { useDemo } from '../../demo/useDemo.js'
import { Link, Modal } from '../ui/primitives.jsx'
import Icon from '../ui/Icon.jsx'
import { primaryMobileDestination } from './mobileNavigation.js'

const mainLinks = [['Explore', '/markets', 'compass'], ['Rooms', '/rooms', 'users'], ['Create', '/create', 'plus'], ['Portfolio', '/portfolio', 'wallet']]
const moreLinks = [
  ['Signal AI', '/ai', 'sparkles'], ['Claims', '/claims', 'gift'],
  ['Saved', '/saved', 'bookmark'], ['Leaderboard', '/leaderboard', 'trophy'],
  ['Creator Dashboard', '/creator', 'chart'], ['Notifications', '/notifications', 'bell'],
  ['Settings', '/settings', 'settings'], ['Help', '/help', 'help'], ['Profile', '/profile', 'users'],
]

export default function BottomNavigation({ route }) {
  const demo = useDemo()
  const [more, setMore] = useState(false)
  const active = primaryMobileDestination(route)

  return <>
    <nav className="bottom-navigation" aria-label="Primary mobile navigation">
      {mainLinks.map(([label, href, icon]) => <Link key={href} href={href} className={active === href ? 'active' : ''} aria-current={active === href ? 'page' : undefined}><span className={label === 'Create' ? 'create-nav-icon' : ''}><Icon name={icon} size={22} /></span><span>{label}</span></Link>)}
      <button type="button" onClick={() => setMore(true)} className={active === 'more' || more ? 'active' : ''} aria-label="Open More menu" aria-expanded={more} aria-haspopup="dialog"><Icon name="menu" size={22} /><span>More</span></button>
    </nav>
    <Modal open={more} onClose={() => setMore(false)} title="Your workspace">
      <div className="more-account"><span className="avatar purple">{(demo.settings.name || 'Guest').slice(0, 2).toUpperCase()}</span><div><strong>{demo.settings.name}</strong><p>{demo.authenticated ? 'Signed-in account' : 'Guest account'}</p></div></div>
      <nav className="more-list" aria-label="More destinations">{moreLinks.map(([label, href, icon]) => <Link href={href} key={href}><Icon name={icon} /><span>{label}</span><Icon name="chevron" size={16} /></Link>)}{demo.role === 'moderator' && <Link href="/moderation"><Icon name="shield" /><span>Moderation</span><Icon name="chevron" size={16} /></Link>}</nav>
    </Modal>
  </>
}
