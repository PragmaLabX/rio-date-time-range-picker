import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import type { Dayjs } from 'dayjs';
import { RangeDay } from './RangeDay';

interface MonthCalendarProps {
  month: Dayjs;
  rangeStart: Dayjs | null;
  rangeEnd: Dayjs | null;
  previewEnd: Dayjs | null;
  onNavigate: (direction: 1 | -1) => void;
  onSelectDay: (day: Dayjs) => void;
  onHoverDay: (day: Dayjs | null) => void;
}

function MonthCalendar({
  month,
  rangeStart,
  rangeEnd,
  previewEnd,
  onNavigate,
  onSelectDay,
  onHoverDay,
}: MonthCalendarProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={1}>
        <IconButton size="small" onClick={() => onNavigate(-1)} aria-label="Previous month">
          <ChevronLeftIcon color="primary" />
        </IconButton>
        <Typography variant="subtitle1" color="primary" fontWeight={500}>
          {month.format('MMMM YYYY')}
        </Typography>
        <IconButton size="small" onClick={() => onNavigate(1)} aria-label="Next month">
          <ChevronRightIcon color="primary" />
        </IconButton>
      </Stack>
      <DateCalendar
        key={month.format('YYYY-MM')}
        referenceDate={month}
        value={null}
        onChange={(day) => day && onSelectDay(day)}
        dayOfWeekFormatter={(date) => date.format('dd')}
        showDaysOutsideCurrentMonth
        fixedWeekNumber={6}
        views={['day']}
        slots={{
          calendarHeader: () => null,
          day: RangeDay as unknown as React.ComponentType<PickersDayProps<Dayjs>>,
        }}
        slotProps={{
          day: ((ownerState: PickersDayProps<Dayjs>) => ({
            rangeStart,
            rangeEnd,
            previewEnd,
            onMouseEnter: () => onHoverDay(ownerState.day),
            onMouseLeave: () => onHoverDay(null),
          })) as unknown as PickersDayProps<Dayjs>,
        }}
      />
    </Box>
  );
}

interface RangeCalendarsProps {
  leftMonth: Dayjs;
  rightMonth: Dayjs;
  rangeStart: Dayjs | null;
  rangeEnd: Dayjs | null;
  previewEnd: Dayjs | null;
  onNavigate: (direction: 1 | -1) => void;
  onSelectDay: (day: Dayjs) => void;
  onHoverDay: (day: Dayjs | null) => void;
}

export function RangeCalendars(props: RangeCalendarsProps) {
  const { leftMonth, rightMonth, ...shared } = props;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} onMouseLeave={() => props.onHoverDay(null)}>
      <MonthCalendar month={leftMonth} {...shared} />
      <MonthCalendar month={rightMonth} {...shared} />
    </Stack>
  );
}
