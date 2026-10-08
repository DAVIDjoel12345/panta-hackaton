// Fictional, deterministic demonstration data. Never provider data or live quotes.
export const SNAPSHOT = '2026-10-05T16:00:00Z'
export const categories = ['All markets', 'Crypto', 'Technology', 'Science', 'Culture', 'Climate']
export const markets = [
  { id: 'demo-btc', question: 'Will Bitcoin reach $100,000 before the end of 2026?', category: 'Crypto', icon: 'bitcoin', yes: 64, movement: 4.2, volume: 128450, close: '2026-12-31T23:59:00Z', status: 'Open', room: 'crypto', history: [43, 46, 42, 48, 46, 51, 49, 54, 50, 57, 55, 59, 56, 62, 59, 64], criteria: 'Resolves YES if the reference BTC/USD daily closing price is at least $100,000 on any UTC day before the deadline. Otherwise resolves NO.', source: 'https://www.coinbase.com/price/bitcoin', sourceLabel: 'Proposed price reference · Coinbase', color: 'orange' },
  { id: 'demo-ai', question: 'Will an open-source AI model top the benchmark this year?', category: 'Technology', icon: 'sparkles', yes: 72, movement: 6.8, volume: 86400, close: '2026-12-20T23:59:00Z', status: 'Open', room: 'technology', history: [51, 49, 55, 53, 57, 56, 61, 58, 64, 62, 66, 64, 70, 68, 71, 72], criteria: 'Illustrative criteria: a publicly downloadable model must rank first on the named benchmark snapshot at the deadline. The exact benchmark and tie-breaking rules need review before publication.', source: 'https://huggingface.co/spaces/lmarena-ai/chatbot-arena-leaderboard', sourceLabel: 'Proposed benchmark reference', color: 'purple' },
  { id: 'demo-moon', question: 'Will a commercial lander reach the Moon before March 2027?', category: 'Science', icon: 'orbit', yes: 38, movement: -2.1, volume: 54320, close: '2027-02-28T23:59:00Z', status: 'Open', room: 'science', history: [52, 49, 50, 45, 48, 46, 42, 44, 40, 43, 39, 41, 38, 40, 39, 38], criteria: 'Resolves YES on a publicly documented soft landing by a commercial operator before the deadline. An impact or flyby does not qualify.', source: 'https://www.nasa.gov/', sourceLabel: 'Proposed mission reference · NASA', color: 'blue' },
  { id: 'demo-solar', question: 'Will solar supply 15% of the fictional Northgrid energy mix?', category: 'Climate', icon: 'sun', yes: 56, movement: 1.7, volume: 32750, close: '2026-11-30T23:59:00Z', status: 'Open', room: 'science', history: [48, 50, 49, 52, 51, 54, 53, 52, 55, 53, 55, 54, 56, 55, 54, 56], criteria: 'Fictional example only: resolves YES if the Northgrid demonstration report records a solar share of at least 15%. No real reporting source is supplied.', source: null, sourceLabel: 'Source unavailable · fictional example', color: 'green' },
  { id: 'demo-film', question: 'Will an independent film lead the autumn audience poll?', category: 'Culture', icon: 'film', yes: 47, movement: -1.3, volume: null, close: '2026-10-12T18:00:00Z', status: 'Open', room: 'culture', history: [50, 48, 52, 49, 47, 50, 46, 49, 45, 48, 47, 49, 46, 48, 46, 47], criteria: 'Fictional audience poll: the highest-ranked title must be independently produced. The demonstration has no real poll result or settlement source.', source: null, sourceLabel: 'Source unavailable · fictional poll', color: 'pink' },
  { id: 'demo-eth', question: 'Will the demo network upgrade launch before October?', category: 'Crypto', icon: 'layers', yes: 100, movement: 12, volume: 194600, close: '2026-09-30T23:59:00Z', status: 'Resolved', result: 'YES', room: 'crypto', history: [62, 65, 64, 68, 72, 70, 76, 81, 85, 83, 89, 92, 96, 100, 100, 100], criteria: 'Fictional example: a successful upgrade must be recorded in the demonstration release log by the deadline. This sample result has no on-chain settlement.', source: null, sourceLabel: 'Demonstration release log', color: 'purple' },
  { id: 'demo-device', question: 'Will a new consumer device ship with a local AI assistant?', category: 'Technology', icon: 'chip', yes: 81, movement: 3.4, volume: 47320, close: '2026-11-15T23:59:00Z', status: 'Open', room: 'technology', history: [65, 67, 69, 66, 71, 73, 70, 75, 72, 77, 76, 78, 75, 80, 79, 81], criteria: 'The fictional product must ship to customers with an assistant that processes a documented set of requests on-device. An announcement alone does not qualify.', source: null, sourceLabel: 'Manufacturer source not selected', color: 'blue' },
  { id: 'demo-ocean', question: 'Will the ocean survey identify a new deep-sea species?', category: 'Science', icon: 'waves', yes: 59, movement: 2.3, volume: 21400, close: '2027-01-31T23:59:00Z', status: 'Open', room: 'science', history: [45, 47, 46, 49, 48, 50, 52, 51, 54, 53, 57, 55, 58, 56, 57, 59], criteria: 'A peer-reviewed description from the fictional expedition must be published by the deadline. Provisional observations are insufficient.', source: null, sourceLabel: 'Publication source not selected', color: 'teal' },
]
export const rooms = [
  { slug: 'crypto', name: 'Crypto Collective', description: 'Digital assets, protocols, and the questions shaping the next cycle.', category: 'Crypto', icon: 'bitcoin', color: 'orange', members: ['demo-alex', 'demo-mira'] },
  { slug: 'technology', name: 'The AI Frontier', description: 'A thoughtful space for models, milestones, and emerging technology.', category: 'Technology', icon: 'sparkles', color: 'purple', members: ['demo-mira', 'demo-jules'] },
  { slug: 'science', name: 'Beyond the Horizon', description: 'Follow the evidence. Explore space, climate, and scientific discovery.', category: 'Science', icon: 'orbit', color: 'blue', members: ['demo-alex', 'demo-jules'] },
  { slug: 'culture', name: 'Culture Club', description: 'The stories, films, and cultural moments worth talking about.', category: 'Culture', icon: 'film', color: 'pink', members: ['demo-mira'] },
]
export const profiles = [
  { id: 'demo-alex', name: 'Alex Morgan', handle: '@alexm', initials: 'AM', color: 'purple', bio: 'Curious about technology. Here for better questions and clearer evidence.', forecasts: 12, resolved: 4, accuracy: 75 },
  { id: 'demo-mira', name: 'Mira Chen', handle: '@mirac', initials: 'MC', color: 'green', bio: 'Following science, systems, and signals in the noise.', forecasts: 18, resolved: 5, accuracy: 60 },
  { id: 'demo-jules', name: 'Jules Park', handle: '@julesp', initials: 'JP', color: 'blue', bio: 'Thinking out loud about what comes next.', forecasts: 9, resolved: 3, accuracy: 67 },
]
export const positions = [
  { id: 'demo-pos-1', marketId: 'demo-btc', outcome: 'YES', shares: 100, entry: 58, status: 'Open', reference: 'demo-tx-001' },
  { id: 'demo-pos-2', marketId: 'demo-moon', outcome: 'NO', shares: 60, entry: 59, status: 'Open', reference: 'demo-tx-002' },
  { id: 'demo-pos-3', marketId: 'demo-eth', outcome: 'YES', shares: 80, entry: 70, status: 'Claimable', reference: 'demo-tx-003' },
]
export const transactions = [
  { id: 'demo-tx-001', marketId: 'demo-btc', action: 'Buy YES', amount: 58, status: 'Simulated confirmed', date: '2026-10-04T14:20:00Z' },
  { id: 'demo-tx-002', marketId: 'demo-moon', action: 'Buy NO', amount: 35.4, status: 'Simulated pending', date: '2026-10-03T12:10:00Z' },
  { id: 'demo-tx-003', marketId: 'demo-eth', action: 'Buy YES', amount: 56, status: 'Simulated confirmed', date: '2026-09-28T10:00:00Z' },
]
export const initialComments = [
  { id: 'demo-thread-1', room: 'crypto', marketId: 'demo-btc', author: 'demo-mira', text: 'The deadline and price source matter here. I would check the daily closing rule before forming a view.', replies: [], reported: false },
  { id: 'demo-thread-2', room: 'technology', marketId: 'demo-ai', author: 'demo-jules', text: 'Which snapshot determines the result? A reproducible benchmark makes this much easier to evaluate.', replies: [], reported: false },
]
export const initialNotifications = [
  { id: 'demo-notice-1', title: 'A demonstration claim is available', body: 'Review the sample resolved position and eligibility details.', href: '/claims/demo-claim-1', read: false, icon: 'gift' },
  { id: 'demo-notice-2', title: 'A conversation worth following', body: 'Mira shared a question about resolution sources.', href: '/rooms/crypto/discussion/demo-thread-1', read: false, icon: 'message' },
  { id: 'demo-notice-3', title: 'Welcome to Panta Signal', body: 'Explore the demo. Your actions stay in this browser session.', href: '/how-it-works', read: true, icon: 'sparkles' },
]
export const analysisFixture = {
  title: 'Understand the question, not just the price.',
  summary: 'A market price reflects the current illustrative quote, not a guarantee. Evaluate the closing deadline, exact resolution rule, and reliability of the proposed source before choosing an outcome.',
  factors: ['Check what must happen for YES to resolve.', 'Distinguish an announcement from a verified event.', 'Review the observation window and any tie-breaking rule.'],
  caveat: 'Fixed demonstration analysis. No AI request was made. The chart does not establish why a price changed, and this explanation does not predict the outcome.',
}
export const initialDraft = { id: 'demo-draft-1', question: 'Will a new lunar mission achieve a soft landing by March 2027?', description: 'A binary question about a documented commercial lunar landing.', category: 'Science', room: 'science', deadline: '2027-02-28T23:59', timezone: 'UTC', source: 'https://www.nasa.gov/', criteria: 'A documented soft landing before the UTC deadline qualifies. A flyby or impact does not.' }
export const demoBalance = { tokens: 250, network: 0.05, tradingFee: 0.5, networkFee: 0.01, creationFee: 2 }
export const findMarket = id => markets.find(market => market.id === id)
export const money = value => value == null ? 'Unavailable' : new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value)
export const volumeLabel = value => value == null ? 'Unavailable' : value >= 1000 ? `$${(value / 1000).toFixed(1)}k` : money(value)
export const dateLabel = value => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
