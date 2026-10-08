# Market loading cleanup

Completed:

- Extracted the reusable Panta card from the Explore page into `src/features/markets/PantaMarketCard.jsx`. Landing now imports the card directly.
- Removed Landing's duplicate spotlight detail query; the visible card already fetches its own detail and quotes.
- Lazy-loaded market details, including the trading chart and ticket, when a market is opened.
- Replaced individual sparkline segments with one polyline per outcome, preserving straight lines, timestamps, colors and single-quote indicators.
- Retained progressive catalog loading, the bounded public catalog cache, background refresh, and accurate incomplete/stale labels.

Further cleanup candidates require dependency tracing before deletion: legacy demo views and route wrappers are still imported by route loaders. They are not proven unused. Generated build output, local databases, credentials, and browser profiles are not source cleanup targets.

The remaining initial bundle is still above Vite's 500 KB warning threshold. A future pass should inspect eager imports in LiveScreen and shared providers before splitting additional features. Faster rendering does not reduce Panta's upstream response time or create a streaming endpoint.
