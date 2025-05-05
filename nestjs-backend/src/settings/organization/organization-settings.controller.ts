import { Body, Controller, Get, Inject, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { WristbandApiService } from 'src/wristband-api/wristband-api.service';

@Controller('api/v1/organization-settings')
export class OrganizationSettingsController {
  constructor(
    @Inject(WristbandApiService)
    private readonly wristbandApiService: WristbandApiService,
  ) {}

  @Get()
  async getOrganizationSettings(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { tenantId } = req.session;
    if (!tenantId) {
      return res.status(401).send();
    }

    try {
      const tenant = await this.wristbandApiService.getTenant(req, tenantId);
      return res.status(200).json(tenant);
    } catch (error) {
      console.error('Get Organization Settings Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }

  @Patch()
  async updateOrganizationSettings(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { tenantId } = req.session;
    if (!tenantId) {
      return res.status(401).send();
    }

    try {
      const tenant = await this.wristbandApiService.updateTenant(
        req,
        tenantId,
        body,
      );
      return res.status(200).json(tenant);
    } catch (error) {
      console.error('Update Organization Settings Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }
}
