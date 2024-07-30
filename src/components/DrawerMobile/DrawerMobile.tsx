import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Section } from '../../utils/interfaces';
import './DrawerMobile.css'
import axios from 'axios';
import {navbarBackgroundColor} from '../../utils/theme'
import NavbarItemsHover from '../../components/FramerMotion/NavbarItemsHover';
import { apiPrefix } from '../../utils/variables';

export interface DrawerMobileProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  variant: 'temporary' | 'persistent' | 'permanent';
  sections: Section[];
}

const DrawerMobile: React.FC<DrawerMobileProps> = ({ open, toggleDrawer, variant, sections }) => {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const [notRolesSectionsList, setNotRolesSectionsList] = useState<Section[]>([]);

  const handleClick = (id: string) => {
    toggleDrawer(false)
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
        const response = await axios.get(`${apiPrefix}/usage_stats/get-last-scan-date-and-time-view/`);
        console.log(response);

        setTime(response.data.data['time']);
        setDate(response.data.data['date']);
        setIsFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getRolesSections = () => {
    setNotRolesSectionsList(sections.filter(section => section && !section.isRole && section.label !== 'Home'));
  };

  useEffect(() => {
    getRolesSections();
  }, [sections]);

  const DrawerList = (
    <Box className='drawerMobile' sx={{ width: 250, backgroundColor:navbarBackgroundColor, overflowY:'hidden' }} role="presentation">
      <div>
        <div className="nameSquareMobile">
          <p className='poppins-900 headerLetterMobile'>Skills</p>
          <p className='poppins-900 dotDraweeMobile'></p>
          <p className='poppins-900 headerLetterMobile'>Compass</p>
        </div>
        <Divider sx={{ backgroundColor: 'white' }} />
        <div className="firstSection">
        {notRolesSectionsList.length > 0 && (
          <NavbarItemsHover>
          <ListItem
            key={notRolesSectionsList[0].id}
            disablePadding
            onClick={() => handleClick(notRolesSectionsList[0].id)}

          >
            <ListItemButton >
              <ListItemText className={'ListItemMobile'} primary={notRolesSectionsList[0].label} />
            </ListItemButton>
          </ListItem>
          </NavbarItemsHover>
        )}
        </div>

          <div className="restOfSections">
          {
        notRolesSectionsList && (notRolesSectionsList.slice(1).map((section)=> (
          <ListItem
          key={section.id}
          disablePadding
          onClick={() => handleClick(section.id)}
          sx={{
            '&:hover': {
              backgroundColor: 'gray',
            }
          }}

          >
          <ListItemButton >
            <ListItemText className={'ListItemMobile'} primary={section.label} />
          </ListItemButton>
          </ListItem>
        )))}
          </div>
        {isFetched && (
          <div className="lastScanDiv" style={{ display: 'flex' }}>
            <p style={{ marginRight: '10px' }}>Last Scan: </p>
            <p>{time} | {date}</p>
          </div>
        )}
      <BringThemHomeNowDiv />
      </div>
    </Box>
  );

  return (
    <Drawer style={{overflowY:'hidden'}} variant={variant}  slotProps={{ backdrop: { invisible: true } }} open={open} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default DrawerMobile;
