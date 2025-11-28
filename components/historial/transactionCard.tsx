'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import type { TransactionData } from '@/types/transaction';
import { isCompleted, formatDate, formatTime, getEstadoEspanol } from '../../utils/transactionHelpers';
import ExpandedTransactionDetails from './ExpandedTransactionDetails';
import TransactionBadge from './TransactionBadge';

interface TransactionCardProps {
  transaction: TransactionData;
  index: number;
}


export function TransactionCard({ transaction, index }: TransactionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const completada = isCompleted(transaction.finalStatus);
  const fecha = formatDate(transaction.createdAt);
  const horario = formatTime(transaction.createdAt);

  // Obtener el nombre del destinatario según la información disponible
  // Prioridad: email > documento > cuenta
  const nombreDestinatario = 
    transaction.receiverAccount.paymentMethod.email || 
    transaction.receiverAccount.paymentMethod.documento || 
    transaction.receiverAccount.paymentMethod.cuenta || 
    'Sin información';
  const nombreSolicitante = `${transaction.senderAccount.firstName} ${transaction.senderAccount.lastName}`;

  const montoEnviado = `${transaction.amount.amountSent} ${transaction.amount.currencySent}`;
  const montoRecibido = `${transaction.amount.amountReceived} ${transaction.amount.currencyReceived}`;

  const capitalizar = (texto: string) => texto.charAt(0).toUpperCase() + texto.slice(1);

  return (
    <Card className="relative w-full max-w-[1000px] overflow-hidden rounded-xl bg-custom-whiteD-500 dark:bg-custom-grayD-800 shadow-md border-0 transition-shadow cursor-pointer" onClick={toggleExpand}>
      <CardContent className="p-2.5">
        <div className="relative">
          <div className='flex justify-between'>
            <div className="text-custom-grayD-700 text-sm dark:text-white">{fecha}</div>
            <div className="flex justify-end">
              <button className="text-custom-blue transition-all dark:text-[#EBE7E0]">
                {expanded ? (
                  <ChevronUp className="size-5 hover:text-[#2a68fe] dark:hover:text-[#323232]" />
                ) : (
                    <ChevronDown className="size-5 hover:text-[#2a68fe] dark:hover:text-[#323232]" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-start justify-between">

            <div className="flex-1 text-start">
              <div className="flex flex-col sm:flex-row sm:gap-2">
                <h3 className="h-6 font-textFont text-lightBlue text-base md:text-2xl font-normal leading-tight dark:text-white">
                  N° de Solicitud #{transaction.id}
                </h3>
              </div>
            </div>

            <TransactionBadge status={transaction.finalStatus} />
          </div>


          <div className={`pt-7 pb-3 px-4 grid grid-cols-2 text-sm md:text-base ${expanded ? 'hidden' : 'block'}`}>
            <div className="text-custom-grayD-800 dark:text-white">
              Estado de la Solicitud
            </div>
            <div className={`text-right text-custom-grayD-800 dark:text-white`}>
              {capitalizar(getEstadoEspanol(transaction.finalStatus))}
            </div>
            <div className="text-custom-grayD-800 dark:text-white">
              Destinatario
            </div>
            <div className="text-right text-custom-grayD-800 dark:text-white">
              {nombreDestinatario}
            </div>

            <div className="text-custom-grayD-800 dark:text-white">
              Monto Enviado
            </div>
            <div className="text-right text-custom-grayD-800 dark:text-white">{montoEnviado}</div>
          </div>

          <div onClick={(e) => e.stopPropagation()}>
          {expanded && (
            <ExpandedTransactionDetails
              transaction={transaction}
              completada={completada}
              fecha={fecha}
              horario={horario}
              // nombreDestinatario={nombreDestinatario}
              nombreSolicitante={nombreSolicitante}
              montoEnviado={montoEnviado}
              montoRecibido={montoRecibido}
              colorClase={''}
            />
          )}
          </div>

        </div>
      </CardContent>
    </Card>
  );
}
