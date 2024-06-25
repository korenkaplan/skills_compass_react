import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Section } from '../../utils/interfaces';
import logo from '../../assets/logo/logo ellow ribbon with text.png'; // Import the logo image
import './Drawer.css'
import axios from 'axios';
interface TemporaryDrawerProps {
  open: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  variant: 'temporary' | 'persistent' | 'permanent'
  sections: Section[];
  activeSection: string | null;
}

const TemporaryDrawer: React.FC<TemporaryDrawerProps> = ({open, toggleDrawer, variant, sections, activeSection}) => {
    const [time, setTime] = useState<string>();
    const [date, setDate] = useState<string>();
    const [isFetched, setIsFetched] = useState<boolean>(false);


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
        const response = await axios.get('https://dev-skill-compass-server.onrender.com/usage_stats/get-last-scan-date-and-time-view/');
        setTime(response.data.data['time'])
        setDate(response.data.data['date'])
        setIsFetched(true)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
   })
   const DrawerList = (
    <Box className='drawer'  sx={{ width: 250, backgroundColor:'#1E2028' }} role="presentation" onClick={() => toggleDrawer(false)}>
        <div className="">
        <div className="logoDiv">
        <img src={logo} alt="Logo" style={{width:'50%'}} />
        </div>
      <Divider />
      <List>
        {
        sections.filter(section => (section.label !== 'Home')).map((section) => (
            <ListItem
            key={section.id}
            disablePadding
            onClick={() => handleClick(section.id)}
            sx={{
              '&:hover': {
                backgroundColor: 'gray', // Replace 'lightgray' with your desired hover color
              }
            }}
            className={activeSection === section.id ? 'active' : 'li'}
            >
            <ListItemButton
            sx={{textAlign:'center'}}
            >
              <ListItemText primary={section.label} />
            </ListItemButton>
          </ListItem>

        ))}
      </List>
      <Divider />
      <div style={{display: isFetched? 'flex':'none'}} className="lastScanDiv">
        <p style={{marginRight:'10px'}}>Last  Scan: </p>
        <p>{time} | {date}</p>
      </div>
        </div>

      <BringThemHomeNowDiv/>
    </Box>
  );
  return (
    <Drawer variant={variant} slotProps={{backdrop: {invisible:true}}} open={open} onClose={() => toggleDrawer(false)}>
      {DrawerList}
    </Drawer>
  );
};

export default TemporaryDrawer;
