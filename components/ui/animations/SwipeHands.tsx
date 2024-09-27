import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Importa el componente Image de Next.js
import { swipeGif } from '@/utils/assets/img-database';
import './swipehands.css';

const SwipeHands: React.FC = () => {
  const [showHands, setShowHands] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHands(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showHands && (
        <div className="overlay">
          <div className="swipe">
            <Image
              src={swipeGif}
              alt="Swipe Hands"
              width={175} // Ancho deseado
              height={75} // Alto deseado
              className="gif-image" // Clase adicional si necesitas
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SwipeHands;
