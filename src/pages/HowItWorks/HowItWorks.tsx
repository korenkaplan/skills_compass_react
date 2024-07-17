// src/components/SideMenu.tsx
import React, { useEffect, useRef} from 'react';
import ThreeSteps from './ThreeSteps';
import './HowItWorks.css'
import '../../utils/variables.css'
import FutureUpgrades from './FutureUpgrades';
import jobDescriptionhighlited from '../../assets/images/Job description highlited.png'
import CurvedArrow from '../../components/curvedArrow/CurvedArrow';
import ItemByItemReveal from '../../components/FramerMotion/ItemByItemReveal';
import Reveal from '../../components/FramerMotion/Reveal';
import Slide from '../../components/FramerMotion/Slide';
//#region Technologies objects

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
const row1: CategoryRow = {columns: [ programmingLanguages, databases] }
const row2: CategoryRow = {columns: [ cloudArchitecture, frameworks]}
const row3: CategoryRow = {columns: [role, methodologies]}

//#endregion

const HowItWorks: React.FC = () => {
const imageRef = useRef<HTMLImageElement>(null);
const resultDivRef = useRef<HTMLDivElement>(null);
const spreadRows = (rows: CategoryRow[]) => {
  let delayInSeconds = 2.5;
  return rows.map((row, rowIndex) => (
    <div className="row" key={rowIndex}>
      {row.columns.map((col, colIndex) => (
        <div className={`col${colIndex + 1}`} key={`${col.name}${colIndex}`}>
          <Slide delay={0.5}>
          <strong >{col.name}</strong>
          </Slide>
          <ul>
            {col.items.map((item, itemIndex) => (
              <Reveal key={`${item}${itemIndex}`} duration={1} delay={(delayInSeconds++) / 10}>
              <li key={itemIndex}>{item}</li>
              </Reveal>
            ))}
          </ul>
        </div>
      ))}
    </div>
  ));
};
useEffect(() =>{
  const imageElement = imageRef.current
  const resultDivElement = resultDivRef.current

  if (imageElement && resultDivElement)
  {
    let height = 0
    while (height == 1){
      height = getElementHeight(imageElement)
      console.log(height);
    }
    // resultDivElement.style.height = `${height}px`
  }

},[]);
const getElementHeight = (element: HTMLElement): number => {
  const rect = element.getBoundingClientRect();
  const result = rect.bottom - rect.top;
  return result
};
  return (
    <div style={{padding:50}} className="section OverviewContainerDesktop heightAndBorder  " >
        <>
            <ItemByItemReveal customStyle={{textAlign:'center'}} speed={20} >
            <h1 >Workflow 🛠️</h1>
            <h2>Discover our  3-step process for delivering the most relevant and reliable data on the internet</h2>
            </ItemByItemReveal>
            <ThreeSteps/>
        </>

        <div className="imagesDivDesktop">
          <div className="listing" >
            <ItemByItemReveal>
            <h2 className='resultDivHeaderDesktop'>This Is How Our System Looks at Job Descriptions.</h2>
            </ItemByItemReveal>
            <Slide slideFrom='left' duration={1} >
          <img src={jobDescriptionhighlited} alt="" ref={imageRef}/>
          </Slide>

          </div>
          <div className="arrowDivDesktop">
          <Reveal delay={0.5} distanceYAxis={0}>
         <CurvedArrow />
        </Reveal>
          </div>
          <div className="descriptionResultDivDesktop">
          <ItemByItemReveal>
            <h2 className='resultDivHeaderDesktop'>After Text Analysis & Data Processing</h2>
            </ItemByItemReveal>
            <Slide className='SlideRightClassName' slideFrom='right' duration={1} >
            <div className="resultListsDivDesktop" ref={resultDivRef} >
            {spreadRows([row1, row2, row3])}
            </div>
          </Slide>

          </div>
        </div>


        <>
        <ItemByItemReveal customStyle={{textAlign:'center'}} speed={20} >
            <h1>What's Next? 🚀</h1>
            <h2>Discover our exciting upcoming improvements and features</h2>
        </ItemByItemReveal>

            <FutureUpgrades/>
        </>

    </div>
  );
};

export default HowItWorks;
