/** No optional authentication or appeal flow is enabled by this scaffold. */
export const featureFlags = Object.freeze({ emailPassword: false, emailVerification: false, passwordReset: false, magicLink: false, emailCode: false, socialAuth: false, mfa: false, appeals: false });
export type FeatureFlag = keyof typeof featureFlags;

