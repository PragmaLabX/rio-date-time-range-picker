import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { Dayjs } from 'dayjs';
import type { Period, TimeValue } from './types';

const MINUTE_OPTIONS = [0, 15, 30, 45];

interface DateTimeFieldsProps {
  label: string;
  date: Dayjs | null;
  time: TimeValue;
  onTimeChange: (next: TimeValue) => void;
}

export function DateTimeFields({ label, date, time, onTimeChange }: DateTimeFieldsProps) {
  const handleHourChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = Number(event.target.value);
    if (Number.isNaN(raw)) return;
    const hour = Math.min(12, Math.max(1, raw));
    onTimeChange({ ...time, hour });
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
        <TextField
          size="small"
          value={date ? date.format('YYYY-MM-DD') : ''}
          slotProps={{ input: { readOnly: true } }}
          sx={{ width: 160 }}
        />
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body2" sx={{ minWidth: 80 }}>
          {label} Time:
        </Typography>
        <TextField
          size="small"
          type="number"
          value={time.hour}
          onChange={handleHourChange}
          slotProps={{
            htmlInput: { min: 1, max: 12 },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <AccessTimeIcon fontSize="small" color="action" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 90 }}
        />
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
