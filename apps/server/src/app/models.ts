export interface Avalabilities {
  [key: string]: Availability;
}

export interface Availability {
  start: string;
  end: string;
  day: string;
}
