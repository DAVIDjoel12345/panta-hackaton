import { Module } from '@nestjs/common';
import { AiAnalysisController } from './ai-analysis.controller.js';
import { AiAnalysisService } from './ai-analysis.service.js';

@Module({ controllers: [AiAnalysisController], providers: [AiAnalysisService], exports: [AiAnalysisService] })
export class AiAnalysisModule {}
