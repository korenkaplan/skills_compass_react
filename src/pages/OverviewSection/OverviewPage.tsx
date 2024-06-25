// src/components/SideMenu.tsx
import React, {useState} from 'react';
import './OverViewPage.css'
import {backgroundColor} from '../../utils/variables'
import logo from '../../assets/logo/logo.png'
import translation from '../../assets/icons/translation.png'
import '../../CSS/RotatingImageClick.css'
import { MdGTranslate } from "react-icons/md";
const Overview: React.FC = () => {
  const developerSurveyText = () => (
    <>
      <p><strong>💡 The Main Idea:</strong></p>
      <p>🌟 Welcome to Skills Compass! Our mission is to guide you on the most in-demand technologies in Israel's tech job market. We help you stay relevant by providing the latest information on the skills you need for different tech roles.</p>

      <p><strong>🌍 What Makes Us Unique:</strong></p>
      <p>🔍 Every day, our system scans the latest job postings online, ensuring that our data is the freshest and most accurate, especially for jobs in Israel. This way, you get real-time insights into what employers are looking for.</p>

      <p><strong>🔮 What's Coming Next:</strong></p>
      <p>🚀 Exciting things are on the horizon! We're planning to add more job roles, highlight emerging and declining tech trends, and provide even more data to help you navigate the job market with confidence.</p>

      <p><strong>🔧 How It Works:</strong></p>
      <p>📊 Our site is organized by different tech roles. For each role, we show the most common technologies mentioned in job postings, grouped into categories. You'll see how many job postings mention each technology and you can toggle between percentage and count views, giving you a clear picture of what skills are in demand.</p>
      <p>🔧 Additionally, for each role, you can choose to view selected categories at once and limit the list length and the items per category. This helps you to focus on the most relevant information according to your preferences.</p>

      <p><strong>🎨 Customization:</strong></p>
      <p>Additionally, for each role, you can now choose to view selected categories all at once and customize the list length and items per category. </p>
      <p>This feature allows you to focus more effectively on the most relevant information based on your preferences.</p>
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
  <p>📊 האתר מחולק לתפקידים שונים. לכל תפקיד מוצגות הטכנולוגיות השכיחות ביותר המופיעות במשרות עבור אותו תפקיד, והן מסודרות לפי קטגוריות. ליד כל טכנולוגיה יש אוצפיה לצפות או בתצוגת אחוז המשרות בהן הופיעה הכטנולוגיה או את כמות המשרות בהן הופיעה.</p>

  <p><strong>🛠️ התאמה אישית:</strong></p>
  <p>בנוסף, עבור כל תפקיד, עכשיו תוכלו לבחור להציג קטגוריות נבחרות בבת אחת ולהתאים את אורך הרשימה ואת מספר הפריטים בכל קטגוריה.</p>
  <p>תכונה זו מאפשרת לכם להתמקד במידע הרלוונטי ביותר לפי ההעדפות שלכם.</p>
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
      <div className="textContainerDesktop" dir={isRotated ? 'rtl' : 'ltr'}>
      <div className="containerHeaderDesktop">
        <h2 className='headerOverviewPageDesktop'>{header}</h2>

        <div className={`image-container ${isRotated ? 'rotated' : ''}`} onClick={handleRotate}>
      <MdGTranslate size={40} style={{color:'#253439', cursor:'pointer'}} />

    </div>

      </div>
      <div className="containerTextDesktop" dir={isRotated ? 'rtl' : 'ltr'}>

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
