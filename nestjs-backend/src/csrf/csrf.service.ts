import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { randomBytes } from 'crypto';

import { CSRF_TOKEN_COOKIE_NAME } from 'src/config/constants';

@Injectable()
export class CsrfService {
  private cookieMaxAge;
  private dangerouslyDisableSecureCookies;

  constructor(private readonly configService: ConfigService) {
    this.cookieMaxAge = this.configService.get<number>('csrf.cookieMaxAge');
    this.dangerouslyDisableSecureCookies = this.configService.get<boolean>('csrf.dangerouslyDisableSecureCookies');
  }

  createCsrfToken() {
    return randomBytes(32).toString('hex');
  }

  updateCsrfCookie(req: Request, res: Response) {
    return res.cookie(CSRF_TOKEN_COOKIE_NAME, req.session.csrfToken, {
      httpOnly: false,
      maxAge: this.cookieMaxAge,
      path: '/',
      sameSite: true,
      secure: !this.dangerouslyDisableSecureCookies,
    });
  }
}
