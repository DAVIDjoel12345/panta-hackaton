import { Module } from '@nestjs/common';
import { CreatorFeesController } from './creator-fees.controller.js';
import { CreatorFeesService } from './creator-fees.service.js';

@Module({ controllers: [CreatorFeesController], providers: [CreatorFeesService], exports: [CreatorFeesService] })
export class CreatorFeesModule {}
