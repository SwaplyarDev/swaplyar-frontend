'use client';
import React from 'react';
import CardBlue from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardBlue';
import CardYellow from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardYellow';

interface CardProps {
  memberCode: string;
  showVerify: boolean;
  setShowVerify: React.Dispatch<React.SetStateAction<boolean>>;
  verifiedStatus: string;
  sessionCardBlueYellow: boolean;
}

export const CardPlusRewards: React.FC<CardProps> = ({
  verifiedStatus,
  sessionCardBlueYellow,
  memberCode,
  showVerify,
  setShowVerify,
}) => {
  return (
    <>
      {sessionCardBlueYellow == true ? (
        <CardBlue memberCode={memberCode} />
      ) : sessionCardBlueYellow == false ? (
        <CardYellow
          showVerify={showVerify}
          setShowVerify={setShowVerify}
          verifiedStatus={verifiedStatus}
          memberCode={memberCode}
        />
      ) : (
        <div>cargando</div>
      )}
    </>
  );
};
