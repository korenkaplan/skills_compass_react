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
import { backgroundColor } from '../utils/variables';
import SwiperPage from './Swiper/Swiper';
import menuPng from '../assets/icons/menu_green.png'
import LandingPageMobile from '../pages mobile/LandingSection/LandingPageMobile';
import OverviewPageMobile from '../pages mobile/OverviewSection/OverviewPageMobile';
import RolePageMobile from '../pages mobile/RoleSection/RolePageMobile';
import FaqPageMobile from '../pages mobile/FaqPage/FaqPageMobile';
import AboutMePageMobile from '../pages mobile/AboutMeSection/AboutMePageMobile';
import DrawerMobile from '../components/DrawerMobile/DrawerMobile';

const convertRolesToSections = (roles: Role[], rolesFetched: boolean, isMobile: boolean): Section[] => {
  return roles.flatMap(role => {
    const roleProps = { role: role, rolesFetched: rolesFetched };
    return isMobile ?
      [{
        id: `mobile_${role.id}`, // Ensure unique IDs for mobile
        label: _.startCase(role.name),
        component: () => <RolePageMobile {...roleProps} />,
        isRole: true,
      }] :
      [{
        id: `desktop_${role.id}`, // Ensure unique IDs for desktop
        label: _.startCase(role.name),
        component: () => <RolePage {...roleProps} />,
        isRole: true,
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
      { id: 'landingPage', isRole: false, label: 'Home', component: () => <LandingPageMobile isLoading={isLoading} /> },
      { id: 'overviewPage', isRole: false, label: 'Overview', component: OverviewPageMobile },
      ...convertRolesToSections(roles, rolesFetched, true),
      { id: 'faqPage', isRole: false, label: 'FAQ', component: FaqPageMobile },
      { id: 'aboutMe', isRole: false, label: 'About Me', component: AboutMePageMobile },
    ];
  }, [roles, rolesFetched, isMobile]);

  const sections = useMemo(() => {
    return [
      { id: 'landingPage', isRole: false, label: 'Home', component: () => <LandingPage isLoading={isLoading} /> },
      { id: 'overviewPage', isRole: false, label: 'Overview', component: OverviewPage },
      { id: 'swiperPage', isRole: false, label: 'Roles Info', component: () => <SwiperPage sections={convertRolesToSections(roles, rolesFetched, false)}/> },
      { id: 'faqPage', isRole: false, label: 'FAQ', component: FaqPage },
      { id: 'aboutMe', isRole: false, label: 'About Me', component: AboutMe },
    ];
  }, [roles, rolesFetched, isMobile]);


  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="main-page">
      <div className="burgerButtonDiv" style={{border:`1px solid ${backgroundColor}`}} onClick={() => toggleDrawer(true)}>
        <img src={menuPng} style={{width:'30px', color:backgroundColor}} alt="" />
      </div>
      {
        isMobile ?
          (
            <>
              <DrawerMobile sections={sectionsMobile}  variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
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
            <div className='sectionsWrapperDesktop'>
            <TemporaryDrawer sections={sections}  variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
            <div className="content" style={{ marginLeft: isOpen && !isMobile ? marginLeftAmount : 0 }}>
              {
                sections.map(section => (
                  <div key={section.id} id={section.id} className="section">
                    <section.component />
                  </div>
                ))}
            </div>
          </div>
          )
      }
    </div>
  );
};

export default MainPage;
