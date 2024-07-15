// src/components/SideMenu.tsx
import React, { CSSProperties } from 'react';
import './StepNumber.css'
import '../../utils/variables.css'

interface PageProps {
    size: number
    number: number
    fontSize?: number
}

const StepNumber: React.FC<PageProps> = ({size = 50, number = 0, fontSize = 30}: PageProps) => {
    const style: CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        fontSize: `${fontSize}px`,
    }
  return (
    <div style={style} className='stepNumberContainerDesktop' >
        {number}
    </div>
  );
};

export default StepNumber;