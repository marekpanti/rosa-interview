import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AvailabilitiesService } from './services/availabilities.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AvailabilitiesService],
})
export class AppModule {}
