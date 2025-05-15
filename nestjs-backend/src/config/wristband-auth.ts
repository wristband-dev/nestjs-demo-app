import { AuthConfig } from '@wristband/nestjs-auth';
import { env } from 'node:process';

import { resolveScopesEnvVar } from 'src/config/utils';

const COMMON_WRISTBAND_AUTH_CONFIGURATION: Omit<
  AuthConfig,
  'clientId' | 'clientSecret' | 'loginUrl' | 'redirectUri'
> = {
  dangerouslyDisableSecureCookies:
    env.WBAUTH__DISABLE_SECURE_LOGIN_STATE_COOKIES === 'true',
  loginStateSecret: env.WBAUTH__LOGIN_STATE_COOKIE_SECRET,
  scopes: resolveScopesEnvVar(env.WBAUTH__SCOPES),
  useCustomDomains: env.WBAUTH__USE_CUSTOM_DOMAINS === 'true',
  useTenantSubdomains: env.WBAUTH__USE_TENANT_SUBDOMAINS === 'true',
  wristbandApplicationVanityDomain: env.WBAUTH__APPLICATION_VANITY_DOMAIN,
};

export const WRISTBAND_AUTH_CONFIGURATION: AuthConfig = {
  ...COMMON_WRISTBAND_AUTH_CONFIGURATION,
  clientId: env.WBAUTH__CLIENT_ID,
  clientSecret: env.WBAUTH__CLIENT_SECRET,
  loginUrl: env.WBAUTH__LOGIN_URL,
  redirectUri: env.WBAUTH__CALLBACK_URL,
};

export const WRISTBAND_AUTH_WITH_POPUP_CONFIGURATION: AuthConfig = {
  ...COMMON_WRISTBAND_AUTH_CONFIGURATION,
  clientId: env.WBAUTH__POPUP_CLIENT_ID,
  clientSecret: env.WBAUTH__POPUP_CLIENT_SECRET,
  loginUrl: env.WBAUTH__POPUP_LOGIN_URL,
  redirectUri: env.WBAUTH__POPUP_CALLBACK_URL,
};
