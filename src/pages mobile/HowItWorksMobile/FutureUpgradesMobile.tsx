import React, { CSSProperties, ReactNode } from 'react';
import './FutureUpgradesMobile.css';
import Lottie from 'lottie-react';
import moreRoles from '../../assets/animations/moreJobs.json'
import graphs from '../../assets/animations/graphs.json'
import roadmap from '../../assets/animations/roadmap.json'
import {backgroundColor} from '../../utils/variables'
const FutureUpgradesMobile: React.FC = () => {
  const lottieStyle = {
    width:'100%',
    height:'200px',

  }

type FutureUpgrade = {
    header: string;
    text: ReactNode;
    lottie:object;
}
const itemTextStyle:CSSProperties = {
    fontSize:'18px',
};
const futureUpgradesList: FutureUpgrade[] = [
    {
        header:'📈 More Roles',
        text:(<p style={itemTextStyle}>We will expand our coverage to include more roles in the tech industry.</p>),
        lottie:moreRoles
    },
    {
        header:'📊 Trends',
        text:(<p style={itemTextStyle}>We will provide insights into technology trends over time, helping you stay ahead of the curve.</p>),
        lottie:graphs
    },
    {
        header:'🗺️ Roadmaps',
        text:(<p style={itemTextStyle}>We will offer continuously updating roadmaps for each role, highlighting the most relevant technologies.</p>),
        lottie:roadmap
    },
]

  return (
    <div style={{backgroundColor:backgroundColor}} className="three-steps">
    <div className="steps-containerMobile">
        {
            futureUpgradesList.map(item => (
                <div className="stepMobile">
                <div className="step-number">
                    <Lottie animationData={item.lottie} loop={true}  style={lottieStyle} />
                </div>
                <h3>{item.header}</h3>
                {item.text}
            </div>
            ))
        }

    </div>
</div>


  );
}

export default FutureUpgradesMobile;
