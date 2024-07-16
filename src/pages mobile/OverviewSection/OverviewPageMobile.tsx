import React, { CSSProperties, useEffect, useState } from 'react';
import './OverviewPageMobile.css';
import { backgroundColor } from '../../utils/variables';
import logo from '../../assets/logo/logo wit yellow ribbon.png';
import '../../CSS/RotatingImageClick.css';
import translateIcon from '../../assets/iconsDark/translate.png'
import {contrastColor} from '../../utils/theme'
import Line from '../../components/Line/Line';
import bell from '../../assets/icons/bell.png'
import TypeQuestionAnimation from '../../components/TypeQuestionAnimation/TypeQuestionAnimation ';
import ScrollDownMouseAnimation from '../../components/ScrollDownMouseAnimation/ScrollDownMouseAnimation';
import Reveal from '../../components/FramerMotion/Reveal';
import ScaleOnTapButtonWrapper from '../../components/FramerMotion/ScaleOnTapButtonWrapper';
import Slide from '../../components/FramerMotion/Slide';
import { motion, AnimatePresence } from 'framer-motion';
const OverviewPageMobile: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const bellLogoSize = 80
  const questions = [
    `"Which programming language is most in demand in ${currentYear}?"`,
    `"Which database is more in use in ${currentYear} PostgreSQL or MySQL?"`,
    `"Which framework should I learn in ${currentYear} React or Angular?"`,
    `"Which database is more commonly used in the industry SQL or NoSql?"`,
    `"Is it worth learning PHP in ${currentYear}?"`,
    `"Java vs Python vs Node.Js for backend development in ${currentYear}?"`,
    `"Which cloud platform is more in use in the industry for DevOps roles: AWS or Azure?"`,
    `"Which stack is more popular MEAN or MERN in ${currentYear}?"`,
  ];
  const developerSurveyText = () => (
    <>
      <div className="topMobile" >
        <Reveal>
          <div className="overviewInnerHeaderMobile">
            <img src={bell} alt="" style={{ width: `${bellLogoSize}px`, height: `${bellLogoSize}px` }} />
            <h2 style={{ margin: '0 0 0 10px', fontSize: '25px' }}>Rings a Bell?</h2>
          </div>
        </Reveal>
        <Slide slideFrom='right'>
          <p>Do you sometimes feel overwhelmed by the  countless technologies out there, and unsure which ones to learn in order to stay relevant in the constantly changing job market?</p>

        </Slide>
        <Reveal >
          <p><strong>You've Come To The Right Place!</strong> 🚀</p>

        </Reveal>
        <Line height='2px' width='80%' color={contrastColor} />

        <Slide slideFrom='left'>
          <p>Our mission is to guide you through the most in-demand technologies in Israel's hi-tech job market. 🌟</p>

        </Slide>
        <Slide slideFrom='right'>
          <p>We do the hard research work for you and provide real-time data to help you stay ahead. 📊</p>

        </Slide>
        <Reveal >
          <p><strong>What Makes Us Unique ?</strong> 🔍</p>

        </Reveal>
        <Line height='2px' width='80%' color={contrastColor} />

        <Slide slideFrom='left'>
          <p>All our data is extracted straight from analyzing <strong>thousands </strong> of job listings from the most popular job search websites such as <strong>LinkedIn, Google Jobs</strong> and from companies websites.</p>

        </Slide>


      </div>
    </>
  );

  const developerSurveyTextHeb = () => (
    <>
      <div className="topMobile">
        <Reveal>
        <div className="overviewInnerHeaderMobile">
          <img src={bell} alt="" style={{ width: `${bellLogoSize}px`, height: `${bellLogoSize}px` }} />
          <h2 style={{ margin: '0 0 0 10px', fontSize: '25px' }}>מצלצל לך מוכר ?</h2>
        </div>
        </Reveal>
        <Slide slideFrom='right'>
        <p>אם גם אתה הולך לאיבוד לפעמים מהכמות האין סופית של טכנולוגיות  ולא יודע מה כדאי  ללמוד כדי להיות הכי רלוונטי לשוק העבודה שממשיך להתקדם ולהשתנות ללא הפסקה ?</p>
        </Slide>
        <Reveal>
        <p><strong>אז הגעת למקום הנכון!</strong> 🚀</p>
        </Reveal>
        <Line height='1px' width='70%' color={backgroundColor} />
        <Slide slideFrom='left'>
        <p>המטרה שלנו היא לעזור ולהכווין אנשים בנוגע לטכנולוגיות המבוקשות ביותר בשוק העבודה בהייטק הישראלי, ולעשות סדר בבלאגן.  🌟</p>

        </Slide>
        <Slide slideFrom='right'>
        <p>אנחנו עושים את כל עבודת המחקר בשבילך ומספקים לך את המידע העדכני ביותר על הטכנולוגיות הכי מבוקשות בשוק לפי סוג משרה.</p>
        </Slide>
        <Reveal>
        <p><strong>מה מייחד אותנו משאר האתרים?</strong> 🔍</p>
        </Reveal>
        <Line height='1px' width='70%' color={backgroundColor} />
        <Slide slideFrom='left'>
        <p>כל המידע שלנו מגיע היישר מניתוח של <strong> אלפי משרות</strong> מאתרי חיפוש העבודה הפופולרים ביותר כמו <strong dir='ltr' style={{ marginLeft: '5px' }}>LinkedIn, Google Jobs </strong> ומאתרי החברות .</p>
        </Slide>

      </div>
    </>
  );
  const headerEnglish = "Overview";
  const headerHeb = "סקירה כללית";
  const bottomWordsEng = "Happy reading!";
  const bottomWordsHeb = "קריאה מהנה!";


  const [header, setHeader] = useState<string>(headerEnglish);
  const [bottomWords, setBottomWords] = useState<string>(bottomWordsEng);
  const [isRotated, setIsRotated] = useState(false);
  const [mainText, setMainText] = useState(developerSurveyText);

  const handleRotate = () => {
    setIsRotated(prevState => !prevState); // Toggle the rotation state
    setHeader(isRotated ? headerEnglish : headerHeb); // Toggle between English and Hebrew texts
    setMainText(isRotated ? developerSurveyText : developerSurveyTextHeb); // Toggle between English and Hebrew texts
    setBottomWords(isRotated ? bottomWordsEng : bottomWordsHeb); // Toggle between English and Hebrew texts
  };


  useEffect(() => {
    const currentYear: number = new Date().getFullYear();
    setCurrentYear(currentYear)
  }, []);
  const questionsRowsStyle: CSSProperties = {
    height: '100px',
  };
  const getScrollDownAnimationStyle = (): CSSProperties => ({
    height: '150px',
  });
  const textVariants = {
    initial: { opacity: 0,  x: isRotated ? -200 : 200},
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRotated ? 200 : -200 }

  };
  return (
    <div className="section container heightAndBorder">
      <div className="textContainerMobile" dir={isRotated ? 'rtl' : 'ltr'}>
        <Reveal>
          <motion.div
            key={isRotated ? 'hebrew' : 'english'}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.5 }}
           className="containerHeader">
            <h2 className='headerOverviewPage'>{header}</h2>
            <ScaleOnTapButtonWrapper>
              <div className='custom-button translateButtonDivMobile'
                onClick={handleRotate}
              >
                <p className='translateButtonTitleDesktop'> {isRotated ? 'English' : 'עברית'}</p>
                <img className='translateIconMobile' src={translateIcon} alt="" />
              </div>
            </ScaleOnTapButtonWrapper>
          </motion.div>
        </Reveal>
        <div className="containerText" dir={isRotated ? 'rtl' : 'ltr'}>
          <Reveal >
            <div style={questionsRowsStyle} dir='ltr'>
              <TypeQuestionAnimation  fontSize={20} questions={questions} currentYear={currentYear} />
            </div>
          </Reveal>
          <AnimatePresence>

          <motion.div
             key={isRotated ? 'hebrew' : 'english'}
             initial="initial"
             animate="animate"
             exit="exit"
             variants={textVariants}
             transition={{ duration: 0.5 }}
          >
            {mainText}
          </motion.div>
          </AnimatePresence>

          <Reveal>
            <ScaleOnTapButtonWrapper>
            <div className='OverviewPressHereDesktop' >
              <div className='custom-button pressHereButtonDesktopOverview' onClick={() => document.getElementById('howItWorks')?.scrollIntoView({ behavior: 'smooth' })}>{isRotated ? 'להסבר המלא לחץ כאן' : 'Full Explanation'}</div>
              </div>

            </ScaleOnTapButtonWrapper>
          </Reveal>
        </div>
        <Reveal >
        <div className="imageRow">
          <p >{bottomWords}</p>
          <ScrollDownMouseAnimation CustomClassName='ScrollDownMouseAnimationMobile' scrollToSectionId='none' styleProps={getScrollDownAnimationStyle()} />
          <img src={logo} alt="Logo" className="logos" /> {/* Insert the logo image */}
        </div>
        </Reveal>

      </div>
    </div>
  );
};

export default OverviewPageMobile;
