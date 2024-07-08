import React from 'react';
import './ThreeSteps.css';
import CurvedArrow from '../../components/curvedArrow/CurvedArrow';
import Lottie from 'lottie-react';
import pagesAnimation from '../../assets/animations/pages.json'
import robotScans from '../../assets/animations/robotScan.json'
import legoAnimation from '../../assets/animations/Lottie Lego.json'
import {backgroundColor} from '../../utils/variables'
import OneDigit from '../../assets/digits/icons8-1-50.png'
import TwoDigit from '../../assets/digits/icons8-2-50.png'
import ThreeDigit from '../../assets/digits/icons8-3-50.png'
const ThreeSteps: React.FC = () => {
 type Step = {
  animation: object;
  header: string;
  text: string;
 }
 const steps: Step[] = [
  {
    animation: pagesAnimation,
    header: 'Scanning Job Descriptions',
    text: ' Daily Scanning of job descriptions from various websites'
  },
  {
    animation: robotScans,
    header: 'Extracting Tech Keywords',
    text: 'Extracting Tech Keywords from the job descriptions'
  },
  {
    animation: legoAnimation,
    header: 'Processing Keywords',
    text: 'Processing the keywords .'
  }
 ]
  const lottieStyle = {
    width:'100%',
    height:'200px',

  }
  const digitStyle = {
    height:'60px',
    width:'60px',
  }
  return (
    <div style={{backgroundColor:backgroundColor}} className="three-steps">
    <h1>How It Works? 🛠️</h1>
    <div className="steps-container">
        <div className="step">
            <div className="step-number">
                <img src={OneDigit} style={digitStyle} alt="digit" />
                <Lottie animationData={pagesAnimation} loop={true} style={lottieStyle} />
            </div>
            <h3>🔍 Scanning</h3>
            <p>We scan <strong>100+</strong> job listings daily from various websites to ensure comprehensive coverage.</p>
        </div>
        <CurvedArrow />
        <div className="step">
            <div className="step-number">
                <img src={TwoDigit} style={digitStyle} alt="digit" />
                <Lottie animationData={robotScans} loop={true} style={lottieStyle} />
            </div>
            <h3>📝 Text Analysis</h3>
            <p>We extract key technological skills from full job descriptions to identify the most in-demand technologies.</p>
        </div>
        <CurvedArrow />
        <div className="step">
            <div className="step-number">
                <img src={ThreeDigit} style={digitStyle} alt="digit" />
                <Lottie animationData={legoAnimation} loop={true} style={lottieStyle} />
            </div>
            <h3>🔄 Data Processing</h3>
            <p>We process the keywords by counting, grouping synonyms, and categorizing them to provide clear insights.</p>
        </div>
    </div>
</div>

  );
}

export default ThreeSteps;
