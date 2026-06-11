import { useState } from 'react';
import DateRangeIcon from '@mui/icons-material/DateRange';
import InputAdornment from '@mui/material/InputAdornment';
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import dayjs, { type Dayjs } from 'dayjs';
import { DateRangePicker } from './DateRangePicker';
import { defaultTime } from './DateTimeFields';
import type { TimeValue } from './types';

const INITIAL_START = dayjs('2026-04-10');
const INITIAL_END = dayjs('2026-05-15');
const DATE_FORMAT = 'DD.MM.YYYY';

interface AppliedRange {
  start: Dayjs | null;
  end: Dayjs | null;
  startTime: TimeValue;
  endTime: TimeValue;
}

function formatRange(range: AppliedRange): string {
  if (!range.start || !range.end) return '';
  return `${range.start.format(DATE_FORMAT)} – ${range.end.format(DATE_FORMAT)}`;
}

export function DateRangeInput() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [appliedRange, setAppliedRange] = useState<AppliedRange>({
    start: INITIAL_START,
    end: INITIAL_END,
    startTime: defaultTime(),
    endTime: defaultTime(),
  });

  return (
    <>
      <TextField
        label="Date Range"
        value={formatRange(appliedRange)}
        placeholder="Select date range"
        onFocus={(event) => setAnchorEl(event.currentTarget)}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <DateRangeIcon color="action" fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
        sx={{ minWidth: 280, '& .MuiInputBase-input': { cursor: 'pointer' } }}
      />

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        disableRestoreFocus
      >
        <DateRangePicker
          initialStart={appliedRange.start}
          initialEnd={appliedRange.end}
          initialStartTime={appliedRange.startTime}
          initialEndTime={appliedRange.endTime}
          onApply={(range) => {
            setAppliedRange(range);
            setAnchorEl(null);
          }}
          onCancel={() => setAnchorEl(null)}
        />
      </Popover>
    </>
  );
}
