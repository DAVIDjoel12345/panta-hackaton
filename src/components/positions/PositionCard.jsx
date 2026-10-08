import { findMarket, money } from '../../demo/fixtures.js'
import { Link, Badge } from '../ui/primitives.jsx'

export default function PositionCard({ position }) {
  const market = findMarket(position.marketId)
  const price = position.outcome === 'YES' ? market.yes : 100 - market.yes
  return <article className="position-card">
    <div className="position-card-top"><Badge tone={position.outcome === 'YES' ? 'positive' : 'danger'}>{position.outcome}</Badge><Badge>{position.status}</Badge></div>
    <Link href={`/positions/${position.id}`} className="position-question">{market.question}</Link>
    <dl><div><dt>Quantity</dt><dd>{position.shares} shares</dd></div><div><dt>Entry cost</dt><dd>{money(position.shares * position.entry / 100)}</dd></div><div><dt>Current estimate</dt><dd>{money(position.shares * price / 100)}</dd></div></dl>
    <small>Illustrative values · not realized returns</small>
    <Link href={position.status === 'Claimable' ? '/claims/demo-claim-1' : `/positions/${position.id}`} className={`button ${position.status === 'Claimable' ? 'primary' : 'secondary'} full-width`}>{position.status === 'Claimable' ? 'Review demo claim · not paid' : 'Position details'}</Link>
  </article>
}
