import { Controller, Get, Req, Res } from '@nestjs/common';

@Controller('api/v1/session')
export class SessionController {
  @Get()
  getSessionData(@Req() req, @Res() res): Promise<void> {
    const { session } = req;
    if (!session || !session.isAuthenticated) {
      return res.status(200).json({ isAuthenticated: false });
    }

    try {
      return res.status(200).json({
        isAuthenticated: true,
        userId: session.userId,
        tenantId: session.tenantId,
        identityProviderName: session.identityProviderName,
        tenantDomainName: session.tenantDomainName,
        roles: session.roles || [],
      });
    } catch (error) {
      console.error('Error:', error);
      return res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }
}
