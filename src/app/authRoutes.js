export const authRoutes = [
  {
    "path": "/auth",
    "name": "Auth Methods",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenAuthMethodsPage",
    "component": "AuthMethodsPage",
    "file": "src/pages/auth/AuthMethodsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/login",
    "name": "Login",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenLoginPage",
    "component": "LoginPage",
    "file": "src/pages/auth/LoginPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/signup",
    "name": "Signup",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenSignupPage",
    "component": "SignupPage",
    "file": "src/pages/auth/SignupPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/wallet",
    "name": "Wallet Auth",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenWalletAuthPage",
    "component": "WalletAuthPage",
    "file": "src/pages/auth/WalletAuthPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/check-email",
    "name": "Check Email",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenCheckEmailPage",
    "component": "CheckEmailPage",
    "file": "src/pages/auth/CheckEmailPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/verify-email",
    "name": "Verify Email",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenVerifyEmailPage",
    "component": "VerifyEmailPage",
    "file": "src/pages/auth/VerifyEmailPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/verify-code",
    "name": "Verify Code",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenVerifyCodePage",
    "component": "VerifyCodePage",
    "file": "src/pages/auth/VerifyCodePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/forgot-password",
    "name": "Forgot Password",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenForgotPasswordPage",
    "component": "ForgotPasswordPage",
    "file": "src/pages/auth/ForgotPasswordPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/reset-password",
    "name": "Reset Password",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenResetPasswordPage",
    "component": "ResetPasswordPage",
    "file": "src/pages/auth/ResetPasswordPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/callback",
    "name": "Auth Callback",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenAuthCallbackPage",
    "component": "AuthCallbackPage",
    "file": "src/pages/auth/AuthCallbackPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/error",
    "name": "Auth Error",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenAuthErrorPage",
    "component": "AuthErrorPage",
    "file": "src/pages/auth/AuthErrorPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/session-expired",
    "name": "Session Expired",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "demo",
    "priority": "P0",
    "id": "auth.screenSessionExpiredPage",
    "component": "SessionExpiredPage",
    "file": "src/pages/auth/SessionExpiredPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/mfa",
    "name": "Mfa",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "unavailable",
    "priority": "future",
    "id": "auth.screenMfaPage",
    "component": "MfaPage",
    "file": "src/pages/auth/MfaPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/auth/recovery",
    "name": "Recovery",
    "feature": "auth",
    "layout": "AuthLayout",
    "access": "public",
    "availability": "unavailable",
    "priority": "future",
    "id": "auth.screenRecoveryPage",
    "component": "RecoveryPage",
    "file": "src/pages/auth/RecoveryPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/onboarding/wallet",
    "name": "OnboardingWallet",
    "feature": "onboarding",
    "layout": "AuthLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P0",
    "id": "onboarding.OnboardingWalletPage",
    "component": "OnboardingWalletPage",
    "file": "src/pages/onboarding/OnboardingWalletPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/settings/account",
    "name": "AccountSettings",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "availability": "demo",
    "priority": "P0",
    "id": "settings.AccountSettingsPage",
    "component": "AccountSettingsPage",
    "file": "src/pages/settings/AccountSettingsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  },
  {
    "path": "/settings/security/mfa",
    "name": "SecurityMfa",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "availability": "unavailable",
    "priority": "future",
    "id": "settings.SecurityMfaPage",
    "component": "SecurityMfaPage",
    "file": "src/pages/settings/SecurityMfaPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [],
      "error": [
        "global.recoverableError"
      ]
    }
  }
]
