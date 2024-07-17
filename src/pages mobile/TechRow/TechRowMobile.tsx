import React, { useState, useEffect } from 'react';
import './TechRowMobile.css'; // Make sure to create this CSS file to style the component
import { motion } from 'framer-motion';
interface TechRowProps {
  tech: string;
  count: number;
  maxCount: number; // Maximum count (either percentage or total count)
  maxLineWidth: number; // Maximum line width in pixels
  showPercentage: boolean; // Indicates whether to show as percentage
  totalListingsAmount: number;
}

const TechRowMobile: React.FC<TechRowProps> = ({ tech, count, maxCount, maxLineWidth, showPercentage }) => {
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    let calculatedWidth = 0;

    // Calculate the scaling factor based on the maximum width and maximum count
    let scaleFactor = maxLineWidth / maxCount;

    // If showPercentage is true, adjust the scaleFactor based on the percentage
    if (showPercentage)
      scaleFactor = maxLineWidth / 100; // Scale factor based on percentage (out of 100)

    calculatedWidth = Math.min(count * scaleFactor, maxLineWidth);
    setLineWidth(calculatedWidth);

    // Set the line width with a delay to create a loading effect
  }, [count, maxCount, maxLineWidth, showPercentage]);

  const formatTitle = (title: string) => {
    // Split the title into words
    const words = title.split(' ');

    // Map over each word and change the first letter to uppercase if it's a letter
    const formattedWords = words.map(word => {
      if (word[0] && /[a-zA-Z]/.test(word[0])) {
        return word[0].toUpperCase() + word.slice(1);
      }
      return word;
    });

    // Join the words back into a single string
    return formattedWords.join(' ');
  };

  const showPercentageOrCount = () => {
    if (showPercentage) {
      return `${count.toFixed(1)}%`;
    }
    return `${count}`;
  };
  const duration = 1;
  const lineVariants = {
    hidden: { width: 0 },
    visible: { width: lineWidth }
  };
  return (
    <div className="tech-row">
      <div className="tech-name-container">
        <span className="tech-name">{formatTitle(tech)}</span>
      </div>
      <div className="lineAndNumDiv">
      <div className="lineWrapper" style={{ width: `${maxLineWidth}px` }}>
      <motion.div
          className="tech-line"
          style={{ width: `${lineWidth*0.5}px` }}
          initial="hidden"
          animate="visible"
          variants={lineVariants}
          transition={{ duration: duration, ease: 'easeInOut' }}
        ></motion.div>
        {/* <div className="tech-line" style={{ width: `${lineWidth}px` }}></div> */}
      </div>
      <span className="tech-count">{showPercentageOrCount()}</span>
    </div>
      </div>

  );
};

export default TechRowMobile;
