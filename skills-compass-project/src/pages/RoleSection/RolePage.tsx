// src/pages/RoleSection/RolePage.tsx
import React, { useState, useEffect } from 'react';
import './RolePage.css';
import '../../CSS/PageStyle.css';
import { backgroundColor } from '../../utils/variables';
import { Role } from '../../utils/interfaces';
import axios from 'axios';
import { TechCount, CategoryData } from '../../utils/interfaces';
import _ from 'lodash';
import TechRow from '../../components/TechRow/TechRow';

interface RolePageProps {
  role: Role;
  rolesFetched: boolean;
}

const RolePage: React.FC<RolePageProps> = ({ role, rolesFetched }) => {
  const [data, setData] = useState<CategoryData>({});
  const [techList, setTechList] = useState<TechCount[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all categories'); // Initialize with an empty string
  const [maxCount, setMaxCount] = useState<number>(0); // State to store the maximum count
  const maxLineWidth = 400; // Define the maximum line width

  const handleCategoryClicked = (categoryKey: string) => {
    console.log("Category clicked:", categoryKey);
    setSelectedCategory(categoryKey); // Set the selected category
    setTechList(data[categoryKey]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:8000//usage_stats/get-role-count-stats-view/', {
          role_id: role.id,
          number_of_categories: 4,
          limit: 10
        });
        setData(response.data.data);

        // Initialize techList with 'all categories' if it exists; otherwise, set it to an empty array
        const allCategoriesData = response.data.data['all categories'];
        const allTechList = allCategoriesData ? allCategoriesData : [];
        setTechList(allTechList);
        let max = 0;
        console.log(selectedCategory);
        // Set the maximum count based on the selected category
        const selectedCategoryData = response.data.data[selectedCategory];
        console.log(selectedCategoryData);
        if (selectedCategoryData) {

          selectedCategoryData.forEach((techCount: TechCount) => {
            if (techCount.amount > max) {
              max = techCount.amount;
            }
          });
        }
        setMaxCount(max);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (rolesFetched) {
      setSelectedCategory('all categories'); // Set the selected category to 'all categories' when the component mounts
      fetchData();
    }
  }, [rolesFetched]); // Run this effect only once when the component mounts and rolesFetched is true

  useEffect(() => {
    console.log(role);
    console.log(data);
    console.log(rolesFetched);
  }, [role, data]);

  return (
    <div style={{ backgroundColor: backgroundColor }} className="section containerRolePage">
      <div className="headerDiv"><h1 className='textRolePage headerRolePage'>{_.startCase(role.name)}</h1></div>
      <div className="descriptionDiv textRolePage">{role.description}</div>
      <div className="">
        {data && (
          <div className='categoriesButtonDiv'>
            {Object.keys(data).map(category =>
              (<span
                onClick={() => handleCategoryClicked(category)}
                className={`categoryButton textRolePage ${category === selectedCategory ? 'selected' : ''}`} // Add 'selected' class if the category is selected
                key={category}>
                {_.startCase(category)}
              </span>))}
          </div>
        )}
      </div>
      <div className="tech-list">
        {techList.map((techCount, index) => (
          <TechRow maxCount={maxCount} maxLineWidth={maxLineWidth} key={index} tech={techCount.tech} count={techCount.amount} />
        ))}
      </div>
      <br />
    </div>
  );
};

export default RolePage;
