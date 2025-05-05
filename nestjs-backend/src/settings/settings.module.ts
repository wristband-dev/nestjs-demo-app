import { Module } from '@nestjs/common';

import { AccountSettingsModule } from './account/account-settings.module';
import { OrganizationSettingsModule } from './organization/organization-settings.module';
import { UsersSettingsModule } from './users/users-settings.module';

@Module({
  imports: [
    AccountSettingsModule,
    OrganizationSettingsModule,
    UsersSettingsModule,
  ],
  exports: [
    AccountSettingsModule,
    OrganizationSettingsModule,
    UsersSettingsModule,
  ],
})
export class SettingsModule {}
