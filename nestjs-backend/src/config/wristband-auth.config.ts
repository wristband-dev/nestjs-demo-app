import { AuthConfig } from '@wristband/nestjs-auth';
import { registerAs } from '@nestjs/config';
import { env } from 'node:process';

export default registerAs(
  'wristbandAuth',
  (): AuthConfig => ({
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    scopes: ['openid', 'offline_access', 'email', 'profile', 'roles'],
    wristbandApplicationVanityDomain: env.APPLICATION_VANITY_DOMAIN,
  }),
);
