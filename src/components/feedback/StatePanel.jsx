import { stateManifest } from '../../app/stateManifest.js'
import { Button, Badge, Link } from '../ui/primitives.jsx'
import Icon from '../ui/Icon.jsx'

const explanations = [
  [/insufficientNetworkFee/i, 'The demo network-fee balance cannot cover the illustrative network fee. Your amount and outcome are preserved.', 'Review amount'],
  [/insufficient|balance/i, 'The illustrative balance is not enough for this action, including fees. Reduce the amount or return to the review.', 'Review amount'],
  [/notFound/i, 'This demonstration reference does not match an available record. Check the URL or return to the collection.', 'Go back'],
  [/invalidRoute/i, 'This URL contains an invalid or incomplete parameter. Open an item from its collection instead.', 'Explore markets'],
  [/quoteExpired|feeQuoteExpired/i, 'The illustrative quote is no longer valid. Request a new demo quote before reviewing again. Your input is preserved.', 'Refresh quote'],
  [/expired/i, 'This demonstration approval or session has expired. Start a new review before continuing; nothing was submitted.', 'Start again'],
  [/confirmationStatusUnknown/i, 'A submitted request is not a confirmed transaction. In this scenario its final status is unknown; do not submit a duplicate.', 'Reconcile status'],
  [/reconciliation|synchronization/i, 'Compare the demonstration reference with its latest local status before retrying. No provider or blockchain is being queried.', 'Review status'],
  [/submitted/i, 'The demo request has been submitted in the simulator. Submission does not establish confirmation or payout.', 'Inspect reference'],
  [/pending/i, 'This simulated action is awaiting an explicit next step. Pending is not confirmation. Use the scenario controls to continue.', 'Review status'],
  [/confirmed|complete|success/i, 'The local demonstration finished successfully. This is a simulated result, not a blockchain confirmation or real payout.', 'Continue'],
  [/rejected/i, 'Approval was declined in the demonstration. No funds moved and your inputs remain available for another review.', 'Return to review'],
  [/awaiting|approveWallet/i, 'The demonstration is waiting for approval. No wallet signature is requested or collected.', 'Review approval'],
  [/submitting/i, 'The simulator is at the submission step. Use the explicit scenario control to advance; no network request is running.', 'Inspect status'],
  [/unsupportedNetwork/i, 'The selected demo network is unsupported for this scenario. Use the supported demo network to continue.', 'Change demo network'],
  [/marketClosed|marketUnresolved/i, 'The market lifecycle does not permit this action. Trading closes at the deadline; claims require a resolved result.', 'Review market rules'],
  [/alreadyClaimed/i, 'This demonstration claim is already marked completed. It cannot be claimed twice in this browser session.', 'View claim history'],
  [/notEligible|eligibilityChanged/i, 'The demonstration position does not meet the current claim requirements. Eligibility is separate from a completed payout.', 'Review eligibility'],
  [/eligible/i, 'This fixture meets the demonstration claim criteria. Review the outcome and payout before starting the simulated claim.', 'Review claim'],
  [/missingDeadline|invalidDate/i, 'Choose a valid future closing date and an explicit timezone before proceeding.', 'Edit deadline'],
  [/missingResolutionSource|missingSource|incompleteResolutionCriteria/i, 'Add a verifiable source and an observation rule that clearly determines YES or NO.', 'Edit resolution rules'],
  [/ambiguous|duplicate/i, 'Review the prediction wording, existing questions, and exact observation rules before proceeding. This is a fixed demonstration warning.', 'Review draft'],
  [/invalidAiOutput/i, 'The example drafting response does not satisfy the required question structure. Keep your draft and edit it manually.', 'Edit draft'],
  [/validation/i, 'Review the amount, selected outcome, deadline, and required fields. A local validation result does not authorize a real transaction.', 'Review inputs'],
  [/missingMarketHistory|missingData|sourcesUnavailable/i, 'The supplied fixture lacks sufficient history or a verified source. An explanation cannot fill that gap or infer the outcome.', 'Review sources'],
  [/stale/i, 'This screen uses an older demonstration snapshot. Treat prices and analysis as illustrative rather than current.', 'Review snapshot'],
  [/partial/i, 'Some fixture fields are intentionally unavailable. Available records remain visible; missing values are not treated as zero.', 'Review available data'],
  [/walletRequired|walletDisconnected|walletNotDetected/i, 'Connect the clearly labelled demo wallet to explore this flow. No extension, private key, or real wallet is required.', 'Open demo wallet'],
  [/authenticationRequired|signInChallenge/i, 'This action normally requires a wallet-authenticated session. The demo uses an explicit simulated sign-in and never asks you to sign.', 'Review demo sign-in'],
  [/accessDenied|unauthorized|anotherWallet|restricted|postingRestricted/i, 'This demonstration role or account cannot access the requested action. Frontend visibility is not real authorization.', 'Review access'],
  [/offline|reconnecting/i, 'A disconnected experience is being previewed. Your local inputs are retained; no live service reconnect is attempted.', 'Try local preview again'],
  [/rateLimited/i, 'The rate-limit scenario pauses new requests. The demo does not send requests or automatically retry.', 'Return to workspace'],
  [/loading|generating|checking|connecting|skeleton/i, 'Preview of the in-progress state. Use the explicit simulation control to choose the next result; there is no background network request.', 'Choose next scenario'],
  [/unavailable|failed|failure|error/i, 'This action could not finish in the selected demonstration scenario. Keep your current input and retry locally or inspect the available information.', 'Try again'],
  [/noSearchResults/i, 'No illustrative markets match these search terms and filters. Clear a filter or try a broader question.', 'Clear filters'],
  [/^no[A-Z]|^empty/i, 'There are no matching demonstration records in this view. Change the filter or create a local example to get started.', 'Explore available content'],
  [/removed|locked/i, 'This conversation is read-only in the selected scenario. Existing content stays visible; posting is disabled.', 'Return to discussion'],
  [/reported/i, 'This content is marked for demonstration review. No report was sent to a real moderation service.', 'Return to discussion'],
  [/unsaved/i, 'Your edits are only in this form. Save the local demonstration changes before leaving this screen.', 'Continue editing'],
  [/saved|saveConfirmation/i, 'Your changes were saved to the current demonstration session. Reloading the application resets the session.', 'Continue'],
  [/confirmation|review/i, 'Check the details before explicitly continuing. This demonstration action affects only the current browser session.', 'Review details'],
]
function describeState(id) {
  const record = stateManifest.find(state => state.id === id)
  const name = record?.name || id.split('.').pop().replace(/([a-z])([A-Z])/g, '$1 $2')
  const match = explanations.find(([pattern]) => pattern.test(id.split('.').pop()))
  return { title: name, description: `${name}: ${match?.[1] || 'Inspect this local demonstration step and choose how to continue. No external service is active.'}`, action: match?.[2] || 'Continue', severity: /failed|error|rejected|invalid|denied|insufficient|unavailable/i.test(id) ? 'danger' : /confirmed|success|complete|eligible|saved/i.test(id) ? 'positive' : 'muted' }
}
export default function StatePanel({ id = 'global.emptyState', onAction, compact = false }) {
  const state = describeState(id)
  return <section className={`state-panel ${compact ? 'compact' : ''}`} data-ui-state={id} aria-live="polite"><div className={`state-symbol ${state.severity}`}><Icon name={state.severity === 'danger' ? 'alert' : state.severity === 'positive' ? 'check' : 'clock'} size={24} /></div><Badge tone="purple">Simulated state</Badge><h2>{state.title}</h2><p>{state.description}</p>{onAction ? <Button onClick={onAction}>{state.action}</Button> : <Link href="/markets" className="button secondary">Explore markets</Link>}</section>
}
export function ScenarioControl({ feature, value, onChange, extra = [] }) {
  const entries = stateManifest.filter(state => state.id.startsWith(`${feature}.`))
  return <label className="scenario-control"><span><Icon name="settings" size={14} /> Demo scenario</span><select value={value} onChange={event => onChange(event.target.value)}><option value="">Normal view</option>{entries.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}{extra.map(state => <option key={state.id} value={state.id}>{state.name}</option>)}</select></label>
}
