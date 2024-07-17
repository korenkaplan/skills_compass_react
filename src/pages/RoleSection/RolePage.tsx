//#region imports
import React, { useState, useEffect, CSSProperties } from 'react';
import './RolePage.css';
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
import {FormGroup} from '@mui/material';
import { Tooltip } from 'react-tooltip';
import { IoInformationCircleSharp } from "react-icons/io5";
import _ from 'lodash'
import WordByWordReveal from '../../components/FramerMotion/WordByWordReveal';
import Reveal from '../../components/FramerMotion/Reveal';
import Slide from '../../components/FramerMotion/Slide';
import SwitchesReveal from '../../components/FramerMotion/SwitchesReveal';
import {contrastColor} from '../../utils/theme'
import {switchesDivWidth} from '../../utils/variables'
import { motion, AnimatePresence } from 'framer-motion';
import { CustomSwitch } from '../../components/CustomSwitch/CustomSwitch';
//#endregion

interface RolePageProps {
  role: Role;
  rolesFetched: boolean;
  framerMotionEnabled: boolean;
}

const RolePage: React.FC<RolePageProps> = ({ role, rolesFetched, framerMotionEnabled=true }) => {
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
  const techRowTransitionSpeed = 15
  const textVariants = {
    initial: { opacity: 0, x: 100},
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };

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

  const handleLimitSwitchChange = (value: boolean) => {
    setListLimitSwitch(value);
    aggregatedTechList(value === true ? amount : defaultAmount, value, categoryAmount, categoryLimitSwitch)
  }

  const calculatePercentages = (part: number, total: number) => { return (part / total) * 100 }


  const handleAggregationSwitchChange = (value: boolean) => {
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

  const handleCategoryLimitSwitchChange = (value:boolean) => {
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
    <div className="togglerDesktop">
    <div onClick={()=> togglerPressed("percentages")} className={`toggler_buttonDesktop percentageButtonDesktop  ${alignment == 'percentages'? 'selected_toggler_buttonDesktop': ''}`}><img style={{ width: 27, height: 27 }} src={alignment !== 'percentages'? whitePercentage: greenPercentage} /></div>
    <div onClick={()=> togglerPressed("counts")} className={`toggler_buttonDesktop countButtonDesktop  ${alignment == 'counts'? 'selected_toggler_buttonDesktop': ''}`}><img style={{ width: 27, height: 27 }} src={alignment !== 'counts'? whiteCount: greenCount} /></div>
  </div>
  )

  const inputStyle: CSSProperties = {
    width: '60px',
    height: '30px',
    textAlign: 'center', // Center align the input text
    borderRadius: '4px', // Example border radius
    outline: 'none', // Remove default outline
    boxSizing: 'border-box', // Ensure padding and border are included in width and height
    fontSize: '16px', // Example font size
    padding: '8px', // Example padding
  };

  const CategoryInputStyle: CSSProperties = {
    width: '60px',
    height: '30px',
    textAlign: 'center', // Center align the input text
    borderRadius: '4px', // Example border radius
    outline: 'none', // Remove default outline
    boxSizing: 'border-box', // Ensure padding and border are included in width and height
    fontSize: '16px', // Example font size
    padding: '8px', // Example padding
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
    <div  className="containerRolePageDesktop section ">
      <Slide enabled={framerMotionEnabled} slideFrom='left'>
      <div className="headerDivDesktop">
        <div className="headerAndTogglerDesktop">
          <h1 className='headerRolePageDesktop'>{_.upperCase(role.name)}</h1>
          <div className="togglerInfoDivDesktop">
          <IoInformationCircleSharp style={{marginRight: 10, color:contrastColor}} className='togglerInfoDesktop' size={22}/>
           {toggler}
           <Tooltip place='left' anchorSelect='.togglerInfoDesktop'>
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
        <h4 className='subheaderRolePageDesktop'>JOB POSTINGS AMOUNT : <span className='highlighted'>{totalListingsCount}</span></h4>
        <div className="switchesDivDesktop">
        <Line height="1px" width={`${switchesDivWidth}px`} color={contrastColor} radius="4px" />
       <div className="formGroupDesktop">
        <FormGroup>
          <div data-tip data-for='tooltip-right' className="switchDivMargin switchMultipleCategoriesDivDesktop">
            <FormControlLabel
            className='FormControlLabelDesktop'
            control={<CustomSwitch isOn={aggregatedSwitch} onClick={() => handleAggregationSwitchChange(!aggregatedSwitch)} />}
            label={aggregateSwitchElementTitle}
          />
            <IoInformationCircleSharp style={{color:contrastColor}} className='SwitchMultipleCategoriesDesktop' size={22}/>
          <Tooltip place='right' anchorSelect='.SwitchMultipleCategoriesDesktop'>
            <div>
              <h3>Enable Multi-Category Selection</h3>
              <p>Select multiple categories to view a combined and sorted list of their items.</p>
            </div>
          </Tooltip>
          </div>
          <SwitchesReveal  duration={0.3} slideFrom='left' enabled = {aggregatedSwitch}>
          <div  className="switchDivDesktop limitDivDesktop switchDivMargin" style={{display: aggregatedSwitch? 'flex': 'none', width:`${switchesDivWidth}px`}}>
            <div className="infoAndLabelAndSwitchDivDesktop">
          <FormControlLabel

            control={ <CustomSwitch isOn={listLimitSwitch} onClick={() => handleLimitSwitchChange(!listLimitSwitch)} />}
            className='FormControlLabelDesktop'
            label={listLImitSwitchElementTitle}
          />
          <IoInformationCircleSharp  style={{color:contrastColor}}  className='SwitchLimitDivDesktop' size={22}/>
          </div>
          <Tooltip place='right' anchorSelect='.SwitchLimitDivDesktop'>
            <div>
            <p><strong>Limit The List Length:</strong> Control the maximum number of items displayed.</p>
            </div>
          </Tooltip>
          <SwitchesReveal slideAmount={0}   enabled = {listLimitSwitch}>
          <input
            type='number'
            id="outlined-basic"
            value={amount == 0 ? defaultAmount : amount}
            onChange={handleAmountChange}
            min={1} // Ensure the input doesn't accept negative values
            max={100}
            className='inputDesktop'
            style={inputStyle} // Apply custom styles via style attribute
          />
             </SwitchesReveal>
          </div>
          </SwitchesReveal>

          <SwitchesReveal  delay={0.5} slideFrom='left' enabled = {aggregatedSwitch}>
          <div className="switchDivDesktop limitPerCategoryDivDesktop " style={{display: aggregatedSwitch? 'flex': 'none', width:`${switchesDivWidth}px`}}>
            <div className="infoAndLabelAndSwitchDivDesktop">

            <FormControlLabel

            control={< CustomSwitch isOn={categoryLimitSwitch} onClick={() => handleCategoryLimitSwitchChange(!categoryLimitSwitch)} />}
            className='FormControlLabelDesktop'
            label={categoryLImitSwitchElementTitle}
          />
          <IoInformationCircleSharp style={{color:contrastColor}}  className='SwitchLimitPerCategoryDesktop' size={22}/>
            </div>

            <Tooltip place='right' anchorSelect='.SwitchLimitPerCategoryDesktop'>
              <div>
              <p><strong>Limit Items Per Category:</strong> Specify the maximum number of items per category.</p>
              </div>
            </Tooltip>


          <SwitchesReveal  slideAmount={0}  enabled = {categoryLimitSwitch}>
          <input
            className='inputDesktop'
            type='number'
            id="outlined-basic"
            value={categoryAmount == 0 ? defaultAmount : categoryAmount}
            onChange={handleCategoryAmountChange}
            min={1} // Ensure the input doesn't accept negative values
            max={100}
            style={CategoryInputStyle} // Apply custom styles via style attribute
          />
          </SwitchesReveal>
          </div>
          </SwitchesReveal>

      </FormGroup>
      </div>
        </div>
      <div>
    </div>
    <Line height="1px" width={`${switchesDivWidth}px`} color={contrastColor} radius="4px" />
      </div>
      </Slide>

      <div className="descriptionDivDesktop textRolePageDesktop"><WordByWordReveal  enabled={framerMotionEnabled} speed={30} text={role.description}/> </div>
      <Line height="0.5px" width="100%" margin='0 0 20px 0' color={contrastColor} radius="4px" />

      <div className="loadingDivRolePageDesktop" style={{ display: isAnimating ? 'flex' : 'none' }}>
        <div className="loadingDivInnerDesktop">
          <h1 className={`loading-textDesktop ${isAnimating ? 'animate' : ''}`}>
            {loadingTitle}
            <span className="dot">.</span>
            <span className="dot">.</span>
            <span className="dot">.</span>
          </h1>
        </div>
      </div>

      <div className="dataDivDesktop" style={{ display: isAnimating ? 'none' : 'flex', flexDirection: 'column', flexGrow: 1 }}>
        {data && (
          <div className='categoriesButtonDivDesktop'>
            {allCategories?.map((category, i) =>
            (
              <span
              key={`${category}${i}`}
              onClick={() => handleCategoryClicked(category)}
              className={`categoryButtonDesktop textRolePageDesktop ${getCategoryButtonClass(category)}`}
              >
                <Reveal enabled={framerMotionEnabled} duration={0.3}>
                <div >
              {_.startCase(category)}
                </div>
                </Reveal>

            </span>
            ))}
          </div>
        )}
          <Reveal enabled={framerMotionEnabled}>

        <div className="techListDivDesktop"
        >
          {techList.map((techCount, index) => (
           <AnimatePresence
           key={`${techCount.id}${selectedCategory}`}
                   mode='popLayout'
                 >
            <motion.div
            key={`${index}${techCount.id}`}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={textVariants}
            transition={{delay:index/techRowTransitionSpeed}}
            className='TechRowWrapperMotionDiv'
            >
            <TechRow
              totalListingsAmount={totalListingsCount}
              maxCount={totalListingsCount}
              maxLineWidth={maxLineWidths}
              key={index}
              tech={techCount.tech}
              count={showPercentage ? calculatePercentages(techCount.amount, totalListingsCount) : techCount.amount}
              showPercentage={showPercentage}
            />
            </motion.div>
            </AnimatePresence>

          ))}
          </div>

        </Reveal>
      </div>
      <br />
    </div>
  );
};

export default RolePage;