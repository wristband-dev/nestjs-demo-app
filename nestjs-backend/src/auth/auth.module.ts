import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { CsrfModule } from 'src/csrf/csrf.module';

@Module({ imports: [CsrfModule], controllers: [AuthController] })
export class AuthModule {}
