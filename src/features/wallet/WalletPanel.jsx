import { useWallet } from '../../hooks/useWallet.js'
import { Button, Badge, Link } from '../../components/ui/primitives.jsx'

export default function WalletPanel() {
  const wallet = useWallet()
  const connected = Boolean(wallet.address)

  return <div className="stack">
    <Badge>{connected ? `${wallet.selected?.name || 'Solana'} connected` : 'Wallet disconnected'}</Badge>
    {connected ? <>
      <p className="mono" style={{ overflowWrap: 'anywhere' }}>{wallet.address}</p>
      <Button disabled={wallet.busy} onClick={wallet.disconnect}>Disconnect wallet</Button>
    </> : <>
      {wallet.wallets.map(option => <Button key={option.name} disabled={wallet.busy} onClick={() => wallet.connect(option)}>{wallet.busy ? 'Connecting…' : `Connect ${option.name}`}</Button>)}
      {!wallet.wallets.length && <p role="status">No Solana wallet detected. On mobile, open this site inside your Solana wallet’s browser. On desktop, enable a Wallet Standard extension, then return here.</p>}
    </>}
    {wallet.error && <p role="alert">{wallet.error}</p>}
    {connected && wallet.config?.chain && !wallet.account?.chains?.includes(wallet.config.chain) && <p role="status">Connected account does not support {wallet.config.chain}. Select a compatible account in your wallet before trading.</p>}
    <p>Wallet connection is separate from your application sign-in. Every transaction requires review and explicit wallet approval.</p>
    {!wallet.config?.ready && <p role="status">Trading status: {wallet.configurationError || wallet.config?.reason || 'Checking transaction configuration…'}</p>}
    <Link href="/transactions">Transaction recovery & history</Link>
  </div>
}
