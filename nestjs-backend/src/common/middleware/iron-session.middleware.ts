import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getIronSession, SessionOptions } from 'iron-session';
import { NextFunction, Request, Response } from 'express';

import { SESSION_COOKIE_NAME } from 'src/config/constants';

// Middleware to initialize Iron Session cookie-based sessions for the application.
// https://github.com/vvo/iron-session/issues/586#issuecomment-1825671315
const ironSession = (sessionOptions: SessionOptions) => {
  return async function ironSessionMiddleware(req: Request, res: Response) {
    req.session = await getIronSession(req, res, sessionOptions);
  };
};

@Injectable()
export class IronSessionMiddleware implements NestMiddleware {
  private cookieMaxAge;
  private cookieSecret;
  private dangerouslyDisableSecureCookies;

  constructor(private readonly configService: ConfigService) {
    this.dangerouslyDisableSecureCookies = this.configService.get<boolean>(
      'session.dangerouslyDisableSecureCookies',
    );
    this.cookieMaxAge = this.configService.get<number>('session.cookieMaxAge');
    this.cookieSecret = this.configService.get<string>('session.cookieSecret');
  }

  async use(req: Request, res: Response, next: NextFunction) {
    await ironSession({
      cookieName: SESSION_COOKIE_NAME,
      password: this.cookieSecret,
      cookieOptions: {
        httpOnly: true,
        maxAge: this.cookieMaxAge,
        path: '/',
        sameSite: 'lax',
        secure: !this.dangerouslyDisableSecureCookies,
      },
    })(req, res);
    return next();
  }
}
