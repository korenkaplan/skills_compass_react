// src/components/SideMenu.tsx
import React, { useEffect, useState } from 'react';
import './SideMenu.css';
import logo from '../assets/logo/logo ellow ribbon with text.png'; // Import the logo image
import { Section } from '../utils/interfaces';
import axios from 'axios';

interface SideMenuProps {
  sections: Section[];
  activeSection: string | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ sections, activeSection }) => {
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
  return (
    <div className="side-menu">
      <img src={logo} alt="Logo" className="logo" />
      <ul>
        {sections.filter(section => (section.label !== 'Home')).map(section => (

          <li
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={activeSection === section.id ? 'active' : ''}
          >
            {section.label}
          </li>
        ))}
      </ul>
      <BringThemHomeNowDiv/>
      <div style={{display: isFetched? 'flex':'none'}} className="lastScanDiv">
        <p style={{marginRight:'10px'}}>Last Jobs Scan: </p>
        <p>{time} | {date}</p>
      </div>
    </div>
  );
};

export default SideMenu;
