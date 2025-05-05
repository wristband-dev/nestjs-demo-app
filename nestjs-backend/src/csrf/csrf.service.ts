import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import * as Tokens from 'csrf';

import {
  CSRF_TOKEN_COOKIE_NAME,
  CSRF_TOKEN_HEADER_NAME,
} from 'src/config/constants';

@Injectable()
export class CsrfService {
  private cookieMaxAge;
  private csrfTokens;
  private dangerouslyDisableSecureCookies;

  constructor(private readonly configService: ConfigService) {
    this.cookieMaxAge = this.configService.get<number>('csrf.cookieMaxAge');
    this.csrfTokens = new Tokens();
    this.dangerouslyDisableSecureCookies = this.configService.get<boolean>(
      'csrf.dangerouslyDisableSecureCookies',
    );
  }

  createCsrfSecret() {
    return this.csrfTokens.secretSync();
  }

  isCsrfTokenValid(req: Request) {
    const xsrfToken = Array.isArray(req.headers[CSRF_TOKEN_HEADER_NAME])
      ? req.headers[CSRF_TOKEN_HEADER_NAME][0]
      : req.headers[CSRF_TOKEN_HEADER_NAME];
    return this.csrfTokens.verify(req.session.csrfSecret, xsrfToken);
  }

  updateCsrfTokenAndCookie(req: Request, res: Response) {
    const updatedCsrfToken = this.csrfTokens.create(req.session.csrfSecret);
    return res.cookie(CSRF_TOKEN_COOKIE_NAME, updatedCsrfToken, {
      httpOnly: false,
      maxAge: this.cookieMaxAge,
      path: '/',
      sameSite: true,
      secure: !this.dangerouslyDisableSecureCookies,
    });
  }
}
