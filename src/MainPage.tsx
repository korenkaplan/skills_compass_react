import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './MainPage.css';
import './utils/variables.css';
import 'react-loading-skeleton/dist/skeleton.css';
import _ from 'lodash';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import Content from '@components/Content/Content';
import DrawerDesktop from '@components/Drawer/Drawer';
import DrawerMobile from '@components/DrawerMobile/DrawerMobile';
import  AppBar  from '@components/AppBar/Appbar';
import ContactFooter from '@pages/ContactFooter/ContactFooter';
import FaqPage from '@pages/FaqPage/FaqPage';
import HowItWorks from '@pages/HowItWorks/HowItWorks';
import LandingPage from '@pages/LandingSection/LandingPage';
import Overview from '@pages/OverviewSection/OverviewPage';
import RolePage from '@pages/RoleSection/RolePage';
import SwiperPage from '@pages/Swiper/Swiper';
import ContactInformationMobile from '@pagesMobile/ContactFooterMobile/ContactFooterMobile'
import FaqPageMobile from '@pagesMobile/FaqPage/FaqPageMobile';
import HowItWorksMobile from '@pagesMobile/HowItWorksMobile/HowItWorksMobile';
import LandingPageMobile from '@pagesMobile/LandingSection/LandingPageMobile';
import OverviewPageMobile from '@pagesMobile/OverviewSection/OverviewPageMobile';
import RolePageMobile from '@pagesMobile/RoleSection/RolePageMobile';
import RoleSelect from '@pagesMobile/RoleSelect/RoleSelect';
import { Role, Section } from '@utils/interfaces';
import { apiPrefix } from '@utils/variables';
import HostagesDaysCount from '@components/DaysInHellCounter/DaysInHellCounter';


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
  const variant: 'temporary' | 'persistent' | 'permanent' = isMobile ? 'temporary' : 'persistent';

  const toggleDrawer = useCallback((newOpen: boolean) => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(newOpen);
    }
  }, [isMobile]);
  const sequence = roles && roles.map((role) => role.name).reduce((acc, role, index) => {
    // Delay before typing the next question, except for the first one
    if (index !== 0) {
      acc.push(1500);
    }
    // Replace currentYear placeholder in the question
    const formattedLabel = _.startCase(role)
    acc.push(formattedLabel);
    acc.push(1500); // Wait after typing each question
    return acc;
  }, [] as (string | number)[]);

  const sectionsMobile = useMemo(() => {
    return [
      { id: 'landingPageMobile', isRole: false, label: 'Home', component: () => <LandingPageMobile sequence={sequence} isLoading={isLoading} defaultSection="overviewMobile" /> },
      { id: 'overviewMobile', isRole: false, label: 'Overview', component: OverviewPageMobile },
      { id: 'RoleSelect', isRole: false, label: 'Roles', component: () => <RoleSelect sections={convertRolesToSections(roles, rolesFetched, true)} /> },
      { id: 'howItWorksMobile', isRole: false, label: 'How It Works', component: HowItWorksMobile },
      { id: 'faqPageMobile', isRole: false, label: 'FAQ', component: FaqPageMobile },
      { id: 'ContactInformationMobile', isRole: false, label: 'Contact Us', component: ContactInformationMobile },
    ];
  }, [roles, rolesFetched, isMobile]);

  const sections = useMemo(() => {
    return [
      { id: 'landingPage', isRole: false, label: 'Home', component: () => <LandingPage sequence={sequence}  defaultSection="overview" isLoading={isLoading} /> },
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


  const fetchRoles = useCallback(async () => {
    try {
      const response = await axios.get(`${apiPrefix}/usage_stats/get-all-roles/`);
      setRoles(response.data);
      setRolesFetched(true);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);
  return (
    <div className="main-page">
      <AppBar isMobile={isMobile} isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Content
        isMobile={isMobile}
        sections={isMobile ? sectionsMobile : sections}
        DrawerComponent={isMobile ? DrawerMobile : DrawerDesktop}
        variant={variant}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        marginLeftAmount={marginLeftAmount}
      />
      <div style={{display: isMobile?'none' : 'block'}} >
      <HostagesDaysCount lang='he'/>
      </div>

    </div>
  );
};

export default MainPage;
