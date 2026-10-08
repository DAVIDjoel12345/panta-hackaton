import { Module } from '@nestjs/common';
import { RuntimeModule } from './runtime/runtime.module.js';
import { APP_GUARD } from '@nestjs/core';
import { ScaffoldGuard } from './common/guards/scaffold.guard.js';
import { HealthModule } from './modules/health/health.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { SessionsModule } from './modules/sessions/sessions.module.js';
import { UsersModule } from './modules/users/users.module.js';
import { ProfilesModule } from './modules/profiles/profiles.module.js';
import { OnboardingModule } from './modules/onboarding/onboarding.module.js';
import { WalletsModule } from './modules/wallets/wallets.module.js';
import { MarketsModule } from './modules/markets/markets.module.js';
import { MarketDataModule } from './modules/market-data/market-data.module.js';
import { MarketDraftsModule } from './modules/market-drafts/market-drafts.module.js';
import { MarketCreationModule } from './modules/market-creation/market-creation.module.js';
import { TradingModule } from './modules/trading/trading.module.js';
import { TransactionsModule } from './modules/transactions/transactions.module.js';
import { PositionsModule } from './modules/positions/positions.module.js';
import { ClaimsModule } from './modules/claims/claims.module.js';
import { AiAnalysisModule } from './modules/ai-analysis/ai-analysis.module.js';
import { AiConversationsModule } from './modules/ai-conversations/ai-conversations.module.js';
import { CommunitiesModule } from './modules/communities/communities.module.js';
import { MembershipsModule } from './modules/memberships/memberships.module.js';
import { PostsModule } from './modules/posts/posts.module.js';
import { CommentsModule } from './modules/comments/comments.module.js';
import { LikesModule } from './modules/likes/likes.module.js';
import { SavedContentModule } from './modules/saved-content/saved-content.module.js';
import { SharingModule } from './modules/sharing/sharing.module.js';
import { FollowsModule } from './modules/follows/follows.module.js';
import { ReputationModule } from './modules/reputation/reputation.module.js';
import { LeaderboardsModule } from './modules/leaderboards/leaderboards.module.js';
import { CreatorsModule } from './modules/creators/creators.module.js';
import { CreatorFeesModule } from './modules/creator-fees/creator-fees.module.js';
import { ModerationModule } from './modules/moderation/moderation.module.js';
import { NotificationsModule } from './modules/notifications/notifications.module.js';
import { SettingsModule } from './modules/settings/settings.module.js';
import { SupportModule } from './modules/support/support.module.js';
import { AccountLifecycleModule } from './modules/account-lifecycle/account-lifecycle.module.js';

@Module({
  imports: [RuntimeModule, HealthModule, AuthModule, SessionsModule, UsersModule, ProfilesModule, OnboardingModule, WalletsModule, MarketsModule, MarketDataModule, MarketDraftsModule, MarketCreationModule, TradingModule, TransactionsModule, PositionsModule, ClaimsModule, AiAnalysisModule, AiConversationsModule, CommunitiesModule, MembershipsModule, PostsModule, CommentsModule, LikesModule, SavedContentModule, SharingModule, FollowsModule, ReputationModule, LeaderboardsModule, CreatorsModule, CreatorFeesModule, ModerationModule, NotificationsModule, SettingsModule, SupportModule, AccountLifecycleModule],
  providers: [{ provide: APP_GUARD, useClass: ScaffoldGuard }],
})
export class AppModule {}
