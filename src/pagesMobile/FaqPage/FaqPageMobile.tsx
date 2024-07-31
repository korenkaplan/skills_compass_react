// src/components/SideMenu.tsx
import React, { useState } from 'react';
import './FaqPageMobile.css'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { AiFillCaretDown } from "react-icons/ai";
import { FaQuestionCircle } from "react-icons/fa";
import { BsCollection } from "react-icons/bs";
import { FaqAccordion } from '@utils/interfaces'
import { FaGithub } from "react-icons/fa";
import { MdSupportAgent, MdAlternateEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import Reveal from '@components/FramerMotion/Reveal';
import Slide from '@components/FramerMotion/Slide';
import ItemByItemReveal from '@components/FramerMotion/ItemByItemReveal';
import {secondaryBackgroundColor,primaryBackgroundColor, buttonsBackgroundColor, textColor,buttonTextColor, contrastColor} from '@utils/theme.ts'
import HeaderWithDot from '@components/HeaderWithDot/HeaderWithDot.tsx';

interface FaqPageProps {

}

const FaqPageMobile: React.FC<FaqPageProps> = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  let globalIndex = 13;
  const uniqueIndex = 100
  const generalSectionQuestionsList: FaqAccordion[] = [
    {
      question: 'What is Skills Compass?',
      answer: (
        <p>
          <strong>Skills-Compass</strong> provides insights into the most in-demand technologies in Israel's tech industry.
        </p>
      ),
    },
    {
      question: 'How does it work?',
      answer: (
        <>
          <p><strong>Our process is made up of 3 basic steps:</strong></p>
          <p>
            1. <strong>Data Collection:</strong> We gather job postings from various websites daily to build a comprehensive database.
          </p>
          <p>
            2. <strong>Keyword Analysis:</strong> We analyze job descriptions to extract key technology-related keywords.
          </p>
          <p>
            3. <strong>Organizing and Categorizing:</strong> Keywords are categorized to provide insights into their demand and prevalence.
          </p>
          <p>This process ensures our data remains up-to-date.</p>
        </>
      ),
    },
    {
      question: 'Who can benefit from using Skills-Compass?',
      answer: (
        <p>
          <strong>Skills-Compass</strong> is valuable for job seekers, career changers, recruiters, and tech enthusiasts wanting to stay informed about tech trends in Israel's high-tech industry.
        </p>
      ),
    },
  ];

  const dataCollectionSectionQuestionsList: FaqAccordion[] = [
    {
      question: 'Where do you get your data from?',
      answer: (
        <p>
          We collect data from various job searching websites including <strong>LinkedIn</strong>, <strong>Google Jobs</strong>, and <strong>company websites</strong>.
        </p>
      ),
    },
    {
      question: 'How often do you update your data?',
      answer: (
        <p>
          Our data is <strong>updated daily</strong>. You can check the last update timestamp at the bottom of the menu. We only present data from the past 6 months to ensure relevance.
        </p>
      ),
    },
  ];

  const innerDataCollectionSectionQuestionsList: FaqAccordion[] = [
    {
      question: 'How do you filter out non-relevant listings?',
      answer: (
        <p>
          We filter out non-relevant listings by analyzing job titles to ensure they accurately reflect the desired role.
        </p>
      ),
    },
    {
      question: 'How do you prevent listing repeats?',
      answer: (
        <p>
          We track listings across job searching sites and ensure each listing is collected only once from each site.
        </p>
      ),
    },
    {
      question: 'How do you identify and categorize technology-related keywords?',
      answer: (
        <p>
          We use a predefined dataset of tech keywords and their synonyms, categorized into specific categories. Through text analysis, we extract relevant keywords from job postings.
        </p>
      ),
    },
  ];

  const technicalSupportSectionQuestionsList: FaqAccordion[] = [
    {
      question: 'What should I do if I encounter a problem on the site?',
      answer: (
        <>
          <p>
            If you encounter any issues or bugs, please contact us through one of the following options:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <MdAlternateEmail size={20} style={{ margin: '0 5px 0 0' }} />
              <a href="mailto:skillscompassil@gmail.com" target="_blank">SkillsCompassIL@gmail.com</a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaLinkedin size={20} style={{ margin: '0 5px 0 0' }} />
              <a href="#" onClick={() => window.open('https://www.linkedin.com/in/koren-kaplan/', '_blank')}>Message on LinkedIn</a>
            </div>
          </div>
        </>
      ),
    },
    {
      question: 'How can I provide feedback or suggest new features?',
      answer: (
        <p>
          You can send your feedback and feature ideas directly to me through LinkedIn. I appreciate both positive and constructive feedback!
        </p>
      ),
    },
    {
      question: 'How can I stay updated with new features and updates from Skills-Compass?',
      answer: (
        <>
          <p>
            Stay informed about new features and updates by following me on LinkedIn, where I share updates and code samples.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FaLinkedin size={20} style={{ margin: '0 5px 0 0' }} />
              <a href="#" onClick={() => window.open('https://www.linkedin.com/in/koren-kaplan/', '_blank')}>Message on LinkedIn</a>
            </div>
          </div>
        </>
      ),
    },
  ];


  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);

  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const handleAccordionChange = (index: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedIndices(prevIndices => {
      if (isExpanded) {
        return [...prevIndices, index];
      } else {
        return prevIndices.filter(i => i !== index);
      }
    });
  };

  const displayFaqQuestionsSection = (questions: FaqAccordion[]) => (
    <div>
      {questions.map((accordion) => {
        const currentIndex = globalIndex++;
        const isExpanded = expandedIndices.includes(currentIndex);
        return (
          <Reveal
          key={`${currentIndex}${accordion.question}`}
          >
            <Accordion
              key={currentIndex}
              expanded={isExpanded}
              onChange={handleAccordionChange(currentIndex)}
              onMouseEnter={() => handleMouseEnter(currentIndex)}
              onMouseLeave={handleMouseLeave}
            >
              <AccordionSummary
                expandIcon={<AiFillCaretDown color={hoveredIndex === currentIndex || isExpanded? primaryBackgroundColor: buttonsBackgroundColor}/>}
                aria-controls={`panel${currentIndex + 1}-content`}
                id={`panel${currentIndex + 1}-header`}
                style={{
                  backgroundColor: isExpanded ? buttonsBackgroundColor : (hoveredIndex === currentIndex ? buttonsBackgroundColor : primaryBackgroundColor),

                  color: hoveredIndex === currentIndex ? primaryBackgroundColor : isExpanded ? buttonTextColor : buttonsBackgroundColor,
                  border:`1px solid ${hoveredIndex !== currentIndex ? buttonsBackgroundColor: buttonTextColor}`,
                }}
              >
                <Typography ><strong>{accordion.question}</strong></Typography>
              </AccordionSummary>
              <AccordionDetails
               style={{backgroundColor: secondaryBackgroundColor, color: textColor}}
              >
                <span>
                  {accordion.answer}
                </span>
              </AccordionDetails>
            </Accordion>
          </Reveal>
        );
      })}
    </div>
  );
  return (
    <div className="section  containerFaq heightAndBorder" >
        <ItemByItemReveal>
        <HeaderWithDot  header={'FAQ'}/>
        </ItemByItemReveal>
      <div className="accordionDiv">
        <div className="general">
          <Slide slideFrom='left'>
            <div className="headerIconDiv">
              <FaQuestionCircle size={20} style={{ margin: '0 5px 0 0' , color:contrastColor}} />
              <h2>General</h2>
            </div>
          </Slide>
          <div className="accordions">
            {displayFaqQuestionsSection(generalSectionQuestionsList)}
          </div>



        </div>
        <div className="DataCollection">
          <Slide slideFrom='left'>
            <div className="headerIconDiv">
              <BsCollection size={20} style={{ margin: '0 5px 0 0', color:contrastColor }} />
              <h2>Data Collection</h2>
            </div>

          </Slide>

          <div className="accordions">
            {displayFaqQuestionsSection(dataCollectionSectionQuestionsList)}
            <Accordion
              onChange={handleAccordionChange(uniqueIndex)}
              onMouseEnter={() => handleMouseEnter(uniqueIndex)}
              onMouseLeave={handleMouseLeave}
            >
              <AccordionSummary
                expandIcon={<AiFillCaretDown color={hoveredIndex === uniqueIndex || expandedIndices.includes(uniqueIndex)? primaryBackgroundColor: buttonsBackgroundColor} />}
                aria-controls={`panel${uniqueIndex}-content`}
                id={`panel${uniqueIndex}-header`}
                style={{
                  backgroundColor:  expandedIndices.includes(uniqueIndex) ? buttonsBackgroundColor : (hoveredIndex === uniqueIndex ? buttonsBackgroundColor : primaryBackgroundColor),
                  color: hoveredIndex === uniqueIndex ? primaryBackgroundColor : expandedIndices.includes(uniqueIndex) ? buttonTextColor : buttonsBackgroundColor,
                  border:`1px solid ${hoveredIndex !== uniqueIndex ? buttonsBackgroundColor: buttonTextColor}`,
                }}
              >
                <Typography><strong>How do you ensure the accuracy of the job listings?</strong></Typography>
              </AccordionSummary>
              <AccordionDetails
               style={{backgroundColor: secondaryBackgroundColor, color: textColor}}
              >
                {displayFaqQuestionsSection(innerDataCollectionSectionQuestionsList)}
                <p>To view in more details you welcome to visit my github reopsitories:</p>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaGithub style={{ margin: '0 5px 0 0' }} />
                    <a href="https://github.com/korenkaplan/Dev-Skill-Compass-Server" target="_blank">Server side reopsitory (Data Collection)</a>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FaGithub style={{ margin: '0 5px 0 0' }} />
                    <a href="https://github.com/korenkaplan/skills_compass_react" target="_blank">Website reopsitory</a>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="TechnicalSupport">
          <Slide slideFrom='left'>
            <div className="headerIconDiv">
              <MdSupportAgent size={25} style={{ margin: '0 5px 0 0', color:contrastColor }} />
              <h2>Technical Support</h2>
            </div>

          </Slide>

          <div className="accordions">
            {displayFaqQuestionsSection(technicalSupportSectionQuestionsList)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FaqPageMobile;

