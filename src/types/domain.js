/**
 * App-owned opaque identifiers only. These are not Panta response schemas.
 * @typedef {string} MarketId
 * @typedef {string} PositionId
 * @typedef {string} ClaimId
 * @typedef {string} WalletAddress
 * @typedef {string} TransactionSignature
 * @typedef {'yes' | 'no'} Outcome
 * @typedef {'submitting' | 'submitted' | 'pending' | 'confirmation-unknown' | 'confirmed' | 'failed' | 'expired' | 'reconciling'} TransactionStatus
 * @typedef {{ kind: 'forecast-accuracy' }} ForecastAccuracyConcept
 * @typedef {{ kind: 'reputation' }} ReputationConcept
 * @typedef {{ kind: 'trading-returns' }} TradingReturnsConcept
 * The three concepts above are separate; no scores, formulas or returns are implemented.
 */
export {}
