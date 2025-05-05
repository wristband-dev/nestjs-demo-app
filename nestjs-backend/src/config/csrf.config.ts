import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

import { DEFAULT_CSRF_COOKIE_MAX_AGE, TRUE } from './constants';

export default registerAs('csrf', () => ({
  cookieMaxAge: isNaN(parseInt(env.CSRF_COOKIE_MAX_AGE, 10))
    ? DEFAULT_CSRF_COOKIE_MAX_AGE
    : parseInt(env.CSRF_COOKIE_MAX_AGE, 10),
  dangerouslyDisableSecureCookies: env.DISABLE_SECURE_CSRF_COOKIES
    ? env.DISABLE_SECURE_CSRF_COOKIES === TRUE
    : false,
}));
