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
    <div className="w-full max-w-[1000px] rounded-[16px] border border-gray-200 dark:border-[#333333] bg-white dark:bg-[#1F1F1F] overflow-hidden">

      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex flex-col gap-3 text-left transition-all ${open
          ? 'px-4 py-3 bg-gray-100 dark:bg-[#2A2A2A] border-b border-gray-300 dark:border-[#333333] rounded-t-[16px]'
          : 'px-6 py-5'
          }`}
      >
        <div className="flex w-full items-center justify-between">
          <span
            className={`font-medium transition-all ${open
              ? 'text-[16px] text-[#6B7280] dark:text-[#B3B3B3]'
              : 'text-[18px] text-gray-600 dark:text-[#E5E5E5]'
              }`}
          >
            {title}
          </span>

          <ChevronDown
            className={`w-5 h-5 text-gray-500 dark:text-[#B3B3B3] transition-transform duration-300 ${open ? 'rotate-180' : ''
              }`}
          />
        </div>

        {!open && (
          <div className="flex flex-col sm:flex-row gap-10 mt-2">
            <div className="flex flex-col">
              <span className="text-[12px] text-gray-400 dark:text-[#9CA3AF]">
                Fecha de inscripción
              </span>
              <span className="text-[12px] text-[#262626] dark:text-[#E5E5E5]">
                {registrationDate
                  ? new Date(registrationDate).toLocaleDateString()
                  : '-'}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-[12px] text-gray-400 dark:text-[#9CA3AF]">
                Recompensas que has obtenido
              </span>
              <span className="text-[12px] text-[#262626] dark:text-[#E5E5E5]">
                {totalRewards}
              </span>
            </div>
          </div>
        )}
      </button>

      {/* CONTENIDO */}
      <div
        style={{ maxHeight: height, opacity }}
        className="overflow-hidden transition-all duration-300 ease-in border-t border-gray-200 dark:border-[#333333]"
      >
        <div ref={contentRef}>
          {history.length === 0 ? (
            <div className="p-6 text-sm text-gray-500 dark:text-[#9CA3AF] text-center">
              Aún no tienes recompensas registradas
            </div>
          ) : (
            <>
              {/* ✅ MOBILE VERSION */}
              <div className="sm:hidden flex flex-col">
                {paginatedHistory.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 border-t border-gray-200 dark:border-[#333333] dark:bg-[rgba(200,200,200,1)]"
                  >
                    <div className="text-xs text-gray-500">tipo de cupón</div>
                    <div className="text-sm text-blue-700 dark:text-[#B614FF] mb-2">
                      {item.code}
                    </div>

                    <div className="text-xs text-gray-500">Monto</div>
                    <div className="text-sm text-gray-800 dark:text-[#535862] mb-2">
                      {item.value} {item.currencyCode}
                    </div>

                    <div className="text-xs text-gray-500">Fecha de Emisión</div>
                    <div className="text-sm text-gray-800 dark:text-[#535862] mb-2">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </div>

                    <div className="text-xs text-gray-500">Fecha de uso</div>
                    <div className="text-sm text-gray-800 dark:text-[#535862]">
                      {item.usedAt
                        ? new Date(item.usedAt).toLocaleDateString()
                        : '-'}
                    </div>
                  </div>
                ))}
              </div>

              {/* ✅ DESKTOP TABLE */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="border-b border-gray-200 dark:bg-[#969696] dark:text-[#EBE7E0] dark:border-[#333333]">
                    <tr>
                      <th className="px-6 py-3 font-medium">Tipo de Cupón</th>
                      <th className="px-6 py-3 font-medium">Monto</th>
                      <th className="px-6 py-3 font-medium">Fecha de Emisión</th>
                      <th className="px-6 py-3 font-medium">Fecha de uso</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedHistory.map((item) => (
                      <tr
                        key={item.id}
                        className="border-t border-b border-[rgba(233,234,235,1)] dark:border-[rgba(233,234,235,1)] dark:bg-[rgba(200,200,200,1)]"
                      >
                        <td className="px-6 py-4 font-medium text-blue-700 dark:text-[#B614FF]">
                          {item.code}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-[#535862]">
                          {item.value} {item.currencyCode}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-[#535862]">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-gray-800 dark:text-[#535862]">
                          {item.usedAt
                            ? new Date(item.usedAt).toLocaleDateString()
                            : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ✅ PAGINACIÓN MOBILE */}
              {totalPages > 1 && (
                <div className="flex sm:hidden justify-center mt-4">
                  <div
                    className="
                     flex items-center justify-between
                      w-full max-w-[310px]
                        h-[54px]
                        px-6
                         border-[rgba(233,234,235,1)] dark:border-[#333333]
                        bg-[rgba(233,234,235,1)] dark:bg-transparent
                        rounded-b-[16px]
                      "
                  >
                    <button
                      onClick={goPrev}
                      disabled={page === 1}
                      className="
                          w-[38px] h-[38px]
                          flex items-center justify-center
                          rounded-full
                          bg-white
                          dark:bg-[#3A3A3A]
                          border border-transparent
                          dark:border-[#4A4A4A]
                          disabled:opacity-40
                        "
                    >
                      <ArrowLeft className="w-5 h-5 text-gray-800 dark:text-[#B3B3B3]" />
                    </button>

                    <button
                      onClick={goNext}
                      disabled={page === totalPages}
                      className="
                            w-[38px] h-[38px]
                            flex items-center justify-center
                            rounded-full
                            bg-white
                            dark:bg-[#3A3A3A]
                            border border-transparent
                            dark:border-[#4A4A4A]
                            disabled:opacity-40
                          "
                    >
                      <ArrowRight className="w-5 h-5 text-gray-800 dark:text-[#B3B3B3]" />
                    </button>
                  </div>
                </div>
              )}


              {/* ✅ PAGINACIÓN TABLET / DESKTOP */}
              {totalPages > 1 && (
                <div className="hidden sm:flex items-center justify-between px-6 py-4 mt-4">
                  <button
                    onClick={goPrev}
                    disabled={page === 1}
                    className="w-[48px] h-[48px] flex items-center justify-center rounded-full border border-gray-200 dark:border-[#333333]"
                  >
                    <ArrowLeft />
                  </button>

                  <div className="flex gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => {
                      const p = i + 1;
                      return (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`w-[40px] h-[40px] rounded-full flex items-center justify-center
                            ${page === p
                              ? 'bg-[rgba(233,234,235,1)] text-[rgba(37,37,38,1)]'
                              : 'text-gray-500 hover:bg-[rgba(240,240,240,1)] dark:hover:bg-[rgba(220,220,220,1)]'
                            }`}
                        >
                          {p}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={goNext}
                    disabled={page === totalPages}
                    className="w-[48px] h-[48px] flex items-center justify-center rounded-full border border-gray-200 dark:border-[#333333]"
                  >
                    <ArrowRight />
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
