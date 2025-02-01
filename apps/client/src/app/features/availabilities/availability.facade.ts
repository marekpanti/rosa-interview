import { inject, Injectable, signal } from '@angular/core';
import { DailyAvailability } from '../../dto/availability.model';
import { RosaApiService } from '../../services/api.service';

@Injectable()
export class AvailabilityFacade {
  private availabilitiesApiService = inject(RosaApiService);
  // could be replaced for signal State, or we could have more flat structure
  public availabilitiesStore = signal<DailyAvailability[]>([]);
  private availabilitiesDate = signal(new Date().toISOString());

  async fetchAvailabilities(): Promise<void> {
    const availabilities =
      await this.availabilitiesApiService.fetchAvailabilities(
        this.availabilitiesDate()
      );
    // Added error handle would be nice with a toast message

    this.availabilitiesDate.set(
      new Date(availabilities.upcomingAvailabilityDate).toISOString()
    );
    this.availabilitiesStore.update((slots) => [
      ...slots,
      ...availabilities.availabilities,
    ]);
  }
}
