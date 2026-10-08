import { useState } from 'react'
import { Button, Modal, Link } from '../ui/primitives.jsx'
import { useDemo } from '../../demo/useDemo.js'

export default function ConversationHistorySheet() {
  const [open, setOpen] = useState(false)
  const demo = useDemo()
  return <div className="mobile-ai-history"><Button icon="message" onClick={() => setOpen(true)}>Conversation history</Button><Modal open={open} onClose={() => setOpen(false)} title="Signal AI history"><nav className="more-list" aria-label="Conversation history"><Link href="/ai" onClick={() => demo.setConversations(current => ({ ...current, 'demo-new-conversation': [] }))}>Start a new conversation</Link><Link href="/ai/conversations/demo-conversation-1">Understanding market prices</Link><Link href="/ai/saved">Saved analyses</Link></nav><p>Fixed demonstration responses. No live AI service.</p></Modal></div>
}
