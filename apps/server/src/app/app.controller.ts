import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilitiesService } from './services/availabilities.service';
import { DayValidationPipe } from './pipe/day-validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @Get('list')
  getAvailabilities(@Query('from', DayValidationPipe) from: string, @Query('to', DayValidationPipe) to: string) {
    return this.availabilitiesService.getAvailabilities(from, to);
  }

  @Get('first')
  getFirstAvailability(@Query('after', DayValidationPipe) after: string) {
    return this.availabilitiesService.getFirstAvailability(after);
  }
}
