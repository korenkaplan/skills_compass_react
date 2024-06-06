// src/components/SideMenu.tsx
import React, { useState, useEffect } from 'react';
import './RolePage.css';
import '../../CSS/PageStyle.css';
import { backgroundColor } from '../../utils/variables';
import { Role } from '../../utils/interfaces';
import axios from 'axios';

interface RolePageProps {
  role: Role;
}

const RolePage: React.FC<RolePageProps> = ({ role }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000//usage_stats/get-role-count-stats-view/', {
          role_id: role.id,
          number_of_categories: 4,
          limit: 10
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  console.log(role.name + ' fetched data');
    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once on mount

  return (
    <div style={{ backgroundColor: backgroundColor }} className="section containerRolePage">
      <h2 className='textRolePage'>{role.name}</h2>
      <div className="">
        {data && (
        <ul style={{backgroundColor:'red'}}>
          {Object.keys(data).map(key =>(<li key={key}>{key}</li>))}
        </ul>
        )}
      </div>
      <br />
    </div>
  );
};

export default RolePage;
