import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { CallbackResultType, WristbandExpressAuthService } from '@wristband/nestjs-auth';
import { Request, Response } from 'express';

import { CsrfService } from 'src/csrf/csrf.service';
import { CSRF_TOKEN_COOKIE_NAME, POST_CALLBACK_URL, SESSION_COOKIE_NAME, SIGNUP_URL } from 'src/config/constants';

@Controller('api/auth')
export class AuthController {
  constructor(
    @Inject('WristbandAuth')
    private readonly wristbandAuth: WristbandExpressAuthService,
    @Inject(CsrfService)
    private readonly csrfService: CsrfService,
  ) {}

  // This is just a convenience endpoint (not required).
  @Get('signup')
  async signup(@Res() res: Response): Promise<void> {
    res.header('Cache-Control', 'no-store');
    res.header('Pragma', 'no-cache');
    return await res.redirect(SIGNUP_URL);
  }

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
      if (type === CallbackResultType.REDIRECT_REQUIRED) {
        return res.redirect(redirectUrl);
      }

      // If the SDK determines a redirect isn't required, then we can save any necessary fields
      // for the user's app session into a session cookie.
      req.session.isAuthenticated = true;
      req.session.accessToken = callbackData?.accessToken;
      // Convert the "expiresIn" seconds into an expiration date with the format of milliseconds from the epoch.
      req.session.expiresAt = Date.now() + (callbackData?.expiresIn ?? 0) * 1000;
      req.session.refreshToken = callbackData?.refreshToken;
      req.session.roles = callbackData?.userinfo.roles || [];
      req.session.userId = callbackData?.userinfo.sub;
      req.session.tenantId = callbackData?.userinfo.tnt_id;
      req.session.identityProviderName = callbackData?.userinfo.idp_name;
      req.session.tenantDomainName = callbackData?.tenantDomainName;
      req.session.tenantCustomDomain = callbackData?.tenantCustomDomain;
      /* CSRF_TOUCHPOINT */
      req.session.csrfToken = this.csrfService.createCsrfToken();

      await req.session.save();

      /* CSRF_TOUCHPOINT */
      this.csrfService.updateCsrfCookie(req, res);

      // Send the user back to the application.
      return res.redirect(callbackData.returnUrl || POST_CALLBACK_URL);
    } catch (error) {
      console.error('Callback Error:', error);
      res.status(500).json({ message: 'An error occurred during the process.' });
    }
  }

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    const { session } = req;
    const { refreshToken, tenantDomainName } = session;

    /* CSRF_TOUCHPOINT */
    // Always clear the session and CSRF cookies.
    res.clearCookie(CSRF_TOKEN_COOKIE_NAME);
    res.clearCookie(SESSION_COOKIE_NAME);
    session.destroy();

    try {
      /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
      const logoutUrl = await this.wristbandAuth.logout(req, res, {
        refreshToken,
        tenantDomainName,
      });
      res.redirect(logoutUrl);
    } catch (error) {
      console.error('Logout Error:', error);
      res.status(500).json({ message: 'An error occurred during the process.' });
    }
  }
}
