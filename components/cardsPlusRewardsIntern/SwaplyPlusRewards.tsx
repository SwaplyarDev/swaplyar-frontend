'use client';

import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
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
import RewardsHistoryAccordion from './SwaplyPlusRewardsComponents/RewardsHistoryAccordion';

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
  usedAt?: string;
};

const SwaplyPlusRewards = ({ RewardsData }: { RewardsData: PlusRewards }) => {
  const [showModal, setShowModal] = useState(false);
  const [showVerify, setShowVerify] = useState(false);
  const [showRejectedMessage, setShowRejectedMessage] = useState(false);
  const [stars, setStars] = useState({ quantity: 0, stars: 0 });
  const [history, setHistory] = useState<UserDiscount[]>([]);

  const {
    status: verifiedStatus,
    setStatus,
    setShowApprovedMessage,
  } = useVerificationStore(
    (s) => ({ status: s.status, setStatus: s.setStatus, setShowApprovedMessage: s.setShowApprovedMessage }),
    shallow,
  );

  const { data: session, update } = useSession();
  console.log('🟪 Session in SwaplyPlusRewards:', session);
  const token = session?.accessToken;
  const sessionCardBlueYellow = verifiedStatus === 'APROBADO';
  const isUpdatingRef = useRef(false);

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const monthName = now.toLocaleString('es-AR', { month: 'short' });

  const rewardsPerYear = Array.isArray(history)
    ? history.filter(
      (reward) => reward?.createdAt && new Date(reward.createdAt).getFullYear() === currentYear,
    ).length
    : 0;

  const rewardsPerMonth = Array.isArray(history)
    ? history.filter((reward) => {
      if (!reward?.createdAt) return false;
      const date = new Date(reward.createdAt);
      return date.getFullYear() === currentYear && date.getMonth() === currentMonth;
    }).length
    : 0;

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
  const hasUpdatedSessionRef = useRef(false);
  useEffect(() => {
    if (!token) return;
    if ((session as any)?.error === 'RefreshAccessTokenError') {
      signOut({ callbackUrl: '/es/iniciar-sesion' });
      return;
    }
    const verifyStatus = async () => {
      await fetchAndHandleVerificationStatus({
        token,
        setStatus,
        setShowRejectedMessage,
        setShowApprovedMessage,
        update: safeUpdate, // safeUpdate sigue pasando, pero no se usa dentro del handler
        session,
      });

      // ✅ Si el estado es APROBADO, actualizamos sesión desde aquí
      if (!hasUpdatedSessionRef.current && verifiedStatus === 'APROBADO') {
        console.log('🔑 Actualizando sesión desde SwaplyPlusRewards');
        await update({
          user: {
            ...(session?.user || {}),
            userValidated: true,
          },
        });
        hasUpdatedSessionRef.current = true;
      }
    };

    verifyStatus();


  }, [token, setStatus, setShowApprovedMessage, safeUpdate, session, update]);

  useEffect(() => {
    if (!session?.accessToken) return;

    /**
     * Obtiene el historial de recompensas y las estrellas actuales del usuario.
     * Esta función se ejecuta cuando la sesión se actualiza.
     */
    const fetchRewards = async () => {
      try {
        // Historial de cupones usados
        const resHistory = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/discounts/user-history`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } },
        );
        console.log('Fetch history response status:', resHistory.status);
        console.log('Fetch history response ok:', resHistory.ok);
        if (resHistory.ok) {
          const response = await resHistory.json();
          console.log('Full history response:', response);
          const dataHistory: UserDiscount[] = response.data || [];
          console.log('History data extracted:', dataHistory);
          console.log('Is array?', Array.isArray(dataHistory));
          console.log('Length:', dataHistory?.length);
          setHistory(Array.isArray(dataHistory) ? dataHistory : []);
        } else if (resHistory.status === 404) {
          // Usuario sin verificación - inicializar con array vacío
          setHistory([]);
          console.log('Usuario sin historial de recompensas (verificación no encontrada)');
        } else {
          throw new Error(`Error en historial: ${resHistory.status} ${resHistory.statusText}`);
        }

        // Recompensas actuales
        const resStars = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/discounts/stars`,
          { headers: { Authorization: `Bearer ${session.accessToken}` } },
        );

        if (resStars.ok) {
          const { data: starsData } = await resStars.json();
          setStars(starsData ?? { quantity: 0, stars: 0 });
        } else if (resStars.status === 404) {
          // Usuario sin verificación - inicializar con valores por defecto
          setStars({ quantity: 0, stars: 0 });
          console.log('Usuario sin estrellas (verificación no encontrada)');
        } else {
          throw new Error(`Error en estrellas: ${resStars.status} ${resStars.statusText}`);
        }
      } catch (err) {
        console.error('Error al cargar recompensas:', err);
        // Inicializar con valores por defecto en caso de error
        setHistory([]);
        setStars({ quantity: 0, stars: 0 });
      }
    };

    fetchRewards();
  }, [session?.accessToken]);

  // Debug: Log del estado history cuando cambie
  useEffect(() => {
    console.log('History state updated:', history);
    console.log('History length:', history.length);
  }, [history]);

  const LoadingState = memo(() => (
    <div className="flex min-h-[50vh] w-full items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#012A8E] dark:border-[#EBE7E0]"></div>
    </div>
  ));
  LoadingState.displayName = 'LoadingState';

  const MainLayout = memo(
    ({ left, right, bottom }: { left: React.ReactNode; right: React.ReactNode; bottom?: React.ReactNode }) => (
      <div className="
      relative z-0 mx-auto mt-14 
      flex flex-col 
      max-w-[500px] px-5 
      lg:max-w-[1200px] lg:px-[100px]
    ">

        {/* TÍTULO */}
        <h1 className="font-textFont text-[40px] font-medium mb-2">
          SwaplyAr Plus Rewards
        </h1>

        {/* DESCRIPCIÓN */}
        <p className="text-[16px] mb-2">
          Consigue beneficios exclusivos cada vez que realices transacciones
          SwaplyAr Plus Rewards.
        </p>

        {/* BLOQUE PRINCIPAL */}
        <div
          className="
        flex flex-col 
        lg:flex-row 
        items-center
        justify-center
        gap-[20px]
        max-w-[1000px]
        mx-auto      /* ← ESTO VUELVE A CENTRAR TODO */
        mt-[40px]"
        >
          {/* LEFT */}
          <div className="flex-shrink-0 w-full lg:w-[361.5px]">
            {left}
          </div>

          {/* RIGHT */}
          <div className="flex-shrink-0 w-[340px] h-[200px]">
            {right}
          </div>
        </div>

        {/* BLOQUE INFERIOR */}
        {bottom && (
          <div className="mt-10 max-w-[1000px] mx-auto w-full">
            {bottom}
          </div>
        )}
      </div>
    )
  );

  MainLayout.displayName = 'MainLayout';



  const RewardsInfo = memo(({ onShowModal }: { onShowModal: () => void }) => (
    <div className="flex flex-col">

      {/* Contenedor exacto → 361.5 × 300 */}
      <div className="
      flex items-center justify-center
      w-full 
      h-[300px]
      lg:w-[361.5px]
      overflow-hidden
    ">
        <Image
          src={swaplyPlusRewards}
          alt="swaplyPlusRewards"
          width={486}
          height={404}
          className="
          w-full 
          h-full 
          object-contain
        "
        />
      </div>

    </div>
  ));

  RewardsInfo.displayName = 'RewardsInfo';


  const RewardsHistoryInfo = memo(
    ({
      monthName,
      rewardsPerMonth,
      currentYear,
      rewardsPerYear,
      session,
      onShowModal,
    }: any) => (
      <div className="mt-6 flex w-full flex-col text-start">

        <p>
          Fecha de inscripción:{' '}
          {session?.user?.createdAt
            ? new Date(session.user.createdAt).toLocaleDateString()
            : 'Desconocida'}
        </p>

        <p>
          Recompensas que obtuviste en {monthName}: {rewardsPerMonth}
        </p>

        <p>
          Recompensas que obtuviste en {currentYear}: {rewardsPerYear}
        </p>

        <p
          className="mt-4 cursor-pointer self-end font-semibold underline"
          onClick={onShowModal}
        >
          Ver detalles
        </p>
      </div>
    )
  );
  RewardsHistoryInfo.displayName = 'RewardsHistoryInfo';




  return (
    <>
      {!session ? (
        <LoadingState />
      ) : (
        <>
          <AplicationStateContainer showRejectedMessage={showRejectedMessage} />
          {showModal && <CardPlusModal setShowModal={setShowModal} stars={stars} history={history} />}
          {showVerify && (
            <ModalVerify showVerify={showVerify} setShowVerify={setShowVerify} verifiedStatus={verifiedStatus} />
          )}
          <MainLayout
            left={
              <RewardsInfo
                onShowModal={() => setShowModal(true)}
              />
            }
            right={
              <CardPlusRewards
                verifiedStatus={verifiedStatus}
                sessionCardBlueYellow={sessionCardBlueYellow}
                showVerify={showVerify}
                setShowVerify={setShowVerify}
                memberCode={session.user?.id || ''}
              />
            }
            bottom={
              <RewardsHistoryAccordion
                history={MOCK_HISTORY}
                registrationDate={session?.user?.createdAt}
                totalRewards={MOCK_HISTORY.length}
              />
            }
          />
        </>
      )}
    </>
  );
};

export default SwaplyPlusRewards;
// Mock data for testing
const MOCK_HISTORY: UserDiscount[] = [
  {
    id: '1',
    code: 'Cupon de Bienvenida',
    value: 10,
    currencyCode: 'USD',
    createdAt: '2024-01-05T00:00:00Z',
    usedAt: '2024-01-10T00:00:00Z',
    isUsed: true,
  },
  {
    id: '2',
    code: 'Cupon de Fidelizacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-01-15T00:00:00Z',
    usedAt: '2024-01-20T00:00:00Z',
    isUsed: true,
  },
  {
    id: '3',
    code: 'Cupon de Verificacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-02-01T00:00:00Z',
    usedAt: '2024-02-05T00:00:00Z',
    isUsed: true,
  },
  {
    id: '4',
    code: 'Cupon de Referido',
    value: 3,
    currencyCode: 'USD',
    createdAt: '2024-02-10T00:00:00Z',
    usedAt: '2024-02-12T00:00:00Z',
    isUsed: true,
  },
  {
    id: '5',
    code: 'Cupon de Fidelizacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-02-20T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '6',
    code: 'Cupon Premium',
    value: 15,
    currencyCode: 'USD',
    createdAt: '2024-03-01T00:00:00Z',
    usedAt: '2024-03-03T00:00:00Z',
    isUsed: true,
  },
  {
    id: '7',
    code: 'Cupon de Bienvenida',
    value: 10,
    currencyCode: 'USD',
    createdAt: '2024-03-10T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '8',
    code: 'Cupon de Referido',
    value: 3,
    currencyCode: 'USD',
    createdAt: '2024-03-15T00:00:00Z',
    usedAt: '2024-03-20T00:00:00Z',
    isUsed: true,
  },
  {
    id: '9',
    code: 'Cupon de Fidelizacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-03-25T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '10',
    code: 'Cupon Promo Especial',
    value: 20,
    currencyCode: 'USD',
    createdAt: '2024-04-01T00:00:00Z',
    usedAt: '2024-04-02T00:00:00Z',
    isUsed: true,
  },
  {
    id: '11',
    code: 'Cupon de Verificacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-04-05T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '12',
    code: 'Cupon de Fidelizacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-04-10T00:00:00Z',
    usedAt: '2024-04-12T00:00:00Z',
    isUsed: true,
  },
  {
    id: '13',
    code: 'Cupon Premium',
    value: 15,
    currencyCode: 'USD',
    createdAt: '2024-04-20T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '14',
    code: 'Cupon de Referido',
    value: 3,
    currencyCode: 'USD',
    createdAt: '2024-05-01T00:00:00Z',
    usedAt: '2024-05-03T00:00:00Z',
    isUsed: true,
  },
  {
    id: '15',
    code: 'Cupon de Bienvenida',
    value: 10,
    currencyCode: 'USD',
    createdAt: '2024-05-05T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '16',
    code: 'Cupon de Fidelizacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-05-10T00:00:00Z',
    usedAt: '2024-05-15T00:00:00Z',
    isUsed: true,
  },
  {
    id: '17',
    code: 'Cupon Promo Especial',
    value: 20,
    currencyCode: 'USD',
    createdAt: '2024-05-20T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '18',
    code: 'Cupon de Verificacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-06-01T00:00:00Z',
    usedAt: '2024-06-03T00:00:00Z',
    isUsed: true,
  },
  {
    id: '19',
    code: 'Cupon de Bienvenida',
    value: 10,
    currencyCode: 'USD',
    createdAt: '2024-06-05T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '20',
    code: 'Cupon de Fidelizacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-06-10T00:00:00Z',
    usedAt: '2024-06-12T00:00:00Z',
    isUsed: true,
  },
  {
    id: '21',
    code: 'Cupon de Referido',
    value: 3,
    currencyCode: 'USD',
    createdAt: '2024-06-15T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '22',
    code: 'Cupon Premium',
    value: 15,
    currencyCode: 'USD',
    createdAt: '2024-06-20T00:00:00Z',
    usedAt: '2024-06-22T00:00:00Z',
    isUsed: true,
  },
  {
    id: '23',
    code: 'Cupon Promo Especial',
    value: 20,
    currencyCode: 'USD',
    createdAt: '2024-06-25T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
  {
    id: '24',
    code: 'Cupon de Verificacion',
    value: 5,
    currencyCode: 'USD',
    createdAt: '2024-07-01T00:00:00Z',
    usedAt: '2024-07-03T00:00:00Z',
    isUsed: true,
  },
  {
    id: '25',
    code: 'Cupon de Bienvenida',
    value: 10,
    currencyCode: 'USD',
    createdAt: '2024-07-05T00:00:00Z',
    usedAt: undefined,
    isUsed: false,
  },
];
