// src/components/SideMenu.tsx
import React, { useState } from 'react';
import './LandingPage.css'
import '../../CSS/PageStyle.css'
import {backgroundColor} from '../../utils/variables'
import logoCropped from '../../assets/logo/logoCropped-removebg-preview.png'
import '../../CSS/RotatingImage.css'
import Line from '../../components/Line/Line'
import LinearProgress from '@mui/material/LinearProgress';

interface LandingPageProps {
  isLoading: boolean;
}

const LandingPage: React.FC<LandingPageProps> = ({ isLoading }) => {


const headerText: string = '"Discover the Key Skills for Your Dream Job in Israel\'s Hi-Tech Field"'
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
      <div className="loadingDiv" style={{color:'antiquewhite', width:'30%', visibility: isLoading? 'visible' :'hidden'}}>
      <h3 className={`fade-text ${isLoading ? 'animate' : ''}`}> Loading data please wait..</h3>
      <LinearProgress color="inherit" />
    </div>
    </div>
  );
};

export default LandingPage;
