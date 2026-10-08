import { Module } from '@nestjs/common';
import { MarketCreationController } from './market-creation.controller.js';
import { MarketCreationService } from './market-creation.service.js';

@Module({ controllers: [MarketCreationController], providers: [MarketCreationService], exports: [MarketCreationService] })
export class MarketCreationModule {}
