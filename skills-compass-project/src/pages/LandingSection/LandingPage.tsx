// src/components/SideMenu.tsx
import React, { useState, useEffect } from 'react';
import './LandingPage.css'
import {backgroundColor} from '../../utils/variables'
import logoCropped from '../../assets/logo/logoCropped-removebg-preview.png'
import '../../CSS/RotatingImage.css'
import Line from '../../components/Line/Line'
import LinearProgress from '@mui/material/LinearProgress';

interface LandingPageProps {
  isLoading: boolean;
}
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
const LandingPage: React.FC<LandingPageProps> = ({ isLoading }) => {

const [currentIndex, setCurrentIndex] = useState(0);
const headerText: string = '"Discover the Key Skills for Your Dream Job in Israel\'s Hi-Tech Field"'
const logoText: string = 'SKILLS COMPASS'
const textColor = 'antiquewhite'
const waiting_titles: string[] = [
  'Please Be Patient I\'m Using Free Hosting...',
  'Hang tight! Good things come to those who wait...',
  'Still loading... Almost there!',
  'Loading... Your patience is appreciated!',
  'Server\'s taking a quick nap... Be right back!',
  'Fetching data... The server is waking up!',
  'Loading... Our free server is doing its best!',
  'Apologies for the wait, free hosting has its quirks!',
  'Please hold on... The server is stretching!',
  'Patience is key... Free hosting in progress!',
  'Free hosting challenge: Getting things up and running!',
  'Loading... The server needed a coffee break!',
  'Hang tight... Our server is on free hosting time!',
  'Loading... Our server is still waking up!',
  'Almost there... Free hosting means occasional naps!',
  'Loading... Our server is on a budget!',
  'Free hosting at its finest... Thank you for waiting!',
];



useEffect(() => {
  if (isLoading) {
    const interval = setInterval(() => {
    setCurrentIndex(getRandomInt(waiting_titles.length));
    }, 4000); // Change every 3 seconds
    return () => clearInterval(interval);
  }
}, [isLoading]);

  return (
    <div style={{backgroundColor:backgroundColor}} className="section main" >
      <div className="image-container">
      <img src={logoCropped} alt="mainLogo Your Image" className="rotatingImage" />
    </div>
      <h1  className='logoHeader'>{logoText}</h1>
      <Line height="5px" width="12%" color={textColor} radius="4px" />
      <h2 className='headerLandingPage' dangerouslySetInnerHTML={{ __html: headerText }} />
      <div className="loadingDiv" style={{color:'antiquewhite', width:'50%', visibility: isLoading? 'visible' :'hidden'}}>
      <h3 className={`fade-text ${isLoading ? 'animate' : ''}`}> {waiting_titles[currentIndex]}</h3>
      <LinearProgress color="inherit" />
    </div>
    </div>
  );
};

export default LandingPage;
