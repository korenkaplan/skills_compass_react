import React, { CSSProperties, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Section } from '../../utils/interfaces';
import './DrawerMobile.css'
import axios from 'axios';
import {contrastColor, navbarBackgroundColor} from '../../utils/theme'
import NavbarItemsHover from '../../components/FramerMotion/NavbarItemsHover';
import { apiPrefix } from '../../utils/variables';
import { useMediaQuery } from 'react-responsive';
import ItemByItemReveal from '../../components/FramerMotion/ItemByItemReveal';
import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import ribbon from '../../assets/icons/icons8-ribbon-50.png';
import Reveal from '../../components/FramerMotion/Reveal';
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
  const isIpad = useMediaQuery({ query: '(max-width: 900px)' });

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

  const listButtonCssStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
  const headerStyle: CSSProperties = {
    color: contrastColor,
    fontSize: '20px',
    marginLeft: '20px',
  };
  const DrawerList = (
    <Box className='drawerMobile' sx={{ width: isIpad ?  '100vw' : '250px' , backgroundColor:navbarBackgroundColor, overflowY:'hidden' }} role="presentation">
      <div>
        <div className="topNavbarMobile">
        <ItemByItemReveal>
          <p className="poppins-900" style={headerStyle}>Skills Compass</p>
        </ItemByItemReveal>
        <Reveal>
        <div className="iconsdiv">
          <div className="iconWithATag">
            <a href="https://stories.bringthemhomenow.net/" target="_blank" rel="noopener noreferrer">
              <img src={ribbon} alt="My Image" className="clickableImageDesktop" />
            </a>
          </div>
          <div className="iconWithATag">
            <a href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
              <CiLinkedin size={30} color={contrastColor} />
            </a>
          </div>
          <div className="iconWithATag">
            <a href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} color={contrastColor} />
            </a>
          </div>
      </div>
      </Reveal>

        </div>
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
          <NavbarItemsHover>
          <ListItem
          className='ListItemMobile'
          key={section.id}
          disablePadding
          onClick={() => handleClick(section.id)}
          >
          <ListItemButton  sx={listButtonCssStyle}>
          <p >{section.label}</p>
          </ListItemButton>
          </ListItem>
          </NavbarItemsHover>

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
        backgroundColor: 'var(--navbar-background-color)',
        // marginTop: `${appBarHeight + 1}px`,
        opacity:0.95,
      },
    }}
  >
    {DrawerList}
  </Drawer>
  );
};

export default DrawerMobile;
