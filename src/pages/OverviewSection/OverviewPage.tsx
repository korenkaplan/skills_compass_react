// src/components/SideMenu.tsx
import React, { CSSProperties, useState } from 'react';


import './OverViewPage.css'
import '../../utils/variables.css'
import { backgroundColor, } from '../../utils/variables'
import {contrastColor} from '../../utils/theme'
import logo from '../../assets/logo/logo ellow ribbon with text.png'
import '../../CSS/RotatingImageClick.css'
import bell from '../../assets/icons/bell.png'
import Line from '../../components/Line/Line';
import translateIcon from '../../assets/iconsDark/translate.png'
import TypeQuestionAnimation from '../../components/TypeQuestionAnimation/TypeQuestionAnimation ';
import ScrollDownMouseAnimation from '../../components/ScrollDownMouseAnimation/ScrollDownMouseAnimation';
import Reveal from '../../components/FramerMotion/Reveal';
import ScaleOnTapButtonWrapper from '../../components/FramerMotion/ScaleOnTapButtonWrapper';
import { motion, AnimatePresence } from 'framer-motion';
const headerEnglish = "Overview"
const headerHeb = "סקירה כללית"
const bottomWordsEng = "Happy reading !"
const bottomWordsHeb = "קריאה מהנה !"
const bellLogoSize = 80
const developerSurveyText = () => (
  <>
    <div className="topDesktop">
      <Reveal >
        <div className="overviewInnerHeaderDesktop">
          <img src={bell} alt="" style={{ width: `${bellLogoSize}px`, height: `${bellLogoSize}px` }} />
          <h2 style={{ margin: '0 0 0 10px', fontSize: '25px' }}>Rings a Bell?</h2>
        </div>
      </Reveal>
      <Reveal >
        <p>Do you sometimes feel overwhelmed by the  countless technologies out there , and unsure which ones to learn 🤔 in order to stay relevant in the constantly changing job market?</p>

      </Reveal>
      <Reveal >
        <p><strong>You've Come To The Right Place! 🚀</strong></p>

      </Reveal>
      <Line height='2px' width='80%' color={contrastColor} />
      <Reveal>
        <p>Our mission is to guide you through the most in-demand technologies in Israel's hi-tech job market. 🌟</p>

      </Reveal>
      <Reveal>
        <p>We do the hard research work for you and provide real-time data to help you stay ahead. </p>

      </Reveal>
      <Reveal>
        <p><strong>What Makes Us Unique ? 🔍</strong></p>

      </Reveal>
      <Line height='2px' width='80%' color={contrastColor} />
      <Reveal>
        <p>All our data is extracted straight from analyzing <strong className='highlighted'>thousands </strong> of job listings from the most popular job search websites such as <strong>LinkedIn, Google-Jobs</strong> and from companies websites.
        </p>
      </Reveal>
    </div>
  </>
);
const developerSurveyTextHeb = () => (
  <>
    <div className="topDesktop">
      <Reveal >
        <div className="overviewInnerHeaderDesktop">
          <img src={bell} alt="" style={{ width: `${bellLogoSize}px`, height: `${bellLogoSize}px` }} />
          <h2 style={{ margin: '0 0 0 10px', fontSize: '25px' }}>מצלצל מוכר ?</h2>
        </div>
      </Reveal>
      <Reveal>
        <p className='hebrewText'>אם גם אתה  הולך לאיבוד לפעמים מהכמות האין סופית של טכנולוגיות  ולא יודע 🤔 מה כדאי  ללמוד כדי להיות הכי רלוונטי לשוק העבודה שממשיך להתקדם ולהשתנות ללא הפסקה ?</p>

      </Reveal>
      <Reveal >
        <p><strong>אז הגעת למקום הנכון!</strong> 🚀</p>

      </Reveal>
      <Line height='1px' width='70%' color={backgroundColor} />
      <Reveal >
        <p>המטרה שלנו היא לעזור ולהכווין אותך  לטכנולוגיות המבוקשות ביותר בשוק העבודה בהייטק הישראלי, ולעשות סדר בבלאגן.  🌟</p>

      </Reveal>
      <Reveal >
        <p>אנחנו עושים את כל עבודת המחקר בשבילך ומספקים לך את המידע העדכני ביותר על הטכנולוגיות הכי מבוקשות בשוק לפי סוג משרה. </p>

      </Reveal>
      <Reveal >
        <p><strong>מה מייחד אותנו משאר האתרים?</strong> 🔍</p>
      </Reveal>
      <Line height='1px' width='70%' color={backgroundColor} />
      <Reveal >
        <p>כל המידע שלנו מגיע היישר מניתוח של <strong> אלפי משרות</strong> מאתרי חיפוש העבודה הפופולרים ביותר כמו <strong dir='ltr' style={{ marginLeft: '5px' }}>LinkedIn, Google Jobs </strong> ומאתרי החברות .</p>
      </Reveal>
    </div>
  </>
);

const Overview: React.FC = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [mainText, setMainText] = useState(developerSurveyText);
  const [header, setHeader] = useState<string>(headerEnglish);
  const [bottomWords, setBottomWords] = useState<string>(bottomWordsEng);
  const [isRotated, setIsRotated] = useState(false);
  const questions = [
    `"Which cloud platform is more in use in the industry for DevOps roles: AWS or Azure?"`,
    `"Which programming language is most in demand in ${currentYear}?"`,
    `"Which database is more in use in ${currentYear} PostgreSQL or MySQL?"`,
    `"Which framework should I learn in ${currentYear} React or Angular?"`,
    `"Which database is more commonly used in the industry SQL or NoSql?"`,
    `"Is it worth learning PHP in ${currentYear}?"`,
    `"Java vs Python vs Node.Js for backend development in ${currentYear}?"`,
    `"Which stack is more popular MEAN or MERN in ${currentYear}?"`,
  ];
  const handleRotate = () => {
    setIsRotated(prevState => !prevState); // Toggle the rotation state
    setMainText(isRotated ? developerSurveyText : developerSurveyTextHeb); // Toggle between English and Hebrew texts
    setHeader(isRotated ? headerEnglish : headerHeb); // Toggle between English and Hebrew texts
    setBottomWords(isRotated ? bottomWordsEng : bottomWordsHeb); // Toggle between English and Hebrew texts

  };

  const getScrollDownAnimationStyle = (): CSSProperties => ({
    height: '150px',
    cursor: 'pointer',
  });
  const textVariants = {
    initial: { opacity: 0,  x: isRotated ? -200 : 200},
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRotated ? 200 : -200 }
  };
  return (
    <div style={{  padding: 50 }} className="section OverviewContainerDesktop heightAndBorder  " >
      <div className="textContainerDesktop " dir={isRotated ? 'rtl' : 'ltr'}>
        <Reveal>
          <motion.div
          className="containerHeaderDesktop"
          key={isRotated ? 'hebrew' : 'english'}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textVariants}
          transition={{ duration: 0.5 }}
          >
            <h2 className='headerOverviewPageDesktop'>{header}<strong className='highlighted'>.</strong></h2>
            <ScaleOnTapButtonWrapper>
              <div className='custom-button translateButtonDivDesktop'
                onClick={handleRotate}
              >
                <p className='translateButtonTitleDesktop'> {isRotated ? 'English' : 'עברית'}</p>
                <img className='translateIconDesktop' src={translateIcon} alt="" />
              </div>
            </ScaleOnTapButtonWrapper>
          </motion.div>
        </Reveal>
        <div className="containerTextDesktop" dir={isRotated ? 'rtl' : 'ltr'}>
          <Reveal >
            <div className='questionsDiv' dir='ltr'>
              <TypeQuestionAnimation fontSize={24} questions={questions} currentYear={currentYear} />
            </div>
          </Reveal>
          <AnimatePresence>
            <motion.div
              className='mainTextDesktop'
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
          <Reveal >
            <ScaleOnTapButtonWrapper>
              <div className='OverviewPressHereDesktop ' ><div className='custom-button pressHereButtonDesktopOverview'  onClick={() => document.getElementById('howItWorks')?.scrollIntoView({ behavior: 'smooth' })}>{isRotated ? 'להסבר המלא לחץ כאן' : 'Full Explanation'}</div></div>
            </ScaleOnTapButtonWrapper>
          </Reveal>

        </div>
        <Reveal >
          <div className="imageRowDesktop">
            <p>{bottomWords}</p>
            <ScaleOnTapButtonWrapper>
              <ScrollDownMouseAnimation CustomClassName='scrollDownAnimationMouseDesktop' scrollToSectionId='swiperPage' styleProps={getScrollDownAnimationStyle()} />
            </ScaleOnTapButtonWrapper>
            <img src={logo} alt="Logo" className="logoRightCorner" />
          </div>
        </Reveal>

      </div>
    </div >
  );
};

export default Overview;
