import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilitiesService } from './services/availabilities.service';
import { DayValidationPipe } from './pipe/day-validation.pipe';
import { IsoDateValidationPipe } from './pipe/iso-date-validation.pipe';

@Controller()
export class AppController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  // Showcase API(s), with the data from fake custom database
  @Get('list')
  getAvailabilities(
    @Query('from', DayValidationPipe) from: string,
    @Query('to', DayValidationPipe) to: string
  ) {
    return this.availabilitiesService.getAvailabilities(from, to);
  }

  @Get('first')
  getFirstAvailability(@Query('after', DayValidationPipe) after: string) {
    return this.availabilitiesService.getFirstAvailability(after);
  }

  // Real API to retreive the data for FE
  @Get('availabilities')
  async fetchAvailabilities(@Query('date', IsoDateValidationPipe) date: string) {
    return await this.availabilitiesService.fetchAvailabilities(date);
  }
}
