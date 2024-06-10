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
  const aboutMeHeaderHebrew: string = 'קצת עלי...'
  const headerFormatted: string = _.upperCase(aboutMeHeader);

  const aboutMeParagraph = (
    <>
      <p>Hey there!</p>
      <p>Welcome to my little corner of the internet! If you're here, it means you're curious about the person behind the screen, and I'm glad you stopped by!</p>
      <p>I'm Koren Kaplan, a 27-year-old software enthusiast who just loves to code and learn new things. I recently graduated from Ruppin College as a Practical Software Engineer, where I rocked a GPA of 95 and aced my Final Project with a perfect 100.</p>
      <p>My journey in the tech world has led me to specialize in Python backend development. I get a real kick out of tackling everyday problems and finding clever solutions. Right now, I'm on the lookout for my first job in the field, excited to roll up my sleeves and dive into some cool projects.</p>
      <p>This little portfolio of mine isn't just a fancy display of my work; it's a testament to my passion for growing and exploring new horizons. So feel free to poke around, grab my resume from the bottom right corner, or hit me up on LinkedIn. Let's connect and chat!</p>
      <p>Cheers,</p>
      <p>Koren</p>
    </>
  );
  const aboutSkillsCompassHeader: string ="about skills compass";
  const aboutSkillsCompassHeaderHebrew: string ="קצת על הפרוייקט - \"Skill Compass\"";
  const aboutSkillsCompassHeaderFormatted: string = _.upperCase(aboutSkillsCompassHeader);

  const aboutSkillsCompassTextEnglish: string = "A backend engineer, also sometimes called a back-end developer, is a software engineer who focuses on the server-side of web applications. They are responsible for designing, building, implementing, and maintaining the core functionality that makes an application work.  building, implementing, and maintaining the core functionality that makes an application work.";

  const contactLinksHeader: string = 'CONTACT INFORMATION & CODE DOCUMENTATION ';
  const contactLinksHeaderFormatted: string = contactLinksHeader

  const resumeDownloadLink: string = "https://drive.google.com/uc?export=download&id=1NUAHmmDQ355s1QrkjrsTBb1EVnCyuzSu"

  return (
    <div style={{ backgroundColor: backgroundColor }} className="section aboutMeContainer">
      <div className="firstRow" >
        <div className="aboutMeDiv">
          <h1 className='header'>{headerFormatted}</h1>
          <Line height="2px" width="80px" color={textColor} radius="4px" />
          <p className="aboutMeText">{aboutSkillsCompassTextEnglish}</p>
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
      <h1 className='header'>{contactLinksHeaderFormatted}</h1>
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
        <div className="iconDiv">
        <a className='icon' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>Server Repository</p>
          </a>
        </div>
        <div className="iconDiv">
        <a className='icon' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>Client Repository</p>
          </a>
        </div>
        </div>
      </div>
      <a style={{color: "#253439"}} href="https://www.flaticon.com//" target='_blank' title="translation icons">* All icons created by Freepik - Flaticon</a>
    </div>
  );
}
export default AboutMe