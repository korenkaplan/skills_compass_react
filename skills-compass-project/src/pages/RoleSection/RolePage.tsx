// src/pages/RoleSection/RolePage.tsx
import React, { useState, useEffect } from 'react';
import './RolePage.css';
import { backgroundColor } from '../../utils/variables';
import { Role } from '../../utils/interfaces';
import axios from 'axios';
import { TechCount, CategoryData } from '../../utils/interfaces';
import _ from 'lodash';
import TechRow from '../../components/TechRow/TechRow';
import Line from '../../components/Line/Line'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import perIcon from '../../assets/icons/icons8-percentage-50.png'
import countIcon from '../../assets/icons/icons8-count-50.png'

import whiteCount from '../../assets/white icons/count.png'
import greenCount from '../../assets/white icons/green-count.png'
import whitePercentage from '../../assets/white icons/percentage.png'
import greenPercentage from '../../assets/white icons/green-percentage.png'
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
  const [totalListingsCount, setTotalListingsCount] = useState<number>(0)
  const [showPercentage, setShowPercentage] = useState<boolean>(true)
  const [isAnimating, setIsAnimating] = useState<boolean>(true)
  const [alignment, setAlignment] = React.useState('percentages');
  const [loadingTitle, setLoadingTitle] = useState<string>('Loading Jobs Count')
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    if (newAlignment == null)
      return;

    if (newAlignment !== alignment) {
      setAlignment(newAlignment);
      setShowPercentage(!showPercentage);
    }
  };

  const togglerPressed = (buttonTitle: string) => {
    if(buttonTitle !== alignment)
      {
        setAlignment(buttonTitle)
        setShowPercentage(!showPercentage);
      }
  }
  const handleCategoryClicked = (categoryKey: string) => {
    setSelectedCategory(categoryKey); // Set the selected category
    setTechList(data[categoryKey]);
  };

  const calculatePercentages = (part: number, total: number) => { return (part / total) * 100 }


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Delay for 30 seconds
        await new Promise(resolve => setTimeout(resolve, 0));

        // Fetch total listings count
        const res = await axios.get(`http://127.0.0.1:8000//core/get-jobs-count-for-role/?role_id=${role.id}`);
        setTotalListingsCount(res.data);
        setLoadingTitle('Loading Categories Data');

        // Fetch role count stats view
        const response = await axios.post('http://127.0.0.1:8000//usage_stats/get-role-count-stats-view/', {
          role_id: role.id,
          number_of_categories: 12,
          limit: 10,
          all_categories_limit: 20
        });
        setData(response.data.data);

        // Initialize techList with 'all categories' if it exists; otherwise, set it to an empty array
        const allCategoriesData = response.data.data['all categories'] || [];
        setTechList(allCategoriesData);

        // Calculate maximum count based on the selected category
        let max = 0;
        const selectedCategoryData = response.data.data[selectedCategory];
        if (selectedCategoryData) {
          selectedCategoryData.forEach((techCount) => {
            if (techCount.amount > max) {
              max = techCount.amount;
            }
          });
        }
        setMaxCount(max);
        setIsAnimating(false);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (rolesFetched) {
      setSelectedCategory('all categories');
      fetchData();
    }
  }, [rolesFetched]);// Run this effect only once when the component mounts and rolesFetched is true


  const toggler = (
    <div className="toggler">
    <div onClick={()=> togglerPressed("percentages")} className={`toggler_button percentageButton ${alignment == 'percentages'? 'selected_toggler_button': ''}`}><img style={{ width: 30, height: 30 }} src={alignment == 'percentages'? whitePercentage: greenPercentage} /></div>
    <div onClick={()=> togglerPressed("counts")} className={`toggler_button countButton ${alignment == 'counts'? 'selected_toggler_button': ''}`}><img style={{ width: 30, height: 30 }} src={alignment == 'counts'? whiteCount: greenCount} /></div>
  </div>
  )

  return (
    <div style={{ backgroundColor: backgroundColor }} className="containerRolePage section ">

      <div className="headerDiv">
        <div className="headerAndToggler" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className=""><h1 className='headerRolePage'>{_.upperCase(role.name)}</h1></div>
           {toggler}
        </div>
        <h4 className='subheader'>Total Amount Of Job Listings {'-->'} {totalListingsCount}</h4>
        <Line height="1px" width="25%" color={'antiquewhite'} radius="4px" />

      </div>

      <div className="descriptionDiv textRolePage">{role.description}</div>

      <div className="loadingDivRolePage" style={{ display: isAnimating ? 'flex' : 'none' }}>
        <div className="loadingDivInner">
          <h1 className={`loading-text ${isAnimating ? 'animate' : ''}`}>
            {loadingTitle}
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </h1>
        </div>
      </div>

      <div className="dataDiv" style={{ display: isAnimating ? 'none' : 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {data && (
          <div className='categoriesButtonDiv'>
            {Object.keys(data).map(category =>
            (<span
              onClick={() => handleCategoryClicked(category)}
              className={`categoryButton textRolePage ${category === selectedCategory ? 'selected' : ''}`}
              key={category}>
              {_.startCase(category)}
            </span>))}
          </div>
        )}




        <div className="techListDiv" >
          {techList.map((techCount, index) => (
            <TechRow
              totalListingsAmount={totalListingsCount}
              maxCount={maxCount}
              maxLineWidth={maxLineWidth}
              key={index}
              tech={techCount.tech}
              count={showPercentage ? calculatePercentages(techCount.amount, totalListingsCount) : techCount.amount}
              showPercentage={showPercentage}
            />
          ))}
        </div>
      </div>
      <br />
    </div>
  );
};

export default RolePage;
