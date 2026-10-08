import type { AnalysisContextResponse, AnalysisResponse } from '../../modules/ai-analysis/ai-analysis.response.js';
import type { MarketDraftInput } from '../../modules/market-drafts/market-drafts.request.js';
/** Output must be schema validated. All retrieved/user text is untrusted data. */
export interface AiAdapter {
  explain(context: AnalysisContextResponse): Promise<AnalysisResponse>;
  proposeMarketDraft(prompt: string): Promise<MarketDraftInput>;
}

