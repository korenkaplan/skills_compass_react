import React, { useEffect, useState, useMemo} from 'react';
import './MainPage.css';
import '../utils/variables.css';
import { Role, Section } from '../utils/interfaces';
import _ from 'lodash';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import LandingPageMobile from '../pages mobile/LandingSection/LandingPageMobile';
import OverviewPageMobile from '../pages mobile/OverviewSection/OverviewPageMobile';
import RolePageMobile from '../pages mobile/RoleSection/RolePageMobile';
import FaqPageMobile from '../pages mobile/FaqPage/FaqPageMobile';
import HowItWorksMobile from '../pages mobile/HowItWorksMobile/HowItWorksMobile';
import ContactInformationMobile from '../pages mobile/ContactFooterMobile/ContactFooterMobile';
import RoleSelect from '../pages mobile/RoleSelect/RoleSelect';
import SwiperPage from '../pages/Swiper/Swiper';
import LandingPage from '../pages/LandingSection/LandingPage';
import FaqPage from '../pages/FaqPage/FaqPage';
import RolePage from '../pages/RoleSection/RolePage';
import Overview from '../pages/OverviewSection/OverviewPage';
import HowItWorks from '../pages/HowItWorks/HowItWorks';
import ContactFooter from '../pages/ContactFooter/ContactFooter';
import DrawerMobile from '../components/DrawerMobile/DrawerMobile';
import DrawerDesktop from '../components/Drawer/Drawer';
import AppBar from '../components/AppBar/Appbar';
import Content from '../components/Content/Content';
import { apiPrefix } from '../utils/variables';
import 'react-loading-skeleton/dist/skeleton.css'


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
  const toggleDrawer = (newOpen: boolean) => {
    if (!isMobile) {
      setIsOpen(true);
    } else {
      setIsOpen(newOpen);
    }
  };


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
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiPrefix}/usage_stats/get-all-roles/`);
        setRoles(response.data);
        setRolesFetched(true);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  return (
    <div className="main-page">
      <AppBar isMobile={isMobile} toggleDrawer={toggleDrawer}/>
      <Content
        isMobile={isMobile}
        sections={isMobile ? sectionsMobile : sections}
        DrawerComponent={isMobile ? DrawerMobile : DrawerDesktop}
        variant={variant}
        isOpen={isOpen}
        toggleDrawer={toggleDrawer}
        marginLeftAmount={marginLeftAmount}
      />
      </div>
  );
};

export default MainPage;
