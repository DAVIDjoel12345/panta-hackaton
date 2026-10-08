import { useState } from 'react'
import { Field, Button, Panel, Badge, DemoNote } from '../../components/ui/primitives.jsx'
export default function CreationStep({ title, value='', onChange, onNext }) {
  const [text,setText]=useState(value)
  const [reviewed,setReviewed]=useState(false)
  const editable=/Enter|Edit|Choose|Define/.test(title)
  return <Panel title={title} className="padded"><DemoNote>Standalone creation-step preview. No market is published.</DemoNote>{editable?<Field label={title}><textarea value={text} onChange={e=>{setText(e.target.value);onChange?.(e.target.value)}} placeholder="Enter the details for this demonstration step." /></Field>:<><Badge tone="purple">Simulated creation step</Badge><p>{/Pending/.test(title)?'Submission is awaiting explicit simulated confirmation. Pending does not mean confirmed.':/confirmed/i.test(title)?'This is a local demonstration completion, not a blockchain confirmation.':'Review the question, binary outcomes, deadline, sources, and illustrative costs before proceeding.'}</p></>}<Button onClick={()=>{setReviewed(true);onNext?.()}}>Review demo step</Button>{reviewed&&<p role="status" className="positive">Step reviewed locally.</p>}</Panel>
}
