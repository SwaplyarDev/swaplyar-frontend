import { CardBlue, CardYellow } from '@/components/cardPlusRewards/CardPlusRewards';
import React from 'react';

const CardPlus = () => {
  return (
    <div>
      <CardYellow />
      <CardBlue />
      <div className="py-6"></div>
    </div>
  );
};

export default CardPlus;
