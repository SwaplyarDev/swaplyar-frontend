'use client';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { AdminDiscountsResponse } from '@/types/discounts/adminDiscounts';

export function UserRewardsSection({ discounts }: { discounts: AdminDiscountsResponse }) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);
    
    const months = [
      'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
      'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} del ${month} del ${year}`;
  };

  return (
    <div className="rounded-lg border bg-white p-4 max-h-[653px] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent transition-all duration-300 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold dark:text-white">Recompensas en Plus Rewards</h3>
        <button
          onClick={toggleExpand}
          className="rounded-full p-1 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label={isExpanded ? 'Colapsar sección' : 'Expandir sección'}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mb-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Fecha de inscripción:</span>
            <span className="font-medium dark:text-gray-200">{formatDate(discounts.data.length > 0 ? discounts.data[0].user.createdAt : '')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Recompensas que obtuviste en {new Date().getFullYear()}:</span>
            <span className="font-medium dark:text-gray-200">{discounts.data.filter(reward => new Date(reward.createdAt).getFullYear() === new Date().getFullYear()).length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">Recompensas que obtuviste en total:</span>
            <span className="font-medium dark:text-gray-200">{discounts.data.length}</span>
          </div>
        </div> 

        {/* Rewards List */}
        <div className=" border rounded-lg">
          {discounts.data.map((reward, index) => (
            <div key={index} className="bg-white p-3 dark:border-gray-700 dark:bg-gray-700/50">
              <div className="mb-1 flex justify-between">
                <span className="font-medium dark:text-white">{reward.discountCode.value === 10 ? ("Cupón de Fidelización"):(reward.discountCode.value === 5 ? "Cupón de Verificacion" : "Cupón de Bienvenida")}: </span>
                <span className="font-bold text-green-600 dark:text-green-400">${reward.discountCode.value}{reward.discountCode.currencyCode}</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium dark:text-white">Fecha de Emisión:</span>
                  <span className="dark:text-gray-300">{formatDate(reward.createdAt)}</span>
                </div>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium dark:text-white">Tipo:</span>
                  <span className="dark:text-gray-300">Crédito de ${reward.discountCode.value} {reward.discountCode.currencyCode} aplicado en la siguiente transacción</span>
                </div>
              </div>
              
              {reward.isUsed ? (
                <>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium dark:text-white">Fecha de Uso:</span>
                    <span className="dark:text-gray-300">{reward.usedAt && formatDate(reward.usedAt)}</span>
                  </div>
                </div>
                
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium dark:text-white">Transaccion que la uso:</span>
                  </div>
                  <div className='border p-2 rounded-lg'> 
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">ID:</span>
                      <span className="dark:text-gray-300">{reward.transaction?.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Mensaje:</span>
                      <span className="dark:text-gray-300">{reward.transaction?.message}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Estado:</span>
                      <span className="dark:text-gray-300">{reward.transaction?.finalStatus}</span>
                    </div>
                  </div>
                </div>
                </>
              ):(<>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                    <span className="font-medium dark:text-white">Fecha de Uso:</span>
                      <span className="text-gray-600 dark:text-gray-400">Codigo sin uso</span>
                    </div>
                  </div>
              </>)}
              {index < discounts.data.length - 1 && (
                <span className="block w-full h-1 border-gray-200 border-b-2 p-2" />
              )}
            </div>
          ))} 
        </div>
      </div>
    </div>
  );
}
