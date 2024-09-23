import React, { useEffect, useState } from 'react';
import './swipehands.css';

const SwipeHands: React.FC = () => {
  const [showHands, setShowHands] = useState(true);

  useEffect(() => {
    if (showHands) {
      const pathElement = document.querySelector(".path") as HTMLElement | null;
      const handIconElement = document.querySelector(".hand-icon") as HTMLElement | null;
      const touchHandElement = document.querySelector(".touch-hand") as HTMLElement | null;

      if (pathElement) {
        pathElement.style.animation = "swipe-dot 2s 0.5s infinite";
      }
      if (handIconElement) {
        handIconElement.style.animation = "swipe-hand 2s infinite  ";
      }
      if (touchHandElement) {
        touchHandElement.style.animation = "touch-gesture 1.5s infinite";
      }
    }

    const timer = setTimeout(() => {
      setShowHands(false); // Oculta las manos después de 4 segundos
    }, 4000);

    return () => clearTimeout(timer);
  }, [showHands]);

  return (
    <>
      {showHands && (
        <div className="overlay">
          <div className="swipe flex">
            <div className="path"></div>
            <div className="hand-icon"></div>
            <div className="touch-hand"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default SwipeHands;
