import React from 'react';
import './Line.css'; // Import CSS for styling

interface LineProps {
  height: string;
  width: string;
  color: string;
  radius?: string; // Make the radius parameter optional
  margin?: string; // Make the margin parameter optional
  [key: string]: any; // Allow any other style properties
}

const Line: React.FC<LineProps> = ({ height, width, color, radius, margin, ...rest }) => {
  const lineStyle = {
    height,
    width,
    backgroundColor: color,
    borderRadius: radius, // Use the provided radius if available
    margin,
    ...rest // Spread the rest of the props to allow dynamic styles
  };

  return <div className="line" style={lineStyle}></div>;
};

export default Line;
