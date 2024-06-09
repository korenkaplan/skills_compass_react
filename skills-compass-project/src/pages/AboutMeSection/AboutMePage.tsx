// src/components/SideMenu.tsx
import React from 'react';
import './AboutMePage.css';
import '../../CSS/PageStyle.css';
import { backgroundColor } from '../../utils/variables';
import profilePic from '../../assets/images/profilePic.jpeg';
import _ from 'lodash';
import linkedin from '../../assets/icons/linkedin.png'
import github from '../../assets/icons/github.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import download from '../../assets/icons/download.png'
import Line from '../../components/Line/Line'
import {textColor} from '../../utils/variables'



const AboutMe: React.FC = () => {
  const aboutMeHeader: string = 'about me';
  const headerFormatted: string = _.startCase(aboutMeHeader);
  const aboutMeTextEnglish: string = "A backend engineer, also sometimes called a back-end developer, is a software engineer who focuses on the server-side of web applications. They are responsible for designing, building, implementing, and maintaining the core functionality that makes an application work.";

  const aboutSkillsCompassHeader: string ="about skills compass";
  const aboutSkillsCompassHeaderFormatted: string = _.startCase(aboutSkillsCompassHeader);
  const aboutSkillsCompassTextEnglish: string = "A backend engineer, also sometimes called a back-end developer, is a software engineer who focuses on the server-side of web applications. They are responsible for designing, building, implementing, and maintaining the core functionality that makes an application work.  building, implementing, and maintaining the core functionality that makes an application work.";

  "https://drive.google.com/file/d/1NUAHmmDQ355s1QrkjrsTBb1EVnCyuzSu/view?usp=drive_link"
  const resumeDownloadLink: string = "https://drive.google.com/uc?export=download&id=1NUAHmmDQ355s1QrkjrsTBb1EVnCyuzSu"

  return (
    <div style={{ backgroundColor: backgroundColor }} className="section aboutMeContainer">
      <div className="firstRow">
        <div className="aboutMeDiv">
          <h1 className='header'>{headerFormatted}</h1>
          <Line height="2px" width="80px" color={textColor} radius="4px" />
          <p className="aboutMeText">{aboutMeTextEnglish}</p>
        </div>
        <div className="imageDiv">
          <img src={profilePic} className="profilePic" alt="Profile" /> {/* Insert the logo image */}
        </div>
      </div>
      <div className="secondRow">
      <h1 className='header'>{aboutSkillsCompassHeaderFormatted}</h1>
      <Line height="2px" width="80px" color={textColor} radius="4px" />

      <p className="aboutMeText">{aboutSkillsCompassTextEnglish}</p>
      </div>
      <div className="thirdRow">
      <h1 className='header'>Contact Links:</h1>
      <Line height="2px" width="80px" color={textColor} radius="4px" />
        <div className="iconsAndLinksDiv">
        <div className="iconDiv">
        <a className='icon' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>Linkedin Profile</p>
          </a>
        </div>
        <div className="iconDiv">
        <a className='icon' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>GitHub Repository</p>
          </a>
        </div>
        <div className="iconDiv">
        <a className='icon' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>053-340-6789</p>
          </a>
        </div>
        <div className="iconDiv">
        <a className='icon'  href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
              <img src={download} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
             <p className='iconText'>Download My CV</p>
          </a>
        </div>
        </div>
      </div>
    </div>
  );
}
export default AboutMe