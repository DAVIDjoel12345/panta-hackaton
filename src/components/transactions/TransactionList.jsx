import useMobileLayout from '../../hooks/useMobileLayout.js'
import { money, dateLabel } from '../../demo/fixtures.js'
import { Link, Badge } from '../ui/primitives.jsx'

export default function TransactionList({ items }) {
  const mobile = useMobileLayout()
  if (mobile) return <div className="transaction-cards">{items.map(item => <article className="transaction-card" key={item.id}>
    <div><h3>{item.action}</h3><strong>{money(item.amount)}</strong></div>
    <Badge tone={item.status.includes('confirmed') ? 'positive' : 'purple'}>{item.status}</Badge>
    <p>{dateLabel(item.date)} · Demo mode</p>
    <span className="mono">{item.id}</span>
    <Link className="button secondary full-width" href={`/transactions/${item.id}`}>Review fictional receipt</Link>
  </article>)}</div>
  return <div className="table-scroll"><table><thead><tr><th>Reference</th><th>Action</th><th>Amount</th><th>Status</th><th>Date</th></tr></thead><tbody>{items.map(item => <tr key={item.id}><td><Link href={`/transactions/${item.id}`} className="mono">{item.id}</Link></td><td>{item.action}</td><td>{money(item.amount)}</td><td><Badge tone={item.status.includes('confirmed') ? 'positive' : 'purple'}>{item.status}</Badge></td><td>{dateLabel(item.date)}</td></tr>)}</tbody></table></div>
}
