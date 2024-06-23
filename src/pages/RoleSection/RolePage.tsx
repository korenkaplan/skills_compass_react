//#region imports
import React, { useState, useEffect, CSSProperties } from 'react';
import './RolePage.css';
import { backgroundColor} from '../../utils/variables';
import { FormattedDataRow, Role } from '../../utils/interfaces';
import axios from 'axios';
import {CategoryData } from '../../utils/interfaces';
import TechRow from '../../components/TechRow/TechRow';
import Line from '../../components/Line/Line'
import whiteCount from '../../assets/white icons/count.png'
import greenCount from '../../assets/white icons/green-count.png'
import whitePercentage from '../../assets/white icons/percentage.png'
import greenPercentage from '../../assets/white icons/green-percentage.png'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
import {FormGroup} from '@mui/material';
import { Tooltip } from 'react-tooltip'
import info from '../../assets/icons/info.png'
import _ from 'lodash'
//#endregion

interface RolePageProps {
  role: Role;
  rolesFetched: boolean;
}

const RolePage: React.FC<RolePageProps> = ({ role, rolesFetched }) => {
//#region constants and states
  const allCategoriesString = 'all categories'
  const aggregateSwitchElementTitle = 'Enable Multiple Categories Selections'
  const listLImitSwitchElementTitle = 'Limit List Length'
  const categoryLImitSwitchElementTitle = 'Limit Per Category'
  const defaultAmount = 10
  const [data, setData] = useState<CategoryData>({});
  const [techList, setTechList] = useState<FormattedDataRow[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(allCategoriesString); // Initialize with an empty string
  const [totalListingsCount, setTotalListingsCount] = useState<number>(0)
  const [showPercentage, setShowPercentage] = useState<boolean>(true)
  const [isAnimating, setIsAnimating] = useState<boolean>(true)
  const [alignment, setAlignment] = React.useState('percentages');
  const [loadingTitle, setLoadingTitle] = useState<string>('Loading Jobs Count')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [aggregatedSwitch, setAggregatedSwitch] = useState(false)
  const [listLimitSwitch, setListLimitSwitch] = useState(false)
  const [amount, setAmount] = useState(0);
  const [allCategories, setAllCategories] = useState<string[]>([])
  const [categoryLimitSwitch, setCategoryLimitSwitch] = useState(false)
  const [categoryAmount, setCategoryAmount] = useState(0);

//#endregion
//#region functions

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

  const aggregatedTechList = (limitValue = -1, slice = false, amountPerCategory = -1, sliceCategory = false) => {
    const result: FormattedDataRow[] = [];

    // take all the categories data from the selected categories list
    selectedCategories.forEach(category => {
      // get the category data
      let categoryData = data[category];

      // slice the category data if amountPerCategory is set
      if (amountPerCategory > 0 && sliceCategory == true) {
        categoryData = categoryData.slice(0, amountPerCategory);
      }

      // add the rows to result
      categoryData.forEach(row => {
        // check if the row is not already in results list
        if (!checkIfTechInAggregatedList(result, row.id)) {
          result.push(row);
        }
      });
    });

    //sort results by category.amount descending
    result.sort((a, b) => b.amount - a.amount);
    // set tech list to result
    if(slice === true)
      {
        const slicedResult = result.slice(0, limitValue > 0 ? limitValue : amount > 0 ? amount : defaultAmount)
        setTechList(slicedResult)
        return
      }

    setTechList(result)
  }
  // const aggregatedTechList = (limitValue = -1, slice = false, amountPerCategory = -1) => {
  //   const result: FormattedDataRow[] = [];

  //   // take all the categories data from the selected categories list
  //   selectedCategories.forEach(category =>{
  //     // add all the rows to result
  //     data[category].forEach(row =>{
  //       // check if the row is not already in results list
  //       if(checkIfTechInAggregatedList(result, row.id) == false)
  //         {
  //           result.push(row);
  //         }

  //     });
  //   });


  //   //sort results by category.amount descending

  //   result.sort((a, b) => b.amount - a.amount);
  //   // set tech list to result
  //   if(slice === true)
  //     {
  //       const slicedResult = result.slice(0, limitValue > 0 ? limitValue : amount > 0 ? amount : defaultAmount)
  //       setTechList(slicedResult)
  //       return
  //     }

  //   setTechList(result)
  // }
  const handleLimitSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setListLimitSwitch(value);
    aggregatedTechList(value === true ? amount : defaultAmount, value, categoryAmount, categoryLimitSwitch)
  }

  const calculatePercentages = (part: number, total: number) => { return (part / total) * 100 }
  const handleAggregationSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setAggregatedSwitch(value);

    if(value === false)
      {
        setTechList(data[selectedCategory])
        return
      }

    else if(value === true)
      {
        if (selectedCategories.length == 0)
          {
            if (selectedCategory == allCategoriesString)
              {
                const defaultCategory = allCategories[1]
                setSelectedCategories([defaultCategory])
              }
            else{
              setSelectedCategories([selectedCategory])
            }
          }

        else {
          aggregatedTechList(amount, listLimitSwitch, categoryAmount, categoryLimitSwitch)
        }

      }
  };

  const getCategoryButtonClass = (category: string) => {
    if (aggregatedSwitch) {
      if(category === allCategoriesString)
          return 'disabled'

      return selectedCategories.includes(category) ? 'selected' : '';
    }
    else {
      return selectedCategory === category ? 'selected' : '';
    }
  };
  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure the value is non-negative
    const value: number = parseInt(event.target.value, 10);
    if (value >= 1) {
      setAmount(value);
      const sliceList = true;
      aggregatedTechList(value, sliceList, categoryAmount, categoryLimitSwitch)
    }

  };



  const handleCategoryAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ensure the value is non-negative
    const value = parseInt(event.target.value, 10);
    if (value >= 1) {
      setCategoryAmount(value);
      aggregatedTechList(amount, listLimitSwitch, value, categoryLimitSwitch)
    }

  };

  const handleCategoryLimitSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setCategoryLimitSwitch(value);
    aggregatedTechList(amount, listLimitSwitch, categoryAmount, value)
  }
//#endregion
//#region use effect and other
useEffect(() => {
  if(aggregatedSwitch == true)
    aggregatedTechList(amount, listLimitSwitch, categoryAmount, categoryLimitSwitch)
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
    <div onClick={()=> togglerPressed("percentages")} className={`toggler_button percentageButton  ${alignment == 'percentages'? 'selected_toggler_button': ''}`}><img style={{ width: 27, height: 27 }} src={alignment == 'percentages'? whitePercentage: greenPercentage} /></div>
    <div onClick={()=> togglerPressed("counts")} className={`toggler_button countButton  ${alignment == 'counts'? 'selected_toggler_button': ''}`}><img style={{ width: 27, height: 27 }} src={alignment == 'counts'? whiteCount: greenCount} /></div>
  </div>
  )

  const inputStyle: CSSProperties = {
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

  const CategoryInputStyle: CSSProperties = {
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
    display: categoryLimitSwitch? 'block' : 'none',
  };
//#endregion

const calculateMaxLineWidth = () => {
  const screenWidth = window.innerWidth;
  // Example logic to calculate maxLineWidth based on screen width
  // Adjust the calculation as needed
  return screenWidth * 0.35;
};
const [maxLineWidths, setMaxLineWidth] = useState(calculateMaxLineWidth());

useEffect(() => {
  const handleResize = () => {
    setMaxLineWidth(calculateMaxLineWidth());
  };

  window.addEventListener('resize', handleResize);

  // Cleanup listener on component unmount
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
return (
    <div style={{ backgroundColor: backgroundColor }} className="containerRolePage section ">
      <div className="headerDiv">
        <div className="headerAndToggler">
          <h1 className='headerRolePage'>{_.upperCase(role.name)}</h1>
          <div className="togglerInfoDiv">
            <img className='infoImg togglerInfo' src={info} alt="" />
           {toggler}
           <Tooltip place='left' anchorSelect='.togglerInfo'>
            <div>
              <h3>Percentages</h3>
              <p>Show the percentage of job listings that mention this technology.</p>
            </div>
            <div>
              <h3>Count</h3>
              <p>Show the total number of job postings that mention this technology.</p>
            </div>
          </Tooltip>
          </div>

        </div>
        <h4 className='subheaderRolePage'>JOB POSTINGS AMOUNT : {totalListingsCount}</h4>
        <div className="switchesDiv">
        <Line height="1px" width="360px" color={'antiquewhite'} radius="4px" />
        <FormGroup>
          <div data-tip data-for='tooltip-right' className="switchMultipleCategoriesDiv">
            <FormControlLabel
            control={<Switch color='warning' checked={aggregatedSwitch} onChange={handleAggregationSwitchChange} />}
            style={{ color: 'antiquewhite', fontSize:'20px', marginTop:5 }}
            label={aggregateSwitchElementTitle}
          />
          <img className='infoImg SwitchMultipleCategories' src={info} alt="" />
          <Tooltip place='right' anchorSelect='.SwitchMultipleCategories'>
            <div>
              <h3>Enable Multi-Category Selection</h3>
              <p>Select multiple categories to view a combined and sorted list of their items.</p>
            </div>
          </Tooltip>
          </div>
          <div className="switchDiv limitDiv" style={{display: aggregatedSwitch? 'flex': 'none'}}>
            <div className="">
          <FormControlLabel
            control={<Switch color='secondary' checked={listLimitSwitch} onChange={handleLimitSwitchChange} />}
            style={{ color: 'antiquewhite', fontSize:'20px' }}
            label={listLImitSwitchElementTitle}
          />
            <img className='infoImg SwitchLimitDiv' src={info} alt="" />
          <Tooltip place='right' anchorSelect='.SwitchLimitDiv'>
            <div>
            <p><strong>Limit The List Length:</strong> Control the maximum number of items displayed.</p>
            </div>
          </Tooltip>
          </div>
          <input
            type='number'
            id="outlined-basic"
            value={amount == 0 ? defaultAmount : amount}
            onChange={handleAmountChange}
            min={1} // Ensure the input doesn't accept negative values
            max={100}
            style={inputStyle} // Apply custom styles via style attribute
          />
          </div>

          <div className="switchDiv limitPerCategoryDiv" style={{display: aggregatedSwitch? 'flex': 'none'}}>
            <div className="">
            <FormControlLabel
            control={<Switch color='success' checked={categoryLimitSwitch} onChange={handleCategoryLimitSwitchChange} />}
            style={{ color: 'antiquewhite', fontSize:'20px' }}
            label={categoryLImitSwitchElementTitle}
          />
           <img className='infoImg SwitchLimitPerCategory' src={info} alt="" />
            <Tooltip place='right' anchorSelect='.SwitchLimitPerCategory'>
              <div>
              <p><strong>Limit Items Per Category:</strong> Specify the maximum number of items per category.</p>
              </div>
            </Tooltip>
            </div>

          <input
            type='number'
            id="outlined-basic"
            value={categoryAmount == 0 ? defaultAmount : categoryAmount}
            onChange={handleCategoryAmountChange}
            min={1} // Ensure the input doesn't accept negative values
            max={100}
            style={CategoryInputStyle} // Apply custom styles via style attribute
          />
          </div>

      </FormGroup>
        </div>

      <div>
    </div>
      <Line height="1px" width="360px" color={'antiquewhite'} radius="4px" />
      </div>

      <div className="descriptionDiv textRolePage">{role.description}</div>
      <Line height="0.5px" width="100%" margin='0 0 20px 0' color={'antiquewhite'} radius="4px" />

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
            (<span
              onClick={() => handleCategoryClicked(category)}
              className={`categoryButton textRolePage ${getCategoryButtonClass(category)}`}
              key={category}>
              {_.startCase(category)}
            </span>))}
          </div>
        )}
        <div className="techListDiv" >
          {techList.map((techCount, index) => (
            <TechRow
              totalListingsAmount={totalListingsCount}
              maxCount={totalListingsCount}
              maxLineWidth={maxLineWidths}
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