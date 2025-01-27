import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilitiesService } from './services/availabilities.service';

@Controller()
export class AppController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @Get('list')
  getAvailabilities(@Query('from') from: string, @Query('to') to: string) {
    return this.availabilitiesService.getAvailabilities(from, to);
  }

  @Get('first')
  getFirstAvailability(@Query('after') after: string) {
    return this.availabilitiesService.getFirstAvailability(after);
  }
}
