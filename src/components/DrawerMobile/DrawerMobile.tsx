import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Section } from '../../utils/interfaces';
import logo from '../../assets/logo/logo ellow ribbon with text.png';
import './DrawerMobile.css'
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
interface DrawerMobileProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  variant: 'temporary' | 'persistent' | 'permanent';
  sections: Section[];
}

const DrawerMobile: React.FC<DrawerMobileProps> = ({ open, toggleDrawer, variant, sections }) => {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const [rolesSectionsList, setRolesSectionsList] = useState<Section[]>([]);
  const [notRolesSectionsList, setNotRolesSectionsList] = useState<Section[]>([]);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);

  const handleClick = (id: string) => {
    toggleDrawer(false)
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClickCollapsed = () => {
    setIsCollapsed(!isCollapsed);
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

  const getRolesSections = () => {
    setNotRolesSectionsList(sections.filter(section => section && !section.isRole && section.label !== 'Home'));
    setRolesSectionsList(sections.filter(section => section && section.isRole));
  };

  useEffect(() => {
    getRolesSections();
  }, [sections]);

  const DrawerList = (
    <Box className='drawer' sx={{ width: 250, backgroundColor: '#1E2028' }} role="presentation">
      <div>
        <div className="logoDiv">
          <img src={logo} alt="Logo" style={{ width: isMobile ? '50%' : '80%' }} />
        </div>
        <Divider sx={{ backgroundColor: 'white' }} />
        <div className="firstSection">
        {notRolesSectionsList.length > 0 && (
          <ListItem
            key={notRolesSectionsList[0].id}
            disablePadding
            onClick={() => handleClick(notRolesSectionsList[0].id)}
            sx={{
              '&:hover': {
                backgroundColor: 'gray',
              }
            }}
            className={'li'}
          >
            <ListItemButton >
              <ListItemText primary={notRolesSectionsList[0].label} />
            </ListItemButton>
          </ListItem>
        )}
        </div>

        <div className="collapse">
        <ListItem
         sx={{
          '&:hover': {
            backgroundColor: 'gray',
          },
          padding:0,
        }}
        className={'li'}
        >
       <ListItemButton onClick={handleClickCollapsed}
       sx={{
       }}
       >
        <ListItemText primary="Roles" />
        {isCollapsed ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
        </ListItem>

        <Collapse in={isCollapsed} timeout="auto" unmountOnExit>
          <List disablePadding>
            {rolesSectionsList.map((section) => (
              section && section.id && (
                <ListItem
                  key={section.id}
                  disablePadding
                  onClick={() => handleClick(section.id)}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'gray',
                    }
                  }}
                  className={'li'}
                >
                  <ListItemButton sx={{ textAlign: 'center' }}>
                    <ListItemText primary={section.label} />
                  </ListItemButton>
                </ListItem>
              )
            ))}
          </List>
        </Collapse>
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
          className={'li'}
          >
          <ListItemButton >
            <ListItemText primary={section.label} />
          </ListItemButton>
          </ListItem>
        )))}
          </div>
        <Divider />
        {isFetched && (
          <div className="lastScanDiv" style={{ display: 'flex' }}>
            <p style={{ marginRight: '10px' }}>Last Scan: </p>
            <p>{time} | {date}</p>
          </div>
        )}
      </div>
      <BringThemHomeNowDiv />
    </Box>
  );

  return (
    <Drawer variant={variant}  slotProps={{ backdrop: { invisible: true } }} open={open} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default DrawerMobile;
