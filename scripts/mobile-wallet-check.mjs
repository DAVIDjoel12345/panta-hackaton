import assert from 'node:assert/strict'
import { test } from 'node:test'
import { injectedWallets } from '../src/features/wallet/injectedWallets.js'
import { isMobileBrowser, mobileWalletLinks } from '../src/features/wallet/mobileWallets.js'

test('mobile links preserve the current portfolio route and omit query credentials', () => {
  const links = mobileWalletLinks(new URL('https://example.com/portfolio/open?token=private'))
  assert.equal(links.length, 2)
  for (const link of links) {
    assert.match(decodeURIComponent(link.href), /https:\/\/example.com\/portfolio\/open/)
    assert.doesNotMatch(link.href, /private/)
  }
  assert.equal(isMobileBrowser('Mozilla iPhone'), true)
  assert.equal(isMobileBrowser('Mozilla Windows'), false)
})

test('injected Phantom connects, reports account changes, and disconnects', async () => {
  const handlers = new Map()
  const provider = {
    isConnected: false,
    publicKey: null,
    async connect() { this.isConnected = true; this.publicKey = { toBase58: () => '11111111111111111111111111111111' }; return { publicKey: this.publicKey } },
    async disconnect() { this.isConnected = false; this.publicKey = null; handlers.get('disconnect')?.() },
    on(event, callback) { handlers.set(event, callback) },
    off(event) { handlers.delete(event) },
  }
  const [wallet] = injectedWallets({ phantom: { solana: provider } })
  assert.equal(wallet.name, 'Phantom')
  assert.equal(wallet.accounts.length, 0)
  const changes = []
  const unsubscribe = wallet.features['standard:events'].on('change', value => changes.push(value.accounts))
  const connected = await wallet.features['standard:connect'].connect()
  assert.equal(connected.accounts[0].address, '11111111111111111111111111111111')
  assert.equal(wallet.accounts[0].address, connected.accounts[0].address)
  handlers.get('accountChanged')?.({ toBase58: () => 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' })
  assert.equal(changes.at(-1)[0].address, 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
  await wallet.features['standard:disconnect'].disconnect()
  assert.deepEqual(changes.at(-1), [])
  unsubscribe()
  assert.equal(handlers.size, 0)
})
