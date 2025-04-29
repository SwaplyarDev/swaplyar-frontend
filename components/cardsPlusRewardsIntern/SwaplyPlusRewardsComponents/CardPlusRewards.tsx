'use client';
import React from 'react';
import CardBlue from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardBlue';
import CardYellow from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardYellow';

interface CardProps {
  SessionState: string | undefined;
  memberCode: string;
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
  verifiedStatus: string;
}

export const CardPlusRewards: React.FC<CardProps> = ({
  verifiedStatus,
  SessionState,
  memberCode,
  showVerify,
  setShowVerify,
}) => {
  console.log('SessionState', SessionState);
  return (
    <>
      {SessionState === 'VERIFICADO' ? (
        <CardBlue memberCode={memberCode} />
      ) : (
        <CardYellow showVerify={showVerify} setShowVerify={setShowVerify} verifiedStatus={verifiedStatus} />
      )}
    </>
  );
};
