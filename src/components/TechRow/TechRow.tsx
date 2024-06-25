import React, { useState, useEffect } from 'react';
import './TechRow.css'; // Make sure to create this CSS file to style the component
import _ from 'lodash';

interface TechRowProps {
  tech: string;
  count: number;
  maxCount: number; // Maximum count (either percentage or total count)
  maxLineWidth: number; // Maximum line width in pixels
  showPercentage: boolean; // Indicates whether to show as percentage
  totalListingsAmount: number;
}

const TechRow: React.FC<TechRowProps> = ({ tech, count, maxCount, maxLineWidth, showPercentage }) => {
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    let calculatedWidth = 0;

    // Calculate the scaling factor based on the maximum width and maximum count
    let scaleFactor = maxLineWidth / maxCount;

    // If showPercentage is true, adjust the scaleFactor based on the percentage
    if (showPercentage)
      scaleFactor = maxLineWidth / 100; // Scale factor based on percentage (out of 100)

    calculatedWidth = Math.min(count * scaleFactor, maxLineWidth);

    // Set the line width with a delay to create a loading effect
    const delay = 10; // milliseconds
    let currentWidth = 0;
    const increment = Math.max(calculatedWidth / 100, 1); // Increment the width in 100 steps
    const timer = setInterval(() => {
      currentWidth += increment;
      if (currentWidth >= calculatedWidth) {
        clearInterval(timer);
        setLineWidth(calculatedWidth);
      } else {
        setLineWidth(currentWidth);
      }
    }, delay);
    return () => clearInterval(timer);
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

  return (
    <div className="tech-rowDesktop">
      <div className="tech-name-containerDesktop">
        <span className="tech-nameDesktop">{formatTitle(tech)}</span>
      </div>
      <div className="lineWrapperDesktop" style={{ width: `${maxLineWidth}px` }}>
        <div className="tech-lineDesktop" style={{ width: `${lineWidth}px` }}></div>
      </div>
      <span className="tech-countDesktop">{showPercentageOrCount()}</span>
    </div>
  );
};

export default TechRow;
