// src/pages/MainPage.tsx
import React, { useEffect, useState, useMemo } from 'react';
import SideMenu from '../components/SideMenu';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import './MainPage.css';
import LandingPage from './LandingSection/LandingPage';
import OverviewPage from './OverviewSection/OverviewPage';
import AboutMe from './AboutMeSection/AboutMePage';
import RolePage from './RoleSection/RolePage';
import { Role, Section } from '../utils/interfaces';
import _ from 'lodash';
import axios from 'axios';



const convertRolesToSections = (roles: Role[], rolesFetched: boolean): Section[] => {
  return roles.flatMap(role => {
    const roleProps = { role: role, rolesFetched: rolesFetched }; // Props to pass to RolePage component
    return [
      {
        id: role.id.toString(),
        label: _.startCase(role.name),
        component: () => <RolePage {...roleProps} />, // Pass roleProps to RolePage component
      }
    ];
  });
};

const MainPage: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesFetched, setRolesFetched] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);


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



  const sections = useMemo(() => {
    return [
      { id: 'landingPage', label: 'Home', component: () => <LandingPage isLoading={isLoading}/> },
      { id: 'overviewPage', label: 'Overview', component: OverviewPage },
      ...convertRolesToSections(roles, rolesFetched), // Spread the array returned by convertRolesToSections
      { id: 'aboutMe', label: 'About Me', component: AboutMe },

    ];
  }, [roles, rolesFetched]);

  const activeSection = useIntersectionObserver(sections.map(section => section.id));

  return (
    <div className="main-page" >
      <SideMenu sections={sections} activeSection={activeSection} />
      <div style={{backgroundColor:'red', position:'absolute', top: 0, right: 0}} className="">
      </div>
      <div className="content">
        {sections.map(section => (
          <div key={section.id} id={section.id} className="section">
            <section.component />
          </div>
        ))}
      </div>

    </div>
  );
};

export default MainPage;
