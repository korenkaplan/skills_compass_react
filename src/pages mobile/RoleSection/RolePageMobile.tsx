/* eslint-disable @typescript-eslint/ban-ts-comment */
//#region imports
import React, { useState, useEffect, CSSProperties } from 'react';
import './RolePageMobile.css';
import { FormattedDataRow, Role } from '../../utils/interfaces';
import axios from 'axios';
import { CategoryData } from '../../utils/interfaces';
import Line from '../../components/Line/Line'
import whiteCount from '../../assets/white icons/count.png'
import greenCount from '../../assets/white icons/green-count.png'
import whitePercentage from '../../assets/white icons/percentage.png'
import greenPercentage from '../../assets/white icons/green-percentage.png'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import Switch from '@mui/material/Switch/Switch';
import { FormGroup } from '@mui/material';
import { Tooltip } from 'react-tooltip'
import _ from 'lodash'
import TechRowMobile from '../TechRow/TechRowMobile';
import Reveal from '../../components/FramerMotion/Reveal';
import Slide from '../../components/FramerMotion/Slide'
import SwitchesReveal from '../../components/FramerMotion/SwitchesReveal';
import { IoInformationCircleSharp } from 'react-icons/io5';
import {contrastColor, } from '../../utils/theme'
//#endregion

interface RolePageProps {
  role: Role;
  rolesFetched: boolean;
  framerMotionEnabled: boolean;
}

const RolePageMobile: React.FC<RolePageProps> = ({ role, rolesFetched, framerMotionEnabled = true }) => {
  //#region constants and states
  const allCategoriesString = 'all categories'
  const aggregateSwitchElementTitle = 'Multiple Categories'
  const listLImitSwitchElementTitle = 'Limit List Size'
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
  const [screenWidthPercent] = useState<number>(0.70)
  const [screenWidth] = useState<number>(window.innerWidth)
  //#endregion
  //#region functions

  const togglerPressed = (buttonTitle: string) => {
    if (buttonTitle !== alignment) {
      setAlignment(buttonTitle)
      setShowPercentage(!showPercentage);
    }
  }
  const handleCategoryClicked = (categoryKey: string) => {
    // check if aggregatedSwitch is true:
    if (aggregatedSwitch == true) {
      if (selectedCategories.includes(categoryKey) && selectedCategories.length == 1) {
        return
      }
      if (categoryKey === allCategoriesString)
        return
      // if already selected remove from list
      if (selectedCategories.includes(categoryKey) && selectedCategories.length > 0) {
        const tempList = selectedCategories
        setSelectedCategories(tempList.filter(category => category !== categoryKey))
      }
      else {
        // else add it and refresh the tech list
        const newList = [...selectedCategories, categoryKey].filter(category => category !== allCategoriesString)
        setSelectedCategories(newList)
      }
    }

    else {
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
    if (slice === true) {
      const slicedResult = result.slice(0, limitValue > 0 ? limitValue : amount > 0 ? amount : defaultAmount)
      setTechList(slicedResult)
      return
    }

    setTechList(result)
  }

  const handleLimitSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setListLimitSwitch(value);
    aggregatedTechList(value === true ? amount : defaultAmount, value, categoryAmount, categoryLimitSwitch)
  }

  const calculatePercentages = (part: number, total: number) => { return (part / total) * 100 }
  const handleAggregationSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.checked
    setAggregatedSwitch(value);

    if (value === false) {
      setTechList(data[selectedCategory])
      return
    }

    else if (value === true) {
      if (selectedCategories.length == 0) {
        if (selectedCategory == allCategoriesString) {
          const defaultCategory = allCategories[1]
          setSelectedCategories([defaultCategory])
        }
        else {
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
      if (category === allCategoriesString)
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
    if (aggregatedSwitch == true)
      aggregatedTechList(amount, listLimitSwitch, categoryAmount, categoryLimitSwitch)
  }, [selectedCategories])

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
          number_of_categories: 7,
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
      <div onClick={() => togglerPressed("percentages")} className={`toggler_button percentageButton  ${alignment == 'percentages' ? 'selected_toggler_button' : ''}`}><img style={{ width: 27, height: 27 }} src={alignment !== 'percentages' ? whitePercentage : greenPercentage} /></div>
      <div onClick={() => togglerPressed("counts")} className={`toggler_button countButton  ${alignment == 'counts' ? 'selected_toggler_button' : ''}`}><img style={{ width: 27, height: 27 }} src={alignment !== 'counts' ? whiteCount : greenCount} /></div>
    </div>
  )

  const inputStyle: CSSProperties = {
    width: '60px',
    height: '30px',
    textAlign: 'center', // Center align the input text
    outline: 'none', // Remove default outline
    boxSizing: 'border-box', // Ensure padding and border are included in width and height
    fontSize: '16px', // Example font size
    padding: '8px', // Example padding
    display: listLimitSwitch ? 'block' : 'none',
  };

  const CategoryInputStyle: CSSProperties = {
    width: '60px',
    height: '30px',
    textAlign: 'center', // Center align the input text
    outline: 'none', // Remove default outline
    boxSizing: 'border-box', // Ensure padding and border are included in width and height
    fontSize: '16px', // Example font size
    padding: '8px', // Example padding
    display: categoryLimitSwitch ? 'block' : 'none',
  };
  //#endregion

  const calculateMaxLineWidth = () => {
    // Example logic to calculate maxLineWidth based on screen width
    // Adjust the calculation as needed
    return screenWidth * screenWidthPercent;
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

  const splitAndInterleaveCategories = (categories: string) => {
    const midIndex = Math.ceil(categories.length / 2);
    const firstHalf = categories.slice(0, midIndex);
    const secondHalf = categories.slice(midIndex);

    const interleaved = [];
    for (let i = 0; i < firstHalf.length; i++) {
      if (firstHalf[i]) interleaved.push(firstHalf[i]);
      if (secondHalf[i]) interleaved.push(secondHalf[i]);
    }

    return interleaved;
  };
  const tooltipStyle: CSSProperties = {
    maxWidth: screenWidth - 50,
    whiteSpace: 'normal',
    padding: '15px',
    backgroundColor: 'rgb(0, 0, 0,1)',
    zIndex: 3,
  }
  return (
    <div  className="containerRolePage section  heightAndBorder">
      <Slide enabled={framerMotionEnabled} slideFrom='left'>
        <div>
          <div className="togglerInfoDiv">
          <IoInformationCircleSharp style={{marginRight: 10, color:contrastColor}} className='togglerInfo' size={22}/>
            {toggler}
            <Tooltip style={tooltipStyle} place='bottom' anchorSelect='.togglerInfo'>
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
          <div className="headersDiv">
            <h1 className='headerRolePage'>{_.upperCase(role.name)}</h1>
            <h2 className='subheaderRolePage'>JOB POSTINGS AMOUNT : <span className='highlighted'>{totalListingsCount}</span></h2>
          </div>
          <Line height="2px" width="100%" color={contrastColor} radius="4px" />
          <FormGroup>
            <div className="switchMultipleCategoriesDiv">
              <FormControlLabel
                control={<Switch color='warning' checked={aggregatedSwitch} onChange={handleAggregationSwitchChange} />}
                label={aggregateSwitchElementTitle}
                className='formControlLabelMobile'
              />
          <IoInformationCircleSharp style={{marginRight: 10, color:contrastColor}} className='SwitchMultipleCategories' size={22}/>
              <Tooltip style={tooltipStyle} place='bottom' anchorSelect='.SwitchMultipleCategories'>
                <div>
                  <h3>Enable Multi-Category Selection</h3>
                  <p>Select multiple categories to view a combined and sorted list of their items.</p>
                </div>
              </Tooltip>
            </div>

            <SwitchesReveal duration={0.3} slideFrom='left' enabled={aggregatedSwitch}>
              <div className="switchDiv limitDiv" style={{ display: aggregatedSwitch ? 'flex' : 'none' }}>
                <div className="">
                  <FormControlLabel
                    control={<Switch color='secondary' checked={listLimitSwitch} onChange={handleLimitSwitchChange} />}
                    label={listLImitSwitchElementTitle}
                     className='formControlLabelMobile'
                  />
                  <IoInformationCircleSharp style={{marginRight: 10, color:contrastColor}} className='SwitchLimitDiv' size={22}/>
                  <Tooltip style={tooltipStyle} place='bottom' anchorSelect='.SwitchLimitDiv'>
                    <div>
                      <p><strong>Limit The List Length:</strong> Control the maximum number of items displayed.</p>
                    </div>
                  </Tooltip>
                </div>
                <SwitchesReveal slideAmount={0} enabled={listLimitSwitch}>
                  <input
                    type='number'
                    className='inputMobile'
                    id="outlined-basic"
                    value={amount == 0 ? defaultAmount : amount}
                    onChange={handleAmountChange}
                    min={1} // Ensure the input doesn't accept negative values
                    max={100}
                    style={inputStyle} // Apply custom styles via style attribute
                  />
                </SwitchesReveal>
              </div>
            </SwitchesReveal>

            <SwitchesReveal delay={0.5} slideFrom='left' enabled={aggregatedSwitch}>
              <div className="switchDiv limitPerCategoryDiv" style={{ display: aggregatedSwitch ? 'flex' : 'none' }}>
                <div className="">
                  <FormControlLabel
                    control={<Switch color='success' checked={categoryLimitSwitch} onChange={handleCategoryLimitSwitchChange} />}
                    label={categoryLImitSwitchElementTitle}
                    className='formControlLabelMobile'
                  />
                  <IoInformationCircleSharp style={{marginRight: 10, color:contrastColor}} className='SwitchLimitPerCategory' size={22}/>
                  <Tooltip style={tooltipStyle} place='bottom' anchorSelect='.SwitchLimitPerCategory'>
                    <div>
                      <p><strong>Limit Items Per Category:</strong> Specify the maximum number of items per category.</p>
                    </div>
                  </Tooltip>
                </div>
                <SwitchesReveal slideAmount={0} enabled={categoryLimitSwitch}>

                  <input
                    type='number'
                    id="outlined-basic"
                    value={categoryAmount == 0 ? defaultAmount : categoryAmount}
                    onChange={handleCategoryAmountChange}
                    min={1} // Ensure the input doesn't accept negative values
                    max={100}
                    className='inputMobile'
                    style={CategoryInputStyle} // Apply custom styles via style attribute
                  />
                </SwitchesReveal>

              </div>
            </SwitchesReveal>

          </FormGroup>
        </div>

      </Slide>

      <Line height="2px" width="100%" margin='0 0 20px 0' color={contrastColor} radius="4px" />
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
            {allCategories && allCategories.length > 0 && (
              <>
                <span
                  onClick={() => handleCategoryClicked(allCategories[0])}
                  className={`categoryButtonMobile textRolePage ${getCategoryButtonClass(allCategories[0])}`}
                  key={allCategories[0]}>
                  {_.startCase(allCategories[0])}
                </span>

                {splitAndInterleaveCategories(
                  // @ts-expect-error
                  allCategories.slice(1).sort((a, b) => a.length - b.length)
                ).map((category, i) => (
                  <span
                    onClick={() => handleCategoryClicked(category)}
                    className={`categoryButtonMobile textRolePage ${getCategoryButtonClass(category)}`}
                    key={category}>
                    <Reveal className='RevealCategoryButtonMobile' enabled={framerMotionEnabled} duration={0.3} delay={i / 10}>
                      <div className="">
                        {_.startCase(category)}
                      </div>
                    </Reveal>

                  </span>
                ))}
              </>
            )}
          </div>
        )}
        <Reveal enabled={framerMotionEnabled}>
          <div className="techListDiv" >
            {techList.map((techCount, index) => (
              <TechRowMobile
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
        </Reveal>
      </div>
      <br />
    </div>
  );
};

export default RolePageMobile;