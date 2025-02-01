import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvailabilityFacade } from './availability.facade';
import { DatePipe } from '@angular/common';
import { Availability } from '../../dto/availability.model';

@Component({
  imports: [RouterModule, DatePipe],
  providers: [AvailabilityFacade],
  selector: 'app-availability',
  templateUrl: './availabilities.component.html',
  styleUrl: './availabilities.component.scss',
})
export class AvailabilityComponent implements OnInit {
  protected availability!: Availability;
  protected availabilityFacade = inject(AvailabilityFacade);

  async ngOnInit() {
    await this.availabilityFacade.fetchAvailabilities();
  }

  async fetchMore(): Promise<void> {
    await this.availabilityFacade.fetchAvailabilities();
  }

  protected selectAvailability(availability: Availability) {
    console.log('tu', availability)
    this.availability = availability;
  }
}
