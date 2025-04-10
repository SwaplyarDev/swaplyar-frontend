'use client';
import React from 'react';
import SwaplyPlusRewards from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewards';

export interface PlusRewards {
  inscriptionDate: string;
  rewardsPerYear: number;
  rewardsPerMonth: number;
}
const CardPlus = () => {
  const RewardsData: PlusRewards = {
    inscriptionDate: '5 jun 2025',
    rewardsPerYear: 5,
    rewardsPerMonth: 3,
  };
  return (
    <>
      <SwaplyPlusRewards RewardsData={RewardsData} />
    </>
  );
};

export default CardPlus;
