import { communityRoutes } from './communityRoutes.js'
import { authRoutes } from './authRoutes.js'
/** Access and priority are planning metadata, never security enforcement.
 * @type {import('../types/scaffold.js').RouteDefinition[]}
 */
export const routeTree = [
  ...authRoutes,
  ...communityRoutes,
  {
    "path": "/",
    "name": "Landing",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.landing",
    "component": "LandingPage",
    "file": "src/pages/discovery/LandingPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets",
    "name": "Explore markets",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.exploreMarkets",
    "component": "ExploreMarketsPage",
    "file": "src/pages/discovery/ExploreMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/search",
    "name": "Global search results",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.globalSearchResults",
    "component": "GlobalSearchResultsPage",
    "file": "src/pages/discovery/GlobalSearchResultsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets/trending",
    "name": "Trending markets",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.trendingMarkets",
    "component": "TrendingMarketsPage",
    "file": "src/pages/discovery/TrendingMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets/movers",
    "name": "Probability movers",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.probabilityMovers",
    "component": "ProbabilityMoversPage",
    "file": "src/pages/discovery/ProbabilityMoversPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets/new",
    "name": "New markets",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.newMarkets",
    "component": "NewMarketsPage",
    "file": "src/pages/discovery/NewMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets/high-volume",
    "name": "High-volume markets",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.highVolumeMarkets",
    "component": "HighVolumeMarketsPage",
    "file": "src/pages/discovery/HighVolumeMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets/ending-soon",
    "name": "Ending-soon markets",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.endingSoonMarkets",
    "component": "EndingSoonMarketsPage",
    "file": "src/pages/discovery/EndingSoonMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets/resolved",
    "name": "Resolved markets",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.resolvedMarkets",
    "component": "ResolvedMarketsPage",
    "file": "src/pages/discovery/ResolvedMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/categories/:categorySlug",
    "name": "Category markets",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.categoryMarkets",
    "component": "CategoryMarketsPage",
    "file": "src/pages/discovery/CategoryMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/compare",
    "name": "Market comparison",
    "feature": "discovery",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "discovery.marketComparison",
    "component": "MarketComparisonPage",
    "file": "src/pages/discovery/MarketComparisonPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.noSearchResults"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/how-it-works",
    "name": "How it works",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.howItWorks",
    "component": "HowItWorksPage",
    "file": "src/pages/information/HowItWorksPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/faq",
    "name": "FAQ",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.faq",
    "component": "FaqPage",
    "file": "src/pages/information/FaqPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/help",
    "name": "Help center",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.helpCenter",
    "component": "HelpCenterPage",
    "file": "src/pages/information/HelpCenterPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/help/:articleSlug",
    "name": "Help article",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.helpArticle",
    "component": "HelpArticlePage",
    "file": "src/pages/information/HelpArticlePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/support",
    "name": "Contact/support",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.contactSupport",
    "component": "ContactSupportPage",
    "file": "src/pages/information/ContactSupportPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/legal/terms",
    "name": "Terms",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.terms",
    "component": "TermsPage",
    "file": "src/pages/information/TermsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/legal/privacy",
    "name": "Privacy",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.privacy",
    "component": "PrivacyPage",
    "file": "src/pages/information/PrivacyPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/legal/risk",
    "name": "Risk disclosure",
    "feature": "information",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "information.riskDisclosure",
    "component": "RiskDisclosurePage",
    "file": "src/pages/information/RiskDisclosurePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable"
      ]
    }
  },
  {
    "path": "/markets/:marketId",
    "name": "Market overview",
    "feature": "markets",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "P0",
    "id": "markets.marketOverview",
    "component": "MarketOverviewPage",
    "file": "src/pages/markets/MarketOverviewPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    },
    "children": [
      {
        "path": "/markets/:marketId/history",
        "name": "Price/history",
        "feature": "markets",
        "layout": "PublicLayout",
        "access": "public",
        "priority": "P0",
        "id": "markets.priceHistory",
        "component": "PriceHistoryPage",
        "file": "src/pages/markets/PriceHistoryPage.jsx",
        "states": {
          "loading": [
            "global.pageLoading"
          ],
          "empty": [
            "global.emptyState"
          ],
          "error": [
            "global.recoverableError",
            "global.apiUnavailable",
            "global.invalidRouteParameter",
            "global.notFound"
          ]
        }
      },
      {
        "path": "/markets/:marketId/rules",
        "name": "Resolution criteria and sources",
        "feature": "markets",
        "layout": "PublicLayout",
        "access": "public",
        "priority": "P0",
        "id": "markets.resolutionCriteriaAndSources",
        "component": "ResolutionCriteriaAndSourcesPage",
        "file": "src/pages/markets/ResolutionCriteriaAndSourcesPage.jsx",
        "states": {
          "loading": [
            "global.pageLoading"
          ],
          "empty": [
            "global.emptyState"
          ],
          "error": [
            "global.recoverableError",
            "global.apiUnavailable",
            "global.invalidRouteParameter",
            "global.notFound"
          ]
        }
      },
      {
        "path": "/markets/:marketId/analysis",
        "name": "AI explanation",
        "feature": "markets",
        "layout": "PublicLayout",
        "access": "public",
        "priority": "P0",
        "id": "markets.aiExplanation",
        "component": "AiExplanationPage",
        "file": "src/pages/markets/AiExplanationPage.jsx",
        "states": {
          "loading": [
            "ai.loadingContext"
          ],
          "empty": [
            "ai.missingMarketHistory"
          ],
          "error": [
            "ai.sourcesUnavailable",
            "ai.aiServiceUnavailable",
            "ai.staleAnalysis",
            "global.invalidRouteParameter",
            "global.notFound"
          ]
        }
      },
      {
        "path": "/markets/:marketId/activity",
        "name": "Market activity",
        "feature": "markets",
        "layout": "PublicLayout",
        "access": "public",
        "priority": "P0",
        "id": "markets.marketActivity",
        "component": "MarketActivityPage",
        "file": "src/pages/markets/MarketActivityPage.jsx",
        "states": {
          "loading": [
            "global.pageLoading"
          ],
          "empty": [
            "global.emptyState"
          ],
          "error": [
            "global.recoverableError",
            "global.apiUnavailable",
            "global.invalidRouteParameter",
            "global.notFound"
          ]
        }
      },
      {
        "path": "/markets/:marketId/related",
        "name": "Related markets",
        "feature": "markets",
        "layout": "PublicLayout",
        "access": "public",
        "priority": "P0",
        "id": "markets.relatedMarkets",
        "component": "RelatedMarketsPage",
        "file": "src/pages/markets/RelatedMarketsPage.jsx",
        "states": {
          "loading": [
            "global.pageLoading"
          ],
          "empty": [
            "global.emptyState"
          ],
          "error": [
            "global.recoverableError",
            "global.apiUnavailable",
            "global.invalidRouteParameter",
            "global.notFound"
          ]
        }
      },
      {
        "path": "/markets/:marketId/result",
        "name": "Market resolution/result",
        "feature": "markets",
        "layout": "PublicLayout",
        "access": "public",
        "priority": "P0",
        "id": "markets.marketResolutionResult",
        "component": "MarketResolutionResultPage",
        "file": "src/pages/markets/MarketResolutionResultPage.jsx",
        "states": {
          "loading": [
            "global.pageLoading"
          ],
          "empty": [
            "global.emptyState"
          ],
          "error": [
            "global.recoverableError",
            "global.apiUnavailable",
            "global.invalidRouteParameter",
            "global.notFound"
          ]
        }
      },
      {
        "path": "/markets/:marketId/discussion",
        "name": "Discussion",
        "feature": "markets",
        "layout": "PublicLayout",
        "access": "public",
        "priority": "future",
        "id": "markets.discussion",
        "component": "DiscussionPage",
        "file": "src/pages/markets/DiscussionPage.jsx",
        "states": {
          "loading": [
            "global.pageLoading"
          ],
          "empty": [
            "global.emptyState"
          ],
          "error": [
            "global.recoverableError",
            "global.apiUnavailable",
            "global.invalidRouteParameter",
            "global.notFound"
          ]
        }
      }
    ]
  },
  {
    "path": "/transactions",
    "name": "Transaction history",
    "feature": "transactions",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "transactions.transactionHistory",
    "component": "TransactionHistoryPage",
    "file": "src/pages/transactions/TransactionHistoryPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "trading.confirmationStatusUnknown",
        "trading.transactionFailed",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/transactions/:signature",
    "name": "Transaction details",
    "feature": "transactions",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "transactions.transactionDetails",
    "component": "TransactionDetailsPage",
    "file": "src/pages/transactions/TransactionDetailsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "trading.confirmationStatusUnknown",
        "trading.transactionFailed",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/onboarding",
    "name": "Onboarding",
    "feature": "onboarding",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "P0",
    "id": "onboarding.onboarding",
    "component": "OnboardingPage",
    "file": "src/pages/onboarding/OnboardingPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/onboarding/profile",
    "name": "Onboarding profile",
    "feature": "onboarding",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "P0",
    "id": "onboarding.onboardingProfile",
    "component": "OnboardingProfilePage",
    "file": "src/pages/onboarding/OnboardingProfilePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/onboarding/interests",
    "name": "Onboarding interests",
    "feature": "onboarding",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "P0",
    "id": "onboarding.onboardingInterests",
    "component": "OnboardingInterestsPage",
    "file": "src/pages/onboarding/OnboardingInterestsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/onboarding/complete",
    "name": "Onboarding complete",
    "feature": "onboarding",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "P0",
    "id": "onboarding.onboardingComplete",
    "component": "OnboardingCompletePage",
    "file": "src/pages/onboarding/OnboardingCompletePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/portfolio",
    "name": "Portfolio overview",
    "feature": "portfolio",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "portfolio.portfolioOverview",
    "component": "PortfolioOverviewPage",
    "file": "src/pages/portfolio/PortfolioOverviewPage.jsx",
    "states": {
      "loading": [
        "portfolio.loadingPositions"
      ],
      "empty": [
        "portfolio.noPositions"
      ],
      "error": [
        "portfolio.positionsUnavailable",
        "portfolio.staleData",
        "portfolio.partialData",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/portfolio/open",
    "name": "Open positions",
    "feature": "portfolio",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "portfolio.openPositions",
    "component": "OpenPositionsPage",
    "file": "src/pages/portfolio/OpenPositionsPage.jsx",
    "states": {
      "loading": [
        "portfolio.loadingPositions"
      ],
      "empty": [
        "portfolio.noOpenPositions"
      ],
      "error": [
        "portfolio.positionsUnavailable",
        "portfolio.staleData",
        "portfolio.partialData",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/portfolio/resolved",
    "name": "Resolved positions",
    "feature": "portfolio",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "portfolio.resolvedPositions",
    "component": "ResolvedPositionsPage",
    "file": "src/pages/portfolio/ResolvedPositionsPage.jsx",
    "states": {
      "loading": [
        "portfolio.loadingPositions"
      ],
      "empty": [
        "portfolio.noResolvedPositions"
      ],
      "error": [
        "portfolio.positionsUnavailable",
        "portfolio.staleData",
        "portfolio.partialData",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/portfolio/claimable",
    "name": "Claimable positions",
    "feature": "portfolio",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "portfolio.claimablePositions",
    "component": "ClaimablePositionsPage",
    "file": "src/pages/portfolio/ClaimablePositionsPage.jsx",
    "states": {
      "loading": [
        "portfolio.loadingPositions"
      ],
      "empty": [
        "portfolio.noClaimablePositions"
      ],
      "error": [
        "portfolio.positionsUnavailable",
        "portfolio.staleData",
        "portfolio.partialData",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/portfolio/activity",
    "name": "Portfolio activity",
    "feature": "portfolio",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "portfolio.portfolioActivity",
    "component": "PortfolioActivityPage",
    "file": "src/pages/portfolio/PortfolioActivityPage.jsx",
    "states": {
      "loading": [
        "portfolio.loadingPositions"
      ],
      "empty": [
        "portfolio.noPositions"
      ],
      "error": [
        "portfolio.positionsUnavailable",
        "portfolio.staleData",
        "portfolio.partialData",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/positions/:positionId",
    "name": "Position details",
    "feature": "positions",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "positions.positionDetails",
    "component": "PositionDetailsPage",
    "file": "src/pages/positions/PositionDetailsPage.jsx",
    "states": {
      "loading": [
        "portfolio.loadingPositions"
      ],
      "empty": [
        "portfolio.positionNotFound"
      ],
      "error": [
        "portfolio.positionsUnavailable",
        "portfolio.positionBelongsToAnotherWallet",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/claims",
    "name": "Claims overview",
    "feature": "claims",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "claims.claimsOverview",
    "component": "ClaimsOverviewPage",
    "file": "src/pages/claims/ClaimsOverviewPage.jsx",
    "states": {
      "loading": [
        "claims.checkingEligibility"
      ],
      "empty": [
        "claims.noClaimsAvailable"
      ],
      "error": [
        "claims.eligibilityUnavailable",
        "claims.claimFailed",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/claims/available",
    "name": "Available claims",
    "feature": "claims",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "claims.availableClaims",
    "component": "AvailableClaimsPage",
    "file": "src/pages/claims/AvailableClaimsPage.jsx",
    "states": {
      "loading": [
        "claims.checkingEligibility"
      ],
      "empty": [
        "claims.noClaimsAvailable"
      ],
      "error": [
        "claims.eligibilityUnavailable",
        "claims.claimFailed",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/claims/pending",
    "name": "Pending claims",
    "feature": "claims",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "claims.pendingClaims",
    "component": "PendingClaimsPage",
    "file": "src/pages/claims/PendingClaimsPage.jsx",
    "states": {
      "loading": [
        "claims.checkingEligibility"
      ],
      "empty": [
        "claims.noClaimsAvailable"
      ],
      "error": [
        "claims.eligibilityUnavailable",
        "claims.claimFailed",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/claims/history",
    "name": "Claim history",
    "feature": "claims",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "claims.claimHistory",
    "component": "ClaimHistoryPage",
    "file": "src/pages/claims/ClaimHistoryPage.jsx",
    "states": {
      "loading": [
        "claims.checkingEligibility"
      ],
      "empty": [
        "claims.noClaimsAvailable"
      ],
      "error": [
        "claims.eligibilityUnavailable",
        "claims.claimFailed",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/claims/:claimId",
    "name": "Claim details",
    "feature": "claims",
    "layout": "ApplicationLayout",
    "access": "wallet-required",
    "priority": "P0",
    "id": "claims.claimDetails",
    "component": "ClaimDetailsPage",
    "file": "src/pages/claims/ClaimDetailsPage.jsx",
    "states": {
      "loading": [
        "claims.checkingEligibility"
      ],
      "empty": [
        "claims.noClaimsAvailable"
      ],
      "error": [
        "claims.eligibilityUnavailable",
        "claims.claimFailed",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.walletRequired"
      ]
    }
  },
  {
    "path": "/create",
    "name": "Creation entry",
    "feature": "creation",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "P1",
    "id": "creation.creationEntry",
    "component": "CreationEntryPage",
    "file": "src/pages/creation/CreationEntryPage.jsx",
    "states": {
      "loading": [
        "creation.draftLoading"
      ],
      "empty": [
        "creation.emptyDraft"
      ],
      "error": [
        "creation.creationFailed",
        "creation.aiUnavailable",
        "creation.feeQuoteFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/create/drafts",
    "name": "My drafts",
    "feature": "creation",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "P1",
    "id": "creation.myDrafts",
    "component": "MyDraftsPage",
    "file": "src/pages/creation/MyDraftsPage.jsx",
    "states": {
      "loading": [
        "creation.draftLoading"
      ],
      "empty": [
        "creation.emptyDraft"
      ],
      "error": [
        "creation.creationFailed",
        "creation.aiUnavailable",
        "creation.feeQuoteFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/create/drafts/:draftId",
    "name": "Edit draft",
    "feature": "creation",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "P1",
    "id": "creation.editDraft",
    "component": "EditDraftPage",
    "file": "src/pages/creation/EditDraftPage.jsx",
    "states": {
      "loading": [
        "creation.draftLoading"
      ],
      "empty": [
        "creation.emptyDraft"
      ],
      "error": [
        "creation.creationFailed",
        "creation.aiUnavailable",
        "creation.feeQuoteFailed",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/ai",
    "name": "AI workspace",
    "feature": "ai",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "ai.aiWorkspace",
    "component": "AiWorkspacePage",
    "file": "src/pages/ai/AiWorkspacePage.jsx",
    "states": {
      "loading": [
        "ai.loadingContext",
        "ai.generatingResponse"
      ],
      "empty": [
        "ai.emptyConversation",
        "ai.noSelectedMarket"
      ],
      "error": [
        "ai.requestFailed",
        "ai.aiServiceUnavailable",
        "ai.sourcesUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/ai/conversations/:conversationId",
    "name": "AI conversation",
    "feature": "ai",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "ai.aiConversation",
    "component": "AiConversationPage",
    "file": "src/pages/ai/AiConversationPage.jsx",
    "states": {
      "loading": [
        "ai.loadingContext",
        "ai.generatingResponse"
      ],
      "empty": [
        "ai.emptyConversation",
        "ai.noSelectedMarket"
      ],
      "error": [
        "ai.requestFailed",
        "ai.aiServiceUnavailable",
        "ai.sourcesUnavailable",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/ai/saved",
    "name": "Saved analyses",
    "feature": "ai",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "ai.savedAnalyses",
    "component": "SavedAnalysesPage",
    "file": "src/pages/ai/SavedAnalysesPage.jsx",
    "states": {
      "loading": [
        "ai.loadingContext",
        "ai.generatingResponse"
      ],
      "empty": [
        "ai.emptyConversation",
        "ai.noSelectedMarket"
      ],
      "error": [
        "ai.requestFailed",
        "ai.aiServiceUnavailable",
        "ai.sourcesUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/rooms",
    "name": "Rooms directory",
    "feature": "community",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "community.roomsDirectory",
    "component": "RoomsDirectoryPage",
    "file": "src/pages/community/RoomsDirectoryPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noRooms"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug",
    "name": "Room overview",
    "feature": "community",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "community.roomOverview",
    "component": "RoomOverviewPage",
    "file": "src/pages/community/RoomOverviewPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noRooms"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/markets",
    "name": "Room markets",
    "feature": "community",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "community.roomMarkets",
    "component": "RoomMarketsPage",
    "file": "src/pages/community/RoomMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noMarkets"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/discussion",
    "name": "Room discussion",
    "feature": "community",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "community.roomDiscussion",
    "component": "RoomDiscussionPage",
    "file": "src/pages/community/RoomDiscussionPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noDiscussions"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/members",
    "name": "Room members",
    "feature": "community",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "community.roomMembers",
    "component": "RoomMembersPage",
    "file": "src/pages/community/RoomMembersPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noMembers"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/about",
    "name": "Room about/rules",
    "feature": "community",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "community.roomAboutRules",
    "component": "RoomAboutRulesPage",
    "file": "src/pages/community/RoomAboutRulesPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noRooms"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/discussion/:threadId",
    "name": "Discussion thread",
    "feature": "community",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "community.discussionThread",
    "component": "DiscussionThreadPage",
    "file": "src/pages/community/DiscussionThreadPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noRooms"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/rooms/create",
    "name": "Create room",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "community.createRoom",
    "component": "CreateRoomPage",
    "file": "src/pages/community/CreateRoomPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noRooms"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/rooms/:roomSlug/manage",
    "name": "Manage room",
    "feature": "community",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "community.manageRoom",
    "component": "ManageRoomPage",
    "file": "src/pages/community/ManageRoomPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "community.noRooms"
      ],
      "error": [
        "community.roomNotFound",
        "community.roomUnavailable",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.authenticationRequired",
        "global.accessDenied"
      ]
    }
  },
  {
    "path": "/profile",
    "name": "My profile",
    "feature": "profiles",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "profiles.myProfile",
    "component": "MyProfilePage",
    "file": "src/pages/profiles/MyProfilePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noForecasts"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/profile/edit",
    "name": "Edit profile",
    "feature": "profiles",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "profiles.editProfile",
    "component": "EditProfilePage",
    "file": "src/pages/profiles/EditProfilePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noForecasts"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/users/:userId",
    "name": "Public user profile",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.publicUserProfile",
    "component": "PublicUserProfilePage",
    "file": "src/pages/profiles/PublicUserProfilePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noForecasts"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/users/:userId/forecasts",
    "name": "User forecasts",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.userForecasts",
    "component": "UserForecastsPage",
    "file": "src/pages/profiles/UserForecastsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noForecasts"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/users/:userId/activity",
    "name": "User activity",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.userActivity",
    "component": "UserActivityPage",
    "file": "src/pages/profiles/UserActivityPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noForecasts"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/users/:userId/followers",
    "name": "User followers",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.userFollowers",
    "component": "UserFollowersPage",
    "file": "src/pages/profiles/UserFollowersPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noForecasts"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/users/:userId/following",
    "name": "User following",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.userFollowing",
    "component": "UserFollowingPage",
    "file": "src/pages/profiles/UserFollowingPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noForecasts"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/users/:userId/reputation",
    "name": "Reputation details",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.reputationDetails",
    "component": "ReputationDetailsPage",
    "file": "src/pages/profiles/ReputationDetailsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.insufficientScoringHistory"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/leaderboard",
    "name": "Leaderboard",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.leaderboard",
    "component": "LeaderboardPage",
    "file": "src/pages/profiles/LeaderboardPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noLeaderboardEntries"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable"
      ]
    }
  },
  {
    "path": "/leaderboard/:categorySlug",
    "name": "Category leaderboard",
    "feature": "profiles",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "profiles.categoryLeaderboard",
    "component": "CategoryLeaderboardPage",
    "file": "src/pages/profiles/CategoryLeaderboardPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "profiles.noLeaderboardEntries"
      ],
      "error": [
        "profiles.profileNotFound",
        "profiles.privateRestrictedProfile",
        "profiles.reputationUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/creator",
    "name": "Creator overview",
    "feature": "creator",
    "layout": "CreatorLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "creator.creatorOverview",
    "component": "CreatorOverviewPage",
    "file": "src/pages/creator/CreatorOverviewPage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/creator/markets",
    "name": "Created markets",
    "feature": "creator",
    "layout": "CreatorLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "creator.createdMarkets",
    "component": "CreatedMarketsPage",
    "file": "src/pages/creator/CreatedMarketsPage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/creator/markets/:marketId",
    "name": "Creator market details",
    "feature": "creator",
    "layout": "CreatorLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "creator.creatorMarketDetails",
    "component": "CreatorMarketDetailsPage",
    "file": "src/pages/creator/CreatorMarketDetailsPage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/creator/analytics",
    "name": "Creator analytics",
    "feature": "creator",
    "layout": "CreatorLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "creator.creatorAnalytics",
    "component": "CreatorAnalyticsPage",
    "file": "src/pages/creator/CreatorAnalyticsPage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/creator/fees",
    "name": "Creator fees",
    "feature": "creator",
    "layout": "CreatorLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "creator.creatorFees",
    "component": "CreatorFeesPage",
    "file": "src/pages/creator/CreatorFeesPage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/creator/fees/history",
    "name": "Creator fee history",
    "feature": "creator",
    "layout": "CreatorLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "creator.creatorFeeHistory",
    "component": "CreatorFeeHistoryPage",
    "file": "src/pages/creator/CreatorFeeHistoryPage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/creator/settings",
    "name": "Creator settings",
    "feature": "creator",
    "layout": "CreatorLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "creator.creatorSettings",
    "component": "CreatorSettingsPage",
    "file": "src/pages/creator/CreatorSettingsPage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/creators/:creatorId",
    "name": "Public creator profile",
    "feature": "creator",
    "layout": "PublicLayout",
    "access": "public",
    "priority": "future",
    "id": "creator.publicCreatorProfile",
    "component": "PublicCreatorProfilePage",
    "file": "src/pages/creator/PublicCreatorProfilePage.jsx",
    "states": {
      "loading": [
        "creator.balanceLoading"
      ],
      "empty": [
        "creator.noFeesAvailable"
      ],
      "error": [
        "creator.feeClaimFailed",
        "global.apiUnavailable",
        "global.invalidRouteParameter",
        "global.notFound"
      ]
    }
  },
  {
    "path": "/saved",
    "name": "Saved content",
    "feature": "saved",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "saved.savedContent",
    "component": "SavedContentPage",
    "file": "src/pages/saved/SavedContentPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "saved.noSavedContent"
      ],
      "error": [
        "saved.savedItemUnavailable",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/saved/markets",
    "name": "Saved markets",
    "feature": "saved",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "saved.savedMarkets",
    "component": "SavedMarketsPage",
    "file": "src/pages/saved/SavedMarketsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "saved.noSavedContent"
      ],
      "error": [
        "saved.savedItemUnavailable",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/saved/rooms",
    "name": "Saved rooms",
    "feature": "saved",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "saved.savedRooms",
    "component": "SavedRoomsPage",
    "file": "src/pages/saved/SavedRoomsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "saved.noSavedContent"
      ],
      "error": [
        "saved.savedItemUnavailable",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/saved/analyses",
    "name": "Saved content analyses",
    "feature": "saved",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "saved.savedContentAnalyses",
    "component": "SavedContentAnalysesPage",
    "file": "src/pages/saved/SavedContentAnalysesPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "saved.noSavedContent"
      ],
      "error": [
        "saved.savedItemUnavailable",
        "global.apiUnavailable",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/notifications",
    "name": "Notifications",
    "feature": "notifications",
    "layout": "ApplicationLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "notifications.notifications",
    "component": "NotificationsPage",
    "file": "src/pages/notifications/NotificationsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "notifications.noNotifications"
      ],
      "error": [
        "notifications.notificationDestinationUnavailable",
        "notifications.notificationPermissionsDisabled",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings",
    "name": "Settings overview",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.settingsOverview",
    "component": "SettingsOverviewPage",
    "file": "src/pages/settings/SettingsOverviewPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/profile",
    "name": "Profile settings",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.profileSettings",
    "component": "ProfileSettingsPage",
    "file": "src/pages/settings/ProfileSettingsPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/wallet",
    "name": "Wallet/session settings",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.walletSessionSettings",
    "component": "WalletSessionSettingsPage",
    "file": "src/pages/settings/WalletSessionSettingsPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/appearance",
    "name": "Appearance",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.appearance",
    "component": "AppearancePage",
    "file": "src/pages/settings/AppearancePage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/notifications",
    "name": "Notification preferences",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.notificationPreferences",
    "component": "NotificationPreferencesPage",
    "file": "src/pages/settings/NotificationPreferencesPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/privacy",
    "name": "Privacy settings",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.privacySettings",
    "component": "PrivacySettingsPage",
    "file": "src/pages/settings/PrivacySettingsPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/security",
    "name": "Security/session management",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.securitySessionManagement",
    "component": "SecuritySessionManagementPage",
    "file": "src/pages/settings/SecuritySessionManagementPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/data",
    "name": "Data export",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.dataExport",
    "component": "DataExportPage",
    "file": "src/pages/settings/DataExportPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/settings/delete-account",
    "name": "Account deletion request",
    "feature": "settings",
    "layout": "SettingsLayout",
    "access": "authenticated",
    "priority": "future",
    "id": "settings.accountDeletionRequest",
    "component": "AccountDeletionRequestPage",
    "file": "src/pages/settings/AccountDeletionRequestPage.jsx",
    "states": {
      "loading": [
        "settings.settingsLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "settings.settingsSaveFailed",
        "global.authenticationRequired"
      ]
    }
  },
  {
    "path": "/moderation",
    "name": "Moderation dashboard",
    "feature": "moderation",
    "layout": "ModerationLayout",
    "access": "moderator",
    "priority": "future",
    "id": "moderation.moderationDashboard",
    "component": "ModerationDashboardPage",
    "file": "src/pages/moderation/ModerationDashboardPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired",
        "global.accessDenied"
      ]
    }
  },
  {
    "path": "/moderation/reports",
    "name": "Reports queue",
    "feature": "moderation",
    "layout": "ModerationLayout",
    "access": "moderator",
    "priority": "future",
    "id": "moderation.reportsQueue",
    "component": "ReportsQueuePage",
    "file": "src/pages/moderation/ReportsQueuePage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired",
        "global.accessDenied"
      ]
    }
  },
  {
    "path": "/moderation/reports/:reportId",
    "name": "Report details",
    "feature": "moderation",
    "layout": "ModerationLayout",
    "access": "moderator",
    "priority": "future",
    "id": "moderation.reportDetails",
    "component": "ReportDetailsPage",
    "file": "src/pages/moderation/ReportDetailsPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.invalidRouteParameter",
        "global.notFound",
        "global.authenticationRequired",
        "global.accessDenied"
      ]
    }
  },
  {
    "path": "/moderation/rooms",
    "name": "Room moderation",
    "feature": "moderation",
    "layout": "ModerationLayout",
    "access": "moderator",
    "priority": "future",
    "id": "moderation.roomModeration",
    "component": "RoomModerationPage",
    "file": "src/pages/moderation/RoomModerationPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired",
        "global.accessDenied"
      ]
    }
  },
  {
    "path": "/moderation/users",
    "name": "User moderation",
    "feature": "moderation",
    "layout": "ModerationLayout",
    "access": "moderator",
    "priority": "future",
    "id": "moderation.userModeration",
    "component": "UserModerationPage",
    "file": "src/pages/moderation/UserModerationPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired",
        "global.accessDenied"
      ]
    }
  },
  {
    "path": "/moderation/activity",
    "name": "Moderation action history",
    "feature": "moderation",
    "layout": "ModerationLayout",
    "access": "moderator",
    "priority": "future",
    "id": "moderation.moderationActionHistory",
    "component": "ModerationActionHistoryPage",
    "file": "src/pages/moderation/ModerationActionHistoryPage.jsx",
    "states": {
      "loading": [
        "global.pageLoading"
      ],
      "empty": [
        "global.emptyState"
      ],
      "error": [
        "global.recoverableError",
        "global.apiUnavailable",
        "global.authenticationRequired",
        "global.accessDenied"
      ]
    }
  }
]
