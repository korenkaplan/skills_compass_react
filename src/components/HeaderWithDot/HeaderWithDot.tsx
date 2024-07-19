// src/components/SideMenu.tsx
import React from 'react';
import './HeaderWithDot.css'
interface HeaderWithDotProps {
header: string;
fontSize?: number;
lang?: 'en' | 'he';
}

const HeaderWithDot: React.FC<HeaderWithDotProps> = ({ header, fontSize = 30}: HeaderWithDotProps) => {
  return (
    <div className=' headerWithDotWrapper'>
        <>
        <h1 style={{fontSize}} className=' headerWithDotText poppins-900' >{header}</h1>
        </>
      {/* <h1 style={{marginLeft: lang == 'en' ? '3px' : '0px', marginRight: lang == 'he' ? '3px' : '0px'}} className=' dotHeaderMobile'></h1> */}
    </div>
  );
};

export default HeaderWithDot;
