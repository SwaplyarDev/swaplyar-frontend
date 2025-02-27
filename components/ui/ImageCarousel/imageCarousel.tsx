import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true, // Activar el efecto fade
    beforeChange: (current: number, next: number) => setActiveIndex(next),
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    ref: sliderRef,
  };

  const limitedImages = images.slice(0, 6);

  useEffect(() => {
    let loadedCount = 0;
    limitedImages.forEach((image) => {
      const img = new window.Image() as HTMLImageElement;
      img.src = image;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === limitedImages.length) {
          setAllImagesLoaded(true);
        }
      };
    });
  }, [limitedImages]);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="group relative h-[500px] w-full overflow-hidden border-none">
      {!allImagesLoaded ? (
        <div className="relative h-[500px] w-full animate-pulse rounded-[20px] border-4 border-gray-200 bg-gray-300"></div>
      ) : (
        <div className="h-[500px] w-full border-none bg-inherit">
          <Slider {...settings} className="h-[500px] border-none bg-inherit">
            {limitedImages.map((image, index) => (
              <div key={index} className="flex h-[500px] items-center rounded-[100px] outline-none">
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="h-[500px] w-full rounded-[100px] border-[10px] border-inputLight bg-white object-cover dark:border-darkText"
                  width={800}
                  height={500}
                />
              </div>
            ))}
          </Slider>

          {/* Indicadores */}
          <div className="absolute bottom-4 flex w-full justify-center space-x-2">
            {limitedImages.map((_, index) => (
              <div
                key={index}
                onClick={() => handleIndicatorClick(index)} // Acción al hacer clic
                className={`h-4 w-4 cursor-pointer rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-inputLight shadow-lg shadow-inputLight/50 dark:bg-white dark:shadow-white/50' // Cambia el color en modo oscuro
                    : 'border-2 border-inputLight bg-inputLightDisabled dark:border-white dark:bg-disabledLightText dark:opacity-75' // Ajustes para modo oscuro
                }`}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
