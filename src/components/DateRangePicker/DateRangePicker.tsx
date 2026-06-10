import { useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs, { type Dayjs } from 'dayjs';
import { DateTimeFields, defaultTime } from './DateTimeFields';
import { PresetsSidebar } from './PresetsSidebar';
import { rangeForPreset } from './presets';
import { RangeCalendars, type CalendarSide } from './RangeCalendars';
import type { PresetKey, TimeValue } from './types';

const INITIAL_START = dayjs('2026-04-10');
const INITIAL_END = dayjs('2026-05-15');

export interface DateRangePickerProps {
  onApply?: (range: { start: Dayjs | null; end: Dayjs | null; startTime: TimeValue; endTime: TimeValue }) => void;
  onCancel?: () => void;
}

export function DateRangePicker({ onApply, onCancel }: DateRangePickerProps) {
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>('custom');
  const [startDate, setStartDate] = useState<Dayjs | null>(INITIAL_START);
  const [endDate, setEndDate] = useState<Dayjs | null>(INITIAL_END);
  const [startTime, setStartTime] = useState<TimeValue>(defaultTime());
  const [endTime, setEndTime] = useState<TimeValue>(defaultTime());
  const [anchorMonth, setAnchorMonth] = useState<Dayjs>(INITIAL_START.startOf('month'));
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);

  const rightMonth = useMemo(() => anchorMonth.add(1, 'month'), [anchorMonth]);

  const handleNavigate = (direction: 1 | -1) => {
    setAnchorMonth((prev) => prev.add(direction, 'month'));
  };

  const handleYearChange = (year: number, side: CalendarSide) => {
    setAnchorMonth((prev) => {
      if (side === 'left') return prev.year(year);
      const yearOffset = prev.add(1, 'month').year() - prev.year();
      return prev.year(year - yearOffset);
    });
  };

  const handleSelectDay = (day: Dayjs) => {
    setSelectedPreset('custom');
    setHoverDate(null);

    const rangeComplete = startDate && endDate;
    if (!startDate || rangeComplete) {
      setStartDate(day);
      setEndDate(null);
      return;
    }

    if (day.isBefore(startDate, 'day')) {
      setEndDate(startDate);
      setStartDate(day);
    } else {
      setEndDate(day);
    }
  };

  const handleSelectPreset = (preset: PresetKey) => {
    setSelectedPreset(preset);
    if (preset === 'custom') return;

    const range = rangeForPreset(preset);
    if (!range) return;

    setStartDate(range.start);
    setEndDate(range.end);
    if (range.start) {
      setAnchorMonth(range.start.startOf('month'));
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  const handleApply = () => {
    onApply?.({ start: startDate, end: endDate, startTime, endTime });
  };

  const previewEnd = !endDate ? hoverDate : null;

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 980, borderRadius: 2 }}>
      <Typography variant="h5" color="primary.light" fontWeight={400} gutterBottom>
        Select Date Range
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} mt={1}>
        <Box sx={{ pt: 1 }}>
          <PresetsSidebar selected={selectedPreset} onSelect={handleSelectPreset} />
        </Box>

        <Divider orientation="vertical" flexItem />

        <Box flex={1}>
          <RangeCalendars
            leftMonth={anchorMonth}
            rightMonth={rightMonth}
            rangeStart={startDate}
            rangeEnd={endDate}
            previewEnd={previewEnd}
            onNavigate={handleNavigate}
            onYearChange={handleYearChange}
            onSelectDay={handleSelectDay}
            onHoverDay={setHoverDate}
          />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} mt={2}>
            <DateTimeFields label="Start" date={startDate} time={startTime} onTimeChange={setStartTime} />
            <DateTimeFields label="End" date={endDate} time={endTime} onTimeChange={setEndTime} />
          </Stack>

          <Stack direction="row" spacing={1.5} justifyContent="flex-end" mt={3}>
            <Button
              variant="contained"
              onClick={handleCancel}
              sx={{ bgcolor: 'grey.900', '&:hover': { bgcolor: 'grey.800' } }}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleApply}>
              Apply
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
