import { Link, Badge } from '../ui/primitives.jsx'
import Icon from '../ui/Icon.jsx'
import { useDemo } from '../../demo/useDemo.js'
export default function ConversationSidebar() {
  const demo = useDemo()
  return <aside className="conversation-sidebar"><Link href="/ai" className="button secondary" onClick={() => demo.setConversations(current => ({ ...current, 'demo-new-conversation': [] }))}><Icon name="plus" />New conversation</Link><span className="nav-label">DEMONSTRATION HISTORY</span><Link href="/ai/conversations/demo-conversation-1" className="conversation-item"><Icon name="message" /><span>Understanding market prices<small>Fixed demonstration conversation</small></span></Link><Link href="/ai/saved" className="conversation-item"><Icon name="bookmark" />Saved analyses</Link><div className="conversation-note"><Badge tone="purple">Future module</Badge><p>No AI service is connected. Responses are fixed examples.</p></div></aside>
}
