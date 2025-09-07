import { registerAs } from '@nestjs/config';

export default registerAs('csrf', () => ({
  cookieMaxAge: 3600000,
}));
