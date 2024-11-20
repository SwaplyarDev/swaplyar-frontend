import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false); // Estado para controlar si todas las imágenes están cargadas
  const sliderRef = useRef<Slider>(null);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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
          setAllImagesLoaded(true); // Marca que todas las imágenes están cargadas
        }
      };
    });
  }, [limitedImages]);

  const SkeletonLoader = () => (
    <div className="relative border-4 border-gray-200 rounded-[20px] w-full h-60 animate-pulse bg-gray-300"></div>
  );

  return (
    <div className="relative group border-4 border-[#012C8A] rounded-[20px] overflow-hidden">
      {!allImagesLoaded ? (
        <SkeletonLoader />
      ) : (
        <>
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

          {/* Botón de navegación izquierda */}
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            &lt;
          </button>

          {/* Botón de navegación derecha */}
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={() => sliderRef.current?.slickNext()}
          >
            &gt;
          </button>

          <div className="absolute bottom-4 w-full flex justify-center space-x-2">
            {limitedImages.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-[#012C8A]'
                    : 'bg-white border-2 border-[#012C8A] opacity-50'
                }`}
              ></div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCarousel;