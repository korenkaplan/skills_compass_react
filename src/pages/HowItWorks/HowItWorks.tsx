// src/components/SideMenu.tsx
import React from 'react';
import {backgroundColor} from '../../utils/variables'
import ThreeSteps from './ThreeSteps';
import FutureUpgrades from './FutureUpgrades';
const HowItWorks: React.FC = () => {
  return (
    <div style={{backgroundColor:backgroundColor, padding:50, color:'white'}} className="section OverviewContainerDesktop heightAndBorder  " >
        <>
            <h1 >Workflow 🛠️</h1>
            <h2>Discover our  3-step process for delivering the most relevant and reliable data on the internet</h2>
            <ThreeSteps/>
        </>
        <>
            <h1>What's Next? 🚀</h1>
            <h2>Discover our exciting upcoming improvements and features</h2>
            <FutureUpgrades/>
        </>

    </div>
  );
};

export default HowItWorks;
