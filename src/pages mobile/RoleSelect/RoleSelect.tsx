// src/components/SideMenu.tsx
import { Section } from '../../utils/interfaces';
import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Reveal from '../../components/FramerMotion/Reveal';
import './RoleSelect.css'
import { IoMdArrowDropdown } from "react-icons/io";

import {contrastColor, primaryBackgroundColor} from '../../utils/theme'
// import { backgroundColor } from '@utils/variables';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      backgroundColor:'transparent',
    },
  },
  MenuListProps:{
     disablePadding: true
  }
};

function getStyles(name: string, selectedNames: string[], theme: Theme) {
  return {
    fontWeight:
      selectedNames.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
        backgroundColor: primaryBackgroundColor,
        color: contrastColor,
        border: `1px solid ${contrastColor}`,
  };
}

interface RoleSelectProps {
  sections: Section[]
}

const RoleSelect: React.FC<RoleSelectProps> = ({ sections }) => {
  const theme = useTheme();
  const [selectedNames, setSelectedNames] = React.useState<string[]>(sections && sections.length > 0 ? [sections[0].label] : []);
  const [selectedSections, setSelectedSections] = React.useState<Section[]>(sections && sections.length > 0 ? [sections[0]] : []);
  const [lastSelectedSection, setLastSelectedSection] = React.useState<Section>(sections && sections[0]);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;

    const selected = typeof value === 'string' ? value.split(',') : value;

    if (selected.length === 0) {
      setSelectedNames([lastSelectedSection.label]);
      setSelectedSections([lastSelectedSection]);
    } else {
      setSelectedNames(selected);
      const updatedSections = sections.filter(section => selected.includes(section.label));
      setSelectedSections(updatedSections);
      setLastSelectedSection(updatedSections[updatedSections.length - 1]);
    }
  };

  const selectInputStyle: React.CSSProperties = {
    backgroundColor: primaryBackgroundColor,
    color: contrastColor,
    border: `1px solid ${contrastColor}`,
    width: '100%',
  };

  return (
    <div  className="section main">
      <div className='roleSelectContentMobile'>
      <FormControl sx={{ m: 1, width: '90%', }}>
      <Reveal  className='RevealSelectRoleMobile'>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={selectedNames}
          onChange={handleChange}
          input={<OutlinedInput label="Role" />}
          MenuProps={MenuProps}
          IconComponent={()=> <IoMdArrowDropdown size={35}/>}
          sx={selectInputStyle}
        >
          {sections.map((section) => (
            <MenuItem
              key={section.label}
              value={section.label}
              style={getStyles(section.label, selectedNames, theme)}
            >
              {section.label}
            </MenuItem>
          ))}
        </Select>
      </Reveal>

      </FormControl>
      {selectedSections && selectedSections.map((section) => (
        <div key={section.id} id={section.id} className="section">
          <section.component />
        </div>
      )).reverse()}
      </div>

    </div>
  );
}

export default RoleSelect;
