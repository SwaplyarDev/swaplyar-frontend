// /components/ui/cards/caed-about-us/caed-about-us.tsx

'use client';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import '../CardsCss.css';
import SwipeHands from '../../animations/SwipeHands';
import clsx from 'clsx';
import { useSize } from '@/hooks/useSize';
import { rotateCard } from '@/utils/assets/imgDatabaseCloudinary';

interface CardData {
  src: string;
  alt: string;
  title: string;
  backTitle: string;
  backText: string;
}

interface CaedAboutUsProps {
  cardsData: CardData[];
}

const CaedAboutUs: React.FC<CaedAboutUsProps> = ({ cardsData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSwipeHands, setShowSwipeHands] = useState(false);
  const sectionRef = useRef(null);
  const [activeCards, setActiveCards] = useState<{ [key: number]: boolean }>({});
  const { size } = useSize();

  const handleToggle = (index: number) => {
    setActiveCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cardsData.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cardsData.length - 1 : prevIndex - 1));
  };

  const swipeHandlersMobile = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const isThreeCards = cardsData.length === 3;

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
    <div ref={sectionRef} className="relative flex h-full w-full justify-center overflow-hidden">
      {showSwipeHands && (
        <div className="block md:hidden">
          <SwipeHands />
        </div>
      )}

      <section
        {...swipeHandlersMobile}
        className="relative flex h-[272px] items-center justify-center md:h-[312px] md:min-w-[680px] lg:h-[272px] lg:w-full lg:justify-between"
      >
        {cardsData.map((card: CardData, index: number) => {
          const isCurrent = index === currentIndex;
          const isSecondCurrent = index === (currentIndex + 1) % cardsData.length && size >= 768;
          const isNext = index === (currentIndex + 1) % cardsData.length;
          const isPrev = index === (currentIndex - 1 + cardsData.length) % cardsData.length;

          const isBack1 = index === (currentIndex - 1 + cardsData.length) % cardsData.length;
          const isBack2 = index === (currentIndex - 2 + cardsData.length) % cardsData.length;

          const isClick = !!activeCards[index];
          return (
            <article
              key={index}
              className={`linear absolute cursor-pointer transition-all duration-300 ${isCurrent || isSecondCurrent ? 'z-20 scale-100 lg:z-0' : 'z-10 scale-90 blur-sm md:scale-100 lg:z-0 lg:blur-none'} ${isPrev ? '-translate-x-20 md:-translate-x-0' : ''} ${isNext ? 'translate-x-20 md:translate-x-0' : ''} ${
                isCurrent
                  ? 'md:absolute md:left-[18%] md:-translate-y-[10%] lg:translate-y-0'
                  : isSecondCurrent
                    ? 'md:right-[18%] md:-translate-y-[10%] lg:translate-y-0'
                    : ''
              } ${isBack1 ? 'md:left-0' : isBack2 ? 'md:right-0' : ''} lg:static`}
              style={{
                transition: 'transform 0.3s linear, left 0.3s linear, right 0.3s linear',
              }}
            >
              <div
                className={clsx(isClick ? 'card-active relative h-64 w-52' : 'relative h-64 w-52')}
                onClick={() => handleToggle(index)}
              >
                <div className="card-inner h-full w-full duration-700">
                  <div className="card-front backface-hidden absolute flex h-full w-full flex-col items-center justify-center rounded-2xl bg-white text-black shadow-lg dark:bg-gray-800 dark:text-white">
                    <Image
                      src={card.src}
                      alt={card.alt}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-2xl shadow-md shadow-black/50 lg:shadow-[#012A8E80]"
                    />
                    <Image
                      src={rotateCard}
                      alt="Icono de rotacion de la card"
                      width={25}
                      height={25}
                      className="absolute right-2 top-2"
                    />
                    <h3 className="font-vold absolute bottom-0 mt-2 w-full rounded-bl-2xl rounded-br-2xl bg-[#323232] p-[10px] font-textFont text-darkText">
                      {card.title}
                    </h3>
                  </div>
                  <div className="card-back backface-hidden shadow-custom-black absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-[#000c29] p-4 text-darkText dark:bg-gray-800 dark:text-darkText">
                    <Image
                      src={rotateCard}
                      alt="Icono de rotacion de la card"
                      width={25}
                      height={25}
                      className="absolute right-2 top-2"
                    />
                    <h3 className="self-start font-textFont font-bold">{card.backTitle}</h3>
                    <p className="mt-2 font-textFont font-light">{card.backText}</p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};

export default CaedAboutUs;
