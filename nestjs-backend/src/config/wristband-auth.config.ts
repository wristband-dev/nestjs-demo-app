import { AuthConfig } from '@wristband/nestjs-auth';
import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

import { DEMO_APP_HOST } from './constants';

export default registerAs(
  'wristbandAuth',
  (): AuthConfig => ({
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    // NOTE: If deploying your own app to production, do not disable secure cookies.
    dangerouslyDisableSecureCookies: true,
    loginStateSecret: 'dummy-Toa903rKynt3YxXKUG7Pvs3ZZPrQVPLi',
    loginUrl: `http://${DEMO_APP_HOST}/api/auth/login`,
    redirectUri: `http://${DEMO_APP_HOST}/api/auth/callback`,
    scopes: ['openid', 'offline_access', 'email', 'profile', 'roles'],
    isApplicationCustomDomainActive: false,
    wristbandApplicationVanityDomain: env.APPLICATION_VANITY_DOMAIN,
  }),
);
