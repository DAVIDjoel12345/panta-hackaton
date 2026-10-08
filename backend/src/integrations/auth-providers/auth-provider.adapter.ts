/** Optional identity only. Email or social verification never proves wallet ownership. */
export interface AuthProviderAdapter {
  verifyCallback(input: { provider: string; code: string; state: string; verifier: string }): Promise<{ providerSubject: string; verifiedEmail?: string }>;
}

