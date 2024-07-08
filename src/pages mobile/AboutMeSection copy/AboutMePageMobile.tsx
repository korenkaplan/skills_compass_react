// src/components/SideMenu.tsx
import React, { useEffect, useState } from 'react';
import './AboutMePageMobile.css';
import { backgroundColor, resumeDownloadLink } from '../../utils/variables';
import profilePic from '../../assets/images/profilePic.jpeg';
import _ from 'lodash';
import linkedin from '../../assets/icons/linkedin.png'
import github from '../../assets/icons/github.png'
import whatsapp from '../../assets/icons/whatsapp.png'
import download from '../../assets/icons/download.png'
import Line from '../../components/Line/Line'
import {textColor} from '../../utils/variables'
import { MdGTranslate } from "react-icons/md";
import Collapse from '@mui/material/Collapse';
const AboutMePageMobile: React.FC = () => {


  const aboutMeParagraphPartOne = (
    <div style={{ lineHeight: '30px', fontSize: '18px' }}>
      <p>Hey there!</p>
      <p>Welcome to my little corner of the internet! If you're here, it means you're curious about the person behind the screen, and I'm thrilled you stopped by!</p>
      <p>I'm Koren Kaplan, a 27-year-old software enthusiast who simply loves to code and learn new things. I recently graduated with great honor from Ruppin College as a Practical Software Engineer, where I achieved a GPA of 95.</p>
      <p>My journey in the tech world has led me to specialize in <strong>Python backend development.</strong> I find genuine joy in tackling everyday problems and discovering creative solutions. Currently, I'm on the lookout for my first job in the field, eager to roll up my sleeves and dive into exciting projects.</p>
    </div>
      );
  const aboutMeParagraphPartTwo = (
        <div style={{ lineHeight: '30px', fontSize: '18px' }}>
          <p>"Skills Compass" isn't just a website; it's my passion project. I'm continuously working on improving it and adding new features. This project is not just about enhancing my skills; it's also about helping others find the skills they need for their desired roles.</p>
          <p>Feel free to explore the site, grab my resume from the bottom right corner, or connect with me on LinkedIn. I'd love to hear your suggestions for improvements and any ideas you have for the website. Let's connect and chat!</p>
        </div>
          );
  const aboutMeParagraphHebrewPartOne = (
        <div style={{ lineHeight: '30px', fontSize: '18px' }}>
          <p>היי! 👋</p>
          <p>ברוכים הבאים לפינה הקטנה שלי באינטרנט! אם אתם כאן, זה אומר שאתם סקרים לגבי האדם מאחורי המסך, ואני שמח שהחלטתם לעצור ולקרוא! 😊</p>
          <p>אני קורן קפלן, לאחרונה סיימתי בהצטיינות יתרה לימודי הנדסאי תוכנה במכללת רופין. 🎓</p>
          <p>המסע שלי בעולם התכנות הוביל אותי להתמחות בפיתוח צד שרת ב-Python. אני מוצא עניין וסיפוק אמיתי בפתרון בעיות יומיומיות ובגילוי פתרונות יצירתיים. כרגע, אני בחיפוש אחר העבודה הראשונה שלי בתחום. 🚀</p>
        </div>
      );

  const aboutMeParagraphHebrewPartTwo = (
        <div style={{ lineHeight: '30px', fontSize: '18px' }}>
          <p>פרויקט "Skills Compass" הוא לא רק אתר; זהו פרויקט האישי שלי. אני עובד באופן קבוע על שיפורו והוספת פיצ'רים חדשים. הפרויקט הזה הוא לא רק בשביל שיפור המיומנויות שלי; זה גם על עזרה לאחרים למצוא את הכישורים שהם זקוקים להם בשביל להיות רלוונטיים לשוק העבודה. 🔍</p>
          <p>אתם מוזמנים לעיין באתר, להוריד את קורות החיים שלי בלחיצה לינק מטה, או ליצור איתי קשר ב-LinkedIn. אשמח לשמוע הצעות לשיפורים וכל הרעיונות שיש לכם להציע לאתר או בכללי מה אתם חושבים עליו. 📝</p>
        </div>
      );
  const contactLinksHeader: string = 'CONTACT INFORMATION';
  const contactLinksHeaderHebrew: string = 'פרטי התקשרות & תיעוד הקוד';



  const [isRotated, setIsRotated] = useState(false);
  const [buttonWords, setButtonWords] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const showMoreHeb = 'הצג עוד'
  const showLessHeb = 'הצג פחות'
  const showMoreEng = 'Show More'
  const showLessEng = ' Show less'
  const headerEng = 'ABOUT ME'
  const headerHeb = 'קצת עלי...'
  const handleRotate = () => {
    setIsRotated(prevState => !prevState); // Toggle the rotation state
  }
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
        <div style={{ backgroundColor: backgroundColor }} className={"section aboutMeContainerMobile"} dir={isRotated ? 'rtl' : 'ltr'}>
          <div className="imageDivMobile">
            <img src={profilePic} className='profilePic' alt="Profile" />
          </div>
          <div className="headerDivAboutMeMobile" >
            <div style={{display:'flex', flexDirection:'column'}}>
            <h1 className='headrAboutMeMobile'>{isRotated? headerHeb : headerEng}</h1>
            <Line height="2px" width="80px" color={textColor} radius="4px" />
            </div>
            <div className={`image-container ${isRotated ? 'rotated' : ''}`} onClick={handleRotate}>
                <MdGTranslate size={40} style={{color:'antiquewhite', cursor:'pointer'}} />
            </div>
          </div>
          <div className="mainTextDivAboutMeMobile">
              {isRotated ? aboutMeParagraphHebrewPartOne : aboutMeParagraphPartOne}
              <Collapse in={isOpen}>
              {isRotated ? aboutMeParagraphHebrewPartTwo : aboutMeParagraphPartTwo}
              </Collapse>

          <button style={{backgroundColor:'antiquewhite', color:backgroundColor}} onClick={toggleCollapse}>{buttonWords}</button>

          </div>
          <div className="communicationAboutMeDivMobile">
          <div style={{display:'flex', flexDirection:'column'}}>
            <h1 className='headrAboutMeMobile'>{isRotated? contactLinksHeaderHebrew : contactLinksHeader}</h1>
            <Line height="2px" width="80px" color={textColor} radius="4px" />
            </div>

            <div className="RowBottomAboutMe">
              <div className="iconDivMobile">
                  <a className='icon' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedin} alt="My Image" className="clickableImage" />
                  </a>
                  <a className='aTag' href="https://www.linkedin.com/in/koren-kaplan/" target="_blank" rel="noopener noreferrer">
                    <p className='iconText'>{isRotated? 'פרופיל Linkedin':'Linkedin Profile'}</p>
                  </a>
              </div>
              <div className="iconDivMobile">
                    <a className='icon'  href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
                    <img src={download} alt="My Image" className="clickableImage" />
                </a>
                <a className='aTag' href={resumeDownloadLink} download="Koren_Kaplan_Resume.pdf">
                  <p className='iconText'>{isRotated? 'הורדת קו"ח': 'Download My CV'}</p>
                </a>
              </div>
            </div>
            <div className="RowBottomAboutMe">
              <div className="iconDivMobile">
              <a className='icon' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/Dev-Skill-Compass-Server/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>{isRotated? 'ריפו צד שרת': 'Server Repository'}</p>
          </a>
              </div>
              <div className="iconDivMobile">
              <a className='icon' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
              <img  src={github} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://github.com/korenkaplan/skills_compass_react/" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>{isRotated? 'ריפו צד לקוח': 'Client Repository'}</p>
          </a>
              </div>
            </div>
            <div className="whatsappDiv">
              <div className="iconDivMobile">
              <a className='icon' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
              <img src={whatsapp} alt="My Image" className="clickableImage" />
          </a>
          <a className='aTag' href="https://wa.me/972533406789" target="_blank" rel="noopener noreferrer">
             <p className='iconText'>{isRotated?'וואטסאפ': 'WhatsApp'}</p>
          </a>
              </div>

            </div>
          </div>
        </div>
  );
}
export default AboutMePageMobile