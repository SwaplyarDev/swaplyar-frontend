'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';

type UserDiscount = {
  id: string;
  code: string;
  value: number;
  currencyCode: string;
  createdAt: string;
  usedAt?: string;
  isUsed: boolean;
};

interface Props {
  title?: string;
  history: UserDiscount[];
  registrationDate?: string;
  totalRewards?: number;
}

const ITEMS_PER_PAGE = 5;

const RewardsHistoryAccordion: React.FC<Props> = ({
  title = 'Historial de recompensas',
  history,
  registrationDate,
  totalRewards = 0,
}) => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  // 🧩 refs y animación
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('0px');
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
  if (open && contentRef.current) {
    setHeight(`${contentRef.current.scrollHeight}px`);
    setOpacity(1);
  } else {
    setHeight('0px');
    setOpacity(0);
  }
}, [open, history]);


  const totalPages = Math.ceil(history.length / ITEMS_PER_PAGE);

  const paginatedHistory = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return history.slice(start, end);
  }, [history, page]);

  const goPrev = () => setPage((p) => Math.max(p - 1, 1));
  const goNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="w-full max-w-[1000px] rounded-[16px] border border-gray-200 bg-white overflow-hidden">

      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className={`
          w-full flex flex-col gap-3 text-left transition-all
          ${open
            ? 'px-4 py-3 bg-gray-100 border-b border-gray-300 rounded-t-[16px]'
            : 'px-6 py-5'}
        `}
      >
        <div className="flex w-full items-center justify-between">
          <span
            className={`
              font-medium transition-all
              ${open
                ? 'text-[16px] text-[#6B7280]'
                : 'text-[18px] text-gray-600'}
            `}
          >
            {title}
          </span>

          <ChevronDown
            className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
              open ? 'rotate-180' : ''
            }`}
          />
        </div>

        {!open && (
          <div className="flex flex-col sm:flex-row gap-10 mt-2">
            <div className="flex flex-col">
              <span className="text-[12px] font-normal text-gray-400">
                Fecha de inscripción
              </span>
              <span className="text-[12px] font-light text-[#262626]">
                {registrationDate
                  ? new Date(registrationDate).toLocaleDateString()
                  : '-'}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] font-normal text-gray-400">
                Recompensas que has obtenido
              </span>
              <span className="text-[12px] font-light text-[#262626]">
                {totalRewards}
              </span>
            </div>
          </div>
        )}
      </button>

      {/* ✅ CONTENIDO ANIMADO */}
      <div
  style={{
    maxHeight: height,
    opacity,
  }}
  className={`
    overflow-hidden 
    transition-all 
    duration-300 
    ease-in
    border-t border-gray-200
  `}
>
        <div ref={contentRef}>
          {history.length === 0 ? (
            <div className="p-6 text-sm text-gray-500 text-center">
              Aún no tienes recompensas registradas
            </div>
          ) : (
            <>
              {/* TABLA */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-600 border-b">
                    <tr>
                      <th className="px-6 py-3 font-medium">Tipo de Cupón</th>
                      <th className="px-6 py-3 font-medium">Monto</th>
                      <th className="px-6 py-3 font-medium">Fecha de Emisión</th>
                      <th className="px-6 py-3 font-medium">Fecha de uso</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {paginatedHistory.map((item) => (
                      <tr key={item.id} className="text-gray-800">
                        <td className="px-6 py-4 text-blue-700 font-medium">
                          {item.code}
                        </td>
                        <td className="px-6 py-4">
                          {item.value} {item.currencyCode}
                        </td>
                        <td className="px-6 py-4">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          {item.usedAt
                            ? new Date(item.usedAt).toLocaleDateString()
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* PAGINACIÓN */}
{totalPages > 1 && (
  <div
    className="
      flex flex-col gap-3
      sm:flex-row sm:items-center sm:justify-between
      px-4 sm:px-6 py-4 sm:py-5 mt-4
    "
  >
    {/* Flecha izquierda */}
    <button
      onClick={goPrev}
      disabled={page === 1}
      className="
        w-[40px] h-[40px] sm:w-[48px] sm:h-[48px]
        flex items-center justify-center
        rounded-full border border-gray-200
        disabled:opacity-50
        mx-auto sm:mx-0
      "
    >
      <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
    </button>

    {/* Páginas */}
    <div
      className="
        flex flex-wrap justify-center gap-2
        max-w-full
      "
    >
      {Array.from({ length: totalPages }).map((_, i) => {
        const p = i + 1;
        return (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`
              w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]
              rounded-full text-xs sm:text-sm font-medium
              flex items-center justify-center
              transition-all
              ${
                page === p
                  ? 'bg-blue-50 text-blue-600 border border-blue-200 shadow-sm'
                  : 'text-gray-500 hover:bg-blue-50 hover:border hover:border-blue-200 hover:text-blue-600'
              }
            `}
          >
            {p}
          </button>
        );
      })}
    </div>

    {/* Flecha derecha */}
    <button
      onClick={goNext}
      disabled={page === totalPages}
      className="
        w-[40px] h-[40px] sm:w-[48px] sm:h-[48px]
        flex items-center justify-center
        rounded-full border border-gray-200
        disabled:opacity-50
        mx-auto sm:mx-0
      "
    >
      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
    </button>
  </div>
)}

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RewardsHistoryAccordion;
