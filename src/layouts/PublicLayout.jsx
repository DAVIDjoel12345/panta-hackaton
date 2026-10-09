import AppShell from '../components/layout/AppShell.jsx'
import PublicShell from '../components/layout/PublicShell.jsx'
export default function PublicLayout({ children, route }) { return route.path === '/' || route.feature === 'information' ? <PublicShell route={route}>{children}</PublicShell> : <AppShell route={route}>{children}</AppShell> }
