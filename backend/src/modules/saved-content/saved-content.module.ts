import { Module } from '@nestjs/common';
import { SavedContentController } from './saved-content.controller.js';
import { SavedContentService } from './saved-content.service.js';

@Module({ controllers: [SavedContentController], providers: [SavedContentService], exports: [SavedContentService] })
export class SavedContentModule {}
