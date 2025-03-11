import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Blog } from '@/types/blogs/blog';
import slugify from 'slugify';
import Link from 'next/link';

const ImageCarousel: React.FC<{ images: Blog[] }> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const sliderRef = useRef<Slider>(null);

  // Tomar los primeros 6 blogs con imagen
  const limitedImages = images.filter((blog) => blog.url_image).slice(0, 6);

  useEffect(() => {
    if (limitedImages.length === 0) return;

    Promise.all(
      limitedImages.map(
        (imgData) =>
          new Promise<void>((resolve) => {
            const img = new window.Image();
            img.src = imgData.url_image;
            img.onload = () => resolve();
          }),
      ),
    ).then(() => setAllImagesLoaded(true));
  }, [limitedImages]);

  const handleIndicatorClick = (index: number) => {
    setActiveIndex(index);
    sliderRef.current?.slickGoTo(index);
  };

  return (
    <div className="group relative mb-12 h-[400px] w-full overflow-hidden border-none">
      {!allImagesLoaded ? (
        <div className="relative h-[350px] w-full animate-pulse rounded-[30px] border-4 border-gray-200 bg-gray-300"></div>
      ) : (
        <div className="h-[350px] w-full border-none bg-inherit">
          <Slider
            ref={sliderRef}
            infinite={limitedImages.length > 1}
            speed={500}
            slidesToShow={1}
            slidesToScroll={1}
            fade
            beforeChange={(_, next) => setActiveIndex(next)}
            autoplay
            autoplaySpeed={5000}
            arrows={false}
            className="h-[350px] border-none bg-inherit"
          >
            {limitedImages.map((imgData) => {
              const title2 = imgData.title || '';
              const slug = slugify(title2, { lower: true, strict: true });
              return (
                <Link
                  href={`blog/blogDetail?slug=${encodeURIComponent(slug)}&id=${encodeURIComponent(imgData.blog_id)}`}
                  key={imgData.blog_id || imgData.title}
                  className="relative flex h-[350px] items-center rounded-[30px] outline-none"
                >
                  <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-[#012A8E] to-[#B614FF] p-[4px] dark:from-[#EBE7E0] dark:to-[#56D6DC]">
                    <div className="h-full w-full overflow-hidden rounded-[26px] bg-white dark:bg-black">
                      <Image
                        src={imgData.url_image}
                        alt={imgData.title}
                        className="h-[350px] w-full object-cover"
                        width={800}
                        height={500}
                      />
                    </div>
                  </div>
                  <p className="absolute bottom-4 left-4 z-10 font-textFont text-3xl font-semibold text-white">
                    {imgData.title}
                  </p>
                </Link>
              );
            })}
          </Slider>

          {/* Indicadores */}
          <div className="absolute bottom-0 flex min-h-[30px] w-full items-center justify-center gap-2">
            {limitedImages.map((_, index) => (
              <div
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className={`cursor-pointer rounded-full bg-gradient-to-b from-[#A5AAB5] to-[#3E5FAD] transition-all duration-300 dark:from-[#EBE7E0] dark:to-[#A5A7AB] ${
                  activeIndex === index ? 'h-[30px] w-[30px]' : 'h-[25px] w-[25px]'
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
