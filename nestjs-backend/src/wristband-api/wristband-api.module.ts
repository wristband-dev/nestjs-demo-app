import { Module, Global } from '@nestjs/common';

import { WristbandApiService } from './wristband-api.service';

@Global()
@Module({
  providers: [WristbandApiService],
  exports: [WristbandApiService],
})
export class WristbandApiModule {}
