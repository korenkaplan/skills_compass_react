// src/pages/MainPage.tsx
import React from 'react';
import SideMenu from '../components/SideMenu';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './MainPage.css';
import '../CSS/PageStyle.css'
import LandingPage from './LandingSection/LandingPage'
import OverviewPage from './OverviewSection/OverviewPage'
import AboutMe from './AboutMeSection/AboutMePage';
const sections = [
  { id: 'landingPage', label: 'Home', component: LandingPage},
  { id: 'overviewPage', label: 'Overview', component: OverviewPage},
  { id: 'aboutMe', label: 'About Me' , component: AboutMe},

];

const MainPage: React.FC = () => {
  const activeSection = useIntersectionObserver(sections.map(section => section.id));

  return (
    <div className="main-page">
      <SideMenu sections={sections} activeSection={activeSection} />
      <div className="content">
        {sections.map(section => (
          <div key={section.id} id={section.id} className="section">
            <section.component/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;
