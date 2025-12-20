import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { env } from 'node:process';
import { join } from 'path';
import { WristbandExpressAuthModule } from '@wristband/nestjs-auth';
import { WristbandExpressSessionMiddleware, WristbandExpressSessionModule } from '@wristband/nestjs-auth/session';

// Wristband Config
import { authConfig, authGuardConfig, sessionConfig } from './config/wristband.config';

// Modules
import { AuthModule } from './auth/auth.module';
import { HelloWorldModule } from './hello-world/hello-world.module';

// Middleware
import { RequestTrackingMiddleware } from './middleware/request-tracking.middleware';

const imports = [
  ConfigModule.forRoot({
    isGlobal: true,
    load: [authConfig, authGuardConfig, sessionConfig],
    envFilePath: '.env',  // Always read from .env for demo purposes only

    /*
     * NOTE: In production, use environment variables from your deployment platform (e.g., AWS, 
     * Heroku, Docker) instead of .env files. Only load .env files in development environments.
     *
     * For example:
     * envFilePath: env.NODE_ENV === 'production' ? '' : '.env',
     * ignoreEnvFile: env.NODE_ENV === 'production',
     */
  }),

  /* WRISTBAND_TOUCHPOINT - AUTHENTICATION & SESSION */
  // Wristband SDK modules
  WristbandExpressAuthModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => configService.get('wristbandAuth'),
    inject: [ConfigService],
  }),
  WristbandExpressSessionModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => configService.get('wristbandSession'),
    inject: [ConfigService],
  }),

  // Feature modules
  AuthModule,
  HelloWorldModule,
];

// Only serve static Vue.js app in production
if (env.NODE_ENV === 'production') {
  imports.push(
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'static'),
      exclude: ['/api'],
    })
  );
}

@Module({ imports })
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    /* WRISTBAND_TOUCHPOINT - SESSION */
    // Apply session middleware globally to all routes
    consumer.apply(RequestTrackingMiddleware, WristbandExpressSessionMiddleware).forRoutes('{*splat}');
  }
}
