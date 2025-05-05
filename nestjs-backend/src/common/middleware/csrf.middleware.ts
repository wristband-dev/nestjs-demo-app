import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { CsrfService } from '../../csrf/csrf.service';

// Middleware that validates that a CSRF token is present in the request header and is valid
// when compared against the secret stored in the user's session store. After validation,
// a new CSRF token is generated and set into the CSRF response cookie. This cookie has the same
// max age as the session cookie since the CSRF secret is stored in the user's session store.
@Injectable()
export class CsrfMiddleware implements NestMiddleware {
  constructor(@Inject(CsrfService) private readonly csrfService: CsrfService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if (!this.csrfService.isCsrfTokenValid(req)) {
      return res.status(401).send();
    }
    this.csrfService.updateCsrfTokenAndCookie(req, res);
    return next();
  }
}
