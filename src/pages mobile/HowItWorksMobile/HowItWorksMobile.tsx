// src/components/SideMenu.tsx
import React, { CSSProperties } from 'react';
import './HowItWorksMobile.css'
import ThreeStepsMobile from './ThreeStepsMobile';
import FutureUpgradesMobile from './FutureUpgradesMobile';
import Line from '../../components/Line/Line';
import jobDescriptionhighlited from '../../assets/images/Job description highlited.png'
import ItemByItemReveal from '../../components/FramerMotion/ItemByItemReveal';
import Reveal from '../../components/FramerMotion/Reveal';
import Slide from '../../components/FramerMotion/Slide';
import {contrastColor, primaryHeaderColor, textColor} from '../../utils/theme'

interface Category {
  name: string;
  items: string[];
}
interface CategoryRow {
  columns: Category[]
}
const programmingLanguages: Category = {
  name: "Programming Languages",
  items: ["Typescript", "Java", "Python", "Javascript", "Scala"],
};

const databases: Category = {
  name: "Databases",
  items: ["MongoDB", "Redis", "PostgreSQL"],
};

const cloudArchitecture: Category = {
  name: "Cloud Architecture",
  items: ["Microservices"],
};

const frameworks: Category = {
  name: "Frameworks",
  items: ["Node.js", "Nest.js", "Express.js"],
};

const methodologies: Category = {
  name: "Methodologies",
  items: ["Agile"],
};
const role: Category = {
  name: "Role",
  items: ["Backend Developer"],
}
const row1: CategoryRow = { columns: [programmingLanguages, databases] }
const row2: CategoryRow = { columns: [cloudArchitecture, frameworks] }
const row3: CategoryRow = { columns: [role, methodologies] }

const HowItWorksMobile: React.FC = () => {
  const headerStyle: CSSProperties = {
    fontSize: '35px',
    color:primaryHeaderColor,
  }
  const spreadRows = (rows: CategoryRow[]) => {
    let delayInSeconds = 3;
    return rows.map((row, rowIndex) => (
      <div className="rowMobile" key={rowIndex}>
        {row.columns.map((col, colIndex) => (
          <div className={`col${colIndex + 1}Mobile`} key={`${rowIndex}${colIndex}`}>
            <Slide delay={0.5}>
              <strong>{col.name}</strong>
            </Slide>
            <ul>
              {col.items.map((item, itemIndex) => (
                <Reveal
                key={`${item}${itemIndex}`}
                duration={1} delay={(delayInSeconds++) / 10}>
                  <li key={itemIndex}>{item}</li>
                </Reveal>
              ))}
            </ul>
          </div>
        ))}
      </div>
    ));
  };
  return (
    <div style={{ padding: 50 }} className="section OverviewContainerDesktop heightAndBorder  " >

      <>
        <ItemByItemReveal customStyle={{ textAlign: 'center' }} speed={20} >
          <h1 style={headerStyle} >Workflow 🛠️</h1>
          <h2 style={{color:textColor}} >Discover our  3-step process for delivering the most relevant and reliable data on the internet</h2>
        </ItemByItemReveal>
        <ThreeStepsMobile />
      </>
      <div className="imagesDivMobile">
        <div className="">
          <ItemByItemReveal>
            <h2 className='resultDivHeaderMobile'>This Is How Our System Looks at Job Descriptions</h2>
          </ItemByItemReveal>
          <Slide >
            <img src={jobDescriptionhighlited} alt="" />
          </Slide>
        </div>
        <div className="descriptionResultDivMobile">
          <ItemByItemReveal>
            <h2 className='resultDivHeaderMobile'>After Text Analysis & Data Processing</h2>
          </ItemByItemReveal>
          <Slide slideFrom='left'>
            <div className="resultListsDivMobile">
              {spreadRows([row1, row2, row3])}
            </div>
          </Slide>


        </div>
      </div>
      <Line margin='50px 0' height='1px' width='80%' color={contrastColor} />
      <>
        <ItemByItemReveal customStyle={{ textAlign: 'center' }} speed={20} >
          <h1 style={headerStyle}>What's Next? 🚀</h1>
          <h2>Discover our exciting upcoming improvements and features</h2>
        </ItemByItemReveal>
        <FutureUpgradesMobile />

      </>
    </div>
  );
};

export default HowItWorksMobile;
