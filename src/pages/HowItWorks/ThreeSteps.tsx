import React, { CSSProperties } from 'react';
import './ThreeSteps.css';
import CurvedArrow from '../../components/curvedArrow/CurvedArrow';
import Lottie from 'lottie-react';
import pagesAnimation from '../../assets/animations/pages.json';
import robotScans from '../../assets/animations/robotScan.json';
import legoAnimation from '../../assets/animations/Lottie Lego.json';
import { backgroundColor } from '../../utils/variables';
import OneDigit from '../../assets/digits/icons8-1-50.png';
import TwoDigit from '../../assets/digits/icons8-2-50.png';
import ThreeDigit from '../../assets/digits/icons8-3-50.png';
import Slide from '../../components/FramerMotion/Slide';
import Reveal from '../../components/FramerMotion/Reveal';

const ThreeSteps: React.FC = () => {
  const lottieStyle = {
    width: '100%',
    height: '200px',
  };

  const digitStyle = {
    height: '60px',
    width: '60px',
    margin:' 0 0 20px 0'
  };

  const imageContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
const strongStyle: CSSProperties = {
  color: 'salmon'
}
const arrowFramerMotionANimationDelay = 0.5

  return (
    <div style={{ backgroundColor: backgroundColor }} className="three-steps">
      <div className="steps-container">
        <div className="stepAndArrowDiv">
        <Slide slideFrom='left'>
        <div className="step">
          <div className="step-number" style={imageContainerStyle}>
            <img src={OneDigit} style={digitStyle} alt="digit" />
            <Lottie animationData={pagesAnimation} loop={true} style={lottieStyle} />
          </div>
          <h3>🔍 Scanning</h3>
          <p>We scan <strong style={strongStyle}>100+</strong> job listings on a daily basis from various  job searching websites to ensure our data is consistently up-to-date and highly reliable.</p>
        </div>
        </Slide>
        <Reveal  delay={arrowFramerMotionANimationDelay} distanceYAxis={0}>
         <CurvedArrow />
        </Reveal>
        </div>
        <div className="stepAndArrowDiv">
        <Reveal delay={0.5} distanceYAxis={0}>
        <div className="step">
          <div className="step-number" style={imageContainerStyle}>
            <img src={TwoDigit} style={digitStyle} alt="digit" />
            <Lottie animationData={robotScans} loop={true} style={lottieStyle} />
          </div>
          <h3>📝 Text Analysis</h3>
          <p>We extract key technological words from job descriptions and accurately identify them using our dataset of <strong style={strongStyle}>700+</strong> technological keywords.</p>
        </div>
        </Reveal>
        <Reveal  delay={arrowFramerMotionANimationDelay} distanceYAxis={0}>
         <CurvedArrow />
        </Reveal>
        </div>
          <Slide slideFrom='right'>
        <div className="step">
          <div className="step-number" style={imageContainerStyle}>
            <img src={ThreeDigit} style={digitStyle} alt="digit" />
            <Lottie animationData={legoAnimation} loop={true} style={lottieStyle} />
          </div>
          <h3>🔄 Data Processing</h3>
          <p>We process the keywords by counting, grouping synonyms, and categorizing them to provide clear insights and identify the most in-demand technologies.</p>
        </div>
        </Slide>
      </div>
    </div>
  );
};

export default ThreeSteps;
