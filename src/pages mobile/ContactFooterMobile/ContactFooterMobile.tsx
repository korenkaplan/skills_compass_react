// src/components/SideMenu.tsx
import React from 'react';
import './ContactFooterMobile.css';
import { resumeDownloadLink } from '../../utils/variables';
import linkedin from '../../assets/icons/linkedin.png'
import github from '../../assets/icons/github.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import download from '../../assets/icons/download.png'
import Line from '../../components/Line/Line'
import ItemByItemReveal from '../../components/FramerMotion/ItemByItemReveal';
import Slide from '../../components/FramerMotion/Slide';
import Reveal from '../../components/FramerMotion/Reveal';
import HeaderWithDot from '../../components/HeaderWithDot/HeaderWithDot';
import { contrastColor } from '../../utils/theme';
const ContactFooterMobile: React.FC = () => {

  return (
        <div  className={"section aboutMeContainerMobile"}>
          <div className="communicationAboutMeDivMobile">
          <div style={{display:'flex', flexDirection:'column'}}>
          <ItemByItemReveal>
            <HeaderWithDot fontSize={22} header={'CONTACT & INFORMATION'}/>
            </ItemByItemReveal>
            <Slide slideFrom='left'>
            <Line height="2px" width="80px" color={contrastColor} radius="4px" />
            </Slide>
            </div>

            <div className="RowBottomAboutMe">
            <Slide slideFrom='left'>
              <div className="iconDivMobile">
                  <a className='icon' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="My Image" className="clickableImage" />
                  </a>
                  <a className='aTag' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
                    <p className='iconText'>Linkedin Profile</p>
                  </a>
              </div>
            </Slide>
            <Slide slideFrom='right'>
              <div className="iconDivMobile">
                    <a className='icon'  href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
                    <img src={download} alt="My Image" className="clickableImage" />
                </a>
                <a className='aTag' href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
                  <p className='iconText'>Download My CV</p>
                </a>
              </div>
            </Slide>

            </div>
            <div className="RowBottomAboutMe">
            <Slide slideFrom='left'>
              <div className="iconDivMobile">
              <a className='icon' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>Server Repository'</p>
          </a>
              </div>
            </Slide>
            <Slide slideFrom='right'>
              <div className="iconDivMobile">
              <a className='icon' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>Client Repository'</p>
          </a>
              </div>
            </Slide>
            </div>
            <Reveal >
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
            </Reveal>

          </div>
        </div>
  );
}
export default ContactFooterMobile