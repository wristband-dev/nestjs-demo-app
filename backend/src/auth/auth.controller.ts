import { Controller, Get, Inject, Req, Res, UseGuards } from '@nestjs/common';
import { WristbandExpressAuthService } from '@wristband/nestjs-auth';
import { Request, Response } from 'express';
import { env } from 'node:process';

import { WristbandAuthGuard } from '../guards/wristband-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject('WristbandAuth')
    private readonly wristbandAuth: WristbandExpressAuthService,
  ) {}

  @Get('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
    // Redirect out to the Wristband authorize endpoint to start the login process via OAuth2/OIDC Auth Code flow.
    const authorizeUrl = await this.wristbandAuth.login(req, res);
    res.redirect(authorizeUrl);
  }

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
      // After the user authenticates, exchange the incoming authorization code for JWTs and also retrieve userinfo.
      const callbackDataResult = await this.wristbandAuth.callback(req, res);
      const { type, callbackData, redirectUrl } = callbackDataResult;

      // For certain edge cases, you'll need to redirect to the URL returned from the SDK.
      if (type === 'redirect_required') {
        res.redirect(redirectUrl);
        return;
      }

      // If the SDK determines a redirect isn't required, then we can save any necessary
      // fields for the user's app session into a session cookie.
      req.session.fromCallback(callbackData, {
        email: callbackData.userinfo.email,
        roles: callbackData.userinfo.roles || []
      });
      await req.session.save();

      // Send the user back to the application.
      res.redirect(callbackData.returnUrl || 'http://localhost:6001/hello-world');
    } catch (error) {
      console.error('Callback Error:', error);
      res.status(500).json({ message: 'An error occurred during the process.' });
    }
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { refreshToken, tenantName } = req.session;

    // Always destroy the session.
    req.session.destroy();

    try {
      /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
      const logoutUrl = await this.wristbandAuth.logout(req, res, { refreshToken, tenantName });
      res.redirect(logoutUrl);
    } catch (error) {
      console.error('Logout Error:', error);
      res.status(500).json({ message: 'An error occurred during the process.' });
    }
  }

  @Get('session')
  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
  @UseGuards(WristbandAuthGuard)
  getSessionResponse(@Req() req: Request, @Res() res: Response): void {
    try {
      const { email, roles, tenantName } = req.session;
      const sessionResponse = req.session.getSessionResponse({ email, tenantName, roles: roles || [] });
      res.header('Cache-Control', 'no-store');
      res.header('Pragma', 'no-cache');
      res.status(200).json(sessionResponse);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred during the process.' });
    }
  }

  @Get('token')
  @UseGuards(WristbandAuthGuard)
  getTokenResponse(@Req() req: Request, @Res() res: Response): void {
    try {
      const tokenResponse = req.session.getTokenResponse();
      res.header('Cache-Control', 'no-store');
      res.header('Pragma', 'no-cache');
      res.status(200).json(tokenResponse);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred during the process.' });
    }
  }

  // OPTIONAL: This is just a convenience endpoint (not required).
  @Get('signup')
  async signup(@Res() res: Response): Promise<void> {
    await res.redirect(`https://${env.APPLICATION_VANITY_DOMAIN}/signup`);
  }
}
