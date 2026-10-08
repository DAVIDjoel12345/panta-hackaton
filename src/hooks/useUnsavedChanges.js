import { useEffect } from 'react'
export default function useUnsavedChanges(dirty) {
  useEffect(() => { window.__pantaDirty = dirty; const warn = event => { if (dirty) { event.preventDefault(); event.returnValue = '' } }; window.addEventListener('beforeunload', warn); return () => { window.__pantaDirty = false; window.removeEventListener('beforeunload', warn) } }, [dirty])
}
