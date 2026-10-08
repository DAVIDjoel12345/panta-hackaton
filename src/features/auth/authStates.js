const groups = {
  walletAuth: ['wallet unavailable','wallet not installed','connecting','connection rejected','connection failed','unsupported network','account selected','account changed during authentication','challenge loading','challenge unavailable','awaiting signature','signature rejected','signature invalid','challenge expired','verification pending','verification failed','authenticated','session creation failed'],
  registration: ['initial','invalid form','submitting','verification required','email sent','resend available','resend cooldown','rate limited','request failed','verification complete','verification link expired','verification link invalid','verification already complete'],
  login: ['idle','invalid fields','submitting','invalid credentials','verification required','additional security challenge required','rate limited','service unavailable','network error','login complete'],
  emailVerification: ['waiting','verifying','incorrect code','expired code','invalid link','previously used link','resend cooldown','too many attempts','verified','failed'],
  passwordRecovery: ['request loading','generic request success','rate limited','link validation','invalid link','expired link','already used link','password policy failure','password mismatch','reset submitting','reset complete','reset failed'],
  socialAuth: ['redirecting','callback loading','cancelled authorization','failed callback','missing or invalid callback state','provider unavailable','successful session','account linking confirmation'],
  accountSecurity: ['reauthentication required','add wallet','confirm wallet association','wallet already linked','remove wallet','last sign in method protected','change email','verify new email','change password','active sessions','revoke session','sign out everywhere','deletion requested'],
  optionalMfa: ['unavailable','setup','challenge','invalid code','expired code','recovery method','setup complete','disable confirmation'],
  onboardingAuth: ['loading','saving','validation error','username unavailable','save failed','resume incomplete onboarding','skip optional step','complete'],
  sessionAuth: ['checking','guest','authenticated','expired','refreshing','offline','access denied'],
  splash: ['initial','logo reveal','signal line','pulse','tagline','exit','skipped','already played','reduced motion','asset failure fallback'],
}
const context = {
  walletAuth: 'Wallet selection does not prove ownership. The server must bind a fresh nonce, domain, expiry and account to a verified signature.',
  registration: 'This is a local registration example. No email is sent and no account lookup is performed; safe form values remain in memory.',
  login: 'No credentials are checked by a provider. Login errors use a generic response that does not disclose account existence.',
  emailVerification: 'No secret is delivered or written to a URL. A production provider must enforce expiry, attempts and resend limits.',
  passwordRecovery: 'The generic response does not reveal whether an account exists. A password reset never automatically creates a session.',
  socialAuth: 'Only the fictional example provider is configured. OAuth state validation, PKCE and token exchange require a server.',
  accountSecurity: 'Sensitive changes require a separate reauthentication confirmation. Wallet association is not transaction approval.',
  optionalMfa: 'MFA and recovery are unavailable in this build. This preview is a design state, not an enrolled security method.',
  onboardingAuth: 'Profile and interests are kept in memory for this demonstration. You can resume the incomplete setup without losing safe entries.',
  sessionAuth: 'Frontend session gates organize the experience; a backend must enforce authorization. Public browsing remains available.',
  splash: 'The optional landing intro lasts 1.3 seconds, supports immediate skipping, and never waits for an API or authentication.',
}
const details = {
  'walletAuth.challengeExpired': 'The challenge is no longer usable. Request a fresh challenge before simulating another signature.',
  'walletAuth.accountChangedDuringAuthentication': 'The selected account changed. Discard the pending challenge and request one bound to the new account.',
  'walletAuth.signatureRejected': 'The signing request was declined. Your account is connected, but ownership has not been verified.',
  'accountSecurity.lastSignInMethodProtected': 'Keep a verified email or another verified wallet before removing the last usable sign-in method.',
  'sessionAuth.offline': 'Previously displayed content remains visible. Account-changing actions must wait for a valid session.',
  'login.invalidCredentials': 'Unable to sign in with these details. Check your entries or use the recovery flow.',
}
const camel = text => text.replace(/ ([a-z])/g,(_,c)=>c.toUpperCase())
export const authStates = Object.entries(groups).flatMap(([group,labels])=>labels.map(label=>{const id=`${group}.${camel(label)}`;return {id,group,name:label[0].toUpperCase()+label.slice(1),description:details[id]||context[group],priority:'P0'}}))
