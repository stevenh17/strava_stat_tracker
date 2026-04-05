export interface StravaActivity {
  id: number;
  name: string;
  type: string;
  distance: number;
  start_date: string;
}

export interface Run {
  id: number;
  firstName: string | null;
  name: string;
  distance: number;
  start_date: string;
}

export interface EnrichedRun extends StravaActivity {
  userId: number;
  firstName: string | null;
}
