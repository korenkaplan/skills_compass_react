import React, { CSSProperties, ReactNode } from 'react';
import './ThreeStepsMobile.css';
import Lottie from 'lottie-react';
import pagesAnimation from '../../assets/animations/pages.json';
import robotScans from '../../assets/animations/robotScan.json';
import legoAnimation from '../../assets/animations/Lottie Lego.json';
import { backgroundColor } from '../../utils/variables';
import OneDigit from '../../assets/digits/icons8-1-50.png';
import TwoDigit from '../../assets/digits/icons8-2-50.png';
import ThreeDigit from '../../assets/digits/icons8-3-50.png';

const ThreeStepsMobile: React.FC = () => {
const digitSize = 90

  const lottieStyle = {
    width: '100%',
    height: '200px',
  };

  const digitStyle = {
    height: `${digitSize}px`,
    width: `${digitSize}px`,
    margin:' 0 0 20px 0'
  };
 const stepTextStyle:CSSProperties = {
  fontSize:'18px',
 }
  const imageContainerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
const strongStyle: CSSProperties = {
  color: 'salmon'
}

type Step = {
  header: string;
  text: ReactNode;
  lottie: object;
  img: string;
}

const steps: Step[] = [
  {
    header: '🔍 Scanning',
    text:(<p style={stepTextStyle}>We scan <strong style={strongStyle}>100+</strong> job listings on a daily basis from various  job searching websites to ensure our data is consistently up-to-date and highly reliable.</p>),
    img: OneDigit,
    lottie:pagesAnimation,
  },
  {
    header: '📝 Text Analysis',
    text:( <p style={stepTextStyle}>We extract key technological words from job descriptions and accurately identify them using our dataset of <strong style={strongStyle}>700+</strong> technological keywords.</p>),
    img: TwoDigit,
    lottie:robotScans,
  },
  {
    header: '🔄 Data Processing',
    text:(<p style={stepTextStyle}>We process the keywords by counting, grouping synonyms, and categorizing them to provide clear insights and identify the most in-demand technologies.</p>),
    img: ThreeDigit,
    lottie:legoAnimation,
  },
]
const stepWrapperStyle: CSSProperties = {
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
margin: '0 0 50px 0',

}
  return (
    <div style={{ backgroundColor: backgroundColor }} className="three-steps">
      <div className="steps-containerMobile">
        {
          steps.map(step => (
            < div style={stepWrapperStyle}>
              <div className="stepMobile">
              <div className="step-numberMobile" style={imageContainerStyle}>
                <img src={step.img} style={digitStyle} alt="digit" />
                <Lottie animationData={step.lottie} loop={true} style={lottieStyle} />
              </div>
              <h3>{step.header}</h3>
              {step.text}
            </div>
          </div>
          ))
        }

      </div>
    </div>
  );
};

export default ThreeStepsMobile;
