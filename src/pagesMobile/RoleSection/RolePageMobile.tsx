/* eslint-disable @typescript-eslint/ban-ts-comment */
//#region imports
import React, { useState, useEffect, CSSProperties } from 'react';
import './RolePageMobile.css';
import { FormattedDataRow, Role } from '@utils/interfaces';
import axios from 'axios';
import { CategoryData } from '@utils/interfaces';
import Line from '@components/Line/Line'
import whiteCount from '@assets/white icons/count.png'
import greenCount from '@assets/white icons/green-count.png'
import whitePercentage from '@assets/white icons/percentage.png'
import greenPercentage from '@assets/white icons/green-percentage.png'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel';
import { FormGroup } from '@mui/material';
import { Tooltip } from 'react-tooltip'
import _ from 'lodash'
import TechRowMobile from '@pagesMobile/TechRow/TechRowMobile';
import Reveal from '@components/FramerMotion/Reveal';
import Slide from '@components/FramerMotion/Slide'
import SwitchesReveal from '@components/FramerMotion/SwitchesReveal';
import { IoInformationCircleSharp } from 'react-icons/io5';
import { contrastColor, } from '@utils/theme'
import { motion, AnimatePresence } from 'framer-motion';
import { CustomSwitch } from '@components/CustomSwitch/CustomSwitch';
import { techItemsPerCategory, allCategoriesItemsAmount } from '@utils/variables'
import { apiPrefix } from '@utils/variables';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import ScaleOnTapButtonWrapper from '@components/FramerMotion/ScaleOnTapButtonWrapper';
import Slider from "react-slick";
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
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [aggregatedSwitch, setAggregatedSwitch] = useState(false)
  const [listLimitSwitch, setListLimitSwitch] = useState(false)
  const [amount, setAmount] = useState(10);
  const [allCategories, setAllCategories] = useState<string[]>([])
  const [categoryLimitSwitch, setCategoryLimitSwitch] = useState(false)
  const [categoryAmount, setCategoryAmount] = useState(5);
  const [screenWidthPercent] = useState<number>(0.70)
  const [screenWidth] = useState<number>(window.innerWidth)
  const [showCategoriesWithTechRow, setShowCategoriesWithTechRow] = useState(false)

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
          row.category = category
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

  const handleLimitSwitchChange = (value: boolean) => {
    setListLimitSwitch(value);
    aggregatedTechList(value === true ? amount : defaultAmount, value, categoryAmount, categoryLimitSwitch)
  }

  const calculatePercentages = (part: number, total: number) => { return (part / total) * 100 }
  const handleAggregationSwitchChange = (value: boolean) => {
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
  const handleAmountChange = (increase: boolean) => {
    // Ensure the value is non-negative
    if (increase == false && amount > 1 || increase === true && amount < 100) {
      const newAmount = increase ? amount + 1 : amount - 1;
      setAmount(newAmount);
      const sliceList = true;
      aggregatedTechList(newAmount, sliceList, categoryAmount, categoryLimitSwitch)
    }

  };



  const handleCategoryAmountChange = (increase: boolean) => {
    // Ensure the value is non-negative
    if (increase == false && categoryAmount > 1 || increase === true && categoryAmount < techItemsPerCategory) {
      const newAmount = increase ? categoryAmount + 1 : categoryAmount - 1;
      setCategoryAmount(newAmount);
      aggregatedTechList(amount, listLimitSwitch, newAmount, categoryLimitSwitch)
    }

  };

  const handleCategoryLimitSwitchChange = (value: boolean) => {
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
        const res = await axios.get(`${apiPrefix}/core/get-jobs-count-for-role/?role_id=${role.id}`);

        setTotalListingsCount(res.data);

        // Fetch role count stats view
        const response = await axios.post(`${apiPrefix}/usage_stats/get-role-count-stats-view/`, {
          role_id: role.id,
          number_of_categories: 15,
          limit: techItemsPerCategory,
          all_categories_limit: allCategoriesItemsAmount
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
  useEffect(() => {
    setShowCategoriesWithTechRow(aggregatedSwitch == true && selectedCategories.length > 1)
  }, [selectedCategories, aggregatedSwitch]);
  const toggler = (
    <div className="toggler">
      <div onClick={() => togglerPressed("percentages")} className={`toggler_button percentageButton  ${alignment == 'percentages' ? 'selected_toggler_button' : ''}`}><img style={{ width: 27, height: 27 }} src={alignment !== 'percentages' ? whitePercentage : greenPercentage} /></div>
      <div onClick={() => togglerPressed("counts")} className={`toggler_button countButton  ${alignment == 'counts' ? 'selected_toggler_button' : ''}`}><img style={{ width: 27, height: 27 }} src={alignment !== 'counts' ? whiteCount : greenCount} /></div>
    </div>
  )


  //#endregion

  const calculateMaxLineWidth = () => {
    // Example logic to calculate maxLineWidth based on screen width
    // Adjust the calculation as needed
    return screenWidth * screenWidthPercent;
  };
  const [maxLineWidths, setMaxLineWidth] = useState(calculateMaxLineWidth());

  const tooltipStyle: CSSProperties = {
    maxWidth: screenWidth - 50,
    whiteSpace: 'normal',
    padding: '15px',
    backgroundColor: 'rgb(0, 0, 0,1)',
    zIndex: 3,
  }
  const techRowTransitionSpeed = 15
  const textVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  };
  const headerAndAmountToggler = (
    <>
          <div className="togglerInfoDiv">
            <IoInformationCircleSharp style={{ marginRight: 10 }} className='IoInformationCircleSharpMobile togglerInfo' size={22} />
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
    </>

  )

  const switchesDiv = (
    <FormGroup className='formGroupMobileSwitch'>
    <div className="switchDivMargin switchMultipleCategoriesDiv">
      <FormControlLabel
        control={<CustomSwitch isOn={aggregatedSwitch} onClick={() => handleAggregationSwitchChange(!aggregatedSwitch)} />}
        label={aggregateSwitchElementTitle}
        className='formControlLabelMobile'
      />
      <IoInformationCircleSharp className=' IoInformationCircleSharpMobile SwitchMultipleCategories' size={22} />
      <Tooltip style={tooltipStyle} place='bottom' anchorSelect='.SwitchMultipleCategories'>
        <div>
          <p>Choose multiple categories to create a custom view with a combined and sorted list.</p>
        </div>
      </Tooltip>
    </div>


    <SwitchesReveal duration={0.3} slideFrom='left' enabled={aggregatedSwitch}>
      <div className="switchDiv limitDiv switchDivMargin" style={{ display: aggregatedSwitch ? 'flex' : 'none' }}>
        <div className="switchLeftSideMobile">
          <FormControlLabel
            control={<CustomSwitch isOn={listLimitSwitch} onClick={() => handleLimitSwitchChange(!listLimitSwitch)} />}
            label={listLImitSwitchElementTitle}
            className='formControlLabelMobile'
          />
          <IoInformationCircleSharp className='IoInformationCircleSharpMobile SwitchLimitDiv' size={22} />
          <Tooltip style={tooltipStyle} place='bottom' anchorSelect='.SwitchLimitDiv'>
            <div>
              <p>Control the maximum number of items displayed on the list.</p>
            </div>
          </Tooltip>
        </div>

        <SwitchesReveal slideAmount={0} enabled={listLimitSwitch} >
          <div className="inputDivMobile" >
            <ScaleOnTapButtonWrapper className='flexCenter'>
              <AiFillMinusCircle className='PLusMinusIconMobile' color={contrastColor} onClick={() => handleAmountChange(false)} />
            </ScaleOnTapButtonWrapper>
            <div className="numberInputMobile" style={{ margin: 0, padding: 0 }}>{amount}</div>
            <ScaleOnTapButtonWrapper className='flexCenter'>
              <AiFillPlusCircle className='PLusMinusIconMobile' color={contrastColor} onClick={() => handleAmountChange(true)} />
            </ScaleOnTapButtonWrapper>
          </div>

        </SwitchesReveal>
      </div>
    </SwitchesReveal>

    <SwitchesReveal delay={0.5} slideFrom='left' enabled={aggregatedSwitch}>
      <div className="switchDiv limitPerCategoryDiv switchDivMargin" style={{ display: aggregatedSwitch ? 'flex' : 'none' }}>
        <div className="switchLeftSideMobile">
          <FormControlLabel
            control={< CustomSwitch isOn={categoryLimitSwitch} onClick={() => handleCategoryLimitSwitchChange(!categoryLimitSwitch)} />}
            label={categoryLImitSwitchElementTitle}
            className='formControlLabelMobile'
          />
          <IoInformationCircleSharp className='IoInformationCircleSharpMobile SwitchLimitPerCategory' size={22} />
          <Tooltip style={tooltipStyle} place='bottom' anchorSelect='.SwitchLimitPerCategory'>
            <div>
              <p>Specify the maximum number of items per category  (maximum is {techItemsPerCategory} items).</p>
            </div>
          </Tooltip>
        </div>
        <SwitchesReveal slideAmount={0} enabled={categoryLimitSwitch}>
          <div className="inputDivMobile" >
            <ScaleOnTapButtonWrapper className='flexCenter'>
              <AiFillMinusCircle className='PLusMinusIconMobile' color={contrastColor} onClick={() => handleCategoryAmountChange(false)} />
            </ScaleOnTapButtonWrapper>
            <div className="numberInputMobile" style={{ margin: 0, padding: 0 }}>{categoryAmount}</div>
            <ScaleOnTapButtonWrapper className='flexCenter'>
              <AiFillPlusCircle className='PLusMinusIconMobile' color={contrastColor} onClick={() => handleCategoryAmountChange(true)} />
            </ScaleOnTapButtonWrapper>
          </div>
        </SwitchesReveal>

      </div>
    </SwitchesReveal>

  </FormGroup>
  )
  const skeletonDiv = (
    <div style={{ display: isAnimating ? 'block' : 'none' }}>
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <p>
        <Skeleton style={{ marginBottom: '10px' }} count={10} />
      </p>
    </SkeletonTheme>
  </div>
  )
  function chunkArray(array: string [], chunkSize: number) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const categoriesDiv = (
    <div className="dataDiv" style={{ display: isAnimating ? 'none' : 'flex', flexDirection: 'column', flexGrow: 1 }}>
      {data && (
        <div className='categoriesButtonDiv'>
          {allCategories && allCategories.length > 0 && (
            <Slider className='sliderMobile' {...settings}>
              {chunkArray(allCategories, 4).map((categoryChunk, slideIndex) => (
                <div className='categoriesSliderDiv' key={slideIndex}>
                  {categoryChunk.map((category: string, i: number) => (
                    <div
                      onClick={() => handleCategoryClicked(category)}
                      className={`categoryButtonMobile textRolePage ${getCategoryButtonClass(category)}`}
                      key={`${category}${i}`}>
                      {_.startCase(category)}
                    </div>
                  ))}
                </div>
              ))}
            </Slider>
          )}
        </div>
      )}

    </div>
  );
const techRowsDiv = (
<Reveal enabled={framerMotionEnabled}>
        <div className="techListDiv">
          {techList.map((techCount, index) => (
            <AnimatePresence
              key={`${techCount.id}${index}${selectedCategory}}`}
              mode='popLayout'
            >
              <motion.div
                key={`${techCount.id}${index}`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textVariants}
                transition={{ delay: index / techRowTransitionSpeed }}
                className='TechRowWrapperMotionDiv'
              >
                <TechRowMobile
                  totalListingsAmount={totalListingsCount}
                  maxCount={totalListingsCount}
                  maxLineWidth={maxLineWidths}
                  key={index}
                  tech={techCount.tech}
                  count={showPercentage ? calculatePercentages(techCount.amount, totalListingsCount) : techCount.amount}
                  showPercentage={showPercentage}
                  category={techCount.category}
                  showCategory={showCategoriesWithTechRow}
                />
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </Reveal>
)
  return (
    <div className="containerRolePage section  heightAndBorder">
      <Slide enabled={framerMotionEnabled} slideFrom='left'>
        <div>
          {headerAndAmountToggler}
          <Line height="2px" width="100%" color={contrastColor} radius="4px" />
          {switchesDiv}
        </div>
      </Slide>
      <Line height="2px" width="100%" margin='0 0 20px 0' color={contrastColor} radius="4px" />
        {skeletonDiv}
        {categoriesDiv}
        {techRowsDiv}
      <br />
    </div>
  );
};

export default RolePageMobile;