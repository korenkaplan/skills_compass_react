// src/pages/MainPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import SideMenu from '../components/SideMenu';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
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
import { useMediaQuery } from 'react-responsive'
import { GiHamburgerMenu } from "react-icons/gi";
import { backgroundColor } from '../utils/variables';

import LandingPageMobile from '../pages mobile/LandingSection/LandingPageMobile';
import OverviewPageMobile from '../pages mobile/OverviewSection/OverviewPageMobile';
import RolePageMobile from '../pages mobile/RoleSection/RolePageMobile';

const convertRolesToSections = (roles: Role[], rolesFetched: boolean, isMobile: boolean): Section[] => {
  return roles.flatMap(role => {
    const roleProps = { role: role, rolesFetched: rolesFetched }; // Props to pass to RolePage component
    return  isMobile ?
    [
      {
        id: role.id.toString(),
        label: _.startCase(role.name),
        component: () => <RolePageMobile {...roleProps} />, // Pass roleProps to RolePage component
      }
    ]:
    [
      {
        id: role.id.toString(),
        label: _.startCase(role.name),
        component: () => <RolePage {...roleProps} />, // Pass roleProps to RolePage component
      }
    ]
    ;
  });
};

const MainPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesFetched, setRolesFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const marginLeftAmount = 250
  const isMobile = useMediaQuery({ query: '(max-width: 1224px)' })
   const variant: 'temporary' | 'persistent' | 'permanent' = isMobile ? 'temporary' : 'persistent'
  const toggleDrawer = (newOpen: boolean) => {
    if(!isMobile)
    {
      setIsOpen(true);
      return
    }
    setIsOpen(newOpen);
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
      ...convertRolesToSections(roles, rolesFetched, isMobile), // Spread the array returned by convertRolesToSections
      { id: 'landingPage', label: 'Home', component: () => <LandingPageMobile isLoading={isLoading}/> },
      { id:'overviewPage', label: 'Overview', component: OverviewPageMobile },

    ];
  }, [roles, rolesFetched]);

  const sections = useMemo(() => {
    return [
      { id: 'landingPage', label: 'Home', component: () => <LandingPage isLoading={isLoading}/> },
      { id: 'overviewPage', label: 'Overview', component: OverviewPage },
      ...convertRolesToSections(roles, rolesFetched, isMobile), // Spread the array returned by convertRolesToSections
      { id: 'faqPage', label: 'FAQ', component: FaqPage },
      { id: 'aboutMe', label: 'About Me', component: AboutMe },
    ];
  }, [roles, rolesFetched]);

  const activeSection =  useIntersectionObserver(isMobile? sectionsMobile.map(section => section.id) : sections.map(section => section.id));

  useEffect(() => {
      setIsOpen(!isMobile)
  },[isMobile]);

  return (
    <div className="main-page" >
       <GiHamburgerMenu style={{border:`1px solid ${backgroundColor}`}}  size={40} className='drawerButton' onClick={() => toggleDrawer(true)}/>
      {/* <SideMenu sections={sections} activeSection={activeSection} /> */}
      {
        isMobile ?
        (
          <>
          <TemporaryDrawer sections={sectionsMobile} activeSection={activeSection} variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
        <div className="content" style={{marginLeft: isOpen && !isMobile ? marginLeftAmount : 0}}>
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
        <div className="content" style={{marginLeft: isOpen && !isMobile ? marginLeftAmount : 0}}>
          {sections.map(section => (
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
