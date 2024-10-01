import React, { useEffect, useState } from 'react';
import Image from 'next/image'; 
import { swipeGif } from '@/utils/assets/img-database';
import './swipehands.css';

const SwipeHands: React.FC = () => {
  const [showHands, setShowHands] = useState(true);
  const [gifLoaded, setGifLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const img = new window.Image(); 
    img.src = swipeGif; 
    img.onload = () => setGifLoaded(true); 
  }, []);

  useEffect(() => {
    if (gifLoaded) {
      setTimeout(() => setIsMounted(true), 100);

      const timer = setTimeout(() => {
        setShowHands(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [gifLoaded]);

  return (
    <>
      {gifLoaded && (
        <div className={`overlay ${isMounted && showHands ? 'show' : ''}`}>
          <div className="swipe">
            <Image
              src={swipeGif}
              alt="Swipe Hands"
              width={375}
              height={175}
              unoptimized={true}
              priority={true}
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
