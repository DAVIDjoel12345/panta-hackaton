import { analysisFixture, SNAPSHOT, dateLabel } from '../../demo/fixtures.js'
import { useDemo } from '../../demo/useDemo.js'
import { Panel, Badge, Source, Button } from '../ui/primitives.jsx'
import Icon from '../ui/Icon.jsx'
export default function AnalysisResult({ market }) {
  const demo = useDemo()
  return <Panel className="analysis-panel padded" title={<><Icon name="sparkles" /> Signal AI insight</>} action={<Badge tone="purple">Fixed demo analysis</Badge>}><h3>{analysisFixture.title}</h3><p>{analysisFixture.summary}</p><ul>{analysisFixture.factors.map(factor => <li key={factor}>{factor}</li>)}</ul>{market && <><h4>Market context</h4><p>{market.criteria}</p><Source market={market} /></>}<div className="caveat"><Icon name="alert" size={16} /><p>{analysisFixture.caveat}</p></div><div className="panel-bottom"><small>Snapshot: {dateLabel(SNAPSHOT)} · history is illustrative</small>{market && <Button icon="bookmark" onClick={() => demo.toggleAnalysisSave(market.id)}>{demo.savedAnalyses.includes(market.id) ? 'Unsave analysis' : 'Save analysis'}</Button>}</div></Panel>
}
