import { useState } from 'react'
import { categories } from '../../demo/fixtures.js'
import { Button, Modal, Field } from '../ui/primitives.jsx'

export default function DiscoverySheets({ category, setCategory, status, setStatus, sort, setSort }) {
  const [sheet, setSheet] = useState('')
  const count = Number(category !== 'All markets') + Number(status !== 'All statuses')
  return <div className="mobile-discovery-controls">
    <div className="mobile-filter-actions"><Button icon="settings" onClick={() => setSheet('filters')}>Filters{count ? ` · ${count}` : ''}</Button><Button icon="down" onClick={() => setSheet('sort')}>Sort · {sort}</Button></div>
    {count > 0 && <div className="active-filter-summary"><span>{[category !== 'All markets' && category, status !== 'All statuses' && status].filter(Boolean).join(' · ')}</span><Button onClick={() => { setCategory('All markets'); setStatus('All statuses') }}>Clear filters</Button></div>}
    <Modal open={sheet === 'filters'} onClose={() => setSheet('')} title="Filter markets"><Field label="Category"><select value={category} onChange={e => setCategory(e.target.value)}>{categories.map(c => <option key={c}>{c}</option>)}</select></Field><Field label="Market status"><select value={status} onChange={e => setStatus(e.target.value)}>{['All statuses', 'Open', 'Resolved'].map(s => <option key={s}>{s}</option>)}</select></Field><Button variant="primary" className="full-width" onClick={() => setSheet('')}>Show matching markets</Button></Modal>
    <Modal open={sheet === 'sort'} onClose={() => setSheet('')} title="Sort markets"><div className="choice-list">{['Trending', 'Volume', 'Movement', 'Closing soon', 'Newest'].map(s => <label key={s}><span>{s}</span><input type="radio" name="market-sort" value={s} checked={sort === s} onChange={() => setSort(s)} /></label>)}</div><Button variant="primary" className="full-width" onClick={() => setSheet('')}>Apply sort</Button></Modal>
  </div>
}
