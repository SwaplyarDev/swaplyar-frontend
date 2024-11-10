// @ts-ignore
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const limitedImages = images.slice(0, 6);

  return (
    <div className="border-4 border-[#012C8A] rounded-[20px] overflow-hidden relative">
      <Slider {...settings}>
        {limitedImages.map((image, index) => (
          <div key={index}>
            <Image 
              src={image}
              alt={`Slide ${index + 1}`} 
              className="w-full h-60 object-cover" 
              width={800}
              height={400}
            />
          </div>
        ))}
      </Slider>
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {limitedImages.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-[#012C8A]' : 'bg-white border-2 border-[#012C8A] opacity-50'}`}
          ></div>
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;