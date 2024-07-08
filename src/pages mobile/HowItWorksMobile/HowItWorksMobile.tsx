// src/components/SideMenu.tsx
import React from 'react';
import './HowItWorksMobile.css'
import {backgroundColor} from '../../utils/variables'
import ThreeStepsMobile from './ThreeStepsMobile';
import FutureUpgradesMobile from './FutureUpgradesMobile';
import Line from '../../components/Line/Line';
const HowItWorksMobile: React.FC = () => {
  return (
    <div style={{backgroundColor:backgroundColor, padding:50, color:'white'}} className="section OverviewContainerDesktop heightAndBorder  " >

        <>
            <h1 >Workflow 🛠️</h1>
            <h2>Discover our  3-step process for delivering the most relevant and reliable data on the internet</h2>
              <ThreeStepsMobile/>
        </>
            <Line height='1px' width='80%' color='white' />
        <>
            <h1>What's Next? 🚀</h1>
            <h2>Discover our exciting upcoming improvements and features</h2>
            <FutureUpgradesMobile/>

        </>
    </div>
  );
};

export default HowItWorksMobile;
