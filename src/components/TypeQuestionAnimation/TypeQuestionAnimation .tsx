import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';

interface TypeQuestionAnimationProps {
  questions: string[]; // Array of questions to animate
  currentYear?: number; // Current year for dynamic insertion
  fontSize: number;
  classNameCustom?: string;
  isRotated?: boolean;
}

const TypeQuestionAnimation: React.FC<TypeQuestionAnimationProps> = ({
  questions,
  currentYear,
  fontSize,
  classNameCustom,
  isRotated = true
}) => {
  const [sequence, setSequence] = useState<(string | number)[]>([]);

  useEffect(() => {
    const newSequence = questions.reduce((acc, question, index) => {
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

    setSequence(newSequence);
  }, [questions, currentYear]);

  useEffect(() => {
  }, [sequence]);

  return (
    <div dir={isRotated ? 'rtl' : 'ltr'}>
    <TypeAnimation
      key={JSON.stringify(sequence)} // Force re-render by changing key
      sequence={sequence}
      wrapper="span"
      speed={40}
      deletionSpeed={80}
      style={{ fontSize: `${fontSize}px`, display: 'inline-block' }}
      repeat={Infinity}
      className={classNameCustom}
    />
    </div>
  );
};

export default TypeQuestionAnimation;
