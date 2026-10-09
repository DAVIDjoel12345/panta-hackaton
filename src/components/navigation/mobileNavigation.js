export function primaryMobileDestination(route) {
  if (['discovery', 'markets'].includes(route.feature)) return '/markets'
  if (route.feature === 'community') return '/rooms'
  if (route.feature === 'creation') return '/create'
  if (['portfolio', 'positions', 'transactions'].includes(route.feature)) return '/portfolio'
  return 'more'
}
