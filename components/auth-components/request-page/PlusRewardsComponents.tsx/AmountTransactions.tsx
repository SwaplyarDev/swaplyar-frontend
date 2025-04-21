import React from 'react';
import Slider from '@mui/material/Slider';

function AmountTransactions() {
  const arrayStars = [
    '/images/star.png',
    '/images/star.png',
    '/images/star.png',
    '/images/star.png',
    '/images/star.png',
  ];
  return (
    <>
      <div className="flex">
        {arrayStars.map((star, index) => (
          <img
            key={index}
            src={star}
            alt="Star"
            className="mr-1 h-4 w-4 xs-mini-phone:h-5 xs-mini-phone:w-5 xs-phone:h-6 xs-phone:w-6 md-phone:h-7 md-phone:w-7"
          />
        ))}
      </div>
      <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" max={500} />
    </>
  );
}

export default AmountTransactions;
