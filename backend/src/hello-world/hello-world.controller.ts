import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { WristbandAuthGuard } from '../guards/wristband-auth.guard';
import { Request } from 'express';

@Controller('api/v1')
/* WRISTBAND_TOUCHPOINT - AUTHENTICATION */
@UseGuards(WristbandAuthGuard)
export class HelloWorldController {
  @Get('hello-with-cookie')
  getSessionHelloWorld(): string {
    const currentTime = new Date().toISOString().split('.')[0];
    return `You said "Hello" with a session cookie at ${currentTime}`;
  }

  @Get('hello-with-token')
  getTokenHelloWorld(@Req() req: Request): string {
    const currentTime = new Date().toISOString().split('.')[0];
    const claims = JSON.stringify(req.auth, null, 2);
    return `You said "Hello" with an access token at ${currentTime}.\n\nJWT Claims:\n${claims}`;
  }
}
