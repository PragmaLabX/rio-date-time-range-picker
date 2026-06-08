import dayjs, { type Dayjs } from 'dayjs';
import type { DateRange, PresetKey } from './types';

export const PRESET_LABELS: Record<PresetKey, string> = {
  today: 'Today',
  last7: 'Last 7 days',
  last14: 'Last 14 days',
  thisMonth: 'This month',
  lastMonth: 'Last month',
  custom: 'Custom',
};

export const PRESET_ORDER: PresetKey[] = [
  'today',
  'last7',
  'last14',
  'thisMonth',
  'lastMonth',
  'custom',
];

export function rangeForPreset(preset: PresetKey, today: Dayjs = dayjs()): DateRange | null {
  switch (preset) {
    case 'today':
      return { start: today.startOf('day'), end: today.startOf('day') };
    case 'last7':
      return { start: today.subtract(6, 'day').startOf('day'), end: today.startOf('day') };
    case 'last14':
      return { start: today.subtract(13, 'day').startOf('day'), end: today.startOf('day') };
    case 'thisMonth':
      return { start: today.startOf('month'), end: today.startOf('day') };
    case 'lastMonth': {
      const prevMonth = today.subtract(1, 'month');
      return { start: prevMonth.startOf('month'), end: prevMonth.endOf('month').startOf('day') };
    }
    case 'custom':
    default:
      return null;
  }
}
