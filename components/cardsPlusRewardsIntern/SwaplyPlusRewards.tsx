import React, { useState, useEffect } from 'react';

import swaplyPlusRewards from '@/public/images/swaplyPlusRewards.png';
import Image from 'next/image';
import { CardPlusRewards } from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardPlusRewards';
import { PlusRewards } from '@/app/es/(auth)/auth/plus-rewards/page';
import CardPlusModal from './modals/CardPlusModal';
import ModalVerify from './modals/ModalVerify';
import AnimatedBlurredCircles from '../ui/animations/AnimatedBlurredCircles';
import AplicationStateContainer from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/AplicationStateContainer';
import { getPlusRewards } from '@/actions/plusRewards/plusRewards.actions';
import { useSession } from 'next-auth/react';

const SwaplyPlusRewards = ({ RewardsData }: { RewardsData: PlusRewards }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const { data: session } = useSession();
  const [stateSession, setStateSession] = useState('APROBADO');
  const [user, setUser] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const data = await getPlusRewards(session?.decodedToken.token || '');
        setStateSession(data.data.status);
        stateSession === 'APROBADO' && setUser(true);
      } catch (error) {
        console.error('Error obteniendo plusRewards:', error);
      }
    };

    fetchRewards();
  }, [session?.decodedToken.token, stateSession]);

  return (
    <>
      {/*<AnimatedBlurredCircles tope="z-10 absolute" />*/}

      <AplicationStateContainer stateSession={stateSession} />
      <AplicationStateContainer stateSession={stateSession} />
      {showModal && <CardPlusModal setShowModal={setShowModal} />}
      {showVerify && <ModalVerify showVerify={showVerify} setShowVerify={setShowVerify} />}
      <div className="relative z-10 mx-auto flex max-w-[500px] flex-col px-5 text-[40px] lg:max-w-[1200px] lg:px-[100px]">
        <h1 className="mb-10 mt-10 font-textFont font-medium sm:mt-20">SwaplyAr Plus Rewards</h1>

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
                </div>
              </div>
            </div>
          </div>

          <div className="relative my-auto items-center">
            <CardPlusRewards user={user} showVerify={showVerify} setShowVerify={setShowVerify} memberCode="2448XPAR" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SwaplyPlusRewards;
