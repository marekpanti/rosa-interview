import { Injectable } from '@nestjs/common';
import { events, workingHours } from '../database/very-fake-database';
import { Availability, Avalabilities } from '../models';

@Injectable()
export class AvailabilitiesService {
  doctorEvents = events;
  doctorWorkingHours = workingHours;

  public getAvailabilities(from, to): Avalabilities {
    // Filter working hours for the specified days
    const filteredWorkingHours = this.filterWorkingHours(from, to);
    const allFreeSlots = {};

    filteredWorkingHours.forEach(({ day, start: workStart, end: workEnd }) => {
      const dayEvents = events.filter((event) => event.day === day);
      let freeSlotsPerDay = [{ start: workStart, end: workEnd }];

      dayEvents.forEach(({ start: eventStart, end: eventEnd }) => {
        const updatedSlots = [];

        // check the intervals
        freeSlotsPerDay.forEach(({ start: freeStart, end: freeEnd }) => {
          if (eventStart > freeStart && eventEnd < freeEnd) {
            updatedSlots.push({ start: freeStart, end: eventStart });
            updatedSlots.push({ start: eventEnd, end: freeEnd });
          } else if (eventStart <= freeStart && eventEnd > freeStart) {
            updatedSlots.push({ start: eventEnd, end: freeEnd });
          } else if (eventStart < freeEnd && eventEnd >= freeEnd) {
            updatedSlots.push({ start: freeStart, end: eventStart });
          } else {
            updatedSlots.push({ start: freeStart, end: freeEnd });
          }
        });

        freeSlotsPerDay = updatedSlots;
      });

      allFreeSlots[day] = freeSlotsPerDay;
    });

    return allFreeSlots;
  }

  // Very dummy implementation for our MVP
  // Normally we would check the date Object and time,
  // Find the working hour,
  // Seach events from the working day from the working hours until the end
  // If there are not working hours in that day, go to next day
  // substract the events and the working hours
  // get the slot
  public getFirstAvailability(after: string): Avalabilities | string {
    const availabilities = this.getAvailabilities(after, after);
    if (this.isNotEmpty(availabilities)) {
      return availabilities[after][0];
    } else {
      return 'Empty';
    }
  }

  private filterWorkingHours(from: string, to: string): Availability[] {
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];

    return this.doctorWorkingHours.filter((currentDay) => {
      const fromIndex = daysOfWeek.indexOf(from);
      const toIndex = daysOfWeek.indexOf(to);
      const currentIndex = daysOfWeek.indexOf(currentDay.day);
      return currentIndex >= fromIndex && currentIndex <= toIndex;
    });
  }

  private isNotEmpty(obj): boolean {
    return Object.keys(obj).length !== 0;
  }
}
