'use client';

import React, { useState } from 'react';

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

const RewardsHistoryAccordion: React.FC<Props> = ({
    title = 'Historial de recompensas',
    history,
    registrationDate,
    totalRewards = 0,
}) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full max-w-[1000px] rounded-[16px] border border-gray-200 bg-white overflow-hidden">

            {/* HEADER */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex flex-col gap-3 px-6 py-5 text-left"
            >
                {/* Título + Flecha */}
                <div className="flex w-full items-center justify-between">
                    <span className="font-medium text-[18px] text-gray-600">
                        {title}
                    </span>

                    <svg
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${open ? 'rotate-180' : ''
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </div>

                {/* RESUMEN CUANDO ESTÁ CERRADO */}
                {!open && (
                    <div className="flex flex-col sm:flex-row gap-10 mt-2">

                        {/* Fecha de inscripción */}
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

                        {/* Recompensas obtenidas */}
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


            {/* CONTENIDO DESPLEGABLE */}
            {open && (
                <div className="border-t border-gray-200">

                    {history.length === 0 ? (
                        <div className="p-6 text-sm text-gray-500 text-center">
                            Aún no tienes recompensas registradas
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-50 text-gray-600">
                                    <tr>
                                        <th className="px-6 py-3 font-medium">Tipo de Cupón</th>
                                        <th className="px-6 py-3 font-medium">Monto</th>
                                        <th className="px-6 py-3 font-medium">Fecha de Emisión</th>
                                        <th className="px-6 py-3 font-medium">Fecha de uso</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-100">
                                    {history.map((item) => (
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
                    )}

                </div>
            )}
        </div>
    );
};

export default RewardsHistoryAccordion;
