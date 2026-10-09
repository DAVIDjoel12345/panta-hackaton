import assert from 'node:assert/strict'

const browser = process.env.CHROME_URL || 'http://127.0.0.1:9226'
const app = process.env.APP_URL || 'http://127.0.0.1:5174'
const target = await (await fetch(`${browser}/json/new?about:blank`, { method: 'PUT' })).json()
const socket = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(resolve => socket.addEventListener('open', resolve, { once: true }))
let nextId = 0
const pending = new Map()
socket.addEventListener('message', event => {
  const message = JSON.parse(event.data)
  if (!message.id) return
  const callback = pending.get(message.id)
  pending.delete(message.id)
  if (message.error) callback.reject(new Error(JSON.stringify(message.error)))
  else callback.resolve(message.result)
})
const send = (method, params = {}) => new Promise((resolve, reject) => {
  const id = ++nextId
  pending.set(id, { resolve, reject })
  socket.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => {
  const result = await send('Runtime.evaluate', { expression, returnByValue: true })
  if (result.exceptionDetails) throw new Error(result.exceptionDetails.text)
  return result.result.value
}
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

try {
  await send('Runtime.enable')
  await send('Page.enable')
  for (const width of [320, 390]) {
    await send('Emulation.setDeviceMetricsOverride', { width, height: 780, deviceScaleFactor: 1, mobile: true })
    for (const [path, selected] of [['/', 'Explore'], ['/auth', 'More'], ['/markets', 'Explore'], ['/transactions', 'Portfolio'], ['/rooms', 'Rooms'], ['/ai', 'More']]) {
      await send('Page.navigate', { url: `${app}${path}` })
      let state
      for (let attempt = 0; attempt < 60; attempt++) {
        state = await evaluate(`(() => {
          const nav = document.querySelector('.bottom-navigation')
          if (!nav) return null
          const rect = nav.getBoundingClientRect()
          return { path: location.pathname, visible: getComputedStyle(nav).display !== 'none', bottom: rect.bottom,
            width: document.documentElement.scrollWidth, labels: [...nav.children].map(item => item.textContent.trim()),
            selected: nav.querySelector('.active')?.textContent.trim() }
        })()`)
        if (state) break
        await pause(100)
      }
      assert.ok(state, `${path}: mobile navigation missing`)
      assert.equal(state.visible, true, `${path}: mobile navigation hidden`)
      assert.deepEqual(state.labels, ['Explore', 'Rooms', 'Create', 'Portfolio', 'More'], `${path}: inconsistent navigation`)
      assert.equal(state.selected, selected, `${path}: wrong active item`)
      assert.ok(state.width <= width, `${path}: horizontal overflow ${state.width}px at ${width}px`)
      assert.ok(Math.abs(state.bottom - 780) <= 1, `${path}: bottom bar is not pinned to viewport`)
      console.log(`${width}px ${path}: ${state.selected}, no overflow`)
    }
  }
} finally {
  socket.close()
}
