import React, { useEffect, useState } from 'react';
import './Swiper.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Section } from '../../utils/interfaces';
import Reveal from '../../components/FramerMotion/Reveal';

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
        <Reveal delay={i / 8}>
          <div>{sections[i].label}</div>
        </Reveal>
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
    <div  className="section main">
      <div className="App">
        <Slider {...settings}>
          {sections.map((section) => (
            <div key={section.id} id={section.id} className="section">
              <section.component  />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SwiperPage;
