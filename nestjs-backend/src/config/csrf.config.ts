import { registerAs } from '@nestjs/config';

export default registerAs('csrf', () => ({
  cookieMaxAge: 3600000,
  // NOTE: If deploying your own app to production, do not disable secure cookies.
  dangerouslyDisableSecureCookies: true,
}));
