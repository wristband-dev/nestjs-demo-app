import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.disable('x-powered-by');

  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3001', 'http://localhost:6001'],
    credentials: true,
  });

  await app.listen(process.env.PORT || 3001);
}
bootstrap();
