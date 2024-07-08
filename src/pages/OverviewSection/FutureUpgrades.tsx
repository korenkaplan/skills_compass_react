import React from 'react';
import './FutureUpgrades.css';
import CurvedArrow from '../../components/curvedArrow/CurvedArrow';
import Lottie from 'lottie-react';
import moreRoles from '../../assets/animations/moreJobs.json'
import graphs from '../../assets/animations/graphs.json'
import roadmap from '../../assets/animations/roadmap.json'
import {backgroundColor} from '../../utils/variables'
const FutureUpgrades: React.FC = () => {
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
    <h1>What's Next? 🚀</h1>
    <div className="steps-container">
        <div className="step">
            <div className="step-number">
                <Lottie animationData={moreRoles} loop={true} style={lottieStyle} />
            </div>
            <h3>📈 More Roles</h3>
            <p>We will expand our coverage to include more roles in the tech industry.</p>
        </div>
        <CurvedArrow />
        <div className="step">
            <div className="step-number">
                <Lottie animationData={graphs} loop={true} style={lottieStyle} />
            </div>
            <h3>📊 Trends</h3>
            <p>We will provide insights into technology trends over time, helping you stay ahead of the curve.</p>
        </div>
        <CurvedArrow />
        <div className="step">
            <div className="step-number">
                <Lottie animationData={roadmap} loop={true} style={lottieStyle} />
            </div>
            <h3>🗺️ Roadmaps</h3>
            <p>We will offer continuously updating roadmaps for each role, highlighting the most relevant technologies.</p>
        </div>
    </div>
</div>


  );
}

export default FutureUpgrades;
