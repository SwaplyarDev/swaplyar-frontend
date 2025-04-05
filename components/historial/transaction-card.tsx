'use client';

import { useState } from 'react';
import { Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import type { TransactionData } from './transaction';
import { isCompleted, getEstadoEspanol, formatDate, formatTime } from './transaction-helpers';

interface TransactionCardProps {
  transaction: TransactionData;
  index: number;
}

export function TransactionCard({ transaction, index }: TransactionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const completada = isCompleted(transaction.status);
  const estado = getEstadoEspanol(transaction.status);
  const fecha = formatDate(transaction.transaction.created_at);
  const horario = formatTime(transaction.transaction.created_at);
  const nombreDestinatario = `${transaction.receiver.first_name} ${transaction.receiver.last_name}`;
  const nombreSolicitante = `${transaction.sender.first_name} ${transaction.sender.last_name}`;
  const montoEnviado = `${transaction.amounts.sent.amount} ${transaction.amounts.sent.currency}`;
  const montoRecibido = `${transaction.amounts.received.amount} ${transaction.amounts.received.currency}`;

  return (
    <Card className="relative overflow-hidden shadow-sm transition-shadow hover:shadow-md dark:!border-[#4b4b4b] dark:bg-[#4b4b4b]">
      <CardContent className="p-0">
        <div className="relative">
          <div className="flex items-start justify-between p-4">
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between gap-2">
                <h3 className="text-lg font-semibold">N° de Solicitud</h3>

                <span className="text-xl font-bold dark:text-white">#{transaction.transaction.transaction_id}</span>

                {completada ? (
                  <span className="text-green-500">
                    <Check className="h-5 w-5" />
                  </span>
                ) : (
                  <span className="text-red-500">
                    <X className="h-5 w-5" />
                  </span>
                )}
              </div>
              <p className="font-medium text-gray-700 dark:text-white">{fecha}</p>
            </div>
          </div>

          <div className={`grid grid-cols-2 gap-y-1 px-4 pb-4 pt-1 text-sm ${expanded ? 'hidden' : 'block'}`}>
            <div className="text-gray-500 dark:text-white">Estado de la Solicitud</div>
            <div className={`text-right ${completada ? 'text-green-600 dark:text-green-300' : 'text-red-600'}`}>
              {estado}
            </div>

            <div className="text-gray-500 dark:text-white">Destinatario</div>
            <div className="text-right">{nombreDestinatario}</div>

            <div className="text-gray-500 dark:text-white">Monto Enviado</div>
            <div className="text-right font-medium">{montoEnviado}</div>
          </div>

          {expanded && (
            <div className="px-4 pb-4 pt-1">
              <div className="mb-3 grid grid-cols-2 gap-y-1 border-b-2 border-[#012d8a] pb-3 text-sm">
                <div className="text-gray-500 dark:text-white">Estado de la Solicitud</div>
                <div className={`text-right ${completada ? 'text-green-600 dark:text-green-300' : 'text-red-600'}`}>
                  {estado}
                </div>

                <div className="text-gray-500 dark:text-white">Fecha de la Solicitud</div>
                <div className="text-right">{fecha}</div>

                <div className="text-gray-500 dark:text-white">Horario de la Transaccion</div>
                <div className="text-right">{horario}</div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-y-1 border-b-2 border-[#012d8a] pb-3 text-sm">
                <div className="font-medium text-gray-800 dark:text-white">Datos del Solicitante</div>
                <div className="text-right"></div>

                <div className="text-gray-500 dark:text-white">Nombre y Apellido</div>
                <div className="text-right">{nombreSolicitante}</div>

                <div className="text-gray-500 dark:text-white">Metodo de Envio</div>
                <div className="text-right">{transaction.payment_method.sender.value}</div>

                <div className="text-gray-500 dark:text-white">Monto Enviado</div>
                <div className="text-right font-medium">{montoEnviado}</div>
              </div>

              <div className="mb-3 grid grid-cols-2 gap-y-1 border-b-2 border-[#012d8a] pb-3 text-sm">
                <div className="font-medium text-gray-800 dark:text-white">Destinatario</div>
                <div className="text-right"></div>

                <div className="text-gray-500 dark:text-white">Nombre del Destinatario</div>
                <div className="text-right">{nombreDestinatario}</div>

                <div className="text-gray-500 dark:text-white">Metodo de Recepción</div>
                <div className="text-right">{transaction.payment_method.receiver.value}</div>

                <div className="text-gray-500 dark:text-white">
                  {transaction.payment_method.receiver.details.sender_method_key.toUpperCase()}
                </div>
                <div className="text-right">{transaction.payment_method.receiver.details.sender_method_value}</div>

                <div className="text-gray-500 dark:text-white">
                  {transaction.payment_method.receiver.details.document_type}:
                </div>
                <div className="text-right">{transaction.payment_method.receiver.details.document_value}</div>

                <div className="text-gray-500 dark:text-white">Monto a Recibir</div>
                <div className="text-right">{montoRecibido}</div>
              </div>

              <div className="mb-3 text-xs text-gray-500 dark:text-white">
                El número de solicitud es únicamente para que nuestro equipo de Atención al Cliente pueda rastrear la
                transacción.
                <br />
                <span className="font-medium">NOTA:</span> Esta transaccion fue{' '}
                {completada ? 'completada con éxito' : transaction.transaction.message || 'procesada'}
              </div>

              {transaction.proof_of_payment?.img_transaction && (
                <div className="flex justify-center">
                  <Button
                    className="rounded-full bg-[#012d8a] px-6 text-white hover:bg-[#012d8a]"
                    onClick={() => window.open(transaction.proof_of_payment.img_transaction, '_blank')}
                  >
                    Ver Comprobante
                  </Button>
                </div>
              )}
            </div>
          )}

          <div
            className="flex justify-end border-t border-gray-100 p-2 hover:cursor-pointer dark:!border-[#2a2a2a]"
            onClick={toggleExpand}
          >
            <button className="text-gray-400 transition-all hover:text-gray-600">
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
