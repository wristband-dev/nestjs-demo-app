import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WristbandExpressAuthModule } from '@wristband/nestjs-auth';
import { env } from 'node:process';

// Config
import { csrfConfig, sessionConfig, wristbandAuthConfig } from './config';

// Modules
import { AuthModule } from './auth/auth.module';
import { CsrfModule } from './csrf/csrf.module';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { SessionModule } from './session/session.module';
import { WristbandApiModule } from './wristband-api/wristband-api.module';

// Middleware
import {
  AuthMiddleware,
  IronSessionMiddleware,
  RequestTrackingMiddleware,
} from './common/middleware';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [csrfConfig, sessionConfig, wristbandAuthConfig],
      envFilePath: env.NODE_ENV === 'production' ? '' : '.env',
      ignoreEnvFile: env.NODE_ENV === 'production',
    }),
    CsrfModule,
    HelloWorldModule,
    SessionModule,
    WristbandApiModule,
    WristbandExpressAuthModule.forRootAsync(
      {
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          return configService.get('wristbandAuth');
        },
        inject: [ConfigService],
      },
      'WristbandAuth',
    ),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // Apply session middleware globally
    consumer
      .apply(RequestTrackingMiddleware, IronSessionMiddleware)
      .forRoutes('*');
    // Apply auth middleware to all routes except auth endpoints
    consumer.apply(AuthMiddleware).exclude('/api/auth/(.*)').forRoutes('*');
  }
}
