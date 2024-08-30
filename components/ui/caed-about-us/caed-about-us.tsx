'use client';
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import './CaedAboutUs.css';
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

  return (
    <div className="relative h-full w-full">
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

            return (
              <div
                key={index}
                className={`absolute transition-transform duration-700 ease-in-out ${isCurrent ? 'z-20 scale-100' : 'z-10 scale-90 blur-sm'} ${isPrev ? '-translate-x-20' : ''} ${isNext ? 'translate-x-20' : ''} `}
              >
                <div className="card relative h-64 w-52">
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
              <div className="card-back backface-hidden rotate-y-180 absolute flex h-full w-full transform flex-col items-center justify-center rounded-lg bg-dark-blue p-4 text-white shadow-custom-black shadow-lg dark:bg-gray-800 dark:text-white">
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