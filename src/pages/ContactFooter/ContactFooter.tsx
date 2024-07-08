// src/components/SideMenu.tsx
import React, { CSSProperties } from 'react';
import './ContactFooter.css';
import {resumeDownloadLink,sideMenuBackgroundColor } from '../../utils/variables';
import linkedin from '../../assets/icons/linkedin.png'
import github from '../../assets/icons/github.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import download from '../../assets/icons/download.png'

const ContactFooter: React.FC = () => {

const headerStyle:CSSProperties = {
color:'white',
textAlign:'center',
margin: '0 0 10px 0',
};
  return (
        <div style={{ backgroundColor: sideMenuBackgroundColor }} className={"section"}>
          <div className="thirdRowDesktop" >
      <h2 style={headerStyle}>CONTACT INFORMATION & CODE DOCUMENTATION</h2>
        <div className="iconsAndLinksDivDesktop">
        <div className="iconDivDesktop">
        <a className='iconDesktop' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="My Image" className="clickableImageDesktop" />
          </a>
          <a className='aTagDesktop' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
             <p className='iconTextDesktop'>{'Linkedin Profile'}</p>
          </a>
        </div>

        <div className="iconDivDesktop">
        <a className='iconDesktop' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="My Image" className="clickableImageDesktop" />
          </a>
          <a className='aTagDesktop' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
             <p className='iconTextDesktop'>{'Phone: 053-340-6789'}</p>
          </a>
        </div>
        <div className="iconDivDesktop">
        <a className='iconDesktop'  href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
              <img src={download} alt="My Image" className="clickableImageDesktop" />
          </a>
          <a className='aTagDesktop' href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
             <p className='iconTextDesktop'>{'Download My CV'}</p>
          </a>
        </div>
        <div className="iconDivDesktop">
        <a className='iconDesktop' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImageDesktop" />
          </a>
          <a className='aTagDesktop' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
             <p className='iconTextDesktop'>{'Server Repository'}</p>
          </a>
        </div>
        <div className="iconDivDesktop">
        <a className='iconDesktop' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImageDesktop" />
          </a>
          <a className='aTagDesktop' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
             <p className='iconTextDesktop'>{'Client Repository'}</p>
          </a>
        </div>
        </div>
         </div>
    </div>
  );
}
export default ContactFooter
