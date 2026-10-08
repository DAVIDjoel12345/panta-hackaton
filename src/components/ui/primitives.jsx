import { useEffect, useRef } from 'react'
import { navigate, registerOverlay } from '../../app/navigation.js'
import Icon from './Icon.jsx'

export function Link({ href, children, className = '', onClick, ...props }) { return <a href={href} className={className} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey && event.button === 0 && href.startsWith('/')) { event.preventDefault(); navigate(href) } }} {...props}>{children}</a> }
export function Button({ children, variant = 'secondary', icon, className = '', ...props }) { return <button type="button" className={`button ${variant} ${className}`} {...props}>{icon && <Icon name={icon} />}{children}</button> }
export function Badge({ children, tone = 'muted' }) { return <span className={`badge ${tone}`}>{children}</span> }
export function DemoNote({ children = 'Illustrative data. No real funds, live prices, or blockchain transactions.' }) { return <div className="demo-note"><Icon name="shield" size={15} /><span><strong>Demo mode</strong> · {children}</span></div> }
export function PageHeading({ eyebrow, title, description, actions }) { return <div className="page-heading"><div>{eyebrow && <div className="eyebrow">{eyebrow}</div>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{actions && <div className="heading-actions">{actions}</div>}</div> }
export function Panel({ title, subtitle, action, children, className = '' }) { return <section className={`panel ${className}`}>{title && <div className="panel-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>}{children}</section> }
export function Tabs({ items, active }) { return <nav className="tabs" aria-label="Page sections">{items.map(item => <Link key={item.href} href={item.href} className={active === item.href ? 'active' : ''} aria-current={active === item.href ? 'page' : undefined}>{item.label}</Link>)}</nav> }
export function Field({ label, error, hint, children }) { return <label className="field"><span>{label}</span>{children}{error && <span className="field-error" role="alert">{error}</span>}{hint && <small>{hint}</small>}</label> }
export function Modal({ open, onClose, title, children, wide = false, presentation = 'sheet' }) {
  const ref = useRef(null)
  const closeRef = useRef(onClose)
  const historyRef = useRef(null)
  useEffect(() => { closeRef.current = onClose }, [onClose])
  useEffect(() => {
    const dialog = ref.current
    if (!open) return
    const trigger = document.activeElement
    dialog.showModal()
    historyRef.current = registerOverlay(() => closeRef.current())
    return () => {
      if (dialog.open) dialog.close()
      historyRef.current?.dispose()
      historyRef.current = null
      if (trigger?.isConnected) trigger.focus({ preventScroll: true })
    }
  }, [open])
  const close = () => historyRef.current?.close()
  return <dialog ref={ref} className={`modal ${wide ? 'wide' : ''} modal-${presentation}`} aria-label={title} onCancel={event => { event.preventDefault(); close() }} onClick={event => { if (event.target === ref.current) { const r = ref.current.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close() } }}><div className="sheet-handle" aria-hidden="true" /><div className="modal-heading"><h2>{title}</h2><Button className="icon-button" aria-label="Close dialog" onClick={close} icon="close" /></div>{children}</dialog>
}
export function Metric({ label, value, detail, trend }) { return <div className="metric"><span>{label}</span><strong>{value}</strong><small className={trend ? 'positive' : ''}>{detail}</small></div> }
export function Empty({ title = 'Nothing here yet', description = 'Try a different filter or explore a new market.', action }) { return <div className="empty"><span className="empty-icon"><Icon name="compass" size={26} /></span><h2>{title}</h2><p>{description}</p>{action || <Link className="button secondary" href="/markets">Explore markets <Icon name="arrow" /></Link>}</div> }
export function Source({ market }) { return market?.source ? <a className="source-link" href={market.source} target="_blank" rel="noreferrer">{market.sourceLabel}<Icon name="external" size={14} /></a> : <span className="muted">{market?.sourceLabel || 'Source unavailable'}</span> }
