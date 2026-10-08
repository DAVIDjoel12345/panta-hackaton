/**
 * @typedef {'P0' | 'P1' | 'future'} Priority
 * @typedef {'public' | 'wallet-required' | 'authenticated' | 'moderator'} Access
 * @typedef {'PublicLayout' | 'ApplicationLayout' | 'CreatorLayout' | 'SettingsLayout' | 'ModerationLayout' | 'AuthLayout'} LayoutName
 * @typedef {{ loading: string[], empty: string[], error: string[] }} RouteStates
 * @typedef {Object} RouteDefinition
 * @property {string} id
 * @property {string} path
 * @property {string} name
 * @property {string} component
 * @property {string} file
 * @property {string} feature
 * @property {LayoutName} layout
 * @property {Access} access Metadata only, not a security boundary.
 * @property {'demo'|'unavailable'|'live'} [availability]
 * @property {Priority} priority
 * @property {RouteStates} states
 * @property {RouteDefinition[]} [children] Children use full absolute paths.
 * @typedef {{ id: string, name: string, component: string, file: string, priority: Priority }} StateDefinition
 */
export {}
