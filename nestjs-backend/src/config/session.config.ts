import { registerAs } from '@nestjs/config';

export default registerAs('session', () => ({
  cookieMaxAge: 3600,
  cookieSecret: 'dummy-Baa2vKUKRXrQgfqPjR9r2s3qABNej0Cq',
}));
