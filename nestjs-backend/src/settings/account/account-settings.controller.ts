import { Body, Controller, Get, Inject, Patch, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { WristbandApiService } from 'src/wristband-api/wristband-api.service';

@Controller('api/v1/account-settings')
export class AccountSettingsController {
  constructor(
    @Inject(WristbandApiService)
    private readonly wristbandApiService: WristbandApiService,
  ) {}

  @Get()
  async getAccountSettings(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send();
    }

    try {
      const user = await this.wristbandApiService.getUser(req, userId);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Get Account Settings Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }

  @Patch()
  async updateAccountSettings(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { userId } = req.session;
    if (!userId) {
      return res.status(401).send();
    }

    try {
      const user = await this.wristbandApiService.updateUser(req, userId, body);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Update Account Settings Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }
}
