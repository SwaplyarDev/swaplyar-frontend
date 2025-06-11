'use client';

import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { TransactionData } from './transaction';
import { isCompleted, getEstadoEspanol, formatDate, formatTime } from './transactionHelpers';
import { mapEstadoToGrupo } from '@/utils/transactionStatus';
import { convertTransactionState } from '@/utils/transactionStatesConverser';

interface TransactionCardProps {
  transaction: TransactionData;
  index: number;
}

export function TransactionCard({ transaction, index }: TransactionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const grupo = mapEstadoToGrupo(convertTransactionState(transaction.transaction.status) ?? 'pending');
  const completada = isCompleted(transaction.status);
  const fecha = formatDate(transaction.transaction.created_at);
  const horario = formatTime(transaction.transaction.created_at);
  const nombreDestinatario = `${transaction.receiver.first_name} ${transaction.receiver.last_name}`;
  const nombreSolicitante = `${transaction.sender.first_name} ${transaction.sender.last_name}`;
  const montoEnviado = `${transaction.amounts.sent.amount} ${transaction.amounts.sent.currency}`;
  const montoRecibido = `${transaction.amounts.received.amount} ${transaction.amounts.received.currency}`;
  const capitalizar = (texto: string) => texto.charAt(0).toUpperCase() + texto.slice(1);

  let icono = null;
  let bgColor = '';
  let borderColor = '';

  if (grupo === 'completada') {
    icono = <Check className="h-6 w-6 text-white" />;
    bgColor = 'bg-green-500';
    borderColor = 'border-green-500';
  } else if (grupo === 'pendiente') {
    icono = <Clock className="h-6 w-6 text-white dark:text-[#4b4b4b]" />;
    bgColor = 'bg-[#FFC72C]';
    borderColor = 'border-[#FFC72C]';
  } else {
    icono = <X className="h-6 w-6 text-white" />;
    bgColor = 'bg-red-500';
    borderColor = 'border-red-500';
  }

  const colorClase =
    grupo === 'completada'
      ? 'text-green-600 dark:text-green-300'
      : grupo === 'pendiente'
        ? 'text-[#ffac33] dark:text-[#FFC72C]'
        : 'text-red-600 dark:text-red-300';

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
                  #{transaction.transaction.transaction_id}
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
              {capitalizar(getEstadoEspanol(convertTransactionState(transaction.transaction.status) ?? 'Desconocido'))}
            </div>

            <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
              Destinatario
            </div>
            <div className="text-right text-[14px] text-gray-800 dark:text-white sm:text-[16px] lg:pr-16">
              {nombreDestinatario}
            </div>

            <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
              Monto Enviado
            </div>
            <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{montoEnviado}</div>
          </div>

          {expanded && (
            <div className="space-y-4 px-4 text-sm sm:px-10 sm:pb-2">
              <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Estado de la Solicitud
                </div>
                <div className={`text-right text-[14px] font-semibold sm:text-[16px] lg:pr-16 ${colorClase}`}>
                  {capitalizar(
                    getEstadoEspanol(convertTransactionState(transaction.transaction.status) ?? 'Desconocido'),
                  )}
                </div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Fecha de la Solicitud
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{fecha}</div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Horario de la Transacción
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{horario}</div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
                <div className="col-span-2 text-[18px] font-bold text-gray-800 dark:text-white lg:pl-16">
                  Datos del Solicitante
                </div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Nombre y Apellido
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{nombreSolicitante}</div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Método de Envío
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">
                  {transaction.payment_method.sender.value}
                </div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Monto Enviado
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{montoEnviado}</div>
              </div>

              <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
                <div className="col-span-2 text-[18px] font-bold text-gray-800 dark:text-white lg:pl-16">
                  Destinatario
                </div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Nombre del Destinatario
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{nombreDestinatario}</div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Método de Recepción
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">
                  {transaction.payment_method.receiver.value}
                </div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  {transaction.payment_method.receiver.details.sender_method_key.toUpperCase()}
                </div>
                <div className="overflow-hidden overflow-x-auto whitespace-nowrap text-right text-[14px] sm:text-[16px] lg:pr-16">
                  {transaction.payment_method.receiver.details.sender_method_value}
                </div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  {transaction.payment_method.receiver.details.document_type}
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">
                  {transaction.payment_method.receiver.details.document_value}
                </div>

                <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
                  Monto a Recibir
                </div>
                <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{montoRecibido}</div>
              </div>

              <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:px-6">
                <div className="text-lightBlue text-xs dark:text-white">
                  El número de solicitud es únicamente para que nuestro equipo de Atención al Cliente pueda rastrear la
                  transacción.
                  <br />
                  <span className="font-bold">NOTA:</span> Esta transacción fue{' '}
                  {completada ? 'completada con éxito' : transaction.transaction.message || 'procesada'}
                </div>

                {transaction.proof_of_payment?.img_transaction && (
                  <Button
                    className="self-center rounded-full bg-[#012d8a] px-6 text-white hover:ring-2 hover:ring-[#012A8E] hover:ring-offset-2 dark:bg-[#EBE7E0] dark:text-black dark:ring-offset-[#4B4B4B] hover:dark:ring-[#EBE7E0] sm:self-auto"
                    onClick={() => window.open(transaction.proof_of_payment.img_transaction, '_blank')}
                  >
                    Ver Comprobante
                  </Button>
                )}
              </div>
            </div>
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
