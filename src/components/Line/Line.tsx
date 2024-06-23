// Line.tsx

import React from 'react';
import './Line.css'; // Import CSS for styling

interface LineProps {
  height: string;
  width: string;
  color: string;
  radius?: string; // Make the radius parameter optional
  margin?: string; // Make the margin parameter optional
}

const Line: React.FC<LineProps> = ({ height, width, color, radius, margin }) => {
  const lineStyle = {
    height: height,
    width: width,
    backgroundColor: color,
    borderRadius: radius, // Use the provided radius if available
    margin: margin
  };

  return <div className="line" style={lineStyle}></div>;
};

export default Line;
