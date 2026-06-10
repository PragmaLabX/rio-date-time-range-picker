import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type { Dayjs } from 'dayjs';
import type { Period, TimeValue } from './types';

const HOUR_OPTIONS = Array.from({ length: 12 }, (_, index) => index + 1);
const MINUTE_OPTIONS = [0, 15, 30, 45];

interface DateTimeFieldsProps {
  label: string;
  date: Dayjs | null;
  time: TimeValue;
  onTimeChange: (next: TimeValue) => void;
}

export function DateTimeFields({ label, date, time, onTimeChange }: DateTimeFieldsProps) {
  const handleHourChange = (event: SelectChangeEvent<number>) => {
    onTimeChange({ ...time, hour: Number(event.target.value) });
  };

  const handleMinuteChange = (event: SelectChangeEvent<number>) => {
    onTimeChange({ ...time, minute: Number(event.target.value) });
  };

  const handlePeriodChange = (event: SelectChangeEvent<Period>) => {
    onTimeChange({ ...time, period: event.target.value as Period });
  };

  return (
    <Stack spacing={1.5}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" sx={{ minWidth: 80 }}>
          {label} Date:
        </Typography>
        <Typography variant="body2" sx={{ width: 160 }}>
          {date ? date.format('YYYY-MM-DD') : '—'}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" sx={{ minWidth: 80 }}>
          {label} Time:
        </Typography>
        <Select size="small" value={time.hour} onChange={handleHourChange} sx={{ width: 80 }}>
          {HOUR_OPTIONS.map((hour) => (
            <MenuItem key={hour} value={hour}>
              {hour}
            </MenuItem>
          ))}
        </Select>
        <Select size="small" value={time.minute} onChange={handleMinuteChange} sx={{ width: 80 }}>
          {MINUTE_OPTIONS.map((minute) => (
            <MenuItem key={minute} value={minute}>
              {minute.toString().padStart(2, '0')}
            </MenuItem>
          ))}
        </Select>
        <Select size="small" value={time.period} onChange={handlePeriodChange} sx={{ width: 80 }}>
          <MenuItem value="AM">AM</MenuItem>
          <MenuItem value="PM">PM</MenuItem>
        </Select>
      </Stack>
    </Stack>
  );
}

export function defaultTime(): TimeValue {
  return { hour: 12, minute: 0, period: 'AM' };
}
