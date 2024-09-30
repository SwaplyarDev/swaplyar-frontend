import React, { useEffect, useState } from 'react';
import Image from 'next/image'; // Importa el componente Image de Next.js
import { swipeGif } from '@/utils/assets/img-database';
import './swipehands.css';

const SwipeHands: React.FC = () => {
  const [showHands, setShowHands] = useState(true);
  const [gifLoaded, setGifLoaded] = useState(false);

  useEffect(() => {
    // Precarga el GIF para asegurarte de que esté listo
    const img = new window.Image(); // Crear una nueva instancia de Image
    img.src = swipeGif; // Asigna la URL del GIF
    img.onload = () => setGifLoaded(true); // Marca el GIF como cargado una vez que esté listo
  }, []);

  useEffect(() => {
    if (gifLoaded) {
      // Temporizador para ocultar el GIF después de 5 segundos
      const timer = setTimeout(() => {
        setShowHands(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [gifLoaded]);

  return (
    <>
      {showHands && gifLoaded && (
        <div className="overlay">
          <div className="swipe">
          <Image
  src={swipeGif}
  alt="Swipe Hands"
  width={175}
  height={75}
  unoptimized={true}
  priority={true} // Asegura que esta imagen se cargue con mayor prioridad
  className={`gif-image ${gifLoaded ? 'gif-loaded' : ''}`}
  loading="eager"
/>

          </div>
        </div>
      )}
    </>
  );
};

export default SwipeHands;
