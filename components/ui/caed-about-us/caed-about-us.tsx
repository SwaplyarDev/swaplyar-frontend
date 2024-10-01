'use client';
import { useState, useEffect, useRef } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import './CaedAboutUs.css';
import SwipeHands from '../animations/SwipeHands';
import clsx from 'clsx';

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
  const [activeCards, setActiveCards] = useState<{ [key: number]: boolean }>(
    {},
  );

  const handleToggle = (index: number) => {
    // Alternar el estado de la tarjeta al hacer clic
    setActiveCards((prev: any) => ({
      ...prev,
      [index]: !prev[index], // Cambiar el estado para la tarjeta correspondiente
    }));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === cardsData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? cardsData.length - 1 : prevIndex - 1,
    );
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('IntersectionObserver triggered:', entry.isIntersecting);
        if (entry.isIntersecting) {
          setShowSwipeHands(true);
        }
      },
      { threshold: 1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className="relative h-full w-full">
      {showSwipeHands && (
        <div className="block md:hidden">
          <SwipeHands />
        </div>
      )}

      <div
        {...swipeHandlers}
        className="relative block h-64 w-full overflow-hidden md:hidden"
      >
        <div className="relative flex h-full w-full items-center justify-center">
          {cardsData.map((card, index) => {
            const isCurrent = index === currentIndex;
            const isNext = index === (currentIndex + 1) % cardsData.length;
            const isPrev =
              index ===
              (currentIndex - 1 + cardsData.length) % cardsData.length;

            const isClick = !!activeCards[index];

            return (
              <div
                key={index}
                className={`absolute transition-transform duration-700 ease-in-out ${isCurrent ? 'z-20 scale-100' : 'z-10 scale-90 blur-sm'} ${isPrev ? '-translate-x-20' : ''} ${isNext ? 'translate-x-20' : ''}`}
              >
                <div
                  className={clsx(
                    isClick
                      ? 'card-active relative h-64 w-52'
                      : 'relative h-64 w-52',
                  )}
                  onClick={() => handleToggle(index)}
                >
                  <div className="card-inner h-full w-full duration-700">
                    <div className="card-front backface-hidden absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-white text-black shadow-lg dark:bg-gray-800 dark:text-white">
                      <Image
                        src={card.src}
                        alt={card.alt}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-custom-blue"
                      />
                      <h3 className="absolute bottom-0 mt-2 w-full rounded bg-black bg-opacity-75 p-2 text-xl text-white">
                        {card.title}
                      </h3>
                    </div>
                    <div className="card-back backface-hidden absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-dark-blue p-4 text-white shadow-custom-black dark:bg-gray-800 dark:text-white">
                      <h3 className="text-xl">{card.backTitle}</h3>
                      <p className="mt-2">{card.backText}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="cards-container hidden h-full items-center justify-between md:flex">
        {cardsData.map((card, index) => (
          <div key={index} className="card relative h-64 w-52">
            <div className="card-inner transform-style preserve-3d h-full w-full transition-transform duration-700">
              <div className="card-front backface-hidden absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-white text-black shadow-lg dark:bg-gray-800 dark:text-white">
                <Image
                  src={card.src}
                  alt={card.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg shadow-custom-blue"
                />
                <h3 className="absolute bottom-0 mt-2 w-full rounded bg-black bg-opacity-75 p-2 text-xl text-white">
                  {card.title}
                </h3>
              </div>
              <div className="card-back backface-hidden rotate-y-180 absolute flex h-full w-full transform flex-col items-center justify-center rounded-lg bg-dark-blue p-4 text-white shadow-custom-black dark:bg-gray-800 dark:text-white">
                <h3 className="text-xl">{card.backTitle}</h3>
                <p className="mt-2">{card.backText}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaedAboutUs;
