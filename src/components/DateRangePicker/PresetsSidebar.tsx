import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { PRESET_LABELS, PRESET_ORDER } from './presets';
import type { PresetKey } from './types';

interface PresetsSidebarProps {
  selected: PresetKey;
  onSelect: (preset: PresetKey) => void;
}

export function PresetsSidebar({ selected, onSelect }: PresetsSidebarProps) {
  return (
    <List disablePadding sx={{ minWidth: 160 }}>
      {PRESET_ORDER.map((preset) => (
        <ListItemButton
          key={preset}
          selected={selected === preset}
          onClick={() => onSelect(preset)}
          sx={{ borderRadius: 1, mb: 0.5 }}
        >
          <ListItemText primary={PRESET_LABELS[preset]} />
        </ListItemButton>
      ))}
    </List>
  );
}
