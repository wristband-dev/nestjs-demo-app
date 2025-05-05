import { Module } from '@nestjs/common';

import { OrganizationSettingsController } from './organization-settings.controller';

@Module({ controllers: [OrganizationSettingsController] })
export class OrganizationSettingsModule {}
