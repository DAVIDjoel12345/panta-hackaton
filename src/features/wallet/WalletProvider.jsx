import { useEffect, useRef, useState } from 'react'
import { getWallets } from '@wallet-standard/app'
import { WalletContext } from '../../hooks/useWallet.js'
import useLiveQuery from '../../hooks/useLiveQuery.js'
import { injectedWallets } from './injectedWallets.js'

const STORAGE_KEY = 'panta-signal:wallet-name'
const isSolanaWallet = wallet => Boolean(wallet.features['standard:connect'] && wallet.chains?.some(chain => chain.startsWith('solana:')))
const availableWallets = (registry, selected) => {
  const standard = registry.get().filter(isSolanaWallet)
  const injected = injectedWallets()
  const wallets = [...standard, ...injected.filter(wallet => !standard.some(option => option.name === wallet.name))]
  if (selected && injected.includes(selected) && !wallets.includes(selected)) wallets.push(selected)
  return wallets
}
const solanaAccount = wallet => wallet?.accounts?.find(account => account.chains?.some(chain => chain.startsWith('solana:')))
const rememberedWallet = () => { try { return localStorage.getItem(STORAGE_KEY) } catch { return null } }
const rememberWallet = name => { try { if (name) localStorage.setItem(STORAGE_KEY, name); else localStorage.removeItem(STORAGE_KEY) } catch { /* Storage may be unavailable in private browsing. */ } }
const authorizedWallet = wallets => wallets.find(wallet => wallet.name === rememberedWallet() && solanaAccount(wallet)) || null
const connectionError = error => {
  if (error?.name === 'AbortError' || /rejected|cancelled|canceled|denied/i.test(error?.message || '')) return 'Connection was cancelled in your wallet. Choose it again to retry.'
  return error?.message || 'Wallet connection failed. Please try again.'
}

export default function WalletProvider({ children }) {
  const registry = getWallets()
  const [wallets, setWallets] = useState(() => availableWallets(registry))
  const [selected, setSelected] = useState(() => authorizedWallet(availableWallets(registry)))
  const [account, setAccount] = useState(() => solanaAccount(authorizedWallet(availableWallets(registry))) || null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const current = useRef(account)
  const version = useRef(0)
  const connecting = useRef(false)
  const pendingWallet = useRef(null)
  const configQuery = useLiveQuery('/panta/config', 60000)

  useEffect(() => {
    const update = () => {
      const available = availableWallets(registry, selected)
      setWallets(previous => previous.length === available.length && previous.every((wallet, index) => wallet === available[index]) ? previous : available)
      if (pendingWallet.current && !available.includes(pendingWallet.current)) {
        version.current++
        pendingWallet.current = null
        setError('The wallet closed during connection. Reopen it and retry.')
      }
      if (selected && !available.includes(selected)) {
        version.current++
        current.current = null
        setAccount(null)
        setSelected(null)
        setError('The wallet is no longer available. Reopen or enable it to reconnect.')
      } else if (!selected && !connecting.current) {
        const remembered = authorizedWallet(available)
        if (remembered) {
          current.current = solanaAccount(remembered)
          version.current++
          setSelected(remembered)
          setAccount(current.current)
        }
      }
    }
    const off = [registry.on('register', update), registry.on('unregister', update)]
    const poll = setInterval(update, 1200)
    window.addEventListener('focus', update)
    return () => { off.forEach(unsubscribe => unsubscribe()); clearInterval(poll); window.removeEventListener('focus', update) }
  }, [registry, selected])

  useEffect(() => {
    if (!selected) return
    const events = selected.features['standard:events']
    return events?.on('change', change => {
      if (!change.accounts) return
      version.current++
      current.current = change.accounts.find(candidate => candidate.chains?.some(chain => chain.startsWith('solana:'))) || null
      setAccount(current.current)
      setError('')
    })
  }, [selected])

  async function connect(wallet) {
    if (connecting.current) return
    const feature = wallet?.features['standard:connect']
    if (!feature || !wallets.includes(wallet)) {
      setError('This wallet is no longer available. Refresh the page and try again.')
      return
    }
    connecting.current = true
    pendingWallet.current = wallet
    const attempt = ++version.current
    setBusy(true)
    setError('')
    try {
      const result = await feature.connect()
      if (attempt !== version.current) return
      const next = result?.accounts?.find(candidate => candidate.chains?.some(chain => chain.startsWith('solana:')))
      if (!next) throw new Error('The wallet did not provide a Solana account. Select a Solana account and retry.')
      current.current = next
      setSelected(wallet)
      setAccount(next)
      rememberWallet(wallet.name)
    } catch (cause) {
      if (attempt === version.current) setError(connectionError(cause))
    } finally {
      connecting.current = false
      pendingWallet.current = null
      setBusy(false)
    }
  }

  async function disconnect() {
    version.current++
    current.current = null
    setAccount(null)
    const wallet = selected
    setSelected(null)
    setError('')
    rememberWallet(null)
    try {
      await wallet?.features['standard:disconnect']?.disconnect()
    } catch {
      setError('Disconnected from this site. Your wallet may still show this site as authorized.')
    }
  }

  async function sign(transaction, chain) {
    const chosen = current.current
    const epoch = version.current
    if (!chosen || !selected) throw Error('Connect a wallet first.')
    if (!chosen.chains?.includes(chain)) throw Error('Selected wallet account does not support the required network.')
    const feature = selected.features['solana:signTransaction']
    if (!feature || !chosen.features?.includes('solana:signTransaction')) throw Error('This wallet cannot sign Solana transactions.')
    const [result] = await feature.signTransaction({ account: chosen, chain, transaction })
    if (epoch !== version.current || current.current?.address !== chosen.address) throw Error('Wallet account changed. The transaction was not submitted.')
    if (!result?.signedTransaction) throw Error('Wallet did not return a signed transaction.')
    return result.signedTransaction
  }

  return <WalletContext.Provider value={{ wallets, account, address: account?.address || '', selected, busy, error, connect, disconnect, sign, config: configQuery.data, configurationError: configQuery.error, refreshConfig: configQuery.refresh }}>{children}</WalletContext.Provider>
}
