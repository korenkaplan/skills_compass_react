import React from 'react';
import './FutureUpgrades.css';
import '../../utils/variables.css'
import CurvedArrow from '../../components/curvedArrow/CurvedArrow';
import Lottie from 'lottie-react';
import moreRoles from '../../assets/animations/moreJobs.json'
import graphs from '../../assets/animations/graphs.json'
import roadmap from '../../assets/animations/roadmap.json'
import Slide from '../../components/FramerMotion/Slide';
import Reveal from '../../components/FramerMotion/Reveal';
const FutureUpgrades: React.FC = () => {
  const lottieStyle = {
    width:'100%',
    height:'200px',

  }
  const arrowFramerMotionANimationDelay = 1
  const amount = 0.5
  return (
    <div  className="three-steps">
    <div className="steps-container">
    <div className="stepAndArrowDiv">
    <Slide amount={amount} slideFrom='left'>
        <div className="step">
            <div className="step-content">
                <Lottie animationData={moreRoles} loop={true} style={lottieStyle} />
            <h3>📈 More Roles</h3>
            <p>We will expand our coverage to include more roles in the tech industry.</p>
            </div>

        </div>
    </Slide>
    <Reveal amount={amount}  delay={arrowFramerMotionANimationDelay} distanceYAxis={0}>
         <CurvedArrow />
        </Reveal>
        </div>
        <div className="stepAndArrowDiv">
        <Reveal amount={amount} delay={0.5} distanceYAxis={0}>
        <div className="step">
            <div className="step-content">
                <Lottie animationData={graphs} loop={true} style={lottieStyle} />
            <h3>📊 Trends</h3>
            <p>We will provide insights into technology trends over time, helping you stay ahead of the curve.</p>
            </div>
        </div>
        </Reveal>

        <Reveal amount={amount}  delay={arrowFramerMotionANimationDelay} distanceYAxis={0}>
         <CurvedArrow />
        </Reveal>
        </div>
        <Slide amount={amount} slideFrom='right'>
        <div className="step">
            <div className="step-content">
                <Lottie animationData={roadmap} loop={true} style={lottieStyle} />

            <h3>🗺️ Roadmaps</h3>
            <p>We will offer continuously updating roadmaps for each role, highlighting the most relevant technologies.</p>
            </div>
        </div>
        </Slide>
    </div>
</div>


  );
}

export default FutureUpgrades;
