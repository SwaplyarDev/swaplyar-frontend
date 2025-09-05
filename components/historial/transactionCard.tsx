'use client';

import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import type { TransactionData } from '@/types/transaction';
import { isCompleted, formatDate, formatTime, getEstadoEspanol } from '../../utils/transactionHelpers';
import { mapEstadoToGrupo } from '@/utils/transactionStatus';
import ExpandedTransactionDetails from './ExpandedTransactionDetails';

interface TransactionCardProps {
  transaction: TransactionData;
  index: number;
}


export function TransactionCard({ transaction, index }: TransactionCardProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  const grupo = mapEstadoToGrupo(transaction.finalStatus);
  const completada = isCompleted(transaction.finalStatus);
  const fecha = formatDate(transaction.createdAt);
  const horario = formatTime(transaction.createdAt);

  // const nombreDestinatario = `${transaction.receiverAccount.firstName} ${transaction.receiverAccount.lastName}` || 'Sin nombre';
  const nombreSolicitante = `${transaction.senderAccount.firstName} ${transaction.senderAccount.lastName}`;

  const montoEnviado = `${transaction.amount.amountSent} ${transaction.amount.currencySent}`;
  const montoRecibido = `${transaction.amount.amountReceived} ${transaction.amount.currencyReceived}`;

  const capitalizar = (texto: string) => texto.charAt(0).toUpperCase() + texto.slice(1);

  let icono = null;
  let bgColor = '';
  let borderColor = '';

  if (grupo === 'completada') {
    icono = <Check className="h-6 w-6 text-white" />;
    bgColor = 'bg-[#048604]';
    borderColor = 'border-[#048604]';
  } else if (grupo === 'pendiente') {
    icono = <Clock className="h-6 w-6 text-white dark:text-[#4b4b4b]" />;
    bgColor = 'bg-[#FFC72C]';
    borderColor = 'border-[#FFC72C]';
  } else {
    icono = <X className="h-6 w-6 text-white" />;
    bgColor = 'bg-[#CE1818]';
    borderColor = 'border-[#CE1818]';
  }

  const colorClase =
    grupo === 'completada'
      ? 'text-green-600 dark:text-[#048604]'
      : grupo === 'pendiente'
      ? 'text-[#ffac33] dark:text-[#FFC72C]'
      : 'text-red-600 dark:text-[#CE1818]';
      
  return (
    <Card className="relative w-full max-w-[1000px] overflow-hidden rounded-xl border border-gray-200 bg-[#FFFFFB] shadow-sm transition-shadow hover:shadow-md dark:border-[#4b4b4b] dark:bg-[#4b4b4b]">
      <CardContent className="p-0">
        <div className="relative">
          <div className="flex items-start justify-between px-4 pt-2 sm:px-6">
            <div className="flex-1 text-center">
              <div className="flex flex-col items-center justify-center sm:flex-row sm:gap-2">
                <h3 className="text-lightBlue text-[26px] font-normal leading-tight dark:text-white sm:text-[32px]">
                  N° de Solicitud
                </h3>
                <span className="break-all pb-2 text-[26px] font-semibold text-[#012d8a] dark:text-white sm:pb-0 sm:text-[32px]">
                  #{transaction.id}
                </span>
              </div>
            </div>

            <div className="w-[1px]" />
            <div
              className={`inline-flex h-8 w-8 items-center justify-center rounded-full border-2 ${bgColor} ${borderColor}`}
            >
              {icono}
            </div>
          </div>

          <div className="text-lightBlue px-4 pb-2 text-[20px] dark:text-white sm:px-6 sm:text-2xl">{fecha}</div>

          <div className={`grid grid-cols-2 gap-y-2 px-4 text-sm sm:px-10 ${expanded ? 'hidden' : 'block'}`}>
            <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
              Estado de la Solicitud
            </div>
            <div className={`text-right text-[14px] font-semibold sm:text-[16px] lg:pr-16 ${colorClase}`}>
              {capitalizar(getEstadoEspanol(transaction.finalStatus))}
            </div>
            {/* <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
              Destinatario
            </div>
            <div className="text-right text-[14px] text-gray-800 dark:text-white sm:text-[16px] lg:pr-16">
              {nombreDestinatario}
            </div> */}

            <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
              Monto Enviado
            </div>
            <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{montoEnviado}</div>
          </div>

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
              colorClase={colorClase}
            />
          )}

          <div className="flex justify-end pr-4">
            <button className="text-[#012d8a] transition-all dark:text-[#EBE7E0]" onClick={toggleExpand}>
              {expanded ? (
                <ChevronUp className="h-8 w-8 hover:text-[#2a68fe] dark:hover:text-[#323232]" />
              ) : (
                <ChevronDown className="h-8 w-8 hover:text-[#2a68fe] dark:hover:text-[#323232]" />
              )}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
