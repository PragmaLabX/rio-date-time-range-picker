import { alpha } from '@mui/material/styles';
import { PickersDay, type PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import type { Dayjs } from 'dayjs';

interface RangeDayProps extends PickersDayProps<Dayjs> {
  rangeStart: Dayjs | null;
  rangeEnd: Dayjs | null;
  previewEnd: Dayjs | null;
}

export function RangeDay(props: RangeDayProps) {
  const { day, rangeStart, rangeEnd, previewEnd, outsideCurrentMonth, ...other } = props;

  const effectiveEnd = rangeEnd ?? previewEnd;
  const isPreview = !rangeEnd && !!previewEnd;

  const lower = rangeStart && effectiveEnd
    ? (rangeStart.isBefore(effectiveEnd) ? rangeStart : effectiveEnd)
    : null;
  const upper = rangeStart && effectiveEnd
    ? (rangeStart.isBefore(effectiveEnd) ? effectiveEnd : rangeStart)
    : null;

  const isStart = !!lower && day.isSame(lower, 'day');
  const isEnd = !!upper && day.isSame(upper, 'day');
  const isInRange = !!lower && !!upper && day.isAfter(lower, 'day') && day.isBefore(upper, 'day');
  const isEdge = isStart || isEnd;

  return (
    // outsideCurrentMonth days are disabled: clicking them would make DateCalendar
    // silently switch its internal displayed month, desyncing it from our custom header
    <PickersDay
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      disabled={outsideCurrentMonth}
      disableMargin
      sx={(theme) => ({
        ...((isInRange || isEdge) && {
          borderRadius: 0,
        }),
        ...(isInRange && {
          backgroundColor: alpha(theme.palette.primary.main, isPreview ? 0.06 : 0.12),
          '&:hover': {
            backgroundColor: alpha(theme.palette.primary.main, isPreview ? 0.1 : 0.18),
          },
        }),
        ...(isEdge && {
          backgroundColor: isPreview ? alpha(theme.palette.primary.dark, 0.6) : theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
          borderTopLeftRadius: isStart ? '50%' : 0,
          borderBottomLeftRadius: isStart ? '50%' : 0,
          borderTopRightRadius: isEnd ? '50%' : 0,
          borderBottomRightRadius: isEnd ? '50%' : 0,
          '&:hover, &:focus': {
            backgroundColor: theme.palette.primary.dark,
          },
        }),
      })}
    />
  );
}
