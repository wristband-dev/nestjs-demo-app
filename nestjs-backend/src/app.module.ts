import { ConfigModule } from '@nestjs/config';
import { env } from 'node:process';
import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { WristbandExpressAuthModule } from '@wristband/nestjs-auth';

// Wristband SDK Configurations
import {
  WRISTBAND_AUTH_CONFIGURATION,
  WRISTBAND_AUTH_WITH_POPUP_CONFIGURATION,
} from './config/wristband-auth';

// Other Configurations
import csrfConfig from './config/csrf.config';
import sessionConfig from './config/session.config';
import { getEnvFilePath } from './config/utils';

// Modules
import { AuthModule } from './auth/auth.module';
import { CsrfModule } from './csrf/csrf.module';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { SessionModule } from './session/session.module';
import { SettingsModule } from './settings/settings.module';
import { WristbandApiModule } from './wristband-api/wristband-api.module';

// Middleware
import { AuthMiddleware } from './common/middleware/auth.middleware';
import { CsrfMiddleware } from './common/middleware/csrf.middleware';
import { IronSessionMiddleware } from './common/middleware/iron-session.middleware';
import { RequestTrackingMiddleware } from './common/middleware/request-tracking.middleware';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [csrfConfig, sessionConfig],
      envFilePath: env.NODE_ENV === 'production' ? '' : getEnvFilePath(),
      ignoreEnvFile: env.NODE_ENV === 'production',
    }),
    CsrfModule,
    HelloWorldModule,
    SessionModule,
    SettingsModule,
    WristbandApiModule,
    WristbandExpressAuthModule.forRoot(
      WRISTBAND_AUTH_CONFIGURATION,
      'WristbandStandardLoginAuthService',
    ),
    WristbandExpressAuthModule.forRoot(
      WRISTBAND_AUTH_WITH_POPUP_CONFIGURATION,
      'WristbandPopupLoginAuthService',
    ),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RequestTrackingMiddleware, IronSessionMiddleware)
      .forRoutes('*');
    consumer
      .apply(AuthMiddleware, CsrfMiddleware)
      .exclude('/api/v1/auth/(.*)')
      .forRoutes('*');
  }
}
