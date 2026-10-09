import assert from 'node:assert/strict'
import { readPantaCatalog, refreshPantaCatalogPage } from '../src/services/pantaCatalog.js'

const market = (id, volume) => ({ marketId: id, volumeUsdc: volume })
const calls = []
const request = async path => {
  calls.push(path)
  if (path.includes('cursor=older')) return { items: [market('second', '2')], nextCursor: null, retrievedAt: '2026-10-09T12:00:01.000Z' }
  if (calls.length === 1) return { items: [market('first', '1')], nextCursor: 'older', retrievedAt: '2026-10-09T12:00:00.000Z' }
  return { items: [market('first', '3'), market('new', '4')], nextCursor: 'older', retrievedAt: '2026-10-09T12:00:10.000Z' }
}

const full = await readPantaCatalog(request, { category: 'all', status: 'all' })
assert.equal(full.complete, true)
assert.equal(full.items.length, 2)
assert.equal(calls.length, 2)

const refreshed = await refreshPantaCatalogPage(request, { category: 'all', status: 'all', previous: full })
assert.equal(calls.length, 3, 'A frequent refresh should request one catalog page')
assert.deepEqual(refreshed.items.map(item => item.marketId), ['first', 'new', 'second'])
assert.equal(refreshed.items[0].volumeUsdc, '3', 'New catalog values replace old values')
assert.equal(refreshed.items[2].volumeUsdc, '2', 'Older pages remain available')
assert.equal(refreshed.complete, true)
assert.equal(refreshed.firstPageAt, '2026-10-09T12:00:10.000Z')
assert.equal(refreshed.fullCatalogAt, full.fullCatalogAt)
console.log('PASS: full catalog pagination and one-page live refresh')
