'use client';
import React from 'react';
import CardBlue from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardBlue';
import CardYellow from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardYellow';

interface CardProps {
  verifiedStatus: string;
  memberCode: string;
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardPlusRewards: React.FC<CardProps> = ({ verifiedStatus, memberCode, showVerify, setShowVerify }) => {
  return (
    <>
      {verifiedStatus === 'aprobado' ? (
        <CardBlue memberCode={memberCode} />
      ) : (
        <CardYellow showVerify={showVerify} setShowVerify={setShowVerify} />
      )}
    </>
  );
};
