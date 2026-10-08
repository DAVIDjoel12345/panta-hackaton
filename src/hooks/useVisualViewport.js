import { useEffect } from 'react'

/** Follow the visible viewport without guessing keyboard timings. */
export default function useVisualViewport() {
  useEffect(() => {
    const viewport = window.visualViewport
    const root = document.documentElement
    let availableHeight = window.innerHeight
    const update = () => {
      const height = viewport?.height ?? window.innerHeight
      const offset = viewport?.offsetTop ?? 0
      const input = document.activeElement
      const editing = input?.matches('input:not([type=checkbox]), textarea, select')
      if (!editing) availableHeight = window.innerHeight
      const inset = Math.max(0, window.innerHeight - height - offset)
      root.style.setProperty('--visible-height', `${height}px`)
      root.style.setProperty('--viewport-top', `${offset}px`)
      root.style.setProperty('--keyboard-inset', `${editing ? inset : 0}px`)
      const keyboardOpen = editing && (inset > 100 || availableHeight - height > 100)
      root.dataset.keyboardOpen = keyboardOpen ? 'true' : 'false'
      if (keyboardOpen) input.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    }
    update()
    viewport?.addEventListener('resize', update)
    viewport?.addEventListener('scroll', update)
    window.addEventListener('resize', update)
    document.addEventListener('focusin', update)
    document.addEventListener('focusout', update)
    return () => {
      viewport?.removeEventListener('resize', update)
      viewport?.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      document.removeEventListener('focusin', update)
      document.removeEventListener('focusout', update)
      delete root.dataset.keyboardOpen
    }
  }, [])
}
