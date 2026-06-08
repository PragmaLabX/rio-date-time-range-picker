import type { Dayjs } from 'dayjs';

export type PresetKey =
  | 'today'
  | 'last7'
  | 'last14'
  | 'thisMonth'
  | 'lastMonth'
  | 'custom';

export interface DateRange {
  start: Dayjs | null;
  end: Dayjs | null;
}

export type Period = 'AM' | 'PM';

export interface TimeValue {
  hour: number;
  minute: number;
  period: Period;
}
