// src/components/SideMenu.tsx
import React, { useEffect, useState } from 'react';
import './OverViewPage.css'
import { backgroundColor, } from '../../utils/variables'
import logo from '../../assets/logo/logo.png'
import '../../CSS/RotatingImageClick.css'
import { MdGTranslate } from "react-icons/md";
import bell from '../../assets/icons/bell.png'
import Line from '../../components/Line/Line';
import TypeQuestionAnimation from '../../components/TypeQuestionAnimation/TypeQuestionAnimation ';
const Overview: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const bellLogoSize = 80

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

  const developerSurveyText = () => (
    <>
      <div className="topDesktop">
        <div className="overviewInnerHeaderDesktop">
          <img src={bell} alt="" style={{ width: `${bellLogoSize}px`, height: `${bellLogoSize}px` }} />
          <h2 style={{ margin: '0 0 0 10px', fontSize: '25px' }}>Rings a Bell?</h2>
        </div>
        <p>Do you sometimes feel overwhelmed by the  countless technologies out there , and unsure which ones to learn 🤔 in order to stay relevant in the constantly changing job market?</p>
        <p><strong>You've Come To The Right Place!</strong> 🚀</p>
        <Line height='1px' width='80%' color={backgroundColor} />
        <p>Our mission is to guide you through the most in-demand technologies in Israel's hi-tech job market. 🌟</p>
        <p>We do the hard research work for you and provide real-time data to help you stay ahead. 📊</p>
        <Line height='1px' width='80%' color={backgroundColor} />
        <p></p>
      </div>
    </>
  );

  const developerSurveyTextHeb = () => (
    <>
      <div className="topDesktop">
        <div className="overviewInnerHeaderDesktop">
          <img src={bell} alt="" style={{ width: `${bellLogoSize}px`, height: `${bellLogoSize}px` }} />
          <h2 style={{ margin: '0 0 0 10px', fontSize: '25px' }}>מצלצל מוכר ?</h2>
        </div>
        <p className='hebrewText'>אם גם אתה  הולך לאיבוד לפעמים מהכמות האין סופית של טכנולוגיות  ולא יודע 🤔 מה כדאי  ללמוד כדי להיות הכי רלוונטי לשוק העבודה שממשיך להתקדם ולהשתנות ללא הפסקה ?</p>
        <p><strong>אז הגעת למקום הנכון!</strong> 🚀</p>
        <Line height='1px' width='70%' color={backgroundColor} />
        <p>המטרה שלנו היא לעזור ולהכווין אנשים בנוגע לטכנולוגיות המבוקשות ביותר בשוק העבודה בהייטק הישראלי, ולעשות סדר בבלאגן.  🌟</p>
        <p>אנחנו עושים את כל עבודת המחקר בשבילך ומספקים לך את המידע העדכני ביותר על הטכנולוגיות הכי מבוקשות בשוק לפי סוג משרה. 📊</p>
      </div>
    </>
  );
  const headerEnglish = "Overview"
  const headerHeb = "סקירה כללית"
  const bottomWordsEng = "Happy reading !"
  const bottomWordsHeb = "קריאה מהנה !"

  const [mainText, setMainText] = useState(developerSurveyTextHeb);
  const [header, setHeader] = useState<string>(headerHeb);
  const [bottomWords, setBottomWords] = useState<string>(bottomWordsHeb);
  const [isRotated, setIsRotated] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleRotate = () => {
    setIsRotated(prevState => !prevState); // Toggle the rotation state
    setMainText(isRotated ? developerSurveyText : developerSurveyTextHeb); // Toggle between English and Hebrew texts
    setHeader(isRotated ? headerEnglish : headerHeb); // Toggle between English and Hebrew texts
    setBottomWords(isRotated ? bottomWordsEng : bottomWordsHeb); // Toggle between English and Hebrew texts

  };



  useEffect(() => {
    const currentYear: number = new Date().getFullYear();
    setCurrentYear(currentYear)
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % questions.length);

    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ backgroundColor: backgroundColor, padding: 50 }} className="section OverviewContainerDesktop heightAndBorder  " >
      <div className="textContainerDesktop " dir={isRotated ? 'rtl' : 'ltr'}>
        <div className="containerHeaderDesktop">
          <h2 className='headerOverviewPageDesktop'>{header}</h2>
          <div className={`image-container ${isRotated ? 'rotated' : ''}`} onClick={handleRotate}>
            <MdGTranslate size={40} style={{ color: '#253439', cursor: 'pointer' }} />
          </div>

        </div>
        <div className="containerTextDesktop" dir={isRotated ? 'rtl' : 'ltr'}>
          <div className='questionsDiv' dir='ltr'>
          <TypeQuestionAnimation fontSize={24} questions={questions} currentYear={currentYear} />
          </div>
          <p className='mainTextDesktop'>{mainText}</p>
        </div>
        <div className="imageRowDesktop">
          <p>{bottomWords}</p>
          <img src={logo} alt="Logo" className="logos" /> {/* Insert the logo image */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
