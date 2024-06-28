import React, {useEffect, useState } from 'react';
import './OverviewPageMobile.css';
import { backgroundColor } from '../../utils/variables';
import logo from '../../assets/logo/logo.png';
import '../../CSS/RotatingImageClick.css';
import { MdGTranslate } from "react-icons/md";
import Collapse from '@mui/material/Collapse';
import Line from '../../components/Line/Line';
const OverviewPageMobile: React.FC = () => {
  const lineProps = {
    color:'#253439',
    height:'2px',
    width:'40%',
    radius:'10px',
    margin:'auto',
  }
  const developerSurveyTextPartOne = (
    <div style={{color:backgroundColor}}>
      <p>💡 The Main Idea:</p>
      <p>🌟 Welcome to Skills Compass! Our mission is to guide you on the most in-demand technologies in Israel's tech job market. We help you stay relevant by providing the latest information on the skills you need for different tech roles.</p>
      <Line {...lineProps}  />
      <p>🌍 What Makes Us Unique:</p>
      <p>🔍 Every day, our system scans the latest job postings online, ensuring that our data is the freshest and most accurate, especially for jobs in Israel. This way, you get real-time insights into what employers are looking for.</p>
      <Line {...lineProps}/>
      <p>🔮 What's Coming Next:</p>
    </div>
  );

  const developerSurveyTextPartTwo = (
    <div style={{color:backgroundColor}}>
      <p>🚀 Exciting things are on the horizon! We're planning to add more job roles, highlight emerging and declining tech trends, and provide even more data to help you navigate the job market with confidence.</p>
      <Line {...lineProps}/>
      <p>🔧 How It Works:</p>
      <p>📊 Our site is organized by different tech roles. For each role, we show the most common technologies mentioned in job postings, grouped into categories. You'll see how many job postings mention each technology and you can toggle between percentage and count views, giving you a clear picture of what skills are in demand.</p>
      <p>🔧 Additionally, for each role, you can choose to view selected categories at once and limit the list length and the items per category. This helps you to focus on the most relevant information according to your preferences.</p>
      <Line {...lineProps}/>
      <p>🎨 Customization:</p>
      <p>Additionally, for each role, you can now choose to view selected categories all at once and customize the list length and items per category. This feature allows you to focus more effectively on the most relevant information based on your preferences.</p>
    </div>
  );

  const developerSurveyTextHebPartOne = (
    <div style={{color:backgroundColor}}>
      <p>💡 הרעיון המרכזי:</p>
      <p>🌟 ב-Skills Compass, המטרה שלנו היא לעזור ולהכווין אנשים בנוגע לטכנולוגיות המבוקשות ביותר בשוק העבודה בהייטק הישראלי, ולעזור להם להישאר רלוונטיים לתחום. אנחנו מספקים מידע עדכני על הטכנולוגיות הכי מבוקשות לפי סוג משרה.</p>
      <p>⏱️ תובנות בזמן אמת:</p>
      <p>🔍 המערכת שלנו אוספת מידע באופן יומיומי על ידי סריקת משרות המתפרסמות באינטרנט, מה שמבטיח שהנתונים שלנו הם המעודכנים והמדויקים ביותר, ובמיוחד עבור משרות המתפרסמות בישראל.</p>
      <p>🔮 מה צפוי בעתיד?</p>
    </div>
  );

  const developerSurveyTextHebPartTwo = (
    <div style={{color:backgroundColor}}>
      <p>🚀 בעתיד, אנו מתכננים להוסיף סוגי תפקידים נוספים, להציג מגמות עלייה וירידה של טכנולוגיות ולהציע נתונים נוספים שיעזרו לכם לנווט בשוק העבודה.</p>
      <p>🔍 איך זה עובד?</p>
      <p>📊 האתר מחולק לתפקידים שונים. לכל תפקיד מוצגות הטכנולוגיות השכיחות ביותר המופיעות במשרות עבור אותו תפקיד, והן מסודרות לפי קטגוריות. ליד כל טכנולוגיה יש אוצפיה לצפות או בתצוגת אחוז המשרות בהן הופיעה הכטנולוגיה או את כמות המשרות בהן הופיעה.</p>
      <p>🛠️ התאמה אישית:</p>
      <p>בנוסף, עבור כל תפקיד, עכשיו תוכלו לבחור להציג קטגוריות נבחרות בבת אחת ולהתאים את אורך הרשימה ואת מספר הפריטים בכל קטגוריה. תכונה זו מאפשרת לכם להתמקד במידע הרלוונטי ביותר לפי ההעדפות שלכם.</p>
    </div>
  );
  const headerEnglish = "Overview";
  const headerHeb = "סקירה כללית";
  const bottomWordsEng = "Happy reading!";
  const bottomWordsHeb = "קריאה מהנה!";

  const showMoreHeb = 'הצג עוד'
  const showLessHeb = 'הצג פחות'
  const showMoreEng = 'Show More'
  const showLessEng = ' Show less'

  const [header, setHeader] = useState<string>(headerEnglish);
  const [buttonWords, setButtonWords] = useState<string>('');
  const [bottomWords, setBottomWords] = useState<string>(bottomWordsEng);
  const [isRotated, setIsRotated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleRotate = () => {
    setIsRotated(prevState => !prevState); // Toggle the rotation state
    setHeader(isRotated ? headerEnglish : headerHeb); // Toggle between English and Hebrew texts
    setBottomWords(isRotated ? bottomWordsEng : bottomWordsHeb); // Toggle between English and Hebrew texts
  };

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {

    if(isRotated)
      setButtonWords(isOpen ? showLessHeb : showMoreHeb)
    else
      setButtonWords(isOpen ? showLessEng : showMoreEng)

  }, [isOpen])

  useEffect(() => {
    if(isOpen)
      setButtonWords(isRotated ? showLessHeb : showLessEng)
    else
      setButtonWords(isRotated ? showMoreHeb : showMoreEng)

  }, [isRotated])

  return (
    <div style={{ backgroundColor: backgroundColor }} className="section container heightAndBorder">
      <div className="textContainer" dir={isRotated ? 'rtl' : 'ltr'}>
        <div className="containerHeader">
          <h2 className='headerOverviewPage'>{header}</h2>

          <div className={`image-container ${isRotated ? 'rotated' : ''}`} onClick={handleRotate}>
            <MdGTranslate size={40} style={{ color: '#253439' }} />
          </div>
        </div>
        <div className="containerText" dir={isRotated ? 'rtl' : 'ltr'}>
          <div>
            {isRotated ? developerSurveyTextHebPartOne : developerSurveyTextPartOne}
              <Collapse in={isOpen}>
              {isRotated ? developerSurveyTextHebPartTwo : developerSurveyTextPartTwo}
              </Collapse>
            <button style={{backgroundColor:backgroundColor, color:'antiquewhite'}} onClick={toggleCollapse}>{buttonWords}</button>
          </div>
        </div>
        <div className="imageRow">
          <p style={{color:backgroundColor}}>{bottomWords}</p>
          <img src={logo} alt="Logo" className="logos" /> {/* Insert the logo image */}
        </div>
      </div>
    </div>
  );
};

export default OverviewPageMobile;
