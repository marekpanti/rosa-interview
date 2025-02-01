export interface Availability {
  date: string;
  endDate: string;
  calendarIds: string[];
  organizationId: string;
}

export interface DailyAvailability {
  date: string;
  availabilities: Availability[];
}

export interface AvailabilitiesResponseDTO {
  availabilities: DailyAvailability[];
  hasFutureAvailabilities: boolean;
  hasPreviousAvailabilities: boolean;
  upcomingAvailabilityDate: Date;
}
