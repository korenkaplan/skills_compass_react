// src/components/SideMenu.tsx
import React from 'react';
import './LandingPage.css'
import '../../CSS/PageStyle.css'
import {backgroundColor} from '../../utils/variables'
import logo from '../../assets/logo/logo.png'



const LandingPage: React.FC = () => {
const lastScan = '05/06/2024 08:13'
const totalVisitors = 1000
const headerText: string = 'Discover The Most In Demand Skills For Your Desired Job<br />  In Israel’s Tech Industry'
const subHeaderText: string = 'Scroll South'
  return (
    <div style={{backgroundColor:backgroundColor}} className="section main" >
      {/* <div className="visitors-div">
      <h4>Last Scan: {lastScan}</h4>
      <h4>Total Visitors: {totalVisitors}</h4>
      </div> */}
      <img src={logo}  className="mainLogo" /> {/* Insert the logo image */}
      <h2 className='header' dangerouslySetInnerHTML={{ __html: headerText }} />
      <h2 className='header'>{subHeaderText}</h2>
      <div className="arrow-circle">
      <div className="arrow"></div>
      </div>
    </div>
  );
};

export default LandingPage;
