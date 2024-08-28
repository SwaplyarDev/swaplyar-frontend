// /components/ui/caed-about-us/CaedAboutUs.tsx

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
  return (
    <div className="cards-container flex h-full items-center justify-center">
      {cardsData.map((card, index) => (
        <div key={index} className="card relative m-4 h-80 w-60">
          <div className="card-inner transform-style preserve-3d h-full w-full transition-transform duration-700">
            <div className="card-front backface-hidden absolute flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-4  shadow-lg dark:bg-gray-800 ">
              <Image
                src={card.src}
                alt={card.alt}
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
              <h3 className="absolute bottom-4 left-4 mt-2 rounded bg-black bg-opacity-75 p-2 text-xl text-white">
                {card.title}
              </h3>
            </div>
            <div className="card-back backface-hidden rotate-y-180 absolute flex h-full w-full transform flex-col items-center justify-center rounded-lg bg-white p-4  shadow-lg dark:bg-gray-800 ">
              <h3 className="text-xl">{card.backTitle}</h3>
              <p className="mt-2">{card.backText}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CaedAboutUs;
