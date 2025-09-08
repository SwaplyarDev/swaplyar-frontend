'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CardPlusRewards } from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardPlusRewards';
import { PlusRewards } from '@/app/es/(auth)/auth/plus-rewards/page';
import CardPlusModal from './modals/CardPlusModal';
import ModalVerify from './modals/ModalVerify';
import AplicationStateContainer from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/AplicationStateContainer';
import { useSession } from 'next-auth/react';

import { useVerificationStore } from '../../store/useVerificationStore';
import { swaplyPlusRewards } from '@/utils/assets/imgDatabaseCloudinary';
import { fetchAndHandleVerificationStatus } from '@/utils/verificationHandlers';

declare module 'next-auth' {
  interface Session {
    verification_status?: string;
  }
}

const SwaplyPlusRewards = ({ RewardsData }: { RewardsData: PlusRewards }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showRejectedMessage, setShowRejectedMessage] = useState(false);

  const { status: verifiedStatus, setStatus, setShowApprovedMessage } = useVerificationStore();

  const { data: session } = useSession();
  const token = session?.accessToken;

  const sessionCardBlueYellow = verifiedStatus === 'APROBADO';

  useEffect(() => {
    if (!token) return;
    fetchAndHandleVerificationStatus({
      token,
      setStatus,
      setShowRejectedMessage,
      setShowApprovedMessage,
    });
  }, [token, setStatus, setShowRejectedMessage, setShowApprovedMessage]);

  const LoadingState = () => (
    <p className="text-center text-gray-500">Cargando...</p>
  );

  const MainLayout = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div className="relative z-0 mx-auto mt-14 flex max-w-[500px] flex-col px-5 text-[40px] lg:max-w-[1200px] lg:px-[100px]">
    <h1 className="mb-4 font-textFont font-medium">SwaplyAr Plus Rewards</h1>
    <div className="relative z-0 mx-auto flex max-w-[1000px] flex-col gap-5 text-[16px] lg:flex-row">
      {left}
      <div className="relative my-auto items-center">{right}</div>
    </div>
  </div>
);

  const RewardsInfo = ({
    RewardsData,
    onShowModal,
  }: {
    RewardsData: PlusRewards;
    onShowModal: () => void;
  }) => (
    <div>
      <p>Consigue beneficios exclusivos cada vez que realices transacciones</p>
      <p>SwaplyAr Plus Rewards.</p>
      <div className="mb-4 mt-4 flex flex-col items-center">
        <Image
          src={swaplyPlusRewards}
          alt="swaplyPlusRewards"
          width={486}
          height={404}
          className="w-[356px] sm:w-[486px]"
        />
        <div className="relative mt-4 flex w-full flex-col">
          <p>Fecha de inscripción: {RewardsData.inscriptionDate}</p>
          <p>Recompensas que obtuviste en nov: {RewardsData.rewardsPerMonth}</p>
          <p>Recompensas que obtuviste en 2024: {RewardsData.rewardsPerYear}</p>
          <p
            className="mt-4 cursor-pointer self-end font-semibold underline"
            onClick={onShowModal}
          >
            Ver detalles
          </p>
        </div>
      </div>
    </div>
  );

  return (
  <>
    {!session ? (
      <LoadingState />
    ) : (
      <>
        <AplicationStateContainer showRejectedMessage={showRejectedMessage} />
        {showModal && <CardPlusModal setShowModal={setShowModal} />}
        {showVerify && (
          <ModalVerify
            showVerify={showVerify}
            setShowVerify={setShowVerify}
            verifiedStatus={verifiedStatus}
          />
        )}
        <MainLayout
          left={
            <RewardsInfo
              RewardsData={RewardsData}
              onShowModal={() => setShowModal(true)}
            />
          }
          right={
            <CardPlusRewards
              verifiedStatus={verifiedStatus}
              sessionCardBlueYellow={sessionCardBlueYellow}
              showVerify={showVerify}
              setShowVerify={setShowVerify}
              memberCode="2448XPAR"
            />
          }
        />
      </>
    )}
  </>
);
};

export default SwaplyPlusRewards;
