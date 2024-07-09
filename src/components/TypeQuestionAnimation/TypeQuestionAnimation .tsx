import React, { CSSProperties } from 'react';
import { TypeAnimation } from 'react-type-animation';
interface TypeQuestionAnimationProps {
  questions: string[]; // Array of questions to animate
  currentYear?: number; // Current year for dynamic insertion
  fontSize:number;
  classNameCustom?: string;
}

const TypeQuestionAnimation: React.FC<TypeQuestionAnimationProps> = ({
  questions,
  currentYear,
  fontSize,
  classNameCustom,
}) => {
  // Convert questions array into a sequence for TypeAnimation
  const sequence = questions.reduce((acc, question, index) => {
    // Delay before typing the next question, except for the first one
    if (index !== 0) {
      acc.push(1500);
    }
    // Replace currentYear placeholder in the question
    const formattedQuestion = question.replace('${currentYear}', `${currentYear}`);
    acc.push(formattedQuestion);
    acc.push(1500); // Wait after typing each question
    return acc;
  }, [] as (string | number)[]);

  return (
    <TypeAnimation
      sequence={sequence}
      wrapper="span"
      speed={40}
      deletionSpeed={80}
      style={{ fontSize: `${fontSize}px`, display: 'inline-block' }}
      repeat={Infinity}
      className={classNameCustom}
    />
  );
};

export default TypeQuestionAnimation;
