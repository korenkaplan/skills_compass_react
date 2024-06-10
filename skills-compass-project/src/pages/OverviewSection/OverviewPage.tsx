// src/components/SideMenu.tsx
import React, {useState} from 'react';
import './OverViewPage.css'
import '../../CSS/PageStyle.css'
import {backgroundColor} from '../../utils/variables'
import logo from '../../assets/logo/logo.png'
import translation from '../../assets/icons/translation.png'
import '../../CSS/RotatingImageClick.css'
const Overview: React.FC = () => {
const developerSurveyText2=(
  <>
    <p><strong>The Main Idea</strong></p>
    <p>At Skills Compass, we're all about helping you thrive in the tech world. Our main idea? Providing you with the most up-to-date insights on the skills you need for your dream tech job.</p>

    <p><strong>Real-Time Insights</strong></p>
    <p>Picture this: every single day, we're out there scraping the latest job listings from across the web. Why? So we can give you real-time insights that are as fresh as they come. When we say real-time, we mean it. Our data isn't just accurate, it's the most updated and reliable you'll find anywhere.</p>

    <p><strong>What's Coming Next</strong></p>
    <p>But wait, there's more! We're not stopping here. In the future, we're gearing up to cover even more roles, delve into the hottest tech trends, and bring you even deeper insights into the tech landscape. Stay tuned for exciting updates as we continue to grow and evolve with you.</p>
  </>
);
const developerSurveyText = () => (
  <>
    <p><strong>💡 The Main Idea:</strong></p>
    <p>🌟 Welcome to Skills Compass! Our mission is to guide you on the most in-demand technologies in Israel's tech job market. We help you stay relevant by providing the latest information on the skills you need for different tech roles.</p>

    <p><strong>🌍 What Makes Us Unique:</strong></p>
    <p>🔍 Every day, our system scans the latest job postings online, ensuring that our data is the freshest and most accurate, especially for jobs in Israel. This way, you get real-time insights into what employers are looking for.</p>

    <p><strong>🔮 What's Coming Next:</strong></p>
    <p>🚀 Exciting things are on the horizon! We're planning to add more job roles, highlight emerging and declining tech trends, and provide even more data to help you navigate the job market with confidence.</p>

    <p><strong>🔧 How It Works:</strong></p>
    <p>📊 Our site is organized by different tech roles. For each role, we show the most common technologies mentioned in job postings, grouped into categories. You'll see how many job postings mention each technology, giving you a clear picture of what skills are in demand.</p>
  </>
);

const developerSurveyTextHeb = (
  <>
    <p><strong>💡 הרעיון המרכזי</strong></p>
    <p>🌟 ב-Skills Compass, המטרה שלנו היא לעזור ולהכווין אנשים בנוגע לטכנולוגיות המבוקשות ביותר בשוק העבודה בהייטק הישראלי, ולעזור להם להישאר רלוונטיים לתחום. אנחנו מספקים מידע עדכני על הטכנולוגיות הכי מבוקשות לפי סוג משרה.</p>

    <p><strong>⏱️ תובנות בזמן אמת</strong></p>
    <p>🔍 המערכת שלנו אוספת מידע באופן יומיומי על ידי סריקת משרות המתפרסמות באינטרנט, מה שמבטיח שהנתונים שלנו הם המעודכנים והמדויקים ביותר, ובמיוחד עבור משרות המתפרסמות בישראל.</p>

    <p><strong>🔮 מה צפוי בעתיד?</strong></p>
    <p>🚀 בעתיד, אנו מתכננים להוסיף סוגי תפקידים נוספים, להציג מגמות עלייה וירידה של טכנולוגיות ולהציע נתונים נוספים שיעזרו לכם לנווט בשוק העבודה.</p>

    <p><strong>🔍 איך זה עובד?</strong></p>
    <p>📊 האתר מחולק לתפקידים שונים. לכל תפקיד מוצגות הטכנולוגיות השכיחות ביותר המופיעות במשרות עבור אותו תפקיד, והן מסודרות לפי קטגוריות. ליד כל טכנולוגיה מופיע מספר המשרות שבהן היא הופיעה.</p>
  </>
);


const headerEnglish = "Overview"
const headerHeb = "סקירה כללית"
const bottomWordsEng = "Happy reading !"
const bottomWordsHeb = "קריאה מהנה !"

const [mainText, setMainText] = useState(developerSurveyText);
const [header, setHeader] = useState<string>(headerEnglish);
const [bottomWords, setBottomWords] = useState<string>(bottomWordsEng);
const [isRotated, setIsRotated] = useState(false);

  const handleRotate = () => {
    setIsRotated(prevState => !prevState); // Toggle the rotation state
    setMainText(isRotated ? developerSurveyText : developerSurveyTextHeb); // Toggle between English and Hebrew texts
    setHeader(isRotated ? headerEnglish : headerHeb); // Toggle between English and Hebrew texts
    setBottomWords(isRotated ? bottomWordsEng : bottomWordsHeb); // Toggle between English and Hebrew texts

  };



  return (
    <div style={{backgroundColor:backgroundColor}} className="section container" >
      <div className="textContainer" dir={isRotated ? 'rtl' : 'ltr'}>
      <div className="containerHeader">
        <h2 className='headerOverviewPage'>{header}</h2>

        <div className={`image-container ${isRotated ? 'rotated' : ''}`} onClick={handleRotate}>
      <img src={translation} alt="Translation Logo" className="translationLogo" />
    </div>

      </div>
      <div className="containerText" dir={isRotated ? 'rtl' : 'ltr'}>

          <p className='mainText'>{mainText}</p>
        </div>
      <div className="imageRow">
        <p>{bottomWords}</p>
      <img src={logo} alt="Logo" className="logos" /> {/* Insert the logo image */}
      </div>
    </div>

    </div>
  );
};

export default Overview;
