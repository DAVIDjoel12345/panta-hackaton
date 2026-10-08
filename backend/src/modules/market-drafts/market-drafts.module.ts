import { Module } from '@nestjs/common';
import { MarketDraftsController } from './market-drafts.controller.js';
import { MarketDraftsService } from './market-drafts.service.js';

@Module({ controllers: [MarketDraftsController], providers: [MarketDraftsService], exports: [MarketDraftsService] })
export class MarketDraftsModule {}
