// src/pages/RoleSection/RolePage.tsx
import React, { useState, useEffect } from 'react';
import './RolePage.css';
import { backgroundColor, textColor } from '../../utils/variables';
import { FormattedDataRow, Role } from '../../utils/interfaces';
import axios from 'axios';
import { TechCount, CategoryData } from '../../utils/interfaces';
import _, { forEach, List, slice } from 'lodash';
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
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
import { Button, FormGroup, TextField } from '@mui/material';
import FormDialog from '../../components/CreateViewDialog/CreateViewDialog';
interface RolePageProps {
  role: Role;
  rolesFetched: boolean;
}
interface View {
  categories: string[];
  amount: number;
}
const RolePage: React.FC<RolePageProps> = ({ role, rolesFetched }) => {
//#region My Custom Region
  const allCategoriesString = 'all categories'
  const aggregateSwitchElementTitle = 'Enable Multiple Categories Selections'
  const listLImitSwitchElementTitle = 'Limit List Length'
  const defaultAmount = 10
  const [data, setData] = useState<CategoryData>({});
  const [techList, setTechList] = useState<FormattedDataRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(allCategoriesString); // Initialize with an empty string
  const [maxCount, setMaxCount] = useState<number>(0); // State to store the maximum count
  const maxLineWidth = 400; // Define the maximum line width
  const [totalListingsCount, setTotalListingsCount] = useState<number>(0)
  const [showPercentage, setShowPercentage] = useState<boolean>(true)
  const [isAnimating, setIsAnimating] = useState<boolean>(true)
  const [alignment, setAlignment] = React.useState('percentages');
  const [loadingTitle, setLoadingTitle] = useState<string>('Loading Jobs Count')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [aggregatedSwitch, setAggregatedSwitch] = useState(false)
  const [listLimitSwitch, setListLimitSwitch] = useState(false)
  const [amount, setAmount] = useState(defaultAmount);
  const [allCategories, setAllCategories] = useState<string[]>([])
  const togglerPressed = (buttonTitle: string) => {
    if(buttonTitle !== alignment)
      {
        setAlignment(buttonTitle)
        setShowPercentage(!showPercentage);
      }
  }
  const handleCategoryClicked = (categoryKey: string) => {
      // check if aggregatedSwitch is true:
      if (aggregatedSwitch == true) {
        if(selectedCategories.includes(categoryKey) && selectedCategories.length == 1){
          return
        }
        if(categoryKey === allCategoriesString)
          return
        // if already selected remove from list
        if (selectedCategories.includes(categoryKey) && selectedCategories.length > 0){
            const tempList = selectedCategories
            setSelectedCategories(tempList.filter(category => category !== categoryKey))
        }
        else {
          // else add it and refresh the tech list
          const newList = [...selectedCategories, categoryKey].filter(category => category !== allCategoriesString)
          setSelectedCategories(newList)
        }
      }

      else{
        // if aggregatedSwitch is false:
        // just set it as selected category
        setSelectedCategory(categoryKey); // Set the selected category
        setTechList(data[categoryKey]);

      }



  };

  const checkIfTechInAggregatedList = (result: FormattedDataRow[], tech_id: number) => {
   return result.some(item => item.id === tech_id)
  }

  const aggregatedTechList = (limitValue = -1, slice = false) => {
    const result: FormattedDataRow[] = [];

    // take all the categories data from the selected categories list
    selectedCategories.forEach(category =>{
      // add all the rows to result
      data[category].forEach(row =>{
        // check if the row is not already in results list
        if(checkIfTechInAggregatedList(result, row.id) == false)
          result.push(row);
      });
    });


    //sort results by category.amount descending

    result.sort((a, b) => b.amount - a.amount);
    // set tech list to result
    if(slice === true)
      {
        const slicedResult = result.slice(0, limitValue > 0 ? limitValue : amount)
        setTechList(slicedResult)
        return
      }

    setTechList(result)
  }
  const handleLimitSwitchChange = (event) => {
    const value = event.target.checked
    setListLimitSwitch(value);
    aggregatedTechList(value === true ? amount : defaultAmount, value)
  }
  const calculatePercentages = (part: number, total: number) => { return (part / total) * 100 }

  const handleAggregationSwitchChange = (event) => {
    const value = event.target.checked
    setAggregatedSwitch(value);

    if(value === false)
      {
        // Handle the case when the switch is turned off
        const firstSelectedCategory = selectedCategories[0]
        setSelectedCategory(firstSelectedCategory)
        setTechList(data[firstSelectedCategory])
      }

    else if(selectedCategory !== allCategoriesString)
      {
        //setSelectedCategories([selectedCategory])
        aggregatedTechList(amount, listLimitSwitch)
      }

    else
      {
        setSelectedCategories([allCategories[1]])
      }



  };

  const getCategoryButtonClass = (category) => {
    console.log(category);
    if (aggregatedSwitch) {
      if(category === allCategoriesString)
          return 'disabled'

      return selectedCategories.includes(category) ? 'selected' : '';
    }
    else {
      return selectedCategory === category ? 'selected' : '';
    }
  };
  const handleAmountChange = (event) => {
    // Ensure the value is non-negative
    const value = event.target.value;
    if (value >= 1) {
      setAmount(value);
      const sliceList = true;
      aggregatedTechList(value, sliceList)
    }

  };
useEffect(() => {
  if(aggregatedSwitch == true)
    console.log(amount, listLimitSwitch);
    aggregatedTechList(amount, listLimitSwitch)
},[selectedCategories])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Delay for 30 seconds
        await new Promise(resolve => setTimeout(resolve, 0));

        // Fetch total listings count
        const res = await axios.get(`https://dev-skill-compass-server.onrender.com/core/get-jobs-count-for-role/?role_id=${role.id}`);

        setTotalListingsCount(res.data);
        setLoadingTitle('Loading Categories Data');

        // Fetch role count stats view
        const response = await axios.post('https://dev-skill-compass-server.onrender.com/usage_stats/get-role-count-stats-view/', {
          role_id: role.id,
          number_of_categories: 12,
          limit: 10,
          all_categories_limit: 20
        });
        setData(response.data.data);

        // Initialize techList with 'all categories' if it exists; otherwise, set it to an empty array
        const allCategoriesData = response.data.data[allCategoriesString] || [];
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
        const temp: string[] = []
        Object.keys(response.data.data).map(category => temp.push(category))
        setAllCategories(temp);

        setIsAnimating(false);



      } catch (error) {
        console.error('Error fetching data:', error);
      }

    };

    if (rolesFetched) {
      setSelectedCategory(allCategoriesString);
      fetchData();
    }
  }, [rolesFetched]);// Run this effect only once when the component mounts and rolesFetched is true


  const toggler = (
    <div className="toggler">
    <div onClick={()=> togglerPressed("percentages")} className={`toggler_button percentageButton ${alignment == 'percentages'? 'selected_toggler_button': ''}`}><img style={{ width: 30, height: 30 }} src={alignment == 'percentages'? whitePercentage: greenPercentage} /></div>
    <div onClick={()=> togglerPressed("counts")} className={`toggler_button countButton ${alignment == 'counts'? 'selected_toggler_button': ''}`}><img style={{ width: 30, height: 30 }} src={alignment == 'counts'? whiteCount: greenCount} /></div>
  </div>
  )
  const inputStyle = {
    width: '60px',
    height: '30px',
    color: '#333', // Desired text color
    backgroundColor: '#f0f0f0', // Background color
    textAlign: 'center', // Center align the input text
    border: '1px solid #ccc', // Example border
    borderRadius: '4px', // Example border radius
    outline: 'none', // Remove default outline
    boxSizing: 'border-box', // Ensure padding and border are included in width and height
    fontSize: '16px', // Example font size
    padding: '8px', // Example padding
    display: listLimitSwitch? 'block' : 'none',
  };
//#endregion
const [views, setViews] = useState<View[]>([])
const handleSaveView = () => {
  const view: View = {categories: selectedCategories, amount: amount}
  const updatedViews = [...views, view]
  setViews(updatedViews)
}


  return (
    <div style={{ backgroundColor: backgroundColor }} className="containerRolePage section ">
      <div className="headerDiv">
        <div className="headerAndToggler">
          <h1 className='headerRolePage'>{_.upperCase(role.name)}</h1>
           {toggler}
        </div>
        <h4 className='subheaderRolePage'>JOB POSTINGS AMOUNT : {totalListingsCount}</h4>

        <Line height="1px" width="25%" color={'antiquewhite'} radius="4px" />
        <FormGroup>
            <FormControlLabel
            control={<Switch color='warning' checked={aggregatedSwitch} onChange={handleAggregationSwitchChange} />}
            style={{ color: 'antiquewhite', fontSize:'20px', marginTop:5 }}
            label={aggregateSwitchElementTitle}
          />
          <div className="limitDiv" style={{display: aggregatedSwitch? 'flex': 'none'}}>
          <FormControlLabel
            control={<Switch color='secondary' checked={listLimitSwitch} onChange={handleLimitSwitchChange} />}
            style={{ color: 'antiquewhite', fontSize:'20px' }}
            label={listLImitSwitchElementTitle}
          />
          <input
            type='number'
            id="outlined-basic"
            value={amount}
            onChange={handleAmountChange}
            min={1} // Ensure the input doesn't accept negative values
            max={100}
            style={inputStyle} // Apply custom styles via style attribute
          />
          </div>

      </FormGroup>
      <div>
      <Button style={{display:`${aggregatedSwitch ? "block" : "none"}`}} variant="outlined" onClick={handleSaveView}>
        Save View
      </Button>

    </div>
      <Line height="1px" width="25%" color={'antiquewhite'} radius="4px" />
      <div className="viewsDiv" style={{backgroundColor: 'white', display:`${aggregatedSwitch? 'block': 'none'}`}}>
        {views && (
          <div className="">
          {views.map((view) => (
            
            <p> {view.amount}</p>
          ))}
          </div>
        )}
      </div>

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
            {allCategories?.map(category =>
            (<button
              disabled={aggregatedSwitch && category == allCategoriesString }
              onClick={() => handleCategoryClicked(category)}
              className={`categoryButton textRolePage ${getCategoryButtonClass(category)}`}
              key={category}>
              {_.startCase(category)}
            </button>))}
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
