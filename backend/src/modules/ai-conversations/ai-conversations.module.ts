import { Module } from '@nestjs/common';
import { AiConversationsController } from './ai-conversations.controller.js';
import { AiConversationsService } from './ai-conversations.service.js';

@Module({ controllers: [AiConversationsController], providers: [AiConversationsService], exports: [AiConversationsService] })
export class AiConversationsModule {}
