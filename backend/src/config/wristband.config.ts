/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */

import { registerAs } from '@nestjs/config';
import { env } from 'node:process';
import type { AuthConfig, AuthGuardConfig, SessionOptions } from '@wristband/nestjs-auth';

// Enable req.auth typing on Express Request when using JWT auth strategy
import '@wristband/nestjs-auth/jwt';

/**
 * Configuration for the Wristband authentication client that handles OAuth flows (login, callback, logout)
 * and create auth guards.
 */
export const authConfig = registerAs('wristbandAuth', (): AuthConfig => ({
  clientId: env.CLIENT_ID,
  clientSecret: env.CLIENT_SECRET,
  dangerouslyDisableSecureCookies: true, // IMPORTANT: Only for local development. Remove in production!!
  scopes: ['openid', 'offline_access', 'email', 'profile', 'roles'],
  wristbandApplicationVanityDomain: env.APPLICATION_VANITY_DOMAIN,
}));

const sessionOptions: SessionOptions = {
  secrets: 'dummyval-b5c1-463a-812c-0d8db87c0ec5', // IMPORTANT: In production, use a strong secret!!
  secure: false, // IMPORTANT: In production, set "secure: true"!!
  enableCsrfProtection: true,
};

/**
 * Session configuration for the session middleware.
 */
export const sessionConfig = registerAs('wristbandSession', (): SessionOptions => sessionOptions);

/**
 * Auth guard configuration. Uses the same sessionOptions to ensure consistency.
 */
export const authGuardConfig = registerAs('wristbandAuthGuard', (): AuthGuardConfig => ({
  authStrategies: ['JWT', 'SESSION'],
  sessionConfig: { sessionOptions },
}));
