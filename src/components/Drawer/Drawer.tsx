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
import {textColor} from '../../utils/theme'
import { Drawer } from '@mui/material';
import { CiLinkedin } from "react-icons/ci";
import { FaGithub } from "react-icons/fa";
import ribbon from '../../assets/icons/icons8-ribbon-50.png'
import Line from '../../components/Line/Line';
import { apiPrefix } from '../../utils/variables';

export interface DrawerDesktopProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  variant: 'temporary' | 'persistent' | 'permanent';
  sections: Section[];
}

const DrawerDesktop: React.FC<DrawerDesktopProps> = ({ open, toggleDrawer, variant, sections }) => {
  const [time, setTime] = useState<string>();
  const [date, setDate] = useState<string>();
  const [isFetched, setIsFetched] = useState<boolean>(false);
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });

  const handleClick = (id: string) => {
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
      <div className="">
        <div className="logoDiv">
          <img src={logo} alt="Logo" style={{ width: isMobile ? '50%' : '80%' }} />
        </div>
        <Divider sx={{ backgroundColor: 'white' }} />
      <Slide slideFrom='left'>
        <List>
          {sections.filter(section => (section.label !== 'Home')).map((section) => (
          <NavbarItemsHover
          key={section.id}>
          <ListItem
              key={section.id}
              disablePadding
              onClick={() => handleClick(section.id)}

            >
              <ListItemButton
                sx={{ textAlign: 'center', justifyContent: 'center', color: textColor }}
              >
                <ListItemText primary={section.label} />
              </ListItemButton>
            </ListItem>
            </NavbarItemsHover>
          ))}
        </List>
      </Slide>
      <Line height='1px' width='100%' color={'white'}/>
        <Slide slideFrom='left'>
        <div style={{ display: isFetched ? 'flex' : 'none' }} className="lastScanDiv">
          <p style={{ marginRight: '10px' }}>Last Scan: </p>
          <p>{time} | {date}</p>
        </div>
        </Slide>
        <Line height='1px' width='100%' color={'white'}/>
        <div  className="iconsDivDrawer">

          <Reveal className="iconWithATagDrawerDiv" >
            <div className="iconWithATagDrawer" >
              <a className='' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
              <CiLinkedin className="iconWithATagDrawer" size={40}   />
              </a>
            </div>
          </Reveal>
          <Reveal  delay={0.3}>
            <div  >
              <a className='' href="https://stories.bringthemhomenow.net/" target="_blank" rel="noopener noreferrer">
                <img src={ribbon} alt="My Image" className="clickableImageDesktop" />
              </a>
            </div>
          </Reveal>
          <Reveal className="iconWithATagDrawerDiv" delay={0.6}>
            <div   >
              <a className='' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <FaGithub className="iconWithATagDrawer"  size={35}  />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal  delay={1}>
      <BringThemHomeNowDiv />
      </Reveal>
    </Box>
  );

  return (
    <Drawer variant={variant} open={open} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default DrawerDesktop;
