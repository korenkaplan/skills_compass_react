import React, { CSSProperties, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Section } from '../../utils/interfaces';
import './DrawerMobile.css'
import axios from 'axios';
import {navbarBackgroundColor} from '../../utils/theme'
import NavbarItemsHover from '../../components/FramerMotion/NavbarItemsHover';
import { apiPrefix, appBarHeight } from '../../utils/variables';

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

  // const topHeaderDiv = (
  //   <div className="nameSquareMobile">
  //   <p className='poppins-900 headerLetterMobile'>Skills</p>
  //   <p className='poppins-900 dotDraweeMobile'></p>
  //   <p className='poppins-900 headerLetterMobile'>Compass</p>
  // </div>
  // )
  const listButtonCssStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const DrawerList = (
    <Box className='drawerMobile' sx={{ width: 250, backgroundColor:navbarBackgroundColor, overflowY:'hidden' }} role="presentation">
      <div>
        <div className="firstSection">
        {notRolesSectionsList.length > 0 && (
          <NavbarItemsHover>
          <ListItem
            key={notRolesSectionsList[0].id}
            disablePadding
            onClick={() => handleClick(notRolesSectionsList[0].id)}
            className='ListItemMobile'
          >
            <ListItemButton sx={listButtonCssStyle} >
            <p >{notRolesSectionsList[0].label}</p>
            </ListItemButton>
          </ListItem>
          </NavbarItemsHover>
        )}
        </div>

          <div className="restOfSections">
          {
        notRolesSectionsList && (notRolesSectionsList.slice(1).map((section)=> (
          <ListItem
          className='ListItemMobile'
          key={section.id}
          disablePadding
          onClick={() => handleClick(section.id)}
          sx={{
            '&:hover': {
              backgroundColor: 'gray',
            }
          }}

          >
          <ListItemButton  sx={listButtonCssStyle}>
          <p >{section.label}</p>
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
    <Drawer
    style={{ overflowY: 'hidden' }}
    variant={variant}
    slotProps={{ backdrop: { invisible: true } }}
    open={open}
    onClose={() => toggleDrawer(false)}
    sx={{
      '& .MuiPaper-root': {
        backgroundColor: 'var(--navbar-background-color)', // Custom background color
        borderRight: '1px solid var(--contrast-color)',
        marginTop: `${appBarHeight + 1}px`
      },
    }}
  >
    {DrawerList}
  </Drawer>
  );
};

export default DrawerMobile;
