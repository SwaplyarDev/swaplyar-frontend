'use client';
import React from 'react';
import CardBlue from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardBlue';
import CardYellow from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardYellow';

interface CardProps {
  user: boolean;
  memberCode: string;
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardPlusRewards: React.FC<CardProps> = ({ user, memberCode, showVerify, setShowVerify }) => {
  return (
    <div>
      {user ? (
        <CardBlue memberCode={memberCode} />
      ) : (
        <CardYellow showVerify={showVerify} setShowVerify={setShowVerify} />
      )}
    </div>
  );
};
