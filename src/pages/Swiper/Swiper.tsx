import React, { useEffect, useState } from 'react';
import { backgroundColor } from '../../utils/variables';
import './Swiper.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Section } from '../../utils/interfaces';
import Reveal from '../../components/FramerMotion/Reveal';
import Slide from '../../components/FramerMotion/Slide';

interface SwiperPageProps {
  sections: Section[];
}

const SwiperPage: React.FC<SwiperPageProps> = ({ sections }) => {
  const [activeSlide, setActiveSlide] = useState(0); // State to track active slide index

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (_current: number, next: number) => setActiveSlide(next), // Update active slide index
    customPaging: (i: number) => (
      <div className={`custom-dot ${activeSlide === i ? 'active' : ''}`}>
        {sections[i].label}
      </div>
    ),
    dotsClass: "slick-dots custom-indicator",
    arrows: false
  };

  useEffect(() => {
    // Ensure initial active slide is set
    setActiveSlide(0);
  }, []);

  return (
    <div style={{ backgroundColor: backgroundColor }} className="section main">
      <div className="App">
        <Slide>
        <Slider {...settings}>
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="section">
              <section.component />
            </div>
          ))}
        </Slider>
        </Slide>
      </div>
    </div>
  );
};

export default SwiperPage;
