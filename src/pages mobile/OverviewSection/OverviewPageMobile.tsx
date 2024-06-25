// src/components/SideMenu.tsx
import React, {useState} from 'react';
import './OverviewPageMobile.css'
import {backgroundColor} from '../../utils/variables'
import logo from '../../assets/logo/logo.png'
import '../../CSS/RotatingImageClick.css'
import ClampLines from 'react-clamp-lines';
import { MdGTranslate } from "react-icons/md";
const OverviewPageMobile: React.FC = () => {
  const developerSurveyText = `
  💡 The Main Idea:
  🌟 Welcome to Skills Compass! Our mission is to guide you on the most in-demand technologies in Israel's tech job market. We help you stay relevant by providing the latest information on the skills you need for different tech roles.

  🌍 What Makes Us Unique:
  🔍 Every day, our system scans the latest job postings online, ensuring that our data is the freshest and most accurate, especially for jobs in Israel. This way, you get real-time insights into what employers are looking for.

  🔮 What's Coming Next:
  🚀 Exciting things are on the horizon! We're planning to add more job roles, highlight emerging and declining tech trends, and provide even more data to help you navigate the job market with confidence.

  🔧 How It Works:
  📊 Our site is organized by different tech roles. For each role, we show the most common technologies mentioned in job postings, grouped into categories. You'll see how many job postings mention each technology and you can toggle between percentage and count views, giving you a clear picture of what skills are in demand.
  🔧 Additionally, for each role, you can choose to view selected categories at once and limit the list length and the items per category. This helps you to focus on the most relevant information according to your preferences.

  🎨 Customization:
  Additionally, for each role, you can now choose to view selected categories all at once and customize the list length and items per category.
  This feature allows you to focus more effectively on the most relevant information based on your preferences.
`;

const developerSurveyTextHeb = `
  💡 הרעיון המרכזי:
  🌟 ב-Skills Compass, המטרה שלנו היא לעזור ולהכווין אנשים בנוגע לטכנולוגיות המבוקשות ביותר בשוק העבודה בהייטק הישראלי, ולעזור להם להישאר רלוונטיים לתחום. אנחנו מספקים מידע עדכני על הטכנולוגיות הכי מבוקשות לפי סוג משרה.

  ⏱️ תובנות בזמן אמת:
  🔍 המערכת שלנו אוספת מידע באופן יומיומי על ידי סריקת משרות המתפרסמות באינטרנט, מה שמבטיח שהנתונים שלנו הם המעודכנים והמדויקים ביותר, ובמיוחד עבור משרות המתפרסמות בישראל.

  🔮 מה צפוי בעתיד?
  🚀 בעתיד, אנו מתכננים להוסיף סוגי תפקידים נוספים, להציג מגמות עלייה וירידה של טכנולוגיות ולהציע נתונים נוספים שיעזרו לכם לנווט בשוק העבודה.

  🔍 איך זה עובד?
  📊 האתר מחולק לתפקידים שונים. לכל תפקיד מוצגות הטכנולוגיות השכיחות ביותר המופיעות במשרות עבור אותו תפקיד, והן מסודרות לפי קטגוריות. ליד כל טכנולוגיה יש אוצפיה לצפות או בתצוגת אחוז המשרות בהן הופיעה הכטנולוגיה או את כמות המשרות בהן הופיעה.

  🛠️ התאמה אישית:
  בנוסף, עבור כל תפקיד, עכשיו תוכלו לבחור להציג קטגוריות נבחרות בבת אחת ולהתאים את אורך הרשימה ואת מספר הפריטים בכל קטגוריה.
  תכונה זו מאפשרת לכם להתמקד במידע הרלוונטי ביותר לפי ההעדפות שלכם.
`;

console.log(developerSurveyText);
console.log(developerSurveyTextHeb);

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
            <MdGTranslate size={40} style={{color:'#253439'}} />
        </div>

      </div>
      <div className="containerText" dir={isRotated ? 'rtl' : 'ltr'}>
      <ClampLines
          id='123'
          text={mainText}
          lines={3}
          ellipsis="..."
          moreText= {isRotated? "הצג עוד": " Show More"}
          lessText={isRotated? "הצג פחות": " Show Less"}
          innerElement="pre"
        />
        </div>
      <div className="imageRow">
        <p>{bottomWords}</p>
      <img src={logo} alt="Logo" className="logos" /> {/* Insert the logo image */}
      </div>
    </div>

    </div>
  );
};

export default OverviewPageMobile;
