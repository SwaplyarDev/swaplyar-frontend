import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

interface UserDiscount {
  id: string;
  code: string;
  value: number;
  currencyCode: string;
  createdAt: string;
  isUsed: boolean;
  usedAt?: string;
}

interface StarsProgress {
  quantity: number;
  stars: number;
}

const now = new Date();
const currentYear = now.getFullYear();
const monthName = now.toLocaleString('es-AR', { month: 'short' });

const getDiscountsPerMonth = (history: UserDiscount[]) => {
  if (!Array.isArray(history)) {
    console.log('getDiscountsPerMonth: history is not an array:', history);
    return 0;
  }
  return history.filter(d => {
    if (!d?.createdAt) return false;
    const date = new Date(d.createdAt);
    return (
      date.getFullYear() === currentYear &&
      date.getMonth() === now.getMonth()
    );
  }).length;
};

const getDiscountsPerYear = (history: UserDiscount[]) => {
  if (!Array.isArray(history)) {
    console.log('getDiscountsPerYear: history is not an array:', history);
    return 0;
  }
  return history.filter(d => {
    if (!d?.createdAt) return false;
    const date = new Date(d.createdAt);
    return date.getFullYear() === currentYear;
  }).length;
};


const CardPlusModal = ({ setShowModal, stars, history }: { setShowModal: React.Dispatch<React.SetStateAction<boolean>>, stars: StarsProgress, history: UserDiscount[] }) => {
const { data: session } = useSession();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  // Debug: Log de los props recibidos
  useEffect(() => {
    console.log('CardPlusModal - History prop received:', history);
    console.log('CardPlusModal - History length:', history?.length);
    console.log('CardPlusModal - Stars prop received:', stars);
  }, [history, stars]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="relative mx-2 h-[96%] max-h-[720px] w-full max-w-[896px] overflow-y-auto rounded-2xl bg-white px-6 pt-8 dark:bg-[#4b4b4b]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-4 top-2 text-2xl"
          onClick={() => setShowModal(false)}
        >
          ✕
        </button>

        <h1 className="mb-4 text-center text-2xl font-semibold">Más información sobre Plus Rewards</h1>

        <h3>Fecha de inscripción: <b>{session?.user?.createdAt ? new Date(session.user.createdAt).toLocaleDateString() : 'Desconocida'}</b></h3>
        <h3>
          Recompensas que obtuviste en {monthName}:{" "}
          <b>{getDiscountsPerMonth(history)}</b>
        </h3>
        <h3>
          Recompensas que obtuviste en {currentYear}:{" "}
          <b>{getDiscountsPerYear(history)}</b>
        </h3>

        <h2 className="mt-6 mb-3 text-lg font-semibold">Historial de Recompensas</h2>

        <section className="max-h-[450px] overflow-y-auto rounded-2xl border-2 border-blue-800 p-4">
          {!Array.isArray(history) || history.length === 0 ? (
            <p className="text-center text-gray-400">
              {!Array.isArray(history) ? 'Error cargando datos...' : 'Todavía no tenés recompensas'}
            </p>
          ) : (
            history.map((elem) => (
              <div key={elem.id} className="mb-4">
                <p><b>Cupón:</b> {elem.code}</p>
                <p><b>Valor:</b> ${elem.value} {elem.currencyCode}</p>
                <p><b>Fecha de Emisión:</b> {new Date(elem.createdAt).toLocaleDateString()}</p>
                <p><b>Estado:</b> {elem.isUsed ? "Usado" : "Disponible"}</p>
                {elem.usedAt && <p><b>Fecha de Uso:</b> {new Date(elem.usedAt).toLocaleDateString()}</p>}
                <hr className="mt-2 border-gray-300" />
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};

export default CardPlusModal;

