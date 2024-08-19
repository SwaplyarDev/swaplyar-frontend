"use client";
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
            prevIndex === cardsData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cardsData.length - 1 : prevIndex - 1
        );
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        preventScrollOnSwipe: true,
        trackMouse: true, 
    });

    return (
        <div className="relative w-full h-full">
            
            <div {...swipeHandlers} className="block md:hidden relative w-full h-64 overflow-hidden">
                <div className="relative flex items-center justify-center w-full h-full">
                    {cardsData.map((card, index) => {
                        const isCurrent = index === currentIndex;
                        const isNext = (index === (currentIndex + 1) % cardsData.length);
                        const isPrev = (index === (currentIndex - 1 + cardsData.length) % cardsData.length);

                        return (
                            <div
                                key={index}
                                className={`absolute transition-transform duration-700 ease-in-out 
                                ${isCurrent ? 'z-20 scale-100' : 'z-10 scale-90 blur-sm'}
                                ${isPrev ? '-translate-x-20' : ''}
                                ${isNext ? 'translate-x-20' : ''}
                                `}
                            >
                                <div className="card w-52 h-64 relative">
                                    <div className="card-inner w-full h-full duration-700">
                                        <div className="card-front absolute w-full h-full bg-white dark:bg-gray-800 text-black dark:text-white backface-hidden flex flex-col items-center justify-center rounded-lg shadow-lg">
                                            <Image 
                                                src={card.src} 
                                                alt={card.alt} 
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg shadow-custom-blue"
                                            />
                                            <h3 className="text-xl w-full mt-2 absolute bottom-0 bg-opacity-75 bg-black text-white p-2 rounded">{card.title}</h3>
                                        </div>
                                        <div className="card-back absolute w-full h-full bg-dark-blue shadow-custom-black dark:bg-gray-800 text-white dark:text-white backface-hidden flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
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

          
            <div className="hidden md:flex cards-container justify-between items-center h-full">
                {cardsData.map((card, index) => (
                    <div key={index} className="card w-52 h-64 relative">
                        <div className="card-inner w-full h-full transition-transform transform-style preserve-3d duration-700">
                            <div className="card-front absolute w-full h-full bg-white dark:bg-gray-800 text-black dark:text-white backface-hidden flex flex-col items-center justify-center rounded-lg shadow-lg">
                                <Image 
                                    src={card.src} 
                                    alt={card.alt} 
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-lg shadow-custom-blue"
                                />
                                <h3 className="text-xl w-full mt-2 absolute bottom-0 bg-opacity-75 bg-black text-white p-2 rounded">{card.title}</h3>
                            </div>
                            <div className="card-back absolute w-full h-full bg-dark-blue shadow-custom-black dark:bg-gray-800 text-white dark:text-white backface-hidden transform rotate-y-180 flex flex-col items-center justify-center p-4 rounded-lg shadow-lg">
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
