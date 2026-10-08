import { useAuth } from '../auth/useAuth.js'
import { useState } from 'react'
import { useDemo } from '../../demo/useDemo.js'
import { demoBalance, money } from '../../demo/fixtures.js'
import { Button, Field, Badge, DemoNote, Modal } from '../../components/ui/primitives.jsx'
import StatePanel, { ScenarioControl } from '../../components/feedback/StatePanel.jsx'
export default function TradeTicketView({ market, selectedOutcome, onOutcomeChange }) {
  const demo = useDemo()
  const auth = useAuth()
  const [localOutcome, setLocalOutcome] = useState(new URLSearchParams(window.location.search).get('outcome') === 'no' ? 'NO' : 'YES')
  const outcome = selectedOutcome ?? localOutcome
  const setOutcome = value => { setLocalOutcome(value); onOutcomeChange?.(value) }
  const [amount, setAmount] = useState(demo.safeDrafts['trade:'+market.id]?.amount || '25')
  const [scenario, setScenario] = useState('')
  const [review, setReview] = useState(false)
  const [stage, setStage] = useState('review')
  const [recorded, setRecorded] = useState(false)
  const [reference, setReference] = useState('')
  const price = (outcome === 'YES' ? market.yes : 100-market.yes)/100
  const value = Number(amount)
  const total = value + demoBalance.tradingFee + demoBalance.networkFee
  const invalid = !Number.isFinite(value) || value <= 0 ? 'Enter a positive amount.' : total > demoBalance.tokens ? 'Insufficient demo token balance, including fees.' : ''
  const closed = market.status !== 'Open'
  function advance() {
    if(!auth.requireWallet(`/markets/${market.id}?outcome=${outcome.toLowerCase()}`)){demo.setSafeDrafts(current=>({...current,['trade:'+market.id]:{amount,outcome}}));return}
    if (stage === 'review') setStage('approval')
    else if (stage === 'approval') setStage('submitting')
    else if (stage === 'submitting') setStage('submitted')
    else if (stage === 'submitted') setStage('pending')
    else if (stage === 'pending') { setStage('confirmed'); if (!recorded) { const id = `demo-local-tx-${demo.demoTransactions.length+1}`; setReference(id); demo.setDemoTransactions(current => [...current, { id, marketId: market.id, action: `Buy ${outcome}`, amount: total, status: 'Simulated confirmed', date: '2026-10-05T16:00:00Z' }]); setRecorded(true) } }
  }
  return <section className="trade-ticket"><div className="panel-heading"><h2>Make your prediction</h2><Badge tone="purple">Demo</Badge></div><div className="trade-outcomes">{['YES','NO'].map(item => <button key={item} aria-pressed={outcome===item} className={`${item.toLowerCase()} ${outcome===item ? 'selected' : ''}`} onClick={() => setOutcome(item)}>{item}<strong>{item === 'YES' ? market.yes : 100-market.yes}¢</strong></button>)}</div><Field label="Amount · demo USD" error={amount && invalid}><div className="amount-input"><span>$</span><input inputMode="decimal" type="number" min="0.01" step="0.01" value={amount} onChange={event => setAmount(event.target.value)} /></div></Field><div className="amount-presets">{[10,25,50,100].map(n => <button key={n} onClick={() => setAmount(String(n))}>${n}</button>)}</div><div className="detail-rows"><div><span>Available demo balance</span><strong>{money(demoBalance.tokens)}</strong></div><div><span>Estimated shares</span><strong>{!invalid && price > 0 ? (value/price).toFixed(2) : '—'} {outcome}</strong></div><div><span>Illustrative trading fee</span><strong>{money(demoBalance.tradingFee)}</strong></div><div><span>Network fee (demo)</span><strong>{money(demoBalance.networkFee)}</strong></div><div className="total"><span>Total cost</span><strong>{money(value > 0 ? total : 0)}</strong></div></div>{closed && <p className="field-error">Market closed. Trading is unavailable.</p>}<Button variant="primary" className="full-width" disabled={!!invalid || closed} onClick={() => { setStage('review'); setRecorded(false); setReview(true) }}>Review simulated trade</Button><p className="trade-caption">Read the resolution criteria before making a prediction.</p><DemoNote>Simulation only. No funds move.</DemoNote><ScenarioControl feature="trading" value={scenario} onChange={setScenario} extra={[{id:'trading.quoteReady', name:'Quote ready'}, {id:'trading.invalidAmount', name:'Invalid amount'}]} />{scenario && <StatePanel id={scenario} compact onAction={() => setScenario('')} />}<Modal open={review} onClose={() => setReview(false)} title="Review simulated trade" presentation="fullscreen"><DemoNote>No wallet signing or blockchain confirmation.</DemoNote><h3>{market.question}</h3><Badge tone="purple">Market status: {market.status}</Badge><details className="trade-rules" open><summary>Resolution criteria · review before approval</summary><p>{market.criteria}</p><p>Deadline: {new Date(market.close).toLocaleString('en-US', {timeZone:'UTC'})} UTC.</p></details><div className="detail-rows"><div><span>Selected outcome</span><Badge tone={outcome==='YES' ? 'positive':'danger'}>{outcome}</Badge></div><div><span>Amount</span><strong>{money(value)}</strong></div><div><span>Illustrative price</span><strong>{Math.round(price*100)}¢</strong></div><div><span>Estimated shares</span><strong>{price > 0 ? (value/price).toFixed(2) : 'Unavailable'}</strong></div><div><span>Fees included</span><strong>{money(demoBalance.tradingFee+demoBalance.networkFee)}</strong></div><div><span>Total</span><strong>{money(total)}</strong></div><div><span>Quote expiry</span><strong>{stage === 'expired' ? 'Expired (simulated)' : '60 seconds · clock paused in demo'}</strong></div></div><Badge tone={stage === 'confirmed' ? 'positive':'purple'}>Simulated: {stage}</Badge>{stage === 'confirmed' ? <p>Local demonstration complete. Fictional reference: <strong>{reference}</strong>. This is not a blockchain transaction.</p> : stage === 'expired' ? <Button onClick={() => setStage('review')}>Refresh demo quote</Button> : <div className="modal-actions"><Button onClick={() => setStage('expired')}>Simulate expiry</Button><Button variant="primary" onClick={advance}>{({review:'Continue to demo approval',approval:'Simulate approval',submitting:'Mark simulated submitted',submitted:'Mark simulated pending',pending:'Simulate confirmation'})[stage]}</Button></div>}</Modal></section>
}
