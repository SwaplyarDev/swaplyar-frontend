'use client';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import '../../ui/cards/CardsCss.css';
import clsx from 'clsx';
import { ICardRecomendationProps } from './types';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, SquareArrowOutUpRight } from 'lucide-react';
import { nube2, plane } from '@/utils/assets/imgDatabaseCloudinary';

export const CardRecomendation: React.FC<ICardRecomendationProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHands, setShowSwipeHands] = useState(false);
  const sectionRef = useRef(null);
  const [activeCards, setActiveCards] = useState<{ [key: number]: boolean }>({});
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    setIsVisible(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
    setIsVisible(false);
  };

  const handleIsVisible = () => setIsVisible(!isVisible);

  const swipeHandlersMobile = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleNext();
    }, 30000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowSwipeHands(true);
        }
      },
      { threshold: 1 },
    );

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative mt-[34px] h-full w-full flex-col items-center justify-between">
      <section
        {...swipeHandlersMobile}
        className="relative flex h-[450px] items-center justify-between lg:mx-auto lg:w-[937px]"
      >
        <button
          className="hidden bg-[#fafafa] dark:bg-[#323232] md:flex md:items-center md:justify-center md:rounded-full md:p-2"
          onClick={handlePrev}
        >
          <ChevronLeft className="h-[24px] w-[24px]" />
        </button>
        <div className="flex w-full justify-center">
          {items.map((item, index: number) => {
            const isCurrent = index === currentIndex;
            const isNext = index === (currentIndex + 1) % items.length;
            const isPrev = index === (currentIndex - 1 + items.length) % items.length;

            const isClick = !!activeCards[index];

            return (
              <article
                key={index}
                className={`linear absolute cursor-pointer select-none transition-all duration-300 ${isCurrent ? 'top-0 z-20' : 'top-0 z-10'} ${isPrev ? 'translate-y-10 md:-translate-x-32 md:translate-y-28 lg:-translate-x-60' : ''} ${isNext ? 'translate-y-20 md:translate-x-32 md:translate-y-28 lg:translate-x-60' : ''}`}
                style={{
                  transition: 'transform 0.3s linear, left 0.3s linear, right 0.3s linear',
                  zIndex:
                    index === currentIndex ? 30 : index === (currentIndex - 1 + items.length) % items.length ? 20 : 10,
                }}
              >
                <div
                  className={clsx(
                    'relative h-[275px] w-[280px] md:w-[324px]',
                    isVisible && item.largeText && 'h-full',
                    isClick && 'card-active',
                  )}
                >
                  <div className="flex h-full w-full flex-col items-center rounded-2xl bg-[#fafafa] p-[6px] text-lightText shadow-lg shadow-black/30 dark:bg-[#323232] dark:text-darkText dark:shadow-[#979797]">
                    <Image
                      className="absolute -top-10 left-0 md:-left-10"
                      src={nube2}
                      alt="Imagen de una nube"
                      width={102}
                      height={58}
                    />
                    <div className="flex w-full justify-between gap-[14px]">
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-center justify-between border-b border-placeholderDark pb-[7px] pl-[9px]">
                          <h3 className="font-textFont font-semibold">{item.name}</h3>
                          <Link href={item.href} target="_blank">
                            <SquareArrowOutUpRight className="h-[30px] w-[30px] text-placeholderDark" />
                          </Link>
                        </div>
                        <div className="flex gap-2 border-b border-placeholderDark py-[3px] pl-[9px]">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <span key={index} className="flex h-[27px] w-[27px] items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="27"
                                height="26"
                                viewBox="0 0 27 26"
                                fill="none"
                              >
                                <path
                                  d="M13.4992 1.61804L16.1369 9.73596L16.2492 10.0815H16.6124H25.1481L18.2426 15.0986L17.9487 15.3121L18.061 15.6576L20.6986 23.7756L13.7931 18.7584L13.4992 18.5449L13.2053 18.7584L6.29981 23.7756L8.93748 15.6576L9.04974 15.3121L8.75585 15.0986L1.85033 10.0815H10.386H10.7493L10.8615 9.73596L13.4992 1.61804Z"
                                  stroke={`${item.qualification === index ? '' : '#FFC72C'}`}
                                  fill={`${item.qualification === index ? '#D9D9D9' : '#FFD900'}`}
                                />
                              </svg>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Image src={item.image} alt="Imagen del usuario" width={73} height={73} priority />
                      </div>
                    </div>
                    <p
                      className={clsx(
                        'w-full overflow-hidden p-[10px] text-left font-textFont font-light',
                        isVisible && item.largeText ? 'h-full' : 'h-[105px]',
                      )}
                    >
                      {item.description}
                    </p>
                    {item.largeText && (
                      <button
                        onClick={handleIsVisible}
                        className={clsx(
                          'flex w-full items-center pl-[10px] pt-6 text-left font-textFont font-light transition-all',
                          isCurrent && 'hover:text-buttonsLigth hover:dark:underline',
                          isVisible
                            ? 'text-buttonsLigth dark:text-darkText dark:underline'
                            : 'text-lightText dark:text-darkText',
                        )}
                        disabled={!isCurrent}
                      >
                        {isVisible ? 'Leer menos' : 'Leer más'}{' '}
                        {isVisible ? (
                          <ChevronUp className="h-[26px] w-[26px]" />
                        ) : (
                          <ChevronDown className="h-[26px] w-[26px]" />
                        )}
                      </button>
                    )}
                    {isCurrent && (
                      <>
                        <Image
                          className="absolute -bottom-14 right-0 md:-right-6"
                          src={plane}
                          alt="Imagen del avión"
                          width={136}
                          height={136}
                        />
                        <div className="absolute -bottom-16 right-0 -z-10 h-[150px] w-[150px] rounded-full border-[3px] border-[#e1e1e1] dark:border-[#646464] md:-right-10"></div>
                      </>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <button
          className="hidden bg-[#fafafa] dark:bg-[#323232] md:flex md:items-center md:justify-center md:rounded-full md:p-2"
          onClick={handleNext}
        >
          <ChevronRight className="h-[24px] w-[24px]" />
        </button>
      </section>
      <div className="flex justify-center gap-10 md:hidden">
        <button
          onClick={handlePrev}
          className="flex items-center justify-center rounded-full bg-[#fafafa] p-2 dark:bg-[#323232]"
        >
          <ChevronLeft className="h-[24px] w-[24px]" />
        </button>
        <button
          onClick={handleNext}
          className="flex items-center justify-center rounded-full bg-[#fafafa] p-2 dark:bg-[#323232]"
        >
          <ChevronRight className="h-[24px] w-[24px]" />
        </button>
      </div>
    </div>
  );
};

export default CardRecomendation;
