import { Module } from '@nestjs/common';

import { UsersSettingsController } from './users-settings.controller';

@Module({ controllers: [UsersSettingsController] })
export class UsersSettingsModule {}
