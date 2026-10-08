import { transactions, findMarket, money, dateLabel } from '../../demo/fixtures.js'
import { useDemo } from '../../demo/useDemo.js'
import { PageHeading, Panel, Link, Badge, DemoNote, Empty } from '../../components/ui/primitives.jsx'
import { TransactionTable } from '../portfolio/PortfolioView.jsx'
export default function TransactionsView({ params }) {
  const demo = useDemo()
  const items = [...transactions, ...demo.demoTransactions]
  const item = items.find(t=>t.id===params.signature)
  return <><PageHeading title={params.signature?'Transaction details':'Transaction history'} description="Fictional references, explicit states, and transparent costs." /><DemoNote>These references are not Solana signatures. No explorer confirmation exists.</DemoNote>{params.signature ? item ? <Panel title={item.id} className="padded"><Badge tone="purple">{item.status}</Badge><div className="detail-rows"><div><span>Action</span><strong>{item.action}</strong></div><div><span>Amount</span><strong>{money(item.amount)}</strong></div><div><span>Date</span><strong>{dateLabel(item.date)}</strong></div><div><span>Market</span><Link href={`/markets/${item.marketId}`}>{findMarket(item.marketId)?.question || 'Local demo market'}</Link></div><div><span>On-chain confirmation</span><strong>Not applicable · simulated</strong></div></div><p className="muted">Submitted, pending, and confirmed are distinct states in this frontend. This record is only a local example.</p></Panel>:<Empty title="Transaction not found" />:<TransactionTable items={items} />}</>
}
