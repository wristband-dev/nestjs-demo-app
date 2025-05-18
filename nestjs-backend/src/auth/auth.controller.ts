import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { env } from 'node:process';
import {
  CallbackData,
  CallbackResultType,
  WristbandExpressAuthService,
} from '@wristband/nestjs-auth';
import { Request, Response } from 'express';

import { CsrfService } from 'src/csrf/csrf.service';
import {
  CSRF_TOKEN_COOKIE_NAME,
  SESSION_COOKIE_NAME,
} from 'src/config/constants';

@Controller('api/v1/auth')
export class AuthController {
  constructor(
    @Inject('WristbandStandardLoginAuthService')
    private readonly wristbandAuth: WristbandExpressAuthService,
    @Inject(CsrfService)
    private readonly csrfService: CsrfService,
  ) {}

  private async initSessionAndCsrf(
    req: Request,
    res: Response,
    callbackData: CallbackData,
  ) {
    req.session.isAuthenticated = true;
    req.session.accessToken = callbackData?.accessToken;
    req.session.expiresAt = Date.now() + (callbackData?.expiresIn ?? 0) * 1000;
    req.session.refreshToken = callbackData?.refreshToken;
    req.session.roles = callbackData?.userinfo.roles || [];
    req.session.userId = callbackData?.userinfo.sub;
    req.session.tenantId = callbackData?.userinfo.tnt_id;
    req.session.identityProviderName = callbackData?.userinfo.idp_name;
    req.session.tenantDomainName = callbackData?.tenantDomainName;
    req.session.tenantCustomDomain = callbackData?.tenantCustomDomain;
    req.session.csrfSecret = this.csrfService.createCsrfSecret();

    await req.session.save();

    this.csrfService.updateCsrfTokenAndCookie(req, res);
  }

  // ////////////////////////////////////
  //  SIGNUP
  // ////////////////////////////////////

  @Get('signup')
  async signup(@Res() res: Response): Promise<void> {
    res.header('Cache-Control', 'no-store');
    res.header('Pragma', 'no-cache');
    return await res.redirect(
      `${env.WBAUTH__SIGNUP_URL}?client_id=${env.WBAUTH__CLIENT_ID}`,
    );
  }

  // ////////////////////////////////////
  //  LOGIN
  // ////////////////////////////////////

  @Get('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const redirectUrl = await this.wristbandAuth.login(req, res);
    return res.redirect(redirectUrl);
  }

  // ////////////////////////////////////
  //  CALLBACK
  // ////////////////////////////////////

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response): Promise<void> {
    try {
      const callbackDataResult = await this.wristbandAuth.callback(req, res);
      const { type, callbackData, redirectUrl } = callbackDataResult;

      if (type === CallbackResultType.REDIRECT_REQUIRED) {
        // The SDK will have already invoked the redirect() function, so we just stop execution here.
        return res.redirect(redirectUrl);
      }

      const initSession = await this.initSessionAndCsrf(req, res, callbackData);
      initSession;
      console.log('Session initialized:', initSession);
      // Send the user back to the application.
      return res.redirect(
        callbackData.returnUrl || `${env.HOME_URL}/hello-world`,
      );
    } catch (error) {
      console.error('Callback Error:', error);
      res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }

  // ////////////////////////////////////
  //  LOGOUT
  // ////////////////////////////////////

  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<void> {
    console.log('Logout request received');
    const { session } = req;
    const { refreshToken, tenantDomainName } = session;

    res.clearCookie(SESSION_COOKIE_NAME);
    res.clearCookie(CSRF_TOKEN_COOKIE_NAME);
    session.destroy();

    try {
      const logoutUrl = await this.wristbandAuth.logout(req, res, {
        refreshToken,
        tenantDomainName,
      });
      res.redirect(logoutUrl);
    } catch (error) {
      console.error('Logout Error:', error);
      res
        .status(500)
        .json({ message: 'An error occurred during the process.' });
    }
  }
}
