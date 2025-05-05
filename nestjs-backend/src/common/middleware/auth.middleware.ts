import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { WristbandExpressAuthService } from '@wristband/nestjs-auth';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    @Inject(WristbandExpressAuthService)
    private readonly wristbandAuth: WristbandExpressAuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!req.session) {
      return res.status(401).send();
    }

    const { csrfSecret, expiresAt, isAuthenticated, refreshToken } =
      req.session;

    if (!isAuthenticated || !csrfSecret) {
      return res.status(401).send();
    }

    try {
      const tokenData = await this.wristbandAuth.refreshTokenIfExpired(
        refreshToken,
        expiresAt,
      );
      if (tokenData) {
        req.session.accessToken = tokenData.accessToken;
        // Converts the "expiresIn" seconds into a Unix timestamp in milliseconds at which the token expires.
        req.session.expiresAt = Date.now() + tokenData.expiresIn * 1000;
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
