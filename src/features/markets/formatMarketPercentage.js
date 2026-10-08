export function formatMarketPercentage(value, digits = 2, unavailable = 'Unavailable') {
  if (value == null || value === '') return unavailable
  const price = Number(value)
  if (!Number.isFinite(price) || price < 0 || price > 1) return unavailable
  return `${(price * 100).toFixed(digits)}%`
}
