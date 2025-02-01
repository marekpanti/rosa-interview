import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class IsoDateValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!this.isValidIsoDate(value)) {
      throw new BadRequestException('Invalid ISO date');
    }
    return value;
  }

  private isValidIsoDate(dateString: string): boolean {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) && dateString === date.toISOString();
  }
}
