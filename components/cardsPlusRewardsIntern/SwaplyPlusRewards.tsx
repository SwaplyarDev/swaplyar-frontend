import React, { useState, useEffect } from 'react';

import swaplyPlusRewards from '@/public/images/swaplyPlusRewards.png';
import Image from 'next/image';
import { CardPlusRewards } from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardPlusRewards';
import { PlusRewards } from '@/app/es/(auth)/auth/plus-rewards/page';
import CardPlusModal from './modals/CardPlusModal';
import ModalVerify from './modals/ModalVerify';
import AplicationStateContainer from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/AplicationStateContainer';
import { getPlusRewards } from '@/actions/plusRewards/plusRewards.actions';
import { getSession, signIn, useSession } from 'next-auth/react';
import { useVerificationStore } from '../../store/useVerificationStore';

const SwaplyPlusRewards = ({ RewardsData }: { RewardsData: PlusRewards }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVerify, setShowVerify] = useState(false);

  const { status: verifiedStatus, setStatus, showApprovedMessage, setShowApprovedMessage } = useVerificationStore();

  const { data: session } = useSession();
  const sesionCardTop = session?.accessToken;

  const sessionCardBlueYellow = verifiedStatus === 'VERIFICADO';

  useEffect(() => {
    if (!sesionCardTop) return;

    const fetchVerificationStatus = async () => {
      try {
        const response = await getPlusRewards(sesionCardTop);
        const backendStatus = response.verification_status || 'NO_VERIFICADO';
        setStatus(backendStatus);

        if (backendStatus !== 'VERIFICADO') {
          localStorage.removeItem('verificationApprovedShown');
        }

        if (backendStatus === 'VERIFICADO' && !localStorage.getItem('verificationApprovedShown')) {
          setShowApprovedMessage(true);
          localStorage.setItem('verificationApprovedShown', 'true');
          setTimeout(() => setShowApprovedMessage(false), 5000);
        }
      } catch (error) {
        console.error('Error al obtener el estado de verificación:', error);
        setStatus('NO_VERIFICADO');
      }
    };

    fetchVerificationStatus();
  }, [sesionCardTop, setShowApprovedMessage, setStatus]);

  useEffect(() => {
    if (verifiedStatus === 'VERIFICADO') {
      getSession().then((session) => {
        console.log('Sesión actualizada:', session);
      });
    }
  }, [verifiedStatus]);

  // const simularVerificacion = () => {
  //   // setStatus('NO_VERIFICADO');
  //   setStatus('PENDIENTE');
  //   setTimeout(() => {
  //     setStatus('VERIFICADO');
  //     // setStatus('PENDIENTE');
  //     // setStatus('RECHAZADO');
  //     setShowApprovedMessage(true);

  //     setTimeout(() => {
  //       setShowApprovedMessage(false);
  //     }, 5000);
  //   }, 5000);
  // };

  return (
    <>
      {/* <AnimatedBlurredCircles tope="z-10 absolute" /> */}
      {!session && <p>cargando...</p>}

      <AplicationStateContainer />

      {showModal && <CardPlusModal setShowModal={setShowModal} />}
      {showVerify && (
        <ModalVerify showVerify={showVerify} setShowVerify={setShowVerify} verifiedStatus={verifiedStatus} />
      )}

      <div className="relative z-10 mx-auto mt-16 flex max-w-[500px] flex-col px-5 text-[40px] lg:max-w-[1200px] lg:px-[100px]">
        <h1 className="mb-10 font-textFont font-medium">SwaplyAr Plus Rewards</h1>

        <div className="relative z-10 mx-auto flex max-w-[1000px] flex-col gap-5 text-[16px] lg:flex-row">
          <div>
            <p>Consigue beneficios exclusivos cada vez que realices transacciones</p>
            <p>SwaplyAr Plus Rewards.</p>
            <div>
              <div className="flex flex-col items-center">
                <Image
                  src={swaplyPlusRewards}
                  alt="swaplyPlusRewards"
                  width={486}
                  height={404}
                  className="w-[356px] sm:w-[486px]"
                />
                <div className="relative flex w-full flex-col">
                  <p>Fecha de inscripción:  {RewardsData.inscriptionDate}</p>
                  <p>Recompensas que obtuviste en nov: {RewardsData.rewardsPerMonth}</p>
                  <p>Recompensas que obtuviste en 2024: {RewardsData.rewardsPerYear}</p>
                  <p
                    className="cursor-pointer self-end font-semibold underline"
                    onClick={() => setShowModal(!showModal)}
                  >
                    Ver detalles
                  </p>
                  {/* <button
                    onClick={simularVerificacion}
                    className="w-[35%] self-center bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Simular verificación
                  </button> */}
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
