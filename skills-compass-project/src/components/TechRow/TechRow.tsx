import React, { useState, useEffect } from 'react';
import './TechRow.css'; // Create this CSS file to style the component
import _, { forEach, words } from 'lodash';

interface TechRowProps {
  tech: string;
  count: number;
  maxCount: number; // Add a prop for the maximum count
  maxLineWidth: number; // Add a prop for the maximum line width in pixels
}

const TechRow: React.FC<TechRowProps> = ({ tech, count, maxCount, maxLineWidth }) => {
  const [lineWidth, setLineWidth] = useState(0);

  useEffect(() => {
    // Calculate the scaling factor based on the maximum width and maximum count
    const scaleFactor = maxLineWidth / maxCount;
    // Calculate the width of the line based on the count and scaling factor
    const calculatedWidth = Math.min(count * scaleFactor, maxLineWidth);

    // Set the line width with a delay to create a loading effect
    const delay = 1; // milliseconds
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
  }, [count, maxCount, maxLineWidth]);

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
  return (
    <div className="tech-row">
      <div className="tech-name-container">
        <span className="tech-name">{formatTitle(tech)}</span>
      </div>
      <div className="lineWrapper" style={{ width: `${maxLineWidth}px` }}>
        <div className="tech-line" style={{ width: `${lineWidth}px` }}></div>
      </div>
      <span className="tech-count">{count}</span>
    </div>
  );
};

export default TechRow;
