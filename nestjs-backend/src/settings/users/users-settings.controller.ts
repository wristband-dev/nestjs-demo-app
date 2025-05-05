import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { env } from 'node:process';

import { WristbandApiService } from 'src/wristband-api/wristband-api.service';

@Controller('api/v1/users-settings')
export class UsersSettingsController {
  constructor(
    @Inject(WristbandApiService)
    private readonly wristbandApiService: WristbandApiService,
  ) {}

  @Get()
  async getUsersSettings(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { tenantId } = req.session;
    if (!tenantId) {
      return res.status(401).send();
    }

    try {
      const newUserInviteResults =
        await this.wristbandApiService.getNewUserInvitesInTenant(req, tenantId);
      const userResults = await this.wristbandApiService.getUsersInTenant(
        req,
        tenantId,
      );
      return res.status(200).json({
        invites: newUserInviteResults.items,
        users: userResults.items,
      });
    } catch (error) {
      console.error('Get Users Settings Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }

  @Post('invite-user')
  async inviteNewUser(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    const { tenantId } = req.session;
    if (!tenantId) {
      return res.status(401).send();
    }

    try {
      const rolesResults = await this.wristbandApiService.getRolesInTenant(
        req,
        tenantId,
      );
      const { items, totalResults } = rolesResults;
      if (totalResults === 0) {
        throw new Error(`No roles found for tenant [${tenantId}]`);
      }

      // Parse out the roleId of the admin role
      const adminRole = items.find((role) => role.name === env.ADMIN_ROLE);
      if (!adminRole) {
        throw new Error(
          `Role [${env.ADMIN_ROLE}] not found for tenant [${tenantId}]`,
        );
      }

      await this.wristbandApiService.inviteNewUser(req, {
        ...body,
        tenantId,
        rolesToAssign: [adminRole.id],
      });
      return res.status(204).send();
    } catch (error) {
      console.error('Invite New User Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }

  @Post('cancel-invite')
  async cancelNewUserInvite(
    @Body() body: any,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<any> {
    try {
      await this.wristbandApiService.cancelNewUserInvite(req, body);
      return res.status(204).send();
    } catch (error) {
      console.error('Cancel New User Invite Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }
}
