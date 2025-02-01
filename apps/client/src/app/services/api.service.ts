import { Injectable } from '@angular/core';
import { AvailabilitiesResponseDTO } from '../dto/availability.model';

@Injectable({ providedIn: 'root' })
export class RosaApiService {
  // I am intentionally using fetch, I am not using httpClient as I try to make the app as small as possible
  async fetchAvailabilities(
    isoDate: string
  ): Promise<AvailabilitiesResponseDTO> {
    const availabilitiesUrl = `http://localhost:3000/api/availabilities?date=${encodeURIComponent(
      isoDate
    )}`;
    // as there were CORS issue, I need to proxy the call via my BE to make it generic
    // const availabilitiesUrl = `https://staging-api.rosa.be/api/patient-booking/availabilities?key=antoine-staging-pairet&entityType=hp&date=${isoDate}&skip_initial_empty_days=true&site=61379ba159d4940022b6c926&motive=6256d44ed30d2d5a1f2f3c5a&is-new-patient=true`;

    const response = await fetch(availabilitiesUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    return await response.json();
  }
}
