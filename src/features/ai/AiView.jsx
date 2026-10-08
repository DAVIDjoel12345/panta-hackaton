import { useState } from 'react'
import { markets } from '../../demo/fixtures.js'
import { useDemo } from '../../demo/useDemo.js'
import { PageHeading, Button, Field, DemoNote, Empty, Badge } from '../../components/ui/primitives.jsx'
import Icon from '../../components/ui/Icon.jsx'
import ConversationHistorySheet from '../../components/ai/ConversationHistorySheet.jsx'
import ConversationSidebar from '../../components/ai/ConversationSidebar.jsx'
import AnalysisResult from '../../components/ai/AnalysisResult.jsx'
import StatePanel, { ScenarioControl } from '../../components/feedback/StatePanel.jsx'
export default function AiView({route,params}) {
  const demo=useDemo()
  const [marketId,setMarketId]=useState('demo-btc')
  const [prompt,setPrompt]=useState('')
  const conversationId=params.conversationId || 'demo-new-conversation'
  const messages=demo.conversations[conversationId] || []
  const setMessages=next=>demo.setConversations(current=>({...current,[conversationId]:next}))
  const [scenario,setScenario]=useState('')
  if(params.conversationId&&params.conversationId!=='demo-conversation-1')return <Empty title="Conversation not found" />
  return <><PageHeading title={route.path==='/ai/saved'?'Saved analyses':'Your context. A clearer perspective.'} eyebrow="SIGNAL AI" description="Explore the question, the evidence, and the uncertainty." /><DemoNote>Fixed illustrative responses. No live AI requests or predictions.</DemoNote>{route.path==='/ai/saved'?demo.savedAnalyses.length?<div className="stack">{markets.filter(m=>demo.savedAnalyses.includes(m.id)).map(m=><AnalysisResult key={m.id} market={m} />)}</div>:<Empty title="No saved analyses" description="Save an explanation from a market or this workspace." />:<><ConversationHistorySheet /><div className="ai-workspace"><ConversationSidebar /><div className="ai-main"><Field label="Market context"><select value={marketId} onChange={e=>setMarketId(e.target.value)}><option value="">Select a market</option>{markets.map(m=><option value={m.id} key={m.id}>{m.question}</option>)}</select></Field>{!messages.length&&<div className="ai-welcome"><span className="symbol large purple"><Icon name="sparkles" size={32} /></span><h2>What would you like to understand?</h2><p>Start with a question. Get a structured example grounded in the supplied market information.</p><div className="suggested-prompts">{['Explain the resolution criteria','What information is missing?','How should I read this price?'].map(p=><button key={p} onClick={()=>setPrompt(p)}>{p}<Icon name="arrow" size={15} /></button>)}</div></div>}{messages.map((message,i)=><div className="message-pair" key={i}><div className="user-message"><span className="avatar purple">AM</span><p>{message}</p></div><AnalysisResult market={markets.find(m=>m.id===marketId)} /></div>)}<form className="prompt-composer" onSubmit={e=>{e.preventDefault();if(!marketId){setScenario('ai.noSelectedMarket');return}if(prompt.trim()){setMessages([...messages,prompt.trim()]);setPrompt('')}}}><label htmlFor="ai-prompt" className="sr-only">Ask about the selected market</label><textarea id="ai-prompt" value={prompt} onChange={e=>setPrompt(e.target.value)} placeholder="Ask about this market…" required /><div><Badge>Fixed fixture response</Badge><Button type="submit" variant="primary" icon="arrow">Show demo analysis</Button></div></form></div></div></>}<ScenarioControl feature="ai" value={scenario} onChange={setScenario} />{scenario&&<StatePanel id={scenario} onAction={()=>setScenario('')} />}</>
}
