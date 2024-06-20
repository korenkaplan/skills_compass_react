// src/components/SideMenu.tsx
import React, { useState } from 'react';
import './AboutMePage.css';
import { backgroundColor } from '../../utils/variables';
import profilePic from '../../assets/images/profilePic.jpeg';
import _ from 'lodash';
import linkedin from '../../assets/icons/linkedin.png'
import github from '../../assets/icons/github.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import download from '../../assets/icons/download.png'
import Line from '../../components/Line/Line'
import {textColor} from '../../utils/variables'
import translation from '../../assets/icons/translationBright.png'


const AboutMe: React.FC = () => {

  const aboutMeHeader: string = 'about me';
  const aboutMeHeaderHebrew: string = 'קצת עלי...'
  const headerFormatted: string = _.upperCase(aboutMeHeader);

  const aboutMeParagraph = (
<div style={{ lineHeight: '30px', fontSize: '18px' }}>
  <p>Hey there!</p>
  <p>Welcome to my little corner of the internet! If you're here, it means you're curious about the person behind the screen, and I'm thrilled you stopped by!</p>
  <p>I'm Koren Kaplan, a 27-year-old software enthusiast who simply loves to code and learn new things. I recently graduated from Ruppin College as a Practical Software Engineer, where I achieved a GPA of 95.</p>
  <p>My journey in the tech world has led me to specialize in <strong>Python backend development.</strong> I find genuine joy in tackling everyday problems and discovering creative solutions. Currently, I'm on the lookout for my first job in the field, eager to roll up my sleeves and dive into exciting projects.</p>
  <p>"Skills Compass" isn't just a website; it's my passion project. I'm continuously working on improving it and adding new features. This project is not just about enhancing my skills; it's also about helping others find the skills they need for their desired roles.</p>
  <p>Feel free to explore the site, grab my resume from the bottom right corner, or connect with me on LinkedIn. I'd love to hear your suggestions for improvements and any ideas you have for the website. Let's connect and chat!</p>
</div>
  );
  const aboutMeParagraphHebrew = (
    <div style={{ lineHeight: '30px', fontSize: '18px' }}>
      <p>היי! 👋</p>
      <p>ברוכים הבאים לפינה הקטנה שלי באינטרנט! אם אתם כאן, זה אומר שאתם סקרים לגבי האדם מאחורי המסך, ואני שמח שהחלטתם לעצור ולקרוא! 😊</p>
      <p>אני קורן קפלן, מפתח תוכנה בן 27 שפשוט אוהב לתכנת וללמוד דברים חדשים. לאחרונה סיימתי בהצטיינות יתרה לימודי הנדסאי תוכנה במכללת רופין, אם ציון סופי 95. 🎓</p>
      <p>המסע שלי בעולם התכנות הוביל אותי להתמחות בפיתוח צד שרת ב-Python. אני מוצא עניין וסיפוק אמיתי בפתרון בעיות יומיומיות ובגילוי פתרונות יצירתיים. כרגע, אני בחיפוש אחר העבודה הראשונה שלי בתחום. 🚀</p>
      <p>פרויקט "Skills Compass" הוא לא רק אתר; זהו פרויקט האישי שלי. אני עובד באופן קבוע על שיפורו והוספת פיצ'רים חדשים. הפרויקט הזה הוא לא רק בשביל שיפור המיומנויות שלי; זה גם על עזרה לאחרים למצוא את הכישורים שהם זקוקים להם בשביל להיות רלוונטיים לשוק העבודה. 🔍</p>
      <p>אתם מוזמנים לעיין באתר, להוריד את קורות החיים שלי בלחיצה לינק מטה, או להתחבר איתי ב-LinkedIn. אשמח לשמוע הצעות לשיפורים וכל הרעיונות שיש לכם להציע לאתר או בכללי מה אתם חושבים עליו. 📝</p>
    </div>
  );


  const contactLinksHeader: string = 'CONTACT INFORMATION & CODE DOCUMENTATION ';
  const contactLinksHeaderHebrew: string = 'פרטי התקשרות & תיעוד הקוד';
  const contactLinksHeaderFormatted: string = contactLinksHeader

  const resumeDownloadLink: string = "https://drive.google.com/uc?export=download&id=1NUAHmmDQ355s1QrkjrsTBb1EVnCyuzSu"


  const [mainText, setMainText] = useState(aboutMeParagraphHebrew);
  const [header, setHeader] = useState<string>(aboutMeHeaderHebrew);
  const [bottomHeader, setBottomHeader] = useState<string>(contactLinksHeaderHebrew);
  const [isRotated, setIsRotated] = useState(true);


  const handleRotate = () => {
    setIsRotated(prevState => !prevState); // Toggle the rotation state
    setMainText(isRotated? aboutMeParagraph : aboutMeParagraphHebrew )
    setHeader(isRotated? headerFormatted : aboutMeHeaderHebrew)
    setBottomHeader(isRotated? contactLinksHeaderFormatted : contactLinksHeaderHebrew)
  }
  return (
        <div style={{ backgroundColor: backgroundColor }} className={"section"} dir={isRotated ? 'rtl' : 'ltr'}>
        <div className='aboutMeContainer'>
          <div className="top" >
          <div className="image">
          <img src={profilePic} className='profilePic' alt="Profile" style={{ float: isRotated ? 'left' : 'right', margin: '15px' }} />
            </div>
          <div className="text">
            <div className="headerAndTransalte" >
              <div className="headerAndLine" style={{marginRight: isRotated? '0px': '30px', marginLeft: isRotated? '30px': '0px'}}>
              <h1 className='header'>{header}</h1>
              <Line height="2px" width="80px" color={textColor} radius="4px" />
              </div>
              <div className={`image-container ${isRotated ? 'rotated' : ''}`} onClick={handleRotate}>
                <img src={translation} alt="Translation Logo" className="translationLogo" />
              </div>
            </div>

          <div style={{color:textColor}}>{mainText}</div>
          </div>
          </div>
          <div className="thirdRow" >
      <h1 className='header'>{bottomHeader}</h1>
      <Line height="2px" width="80px" color={textColor} radius="4px" />
        <div className="iconsAndLinksDiv">
        <div className="iconDiv">
        <a className='icon' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>{isRotated? 'פרופיל Linkedin':'Linkedin Profile'}</p>
          </a>
        </div>

        <div className="iconDiv">
        <a className='icon' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>{isRotated?'פלאפון: 053-340-6789': 'Phone: 053-340-6789'}</p>
          </a>
        </div>
        <div className="iconDiv">
        <a className='icon'  href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
              <img src={download} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
             <p className='iconText'>{isRotated? 'הורדת קו"ח': 'Download My CV'}</p>
          </a>
        </div>
        <div className="iconDiv">
        <a className='icon' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>{isRotated? 'ריפו צד שרת': 'Server Repository'}</p>
          </a>
        </div>
        <div className="iconDiv">
        <a className='icon' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>{isRotated? 'ריפו צד לקוח': 'Client Repository'}</p>
          </a>
        </div>
        </div>
      </div>
        </div>
    </div>
  );
}
export default AboutMe