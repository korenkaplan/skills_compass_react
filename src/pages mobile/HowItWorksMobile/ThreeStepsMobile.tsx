import React, { CSSProperties, ReactNode } from 'react';
import './ThreeStepsMobile.css';
import Lottie from 'lottie-react';
import pagesAnimation from '../../assets/animations/pages.json';
import robotScans from '../../assets/animations/robotScan.json';
import legoAnimation from '../../assets/animations/Lottie Lego.json';
import OneDigit from '../../assets/digits/icons8-1-50.png';
import TwoDigit from '../../assets/digits/icons8-2-50.png';
import ThreeDigit from '../../assets/digits/icons8-3-50.png';
import Slide from '../../components/FramerMotion/Slide';
import ItemByItemReveal from '../../components/FramerMotion/ItemByItemReveal';
import StepNumber from '../../components/StepNumber/StepNumber';
import Reveal from '../../components/FramerMotion/Reveal';

const ThreeStepsMobile: React.FC = () => {
 const stepTextStyle:CSSProperties = {
  fontSize:'17px',
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
  styleObject?: CSSProperties;
  key: string;
}

const steps: Step[] = [
  {
    key: '1',
    header: '🔍 Scanning',
    text:(<p style={stepTextStyle}>We scan <strong style={strongStyle}>100+</strong> job listings on a daily basis from various  job searching websites to ensure our data is consistently up-to-date and highly reliable.</p>),
    img: OneDigit,
    lottie:pagesAnimation,
    styleObject:{right: '20px'},
  },
  {
    key: '2',
    header: '📝 Text Analysis',
    text:( <p style={stepTextStyle}>We extract key technological words from job descriptions and accurately identify them using our dataset of <strong style={strongStyle}>700+</strong> technological keywords.</p>),
    img: TwoDigit,
    lottie:robotScans,
    styleObject:{right: '10px'},

  },
  {
    key: '3',
    header: '🔄 Data Processing',
    text:(<p style={stepTextStyle}>We process the keywords by counting, grouping synonyms, and categorizing them to provide clear insights and identify the most in-demand technologies.</p>),
    img: ThreeDigit,
    lottie:legoAnimation,
    styleObject:{right: '23px'},

  },
]
const stepWrapperStyle: CSSProperties = {
display: 'flex',
flexDirection: 'column',
alignItems: 'center',
margin: '0 0 50px 0',

}
  return (
    <div  className="three-steps">
      <div className="steps-containerMobile">
        {
          steps.map((step, index) => (
            < div style={stepWrapperStyle}
            key={index}
            >



               <div className="stepMobile">
                <Reveal>
                <StepNumber size={50} number={step.key}/>
                </Reveal>
               <div className="step-content">
              <Slide slideFrom={index % 2 == 0 ? 'left' : 'right'} amount={0.3} >
                <div className="step-contentMobile" style={imageContainerStyle}>
                <Lottie animationData={step.lottie} loop={true} className='lottieAnimationThreeSteps' style={step.styleObject} />
              </div>
              </Slide>
               <ItemByItemReveal customStyle={{textAlign:'center'}} speed={20} >
              <h2>{step.header}</h2>
              {step.text}
              </ItemByItemReveal>
              </div>
            </div>
          </div>
          ))
        }

      </div>
    </div>
  );
};

export default ThreeStepsMobile;
