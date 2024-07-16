// ScrollDownMouseAnimation.tsx
import React, { CSSProperties } from 'react';
import Lottie from 'lottie-react';
import scrollAnimation from '../../assets/lottieDark/mouseScrollDown.json';

interface ScrollDownMouseAnimationProps {
  scrollToSectionId: string;
  styleProps: CSSProperties;
  loop?: boolean;
  autoPlay?: boolean;
  CustomClassName?: string;
  style?: CSSProperties
}

const ScrollDownMouseAnimation: React.FC<ScrollDownMouseAnimationProps> = ({
  CustomClassName,
  scrollToSectionId,
  styleProps,
  loop,
  autoPlay,
}) => {
  const handleClick = () => {
    const section = document.getElementById(scrollToSectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Lottie
      className={CustomClassName}
      onClick={handleClick}
      style={styleProps}
      animationData={scrollAnimation}
      loop={loop ?? true}
      autoPlay={autoPlay ?? true}
    />
  );
};

export default ScrollDownMouseAnimation;
