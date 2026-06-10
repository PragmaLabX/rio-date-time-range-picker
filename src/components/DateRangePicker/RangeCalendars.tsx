import { useState } from 'react';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { YearCalendar } from '@mui/x-date-pickers/YearCalendar';
import type { PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import type { Dayjs } from 'dayjs';
import { RangeDay } from './RangeDay';

export type CalendarSide = 'left' | 'right';

interface MonthCalendarProps {
  month: Dayjs;
  side: CalendarSide;
  rangeStart: Dayjs | null;
  rangeEnd: Dayjs | null;
  previewEnd: Dayjs | null;
  onNavigate: (direction: 1 | -1) => void;
  onYearChange: (year: number, side: CalendarSide) => void;
  onSelectDay: (day: Dayjs) => void;
  onHoverDay: (day: Dayjs | null) => void;
}

function MonthCalendar({
  month,
  side,
  rangeStart,
  rangeEnd,
  previewEnd,
  onNavigate,
  onYearChange,
  onSelectDay,
  onHoverDay,
}: MonthCalendarProps) {
  const [yearAnchor, setYearAnchor] = useState<HTMLElement | null>(null);

  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" px={1}>
        <IconButton size="small" onClick={() => onNavigate(-1)} aria-label="Previous month">
          <ChevronLeftIcon color="primary" />
        </IconButton>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="subtitle1" color="primary" fontWeight={500}>
            {month.format('MMMM')}
          </Typography>
          <ButtonBase onClick={(event) => setYearAnchor(event.currentTarget)} sx={{ borderRadius: 1, px: 0.5 }}>
            <Typography variant="subtitle1" color="primary" fontWeight={500}>
              {month.format('YYYY')}
            </Typography>
          </ButtonBase>
        </Stack>
        <IconButton size="small" onClick={() => onNavigate(1)} aria-label="Next month">
          <ChevronRightIcon color="primary" />
        </IconButton>
      </Stack>

      <Popover
        open={!!yearAnchor}
        anchorEl={yearAnchor}
        onClose={() => setYearAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <YearCalendar
          value={month}
          onChange={(value) => {
            onYearChange(value.year(), side);
            setYearAnchor(null);
          }}
        />
      </Popover>

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
  onYearChange: (year: number, side: CalendarSide) => void;
  onSelectDay: (day: Dayjs) => void;
  onHoverDay: (day: Dayjs | null) => void;
}

export function RangeCalendars(props: RangeCalendarsProps) {
  const { leftMonth, rightMonth, ...shared } = props;

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} onMouseLeave={() => props.onHoverDay(null)}>
      <MonthCalendar month={leftMonth} side="left" {...shared} />
      <MonthCalendar month={rightMonth} side="right" {...shared} />
    </Stack>
  );
}
