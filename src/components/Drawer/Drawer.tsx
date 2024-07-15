import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Section } from '../../utils/interfaces';
import logo from '../../assets/logo/logo ellow ribbon with text.png';
import './Drawer.css';
import '../../utils/variables.css'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import Slide from '../FramerMotion/Slide';
import Reveal from '../FramerMotion/Reveal';
import NavbarItemsHover from '../FramerMotion/NavbarItemsHover';
import {navbarItemsColor, contrastColor, textColor} from '../../utils/theme'
import { Drawer } from '@mui/material';

interface TemporaryDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  variant: 'temporary' | 'persistent' | 'permanent';
  sections: Section[];
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({ open, toggleDrawer, variant, sections }) => {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const [selectedSection, setSelectedSection] = useState<string>(null);

  const handleClick = (id: string) => {
    setSelectedSection(id)
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const BringThemHomeNowDiv = () => (
    <div className="bringThemHomeNowDiv">
      <p>#BringThemHome</p>
      <p className='nowHeader'>Now!</p>
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev-skill-compass-server.onrender.com/usage_stats/get-last-scan-date-and-time-view/');
        setTime(response.data.data['time']);
        setDate(response.data.data['date']);
        setIsFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const DrawerList = (
    <Box className='drawer' sx={{ width: 250}} role="presentation">
      <Slide slideFrom='left'>
      <div className="">
        <div className="logoDiv">
          <img src={logo} alt="Logo" style={{ width: isMobile ? '50%' : '80%' }} />
        </div>
        <Divider sx={{ backgroundColor: 'white' }} />
        <List>
          {sections.filter(section => (section.label !== 'Home')).map((section) => (
          <NavbarItemsHover>
          <ListItem
              key={section.id}
              disablePadding
              onClick={() => handleClick(section.id)}

            >
              <ListItemButton
                sx={{ textAlign: 'center', justifyContent: 'center', color: section.id == selectedSection ? contrastColor : textColor }} // Added justifyContent
              >
                <ListItemText primary={section.label} />
              </ListItemButton>
            </ListItem>
            </NavbarItemsHover>
          ))}
        </List>
        <Divider />
        <div style={{ display: isFetched ? 'flex' : 'none' }} className="lastScanDiv">
          <p style={{ marginRight: '10px' }}>Last Scan: </p>
          <p>{time} | {date}</p>
        </div>
      </div>
      </Slide>
      <Reveal delay={1}>
      <BringThemHomeNowDiv />

      </Reveal>
    </Box>
  );

  return (
    <Drawer variant={variant} slotProps={{ backdrop: { invisible: true } }} open={open} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default TemporaryDrawer;
