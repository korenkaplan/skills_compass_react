// src/components/SideMenu.tsx
import React from 'react';
import {backgroundColor} from '../../utils/variables'
import ThreeSteps from './ThreeSteps';
import './HowItWorks.css'
import FutureUpgrades from './FutureUpgrades';
import jobDescriptionhighlited from '../../assets/images/Job description highlited.png'
import CurvedArrow from '../../components/curvedArrow/CurvedArrow';
const HowItWorks: React.FC = () => {
  return (
    <div style={{backgroundColor:backgroundColor, padding:50, color:'white'}} className="section OverviewContainerDesktop heightAndBorder  " >
        <>
            <h1 >Workflow 🛠️</h1>
            <h2>Discover our  3-step process for delivering the most relevant and reliable data on the internet</h2>
            <ThreeSteps/>
        </>
        <div className="imagesDivDesktop">
          <div className="">
            <h2 className='resultDivHeaderDesktop'>This is How our system looks at Job Descriptions</h2>
          <img src={jobDescriptionhighlited} alt="" />
          </div>
          <div className="arrowDivDesktop">
          <CurvedArrow />

          </div>

          {/* <DescriptionResultDivDesktop/> */}
          <div className="descriptionResultDivDesktop">
            <h2 className='resultDivHeaderDesktop'>After Text Analysis & Data Processing</h2>
            <div className="resultListsDivDesktop">
            <p style={{textAlign:'center'}}><strong >Role: </strong> Backend Developer</p>
            <div className="row">
              <div className="col1">
              <strong>Programming Languages:</strong>
            <ul>
              <li>Typescript</li>
              <li>Java</li>
              <li>Python</li>
              <li>Javascript</li>
              <li>Scala</li>
            </ul>
              </div>
              <div className="col2">
              <strong>Databases:</strong>
            <ul>
              <li>MongoDB</li>
              <li>PostgreSQL</li>
              <li>Redis</li>
            </ul>
              </div>
            </div>
            <div className="row">
              <div className="col1">
              <strong>Cloud Architecture:</strong>
            <ul>
              <li>Microservices</li>
            </ul>
              </div>
              <div className="col2">
              <strong>Top Libraries:</strong>
            <ul>
              <li>Express.js</li>
            </ul>
              </div>
            </div>

            <div className="row">
              <div className="col1">
              <strong>Methodologies:</strong>
            <ul>
              <li>Agile</li>
            </ul>
              </div>
              <div className="col2">
              <strong>Frameworks:</strong>
            <ul>
              <li>Node.js</li>
              <li>Nest.js</li>
            </ul>

              </div>
            </div>


            </div>

          </div>
        </div>
        <>
            <h1>What's Next? 🚀</h1>
            <h2>Discover our exciting upcoming improvements and features</h2>
            <FutureUpgrades/>
        </>

    </div>
  );
};

export default HowItWorks;
