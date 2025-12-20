/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */

import { createWristbandAuthGuard } from '@wristband/nestjs-auth';

/**
 * Default Wristband authentication guard for protecting routes.
 * 
 * Uses configuration from 'wristbandAuthGuard' registered in ConfigModule.
 * Validates authenticated users via SESSION or JWT strategies, with automatic token refresh,
 * CSRF validation (if enabled), and rolling session expiration.
 * 
 * @example
 * // Route-level protection
 * @Get('profile')
 * @UseGuards(WristbandAuthGuard)
 * getProfile(@Req() req: Request) { return req.user; }
 * 
 * // Controller-level protection
 * @Controller('users')
 * @UseGuards(WristbandAuthGuard)
 * export class UsersController { }
 * 
 * // Global protection
 * providers: [{ provide: APP_GUARD, useClass: WristbandAuthGuard }]
 * 
 * // Custom config: createWristbandAuthGuard('adminAuthGuard')
 * // Multi-instance: createWristbandAuthGuard('adminAuthGuard', 'ADMIN_AUTH_TOKEN')
 */
export const WristbandAuthGuard = createWristbandAuthGuard();
