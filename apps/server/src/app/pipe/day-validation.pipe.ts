import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class DayValidationPipe implements PipeTransform {
  private readonly validDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  transform(value: any) {
    if (!this.validDays.includes(value)) {
      throw new BadRequestException(
        `Invalid parameter`
      );
    }
    return value;
  }
}
