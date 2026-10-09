const adapters = new WeakMap()

function accountFrom(key) {
  if (!key) return null
  const address = typeof key === 'string' ? key : key.toBase58?.() || key.toString?.()
  if (!/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address || '')) return null
  return { address, chains: ['solana:mainnet'], features: [] }
}

function adapter(provider, name) {
  if (adapters.has(provider)) return adapters.get(provider)
  const wallet = {
    name,
    chains: ['solana:mainnet'],
    get accounts() { return provider.isConnected ? [accountFrom(provider.publicKey)].filter(Boolean) : [] },
    features: {
      'standard:connect': {
        connect: async () => {
          const result = await provider.connect()
          const account = accountFrom(result?.publicKey || provider.publicKey)
          if (!account) throw Error(`${name} did not provide a Solana account.`)
          return { accounts: [account] }
        },
      },
      'standard:disconnect': { disconnect: () => provider.disconnect?.() },
      'standard:events': {
        on: (_event, callback) => {
          const changed = key => callback({ accounts: [accountFrom(key)].filter(Boolean) })
          const disconnected = () => callback({ accounts: [] })
          provider.on?.('accountChanged', changed)
          provider.on?.('disconnect', disconnected)
          return () => {
            provider.off?.('accountChanged', changed)
            provider.off?.('disconnect', disconnected)
          }
        },
      },
    },
  }
  adapters.set(provider, wallet)
  return wallet
}

export function injectedWallets(source = globalThis.window) {
  if (!source) return []
  const entries = [
    [source.phantom?.solana || (source.solana?.isPhantom ? source.solana : null), 'Phantom'],
    [source.solflare || (source.solana?.isSolflare ? source.solana : null), 'Solflare'],
  ]
  return entries.filter(([provider]) => provider && typeof provider.connect === 'function').map(([provider, name]) => adapter(provider, name))
}
