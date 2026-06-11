import Box from '@mui/material/Box';
import { DateRangeInput } from './components/DateRangePicker/DateRangeInput';

function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'grey.100',
        p: 4,
      }}
    >
      <DateRangeInput />
    </Box>
  );
}

export default App;
