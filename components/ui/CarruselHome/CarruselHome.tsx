import React, { ReactNode } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // Estilos base de slick-carousel
import 'slick-carousel/slick/slick-theme.css'; // Estilos del tema de slick-carousel

interface CarruselHomeProps {
  children: ReactNode;
}

const CarruselHome: React.FC<CarruselHomeProps> = ({ children }) => {
  const settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    dots: false,
    centerPadding: '60px',
    arrows: false,
    slidesToShow: 3,
    speed: 500,
  };

  return (
    <div className="slider-container mx-auto max-w-[1136px]">
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

export default CarruselHome;
