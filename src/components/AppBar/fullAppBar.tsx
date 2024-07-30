import React, { CSSProperties } from 'react';
import { contrastColor } from '../../utils/theme';
import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';
import ItemByItemReveal from '../FramerMotion/ItemByItemReveal';
import Reveal from '../FramerMotion/Reveal';
import ribbon from '../../assets/icons/icons8-ribbon-50.png';
import './Appbar.css';
import Hamburger from 'hamburger-react';
import { appBarHeight } from '../../utils/variables';

interface AppBarProps {
  isMobile: boolean;
  isOpen: boolean;
  toggleDrawer: (newOpen: boolean) => void;
}

const AppBar: React.FC<AppBarProps> = ({ isMobile, isOpen, toggleDrawer }) => {
  const handleToggle = () => {
    toggleDrawer(!isOpen);
  };

  const headerStyle: CSSProperties = {
    color: contrastColor,
    fontSize: '20px',
    marginLeft: '20px',
  };

  const burgerHeaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <div className="appBar" style={{ display: isMobile ? 'flex' : 'none', height: `${appBarHeight}px` }}>
      <div style={burgerHeaderStyle}>
        <Hamburger color="var(--contrast-color)" toggled={isOpen} toggle={handleToggle} size={25} />
        <ItemByItemReveal>
          <p className="poppins-900" style={headerStyle}>Skills Compass</p>
        </ItemByItemReveal>
      </div>
      <div className="iconsdiv">
        <Reveal>
          <div className="iconWithATag">
            <a href="https://stories.bringthemhomenow.net/" target="_blank" rel="noopener noreferrer">
              <img src={ribbon} alt="My Image" className="clickableImageDesktop" />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="iconWithATag">
            <a href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
              <CiLinkedin size={30} color={contrastColor} />
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="iconWithATag">
            <a href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <FaGithub size={30} color={contrastColor} />
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default AppBar;
