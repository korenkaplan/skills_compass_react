// src/components/SideMenu.tsx
import { Section } from '../../utils/interfaces';
import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './RoleSelect.css';

interface RoleSelectProps {
  sections: Section[];
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const RoleSelect: React.FC<RoleSelectProps> = ({ sections }) => {
  const [selectedSections, setSelectedSections] = React.useState<string[]>(sections && sections.length > 0 ? [sections[0].label] : []);

  const handleChange = (event: SelectChangeEvent<typeof selectedSections>) => {
    const {
      target: { value },
    } = event;
    const newSelectedSections = typeof value === 'string' ? value.split(',') : value;
    if (newSelectedSections.length === 0) {
      return;
    }
    setSelectedSections(newSelectedSections);
  };

  return (
    <div className="section main">
      <div className='roleSelectContentMobile'>
        <ThemeProvider theme={darkTheme}>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Roles</InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={selectedSections}
              onChange={handleChange}
              input={<OutlinedInput label="Roles" />}
              renderValue={(selected) => selected.join(', ')}
              MenuProps={MenuProps}

            >
              {sections.map((section) => (
                <MenuItem
                  key={section.id}
                  value={section.label}
                >
                  <Checkbox

                  checked={selectedSections.indexOf(section.label) > -1} />
                  <ListItemText

                  primary={section.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ThemeProvider>
        {sections
          .filter((section) => selectedSections.includes(section.label))
          .map((section) => (
            <div key={section.id} id={section.id} className="section">
              <section.component />
            </div>
          )).reverse()}
      </div>
    </div>
  );
}

export default RoleSelect;
