// src/components/SideMenu.tsx
import React from 'react';
import './LandingPage.css'
import '../../CSS/PageStyle.css'
import {backgroundColor} from '../../utils/variables'
import logoCropped from '../../assets/logo/logoCropped-removebg-preview.png'
import '../../CSS/RotatingImage.css'
import Line from '../../components/Line/Line'

const LandingPage: React.FC = () => {
const lastScan = '05/06/2024 08:13'
const totalVisitors = 1000
const headerText: string = '"Discover the Key Skills for Your Dream Job in Israel\'s Hi-Tech Field"'
const subHeaderText: string = 'Scroll Down'
const logoText: string = 'SKILLS COMPASS'
const textColor = 'antiquewhite'

  return (
    <div style={{backgroundColor:backgroundColor}} className="section main" >
      <div className="image-container">
      <img src={logoCropped} alt="mainLogo Your Image" className="rotatingImage" />
    </div>
      <h1  className='logoHeader'>{logoText}</h1>
      <Line height="5px" width="12%" color={textColor} radius="4px" />
      <h2 className='headerLandingPage' dangerouslySetInnerHTML={{ __html: headerText }} />
    </div>
  );
};

export default LandingPage;
