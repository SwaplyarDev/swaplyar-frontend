'use client';

import React, { useState, useEffect } from 'react';

import swaplyPlusRewards from '@/public/images/swaplyPlusRewards.png';
import Image from 'next/image';
import { CardPlusRewards } from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardPlusRewards';
import { PlusRewards } from '@/app/es/(auth)/auth/plus-rewards/page';
import CardPlusModal from './modals/CardPlusModal';
import ModalVerify from './modals/ModalVerify';
import AplicationStateContainer from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/AplicationStateContainer';
import {
  getPlusRewards,
  resendVerificationAfterRejection,
  updateVerificationStatus,
} from '@/actions/plusRewards/plusRewards.actions';
import { useSession } from 'next-auth/react';

declare module 'next-auth' {
  interface Session {
    verification_status?: string;
  }
}
import { useVerificationStore } from '../../store/useVerificationStore';
import { update } from '@/auth';

const SwaplyPlusRewards = ({ RewardsData }: { RewardsData: PlusRewards }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showRejectedMessage, setShowRejectedMessage] = useState(false);

  const { status: verifiedStatus, setStatus, showApprovedMessage, setShowApprovedMessage } = useVerificationStore();

  const { data: session } = useSession();
  const sesionCardTop = session?.accessToken;
  const tokenVerification = session?.user?.userVerification;

  const sessionCardBlueYellow = verifiedStatus === 'APROBADO';

  useEffect(() => {
    if (!sesionCardTop) return;

    const fetchVerificationStatus = async () => {
      try {
        const response = await getPlusRewards(sesionCardTop);
        const backendStatus = response.verification_status;
        setStatus(backendStatus);

        if (backendStatus === 'RECHAZADO') {
          if (!localStorage.getItem('verificationRejectedShown')) {
            setShowRejectedMessage(true);
            localStorage.setItem('verificationRejectedShown', 'true');

            setTimeout(() => {
              setShowRejectedMessage(false);
              setStatus('REENVIAR_DATOS');
            }, 5000);

            try {
              resendVerificationAfterRejection(sesionCardTop);
              await update({});
              console.log('Token actualizado tras RECHAZADO');
            } catch (err) {
              console.error('Error al actualizar token tras RECHAZADO:', err);
            }
          }
          return;
        } else {
          localStorage.removeItem('verificationRejectedShown');
        }

        if (backendStatus === 'APROBADO') {
          if (!localStorage.getItem('verificationApprovedShown')) {
            setShowApprovedMessage(true);
            localStorage.setItem('verificationApprovedShown', 'true');

            setTimeout(() => setShowApprovedMessage(false), 5000);

            try {
              await updateVerificationStatus(sesionCardTop);
              await update({});
              console.log('Token actualizado con verificación');
            } catch (err) {
              console.error('Error al actualizar token:', err);
            }
          }
        } else {
          localStorage.removeItem('verificationApprovedShown');
        }
      } catch (error) {
        console.error('Error al obtener el estado de verificación:', error);
        setStatus('REENVIAR_DATOS');
      }
    };

    fetchVerificationStatus();
  }, [sesionCardTop, setShowApprovedMessage, setStatus, session, tokenVerification]);

  return (
    <>
      {!session && <p>cargando...</p>}
      <AplicationStateContainer showRejectedMessage={showRejectedMessage} />
      {showModal && <CardPlusModal setShowModal={setShowModal} />}
      {showVerify && (
        <ModalVerify showVerify={showVerify} setShowVerify={setShowVerify} verifiedStatus={verifiedStatus} />
      )}
      <div className="relative z-0 mx-auto mt-14 flex max-w-[500px] flex-col px-5 text-[40px] lg:max-w-[1200px] lg:px-[100px]">
        <h1 className="mb-4 font-textFont font-medium">SwaplyAr Plus Rewards</h1>
        <div className="relative z-0 mx-auto flex max-w-[1000px] flex-col gap-5 text-[16px] lg:flex-row">
          <div>
            <p>Consigue beneficios exclusivos cada vez que realices transacciones</p>
            <p>SwaplyAr Plus Rewards.</p>
            <div>
              <div className="mb-4 mt-4 flex flex-col items-center">
                <Image
                  src={swaplyPlusRewards}
                  alt="swaplyPlusRewards"
                  width={486}
                  height={404}
                  className="w-[356px] sm:w-[486px]"
                />
                <div className="relative mt-4 flex w-full flex-col">
                  <p>Fecha de inscripción:  {RewardsData.inscriptionDate}</p>
                  <p>Recompensas que obtuviste en nov: {RewardsData.rewardsPerMonth}</p>
                  <p>Recompensas que obtuviste en 2024: {RewardsData.rewardsPerYear}</p>
                  <p
                    className="mt-4 cursor-pointer self-end font-semibold underline"
                    onClick={() => setShowModal(!showModal)}
                  >
                    Ver detalles
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative my-auto items-center">
            <CardPlusRewards
              verifiedStatus={verifiedStatus}
              sessionCardBlueYellow={sessionCardBlueYellow}
              showVerify={showVerify}
              setShowVerify={setShowVerify}
              memberCode="2448XPAR"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwaplyPlusRewards;
