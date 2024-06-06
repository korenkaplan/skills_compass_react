// src/components/SideMenu.tsx
import React from 'react';
import './OverViewPage.css'
import '../../CSS/PageStyle.css'
import {backgroundColor} from '../../utils/variables'
import logo from '../../assets/logo/logo.png'


const Overview: React.FC = () => {

  const developerSurveyText = "Welcome to the 2023 Developer Survey! For 13 years, we've delivered industry-leading insights regarding the developer community. This year, we went deep into AI/ML to capture how developers are thinking about it and using it in their workflows. Stack Overflow is investing heavily in enhancing the developer experience across our products, using AI and other technology, to get people to solutions faster. Stack Overflow Labs is where we're sharing all we're doing - check it out for a deep dive on AI/ML insights as well as see what we're experimenting with so far.";


  return (
    <div style={{backgroundColor:backgroundColor}} className="section container" >
      <div className="textContainer">
      <div className="containerHeader">
        <h2 className='headerOverviewPage'>Overview</h2>
      </div>
      <div className="containerText">
        <p className='mainText'>{developerSurveyText}</p>
        </div>
      <div className="imageRow">
        <p>Happy reading !</p>
      <img src={logo} alt="Logo" className="logos" /> {/* Insert the logo image */}
      </div>
    </div>

    </div>
  );
};

export default Overview;
