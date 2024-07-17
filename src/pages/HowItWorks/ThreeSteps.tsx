import React, { CSSProperties } from 'react';
import './ThreeSteps.css';
import '../../utils/variables.css'
import CurvedArrow from '../../components/curvedArrow/CurvedArrow';
import Lottie from 'lottie-react';
import pagesAnimation from '../../assets/animations/pages.json';
import robotScans from '../../assets/animations/robotScan.json';
import legoAnimation from '../../assets/animations/Lottie Lego.json';
import Slide from '../../components/FramerMotion/Slide';
import Reveal from '../../components/FramerMotion/Reveal';
import StepNumber from '../../components/StepNumber/StepNumber';
import {contrastColor} from '../../utils/theme'
const ThreeSteps: React.FC = () => {
  const lottieStyle = {
    width: '100%',
    height: '200px',
  };



  const imageContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
const strongStyle: CSSProperties = {
  color: contrastColor
}
const arrowFramerMotionANimationDelay = 0.5
const stepNumberSize = 50
const stepNumberFontSize = 30
  return (
    <div  className="three-steps">
      <div className="steps-container">
        <div className="stepAndArrowDiv">
        <Slide slideFrom='left'>
        <div className="step">
        <StepNumber fontSize={stepNumberFontSize} number={1} size={stepNumberSize}/>
          <div  className="step-content" style={imageContainerStyle}>
            <Lottie animationData={pagesAnimation} loop={true} style={lottieStyle} />
          <h3>🔍 Scanning</h3>
          <p>We scan <strong style={strongStyle}>100+</strong> job listings on a daily basis from various  job searching websites to ensure our data is consistently up-to-date and highly reliable.</p>
          </div>
        </div>
        </Slide>
        <Reveal  delay={arrowFramerMotionANimationDelay} distanceYAxis={0}>
         <CurvedArrow />
        </Reveal>
        </div>
        <div className="stepAndArrowDiv">
        <Reveal delay={0.5} distanceYAxis={0}>
        <div className="step">
        <StepNumber fontSize={stepNumberFontSize} number={2} size={stepNumberSize}/>
           <div className="step-content" style={imageContainerStyle}>
            <Lottie animationData={robotScans} loop={true} style={lottieStyle} />
          <h3>📝 Text Analysis</h3>
          <p>We extract key technological words from job descriptions and accurately identify them using our dataset of <strong style={strongStyle}>700+</strong> technological keywords.</p>
          </div>
        </div>
        </Reveal>
        <Reveal  delay={arrowFramerMotionANimationDelay} distanceYAxis={0}>
         <CurvedArrow />
        </Reveal>
        </div>
          <Slide slideFrom='right'>
        <div className="step">
        <StepNumber fontSize={stepNumberFontSize} number={3} size={stepNumberSize}/>
          <div className="step-content" style={imageContainerStyle}>
            <Lottie animationData={legoAnimation} loop={true} style={lottieStyle} />
          <h3>🔄 Data Processing</h3>
          <p>We process the keywords by counting, grouping synonyms, and categorizing them to provide clear insights and identify the most in-demand technologies.</p>
          </div>
        </div>
        </Slide>
      </div>
    </div>
  );
};

export default ThreeSteps;
