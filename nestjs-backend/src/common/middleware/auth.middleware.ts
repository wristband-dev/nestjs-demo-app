import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WristbandExpressAuthService } from '@wristband/nestjs-auth';
import { NextFunction, Request, Response } from 'express';

import { CsrfService } from '../../csrf/csrf.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject('WristbandAuth')
    private readonly wristbandAuth: WristbandExpressAuthService,
    @Inject(CsrfService)
    private readonly csrfService: CsrfService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
      return res.status(401).send();
    }

    const { csrfToken, expiresAt, isAuthenticated, refreshToken } = req.session;

    if (!isAuthenticated) {
      return res.status(401).send();
    }

    /* CSRF_TOUCHPOINT */
    if (!csrfToken || csrfToken !== req.headers['x-csrf-token']) {
      return res.status(403).send();
    }

    this.csrfService.updateCsrfCookie(req, res);

    try {
      /* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
      const tokenData = await this.wristbandAuth.refreshTokenIfExpired(refreshToken, expiresAt);
      if (tokenData) {
        req.session.accessToken = tokenData.accessToken;
        req.session.expiresAt = tokenData.expiresAt;
        req.session.refreshToken = tokenData.refreshToken;
      }
      // Save the session in order to "touch" it (even if there is no new token data).
      await req.session.save();
      return next();
    } catch (error) {
      console.error('Auth Middleware Error: ', error);
      return res.status(401).send();
    }
  }
}
