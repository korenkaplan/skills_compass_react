// src/components/SideMenu.tsx
import React from 'react';
import './SideMenu.css';
import logo from '../assets/logo/logo-removebg-preview.png'; // Import the logo image
import { Section } from '../utils/interfaces';

interface SideMenuProps {
  sections: Section[];
  activeSection: string | null;
}

const SideMenu: React.FC<SideMenuProps> = ({ sections, activeSection }) => {
  const handleClick = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="side-menu">
         <img src={logo} alt="Logo" className="logo" /> {/* Insert the logo image */}
      <ul>
        {sections.map(section => (
          <li
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={activeSection === section.id ? 'active' : ''}
          >
            {section.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
