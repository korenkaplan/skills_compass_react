// src/components/SideMenu.tsx
import React, { CSSProperties } from 'react';
import './HowItWorksMobile.css'
import {backgroundColor} from '../../utils/variables'
import ThreeStepsMobile from './ThreeStepsMobile';
import FutureUpgradesMobile from './FutureUpgradesMobile';
import Line from '../../components/Line/Line';
import jobDescriptionhighlited from '../../assets/images/Job description highlited.png'
const HowItWorksMobile: React.FC = () => {
  const headerStyle:CSSProperties = {
    fontSize:'35px',

  }
  return (
    <div style={{backgroundColor:backgroundColor, padding:50, color:'white'}} className="section OverviewContainerDesktop heightAndBorder  " >

        <>
        <div style={{textAlign:'center'}}>
            <h1 style={headerStyle} >Workflow 🛠️</h1>
            <h2>Discover our  3-step process for delivering the most relevant and reliable data on the internet</h2>
        </div>
              <ThreeStepsMobile/>
        </>
        <div className="imagesDivMobile">
          <div className="">
            <h2 className='resultDivHeaderMobile'>This Is How Our System Looks at Job Descriptions</h2>
          <img src={jobDescriptionhighlited} alt="" />
          </div>

          {/* <DescriptionResultDivDesktop/> */}
          <div className="descriptionResultDivMobile">
            <h2 className='resultDivHeaderMobile'>After Text Analysis & Data Processing</h2>
            <div className="resultListsDivMobile">
            <p style={{textAlign:'center'}}><strong >Role: </strong> Backend Developer</p>
            <div className="rowMobile">
              <div className="col1Mobile">
              <strong>Programming Languages:</strong>
            <ul>
              <li>Typescript</li>
              <li>Java</li>
              <li>Python</li>
              <li>Javascript</li>
              <li>Scala</li>
            </ul>
              </div>
              <div className="col2Mobile">
              <strong>Databases:</strong>
            <ul>
              <li>MongoDB</li>
              <li>Redis</li>
              <li>PostgreSQL</li>

            </ul>
              </div>
            </div>
            <div className="rowMobile">
              <div className="col1Mobile">
              <strong>Cloud Architecture:</strong>
            <ul>
              <li>Microservices</li>
            </ul>
              </div>
              <div className="col2Mobile">
              <strong>Top Libraries:</strong>
            <ul>
              <li>Express.js</li>
            </ul>
              </div>
            </div>

            <div className="rowMobile">
              <div className="col1Mobile">
              <strong>Methodologies:</strong>
            <ul>
              <li>Agile</li>
            </ul>
              </div>
              <div className="col2Mobile">
              <strong>Frameworks:</strong>
            <ul>
              <li>Nest.js</li>
              <li>Node.js</li>

            </ul>

              </div>
            </div>


            </div>

          </div>
        </div>
       <Line margin='50px 0' height='1px' width='80%' color='white' />
        <>
        <div style={{textAlign:'center'}}>
            <h1 style={headerStyle}>What's Next? 🚀</h1>
            <h2>Discover our exciting upcoming improvements and features</h2>
        </div>
            <FutureUpgradesMobile/>

        </>
    </div>
  );
};

export default HowItWorksMobile;
