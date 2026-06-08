import Box from '@mui/material/Box';
import { DateRangePicker } from './components/DateRangePicker/DateRangePicker';

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
      <DateRangePicker
        onApply={(range) => console.log('Apply', range)}
        onCancel={() => console.log('Cancel')}
      />
    </Box>
  );
}

export default App;
