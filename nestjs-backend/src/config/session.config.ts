import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

import { DEFAULT_SESSION_COOKIE_MAX_AGE, TRUE } from './constants';

export default registerAs('session', () => ({
  cookieMaxAge: isNaN(parseInt(env.SESSION_COOKIE_MAX_AGE, 10))
    ? DEFAULT_SESSION_COOKIE_MAX_AGE
    : parseInt(env.SESSION_COOKIE_MAX_AGE, 10),
  cookieSecret: env.SESSION_COOKIE_SECRET,
  dangerouslyDisableSecureCookies: env.DISABLE_SECURE_SESSION_COOKIES
    ? env.DISABLE_SECURE_SESSION_COOKIES === TRUE
    : false,
}));
