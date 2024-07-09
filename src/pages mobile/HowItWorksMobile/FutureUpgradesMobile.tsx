import React, { CSSProperties, ReactNode } from 'react';
import './FutureUpgradesMobile.css';
import Lottie from 'lottie-react';
import moreRoles from '../../assets/animations/moreJobs.json'
import graphs from '../../assets/animations/graphs.json'
import roadmap from '../../assets/animations/roadmap.json'
import {backgroundColor} from '../../utils/variables'
const FutureUpgradesMobile: React.FC = () => {


type FutureUpgrade = {
    header: string;
    text: ReactNode;
    lottie:object;
    styleObject?: CSSProperties;

}
const itemTextStyle:CSSProperties = {
    fontSize:'18px',
};
const futureUpgradesList: FutureUpgrade[] = [
    {
        header:'📈 More Roles',
        text:(<p style={itemTextStyle}>We will expand our coverage to include more roles in the tech industry.</p>),
        lottie:moreRoles,
        styleObject:{right: '25px'},

    },
    {
        header:'📊 Trends',
        text:(<p style={itemTextStyle}>We will provide insights into technology trends over time, helping you stay ahead of the curve.</p>),
        lottie:graphs,
        styleObject:{right: '20px'},

    },
    {
        header:'🗺️ Roadmaps',
        text:(<p style={itemTextStyle}>We will offer continuously updating roadmaps for each role, highlighting the most relevant technologies.</p>),
        lottie:roadmap,
        styleObject:{right: '10px'},

    },
]

  return (
    <div style={{backgroundColor:backgroundColor}} className="three-steps">
    <div className="steps-containerMobile">
        {
            futureUpgradesList.map(item => (
                <div className="stepMobile">
                <div className="step-number">
                    <Lottie animationData={item.lottie} loop={true} className='FutureUpgradeMobile'  style={item.styleObject} />
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
