'use client';

import React, { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import Image from 'next/image';
import { CardPlusRewards } from '@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/CardPlusRewards';
import { PlusRewards } from '@/app/es/(auth)/auth/plus-rewards/page';
import dynamic from 'next/dynamic';
const CardPlusModal = dynamic(() => import('./modals/CardPlusModal'));
const ModalVerify = dynamic(() => import('./modals/ModalVerify'));
const AplicationStateContainer = dynamic(
  () => import('@/components/cardsPlusRewardsIntern/SwaplyPlusRewardsComponents/AplicationStateContainer'),
);
import { signOut, useSession } from 'next-auth/react';

import { useVerificationStore } from '../../store/useVerificationStore';
import { shallow } from 'zustand/shallow';
import { swaplyPlusRewards } from '@/utils/assets/imgDatabaseCloudinary';
import { fetchAndHandleVerificationStatus } from '@/utils/verificationHandlers';

declare module 'next-auth' {
  interface Session {
    verification_status?: string;
    accessToken?: string;
  }
}

type UserDiscount = {
  id: string;
  code: string;
  value: number;
  currencyCode: string;
  createdAt: string;
  isUsed: boolean;
  updatedAt?: string;
};

interface RewardsStore {
  stars: { quantity: number; stars: number };
  history: UserDiscount[];
  fetchRewards: (token: string) => Promise<void>;
}

const SwaplyPlusRewards = ({ RewardsData }: { RewardsData: PlusRewards }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showRejectedMessage, setShowRejectedMessage] = useState(false);
  const [stars, setStars] = useState({ quantity: 0, stars: 0 });
  const [history, setHistory] = useState<UserDiscount[]>([]);

  const { status: verifiedStatus, setStatus, setShowApprovedMessage } = useVerificationStore(
    (s) => ({ status: s.status, setStatus: s.setStatus, setShowApprovedMessage: s.setShowApprovedMessage }),
    shallow,
  );

  const { data: session, update } = useSession();
  const token = session?.accessToken;

  const sessionCardBlueYellow = verifiedStatus === 'APROBADO';

  const isUpdatingRef = useRef(false);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); 
  const monthName = now.toLocaleString('es-AR', { month: 'short' });

  const rewardsPerYear = history.filter(
    reward => new Date(reward.createdAt).getFullYear() === currentYear
  ).length;

  const rewardsPerMonth = history.filter(reward => {
    const date = new Date(reward.createdAt);
    return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
  }).length;


  const safeUpdate = useCallback(async () => {
    if (isUpdatingRef.current) return null;
    isUpdatingRef.current = true;
    try {
      return await update();
    } finally {
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 300);
    }
  }, [update]);

  useEffect(() => {
    if (!token) return;
    // Si hubo error de refresh, cerrar sesión para evitar loops de Unauthorized
    if ((session as any)?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/es/iniciar-sesion' });
      return;
    }
    fetchAndHandleVerificationStatus({
      token,
      setStatus,
      setShowRejectedMessage,
      setShowApprovedMessage,
      update: safeUpdate,
    });
  }, [token, setStatus, setShowApprovedMessage, safeUpdate, session]);

  useEffect(() => {
  if (!session?.accessToken) return;

  const fetchRewards = async () => {
    try {
      const resHistory = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/discounts/user-discounts/me?filterType=all`,
        { headers: { Authorization: `Bearer ${session.accessToken}` } }
      );
      const dataHistory = await resHistory.json();

      setHistory(dataHistory);

      const mappedHistory: UserDiscount[] = (dataHistory.data || []).map((item: any) => ({
        id: item.id,
        code: item.discountCode?.code ?? "",
        value: item.discountCode?.value ?? 0,
        currencyCode: item.discountCode?.currencyCode ?? "USD",
        createdAt: item.createdAt,
        isUsed: item.isUsed,
        updatedAt: item.updatedAt,
      }));

      setHistory(mappedHistory);

      const resStars = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/discounts/stars`,
        { headers: { Authorization: `Bearer ${session.accessToken}` } }
      );
      const dataStars = await resStars.json();
      setStars(dataStars.data || { quantity: 0, stars: 0 });
    } catch (err) {
      console.error("Error cargando PlusRewards:", err);
    }
  };

  fetchRewards();
}, [session?.accessToken]);


  const LoadingState = memo(() => (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#012A8E] dark:border-[#EBE7E0]"></div>
    </div>
  ));
  LoadingState.displayName = 'LoadingState';

  const MainLayout = memo(({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
    <div className="relative z-0 mx-auto mt-14 flex max-w-[500px] flex-col px-5 text-[40px] lg:max-w-[1200px] lg:px-[100px]">
      <h1 className="mb-4 font-textFont font-medium">SwaplyAr Plus Rewards</h1>
      <div className="relative z-0 mx-auto flex max-w-[1000px] flex-col gap-5 text-[16px] lg:flex-row">
        {left}
        <div className="relative my-auto items-center">{right}</div>
      </div>
    </div>
  ));
  MainLayout.displayName = 'MainLayout';

  const RewardsInfo = memo(({
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
          <p>Fecha de inscripción: {session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : 'Desconocida'}</p>
          <p>Recompensas que obtuviste en {monthName}: {rewardsPerMonth}</p>
          <p>Recompensas que obtuviste en {currentYear}: {rewardsPerYear}</p>
          <p
            className="mt-4 cursor-pointer self-end font-semibold underline"
            onClick={onShowModal}
          >
            Ver detalles
          </p>
        </div>
      </div>
    </div>
  ));
  RewardsInfo.displayName = 'RewardsInfo';

  return (
  <>
    {!session ? (
      <LoadingState />
    ) : (
      <>
  <AplicationStateContainer showRejectedMessage={showRejectedMessage} />
  {showModal && <CardPlusModal setShowModal={setShowModal} stars={stars} history={history} />}
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
              memberCode={session.user?.id || '' }
            />
          }
        />
      </>
    )}
  </>
);
};

export default SwaplyPlusRewards;
