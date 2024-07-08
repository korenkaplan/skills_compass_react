// src/components/SideMenu.tsx
import React from 'react';
import './ContactFooterMobile.css';
import { resumeDownloadLink, sideMenuBackgroundColor } from '../../utils/variables';
import _ from 'lodash';
import linkedin from '../../assets/icons/linkedin.png'
import github from '../../assets/icons/github.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import download from '../../assets/icons/download.png'
import Line from '../../components/Line/Line'
import {textColor} from '../../utils/variables'
const ContactFooterMobile: React.FC = () => {

  return (
        <div style={{ backgroundColor: sideMenuBackgroundColor }} className={"section aboutMeContainerMobile"}>
          <div className="communicationAboutMeDivMobile">
          <div style={{display:'flex', flexDirection:'column'}}>
            <h1 className='headrAboutMeMobile'>CONTACT INFORMATION</h1>
            <Line height="2px" width="80px" color={textColor} radius="4px" />
            </div>

            <div className="RowBottomAboutMe">
              <div className="iconDivMobile">
                  <a className='icon' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="My Image" className="clickableImage" />
                  </a>
                  <a className='aTag' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
                    <p className='iconText'>Linkedin Profile</p>
                  </a>
              </div>
              <div className="iconDivMobile">
                    <a className='icon'  href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
                    <img src={download} alt="My Image" className="clickableImage" />
                </a>
                <a className='aTag' href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
                  <p className='iconText'>Download My CV</p>
                </a>
              </div>
            </div>
            <div className="RowBottomAboutMe">
              <div className="iconDivMobile">
              <a className='icon' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>Server Repository'</p>
          </a>
              </div>
              <div className="iconDivMobile">
              <a className='icon' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>Client Repository'</p>
          </a>
              </div>
            </div>
            <div className="whatsappDiv">
              <div className="iconDivMobile">
              <a className='icon' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>WhatsApp</p>
          </a>
              </div>

            </div>
          </div>
        </div>
  );
}
export default ContactFooterMobile