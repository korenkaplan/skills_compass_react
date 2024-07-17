import React, { useEffect, useState, useMemo, CSSProperties } from 'react';
import './MainPage.css';
import '../utils/variables.css';
import LandingPage from './LandingSection/LandingPage';
import FaqPage from './FaqPage/FaqPage';
import RolePage from './RoleSection/RolePage';
import { Role, Section } from '../utils/interfaces';
import _ from 'lodash';
import axios from 'axios';
import TemporaryDrawer from '../components/Drawer/Drawer';
import { useMediaQuery } from 'react-responsive';


import SwiperPage from './Swiper/Swiper';
import LandingPageMobile from '../pages mobile/LandingSection/LandingPageMobile';
import OverviewPageMobile from '../pages mobile/OverviewSection/OverviewPageMobile';
import RolePageMobile from '../pages mobile/RoleSection/RolePageMobile';
import FaqPageMobile from '../pages mobile/FaqPage/FaqPageMobile';
import ContactInformationMobile from '../pages mobile/ContactFooterMobile/ContactFooterMobile';
import DrawerMobile from '../components/DrawerMobile/DrawerMobile';
import Overview from './OverviewSection/OverviewPage';
import HowItWorks from './HowItWorks/HowItWorks';


import ribbon from '../assets/icons/icons8-ribbon-50.png';
import HowItWorksMobile from '../pages mobile/HowItWorksMobile/HowItWorksMobile';
import ContactFooter from './ContactFooter/ContactFooter';
import RoleSelect from '../pages mobile/RoleSelect/RoleSelect';
import ItemByItemReveal from '../components/FramerMotion/ItemByItemReveal';
import Reveal from '../components/FramerMotion/Reveal';
import { RxHamburgerMenu } from 'react-icons/rx';
import { contrastColor } from '../utils/theme';
import { CiLinkedin } from 'react-icons/ci';
import { FaGithub } from 'react-icons/fa';

const convertRolesToSections = (roles: Role[], rolesFetched: boolean, isMobile: boolean): Section[] => {
  return roles.flatMap((role, index) => {
    const roleProps = { role: role, rolesFetched: rolesFetched };
    return isMobile
      ? [
          {
            id: `mobile_${role.id}`, // Ensure unique IDs for mobile
            label: _.startCase(role.name),
            component: () => <RolePageMobile framerMotionEnabled={index === 0} {...roleProps} />,
            isRole: true,
          },
        ]
      : [
          {
            id: `desktop_${role.id}`, // Ensure unique IDs for desktop
            label: _.startCase(role.name),
            component: () => <RolePage framerMotionEnabled={index === 0} {...roleProps} />,
            isRole: true,
          },
        ];
  });
};

const MainPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesFetched, setRolesFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const marginLeftAmount = 250;
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const [isOpen, setIsOpen] = useState<boolean>(isMobile ? false : true);
  const [opacity, setOpacity] = useState(1);

  const handleScroll = () => {
    console.log('here is scroll');
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    console.log(scrollTop); // Log the scroll position to check if the event is firing
    setOpacity(scrollTop > 250 ? 0.5 : 1); // Change 0.5 to desired opacity
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const variant: 'temporary' | 'persistent' | 'permanent' = isMobile ? 'temporary' : 'persistent';

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
      { id: 'RoleSelect', isRole: false, label: 'Roles', component: () => <RoleSelect sections={convertRolesToSections(roles, rolesFetched, true)} /> },
      { id: 'howItWorks', isRole: false, label: 'How It Works', component: HowItWorksMobile },
      { id: 'faqPage', isRole: false, label: 'FAQ', component: FaqPageMobile },
      { id: 'ContactInformationMobile', isRole: false, label: 'Contact Us', component: ContactInformationMobile },
    ];
  }, [roles, rolesFetched, isMobile]);

  const sections = useMemo(() => {
    return [
      { id: 'landingPage', isRole: false, label: 'Home', component: () => <LandingPage roles={roles && roles.map((role) => role.name)} defaultSection="overview" isLoading={false} /> },
      { id: 'overview', isRole: false, label: 'Overview', component: Overview },
      { id: 'swiperPage', isRole: false, label: 'Roles Overview', component: () => <SwiperPage sections={convertRolesToSections(roles, rolesFetched, false)} /> },
      { id: 'howItWorks', isRole: false, label: 'How It Works', component: HowItWorks },
      { id: 'faqPage', isRole: false, label: 'FAQ', component: FaqPage },
      { id: 'ContactFooter', isRole: false, label: 'Contact Us', component: ContactFooter },
    ];
  }, [roles, rolesFetched, isMobile]);

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="main-page">
      <div className="appbar" style={{ display: isMobile ? 'flex' : 'none', opacity: opacity }}>
        <div style={burgerHeaderStyle}>
          <RxHamburgerMenu className="burgerMenuIcon" size={30} onClick={() => toggleDrawer(true)} />
          <ItemByItemReveal>
            <p style={headerStyle}>Skills Compass</p>
          </ItemByItemReveal>
        </div>

        <div className="iconsdiv">
          <Reveal>
            <div className="iconWithATag">
              <a className="" href="https://stories.bringthemhomenow.net/" target="_blank" rel="noopener noreferrer">
                <img src={ribbon} alt="My Image" className="clickableImageDesktop" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="iconWithATag">
              <a className="" href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
                <CiLinkedin size={30} color={contrastColor} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="iconWithATag">
              <a className="" href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} color={contrastColor} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      {isMobile ? (
        <>
          <DrawerMobile sections={sectionsMobile} variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
          <div className="content" style={{ marginLeft: isOpen && !isMobile ? marginLeftAmount : 0 }}>
            {sectionsMobile.map((section) => (
              <div key={section.id} id={section.id} className="section">
                <section.component />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="sectionsWrapperDesktop">
          <TemporaryDrawer sections={sections} variant={variant} open={isOpen} toggleDrawer={toggleDrawer} />
          <div className="content" style={{ marginLeft: isOpen && !isMobile ? marginLeftAmount : 0 }}>
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="section">
                <section.component />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
