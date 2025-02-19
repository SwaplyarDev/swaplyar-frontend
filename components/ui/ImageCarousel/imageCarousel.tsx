// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import React, { useEffect, useRef, useState } from 'react';
// import Image from 'next/image';

// const ImageCarousel: React.FC<{ images: string[] }> = ({ images }) => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [allImagesLoaded, setAllImagesLoaded] = useState(false); // Estado para controlar si todas las imágenes están cargadas
//   const sliderRef = useRef<Slider>(null);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     beforeChange: (current: number, next: number) => setActiveIndex(next),
//     autoplay: true,
//     autoplaySpeed: 5000,
//     arrows: false,
//     ref: sliderRef,
//   };

//   const limitedImages = images.slice(0, 6);

//   useEffect(() => {
//     let loadedCount = 0;

//     limitedImages.forEach((image) => {
//       const img = new window.Image() as HTMLImageElement;
//       img.src = image;
//       img.onload = () => {
//         loadedCount++;
//         if (loadedCount === limitedImages.length) {
//           setAllImagesLoaded(true); // Marca que todas las imágenes están cargadas
//         }
//       };
//     });
//   }, [limitedImages]);

//   const SkeletonLoader = () => (
//     <div className="relative h-60 w-full animate-pulse rounded-[20px] border-4 border-gray-200 bg-gray-300"></div>
//   );

//   return (
//     <div className="group relative overflow-hidden rounded-[20px] border-4 border-[#012C8A]">
//       {!allImagesLoaded ? (
//         <SkeletonLoader />
//       ) : (
//         <>
//           <Slider {...settings}>
//             {limitedImages.map((image, index) => (
//               <div key={index}>
//                 <Image
//                   src={image}
//                   alt={`Slide ${index + 1}`}
//                   className="h-60 w-full object-cover"
//                   width={800}
//                   height={400}
//                 />
//               </div>
//             ))}
//           </Slider>

//           {/* Botón de navegación izquierda */}
//           <button
//             className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-700 bg-opacity-50 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//             onClick={() => sliderRef.current?.slickPrev()}
//           >
//             &lt;
//           </button>

//           {/* Botón de navegación derecha */}
//           <button
//             className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-700 bg-opacity-50 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//             onClick={() => sliderRef.current?.slickNext()}
//           >
//             &gt;
//           </button>

//           <div className="absolute bottom-4 flex w-full justify-center space-x-2">
//             {limitedImages.map((_, index) => (
//               <div
//                 key={index}
//                 className={`h-4 w-4 rounded-full transition-all duration-300 ${
//                   activeIndex === index ? 'bg-[#012C8A]' : 'border-2 border-[#012C8A] bg-white opacity-50'
//                 }`}
//               ></div>
//             ))}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ImageCarousel;

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

  return (
    <div className="group relative h-[500px] w-full overflow-hidden">
      {!allImagesLoaded ? (
        <div className="relative h-[500px] w-full animate-pulse rounded-[20px] border-4 border-gray-200 bg-gray-300"></div>
      ) : (
        <div className="h-[500px] w-full">
          <Slider {...settings} className="h-[500px]">
            {limitedImages.map((image, index) => (
              <div key={index} className="flex h-[500px] items-center">
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

          {/* Botones de navegación */}
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-700 bg-opacity-50 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            onClick={() => sliderRef.current?.slickPrev()}
          >
            &lt;
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-700 bg-opacity-50 p-2 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            onClick={() => sliderRef.current?.slickNext()}
          >
            &gt;
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 flex w-full justify-center space-x-2">
            {limitedImages.map((_, index) => (
              <div
                key={index}
                className={`h-4 w-4 rounded-full transition-all duration-300 ${
                  activeIndex === index
                    ? 'bg-inputLight dark:bg-[#ffffff]' // Cambia el color en modo oscuro
                    : 'border-2 border-inputLight bg-white opacity-50 dark:border-white dark:bg-gray-700 dark:opacity-75' // Ajustes para modo oscuro
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
