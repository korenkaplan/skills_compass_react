import React, { useEffect, useState, useMemo } from 'react';
import './MainPage.css';
import LandingPage from './LandingSection/LandingPage';
import OverviewPage from './OverviewSection/OverviewPage';
import AboutMe from './AboutMeSection/AboutMePage';
import FaqPage from './FaqPage/FaqPage';
import RolePage from './RoleSection/RolePage';
import { Role, Section } from '../utils/interfaces';
import _ from 'lodash';
import axios from 'axios';
import TemporaryDrawer from '../components/Drawer/Drawer';
import { useMediaQuery } from 'react-responsive';
import { GiHamburgerMenu } from "react-icons/gi";
import { backgroundColor } from '../utils/variables';
import SwiperPage from './Swiper/Swiper';

import LandingPageMobile from '../pages mobile/LandingSection/LandingPageMobile';
import OverviewPageMobile from '../pages mobile/OverviewSection/OverviewPageMobile';
import RolePageMobile from '../pages mobile/RoleSection/RolePageMobile';
import FaqPageMobile from '../pages mobile/FaqPage/FaqPageMobile';
import AboutMePageMobile from '../pages mobile/AboutMeSection/AboutMePageMobile';

const convertRolesToSections = (roles: Role[], rolesFetched: boolean, isMobile: boolean): Section[] => {
  return roles.flatMap(role => {
    const roleProps = { role: role, rolesFetched: rolesFetched };
    return isMobile ?
      [{
        id: `mobile_${role.id}`, // Ensure unique IDs for mobile
        label: _.startCase(role.name),
        component: () => <RolePageMobile {...roleProps} />,
      }] :
      [{
        id: `desktop_${role.id}`, // Ensure unique IDs for desktop
        label: _.startCase(role.name),
        component: () => <RolePage {...roleProps} />,
      }];
  });
};

const MainPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesFetched, setRolesFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const marginLeftAmount = 250;
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const variant: 'temporary' | 'persistent' | 'permanent' = isMobile ? 'temporary' : 'persistent';
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const toggleDrawer = (newOpen: boolean) => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(newOpen);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://dev-skill-compass-server.onrender.com/usage_stats/get-all-roles/');
        setRoles(response.data);
        setRolesFetched(true);
        setIsLoading(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const sectionsMobile = useMemo(() => {
    return [
      { id: 'landingPage', label: 'Home', component: () => <LandingPageMobile isLoading={isLoading} /> },
      { id: 'overviewPage', label: 'Overview', component: OverviewPageMobile },
      ...convertRolesToSections(roles, rolesFetched, true),
      { id: 'faqPage', label: 'FAQ', component: FaqPageMobile },
      { id: 'aboutMe', label: 'About Me', component: AboutMePageMobile },
    ];
  }, [roles, rolesFetched, isMobile]);

  const sections = useMemo(() => {
    return [
      { id: 'swiperPage', label: 'Roles', component: () => <SwiperPage sections={convertRolesToSections(roles, rolesFetched, false)}/> },
      { id: 'landingPage', label: 'Home', component: () => <LandingPage isLoading={isLoading} /> },
      { id: 'overviewPage', label: 'Overview', component: OverviewPage },
      { id: 'faqPage', label: 'FAQ', component: FaqPage },
      { id: 'aboutMe', label: 'About Me', component: AboutMe },
    ];
  }, [roles, rolesFetched, isMobile]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Determine which section is in view based on scroll position
      for (const section of sections) {
        const sectionElement = document.getElementById(section.id);
        if (sectionElement) {
          const sectionOffsetTop = sectionElement.offsetTop;
          const sectionHeight = sectionElement.clientHeight;

          if (scrollPosition >= sectionOffsetTop && scrollPosition < sectionOffsetTop + sectionHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial check on mount
    handleScroll();

    // Clean up scroll event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);
  console.log('Active Section:', activeSection); // Log the active section for debugging

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);
console.log(isMobile);

  return (
    <div className="main-page">
      <GiHamburgerMenu style={{ border: `1px solid ${backgroundColor}` }} size={40} className='drawerButton' onClick={() => toggleDrawer(true)} />
      {
        isMobile ?
          (
            <>
              <TemporaryDrawer sections={sectionsMobile} activeSection={activeSection} variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
              <div className="content" style={{ marginLeft: isOpen && !isMobile ? marginLeftAmount : 0 }}>
                {sectionsMobile.map(section => (
                  <div key={section.id} id={section.id} className="section">
                    <section.component />
                  </div>
                ))}
              </div>
            </>
          )
          :
          (
            <>
              <TemporaryDrawer sections={sections} activeSection={activeSection} variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
              <div className="content" style={{ marginLeft: isOpen && !isMobile ? marginLeftAmount : 0 }}>
                {
                  sections.map(section => (
                    <div key={section.id} id={section.id} className="section">
                      <section.component />
                    </div>
                  ))}
              </div>
            </>
          )
      }
    </div>
  );
};

export default MainPage;
