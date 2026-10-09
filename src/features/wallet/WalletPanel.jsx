import { useWallet } from '../../hooks/useWallet.js'
import { Button, Badge, Link } from '../../components/ui/primitives.jsx'
import { mobileWalletLinks } from './mobileWallets.js'

export default function WalletPanel() {
  const wallet = useWallet()
  const connected = Boolean(wallet.address)
  const appLinks = mobileWalletLinks(window.location)

  return <div className="stack">
    <Badge>{connected ? `${wallet.selected?.name || 'Solana'} connected` : 'Wallet disconnected'}</Badge>
    {connected ? <>
      <p className="mono" style={{ overflowWrap: 'anywhere' }}>{wallet.address}</p>
      <Button disabled={wallet.busy} onClick={wallet.disconnect}>Disconnect wallet</Button>
    </> : <>
      {wallet.wallets.length > 0 && <div className="stack"><strong>Wallets available in this browser</strong>{wallet.wallets.map(option => <Button key={option.name} disabled={wallet.busy} onClick={() => wallet.connect(option)}>{wallet.busy ? 'Connecting…' : `Connect ${option.name}`}</Button>)}</div>}
      {!wallet.wallets.length && <p role="status">No wallet is connected to this browser yet. Choose a mobile wallet app below, or enable a Solana wallet extension on desktop.</p>}
      <div className="stack"><strong>Open this page in a mobile wallet app</strong><div className="button-row">{appLinks.map(app => <a className="button secondary" key={app.name} href={app.href}>Open in {app.name}</a>)}</div><small>After this page opens in the wallet app, tap Connect above and approve in the wallet. Your keys remain in the wallet.</small></div>
    </>}
    {wallet.error && <p role="alert">{wallet.error}</p>}
    {connected && wallet.config?.chain && !wallet.account?.chains?.includes(wallet.config.chain) && <p role="status">Connected account does not support {wallet.config.chain}. Select a compatible account in your wallet before trading.</p>}
    <p>Wallet connection is separate from your application sign-in. Every transaction requires review and explicit wallet approval.</p>
    {!wallet.config?.ready && <p role="status">Trading status: {wallet.configurationError || wallet.config?.reason || 'Checking transaction configuration…'}</p>}
    <Link href="/transactions">Transaction recovery & history</Link>
  </div>
}
