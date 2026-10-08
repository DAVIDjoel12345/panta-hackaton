import { Module } from '@nestjs/common';
import { AccountLifecycleController } from './account-lifecycle.controller.js';
import { AccountLifecycleService } from './account-lifecycle.service.js';

@Module({ controllers: [AccountLifecycleController], providers: [AccountLifecycleService], exports: [AccountLifecycleService] })
export class AccountLifecycleModule {}
