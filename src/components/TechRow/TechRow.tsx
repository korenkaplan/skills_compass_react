import React, { useState, useEffect, CSSProperties } from 'react';
import './TechRow.css'; // Make sure to create this CSS file to style the component
import Reveal from '../FramerMotion/Reveal';

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
  const slidingSquareStyle: CSSProperties = {
    backgroundColor: '#086156',
    height:'20px',
  }
  useEffect(() => {
    let calculatedWidth = 0;

    // Calculate the scaling factor based on the maximum width and maximum count
    let scaleFactor = maxLineWidth / maxCount;

    // If showPercentage is true, adjust the scaleFactor based on the percentage
    if (showPercentage)
      scaleFactor = maxLineWidth / 100; // Scale factor based on percentage (out of 100)

    calculatedWidth = Math.min(count * scaleFactor, maxLineWidth);
    setLineWidth(calculatedWidth)
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
       <Reveal>
        <span className="tech-nameDesktop">{formatTitle(tech)}</span>
       </Reveal>

      </div>
      <Reveal slidingSquare = {true} squareStyle={slidingSquareStyle}>
      <div className="lineWrapperDesktop" style={{ width: `${maxLineWidth}px` }}>
        <div className="tech-lineDesktop" style={{ width: `${lineWidth}px` }}></div>
      </div>
      </Reveal>
      <span className="tech-countDesktop">{showPercentageOrCount()}</span>
    </div>
  );
};

export default TechRow;
