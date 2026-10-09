import { useState } from 'react'
import { useDemo } from '../../demo/useDemo.js'
import { useAuth } from '../auth/useAuth.js'
import { useWallet } from '../../hooks/useWallet.js'
import WalletPanel from './WalletPanel.jsx'
import { Button, Modal, DemoNote, Badge, Link } from '../../components/ui/primitives.jsx'

export default function WalletControl() {
  const demo = useDemo(), auth = useAuth(), wallet = useWallet()
  const [open, setOpen] = useState(false)
  const signIn = '/auth?returnTo=' + encodeURIComponent(location.pathname + location.search)

  if (demo.live) {
    const label = wallet.address ? `${wallet.address.slice(0, 4)}…${wallet.address.slice(-4)}` : 'Connect wallet'
    return <>
      <Button icon="wallet" variant="primary" onClick={() => setOpen(true)} aria-label={wallet.address ? `Wallet connected: ${wallet.address}. Manage wallet` : 'Connect wallet'}>{label}</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Wallet & application session">
        <div className="stack">
          <WalletPanel />
          <div className="account-card"><span className="avatar purple">{demo.settings.name.slice(0, 2).toUpperCase()}</span><div><strong>{demo.settings.name}</strong><p>{demo.authenticated ? 'Application session active' : 'Guest browsing'}</p></div></div>
          {demo.authenticated ? <><Link className="button secondary" href="/settings/security" onClick={() => setOpen(false)}>Sessions & security</Link><Button onClick={() => { setOpen(false); auth.logout() }}>Sign out of application</Button></> : <Link className="button primary" href={signIn} onClick={() => setOpen(false)}>Sign in to Panta Signal</Link>}
        </div>
      </Modal>
    </>
  }

  return <>
    <Button icon="wallet" variant="primary" onClick={() => setOpen(true)}>{demo.wallet ? 'Demo account' : 'Connect demo wallet'}</Button>
    <Modal open={open} onClose={() => setOpen(false)} title="Wallet & application session">
      <DemoNote>No extension, signature, or real funds required.</DemoNote>
      <div className="stack">
        <div className="account-card"><span className="avatar purple">AM</span><div><strong>{auth.account}</strong><p>{demo.wallet ? 'Account connected' : 'Wallet disconnected'}</p></div><Badge>Fictional</Badge></div>
        <p>{demo.authenticated ? 'Demo application session active.' : 'Guest browsing. No authenticated application session.'}</p>
        <p>{auth.verifiedWallets.includes(auth.account) ? 'Ownership verified in simulation.' : 'Wallet ownership has not been verified.'}</p>
        <Button onClick={() => demo.setWallet(!demo.wallet)}>{demo.wallet ? 'Disconnect wallet only' : 'Connect fictional wallet only'}</Button>
        {demo.authenticated ? <><Link className="button secondary" href="/settings/security">Sessions & security</Link><Button onClick={auth.logout}>Sign out of application</Button></> : <Link className="button primary" href={signIn}>Sign in to Panta Signal</Link>}
        <p className="muted">Connecting or disconnecting a wallet does not sign you in or out. Message verification does not approve a transaction.</p>
      </div>
    </Modal>
  </>
}
