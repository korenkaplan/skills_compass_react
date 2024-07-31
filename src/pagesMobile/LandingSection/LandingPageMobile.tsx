// src/components/SideMenu.tsx
import React, { useState, useEffect } from 'react';
import './LandingPageMobile.css'
import '@utils/variables.css'
import logoCropped from '@assets/logo/logoCropped-removebg-preview.png'
import '@CSS/RotatingImage.css'
import Line from '@components/Line/Line'
import LinearProgress from '@mui/material/LinearProgress';
import { calculateMaxLineWidth, ScrollSmoothToView } from '@utils/functions'
import Lottie from "lottie-react";
import scrollAnimation from '@assets/animations/scroll down animation black.json'
import Slide from '@components/FramerMotion/Slide';
import ItemByItemReveal from '@components/FramerMotion/ItemByItemReveal';
import Reveal from '@components/FramerMotion/Reveal';
import { contrastColor } from '@utils/theme'
import ScaleOnTapButtonWrapper from '@components/FramerMotion/ScaleOnTapButtonWrapper';
interface LandingPageProps {
  isLoading: boolean;
  defaultSection: string
}
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}
const LandingPageMobile: React.FC<LandingPageProps> = ({ isLoading }) => {
  const percentOfScreenWidth = 0.40
  const [logoWidth, setMaxLineWidth] = useState(calculateMaxLineWidth(percentOfScreenWidth));
  const [currentIndex, setCurrentIndex] = useState(0);
  const logoText: string = 'SKILLS COMPASS'
  const waiting_titles: string[] = [
    'Please Be Patient I\'m Using Free Hosting...',
    'Hang tight! Good things come to those who wait...',
    'Loading... Your patience is appreciated!',
    'Fetching data... The server is waking up!',
    'Loading... Our free server is doing its best!',
    'Apologies for the wait, free hosting has its quirks!',
    'Patience is key... Free hosting in progress!',
    'Loading... Our server is still waking up!',
    'Almost there... Free hosting means occasional naps!',
    'Loading... Our server is on a budget!',
    'Free hosting at its finest... Thank you for waiting!',
    'Don\'t worry... Next time the result will be cached!',
    'Sorry for the wait, fill free to read the overview',
  ];

  useEffect(() => {
    const handleResize = () => {
      setMaxLineWidth(calculateMaxLineWidth(percentOfScreenWidth));
    };

    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentIndex(getRandomInt(waiting_titles.length));
      }, 4000); // Change every 3 seconds
      return () => clearInterval(interval);
    }
  }, [isLoading]);


  return (
    <div style={{ paddingTop: '30px' }} className="section main heightAndBorder" >
      <div className="mainContainerLandingPageMobile" >
        <Slide>
          <div className="image-container">
            <img style={{ width: `${logoWidth}px` }} src={logoCropped} alt="mainLogo " className="rotatingImage" />
          </div>
        </Slide>
        <ItemByItemReveal>
          <div className="textContainerLandingPage">
            <h1 className='logoHeader'>{logoText}</h1>
            <Line height="5px" width="175px" color={contrastColor} radius="4px" />
            <h2 className='headerLandingPageMobile'>Discover the <strong className='highlighted'>Most Wanted </strong> Skills  for your job in  Israel's High-Tech industry</h2>
          </div>
        </ItemByItemReveal>

        <div className="loadingDivMobile" style={{ color: 'antiquewhite', width: '50%', display: isLoading ? 'block' : 'none' }}>
          <h3 className={`fade-text ${isLoading ? 'animate' : ''}`}> {waiting_titles[currentIndex]}</h3>
          <LinearProgress color="inherit" />
        </div>
        <Reveal>
          <ScaleOnTapButtonWrapper autoStart={true}>
          <div
            className="actionButtonMobile" style={{ display: isLoading ? 'none' : 'flex' }} onClick={() => ScrollSmoothToView('overviewMobile')}>
            <Lottie className='alottieMobile' animationData={scrollAnimation} loop={true} autoPlay={true} />
            <p  >GET STARTED</p>
            <Lottie className='alottieMobile' animationData={scrollAnimation} loop={true} autoPlay={true} />
          </div>
          </ScaleOnTapButtonWrapper>

        </Reveal>
      </div>
    </div>
  );
};

export default LandingPageMobile;
