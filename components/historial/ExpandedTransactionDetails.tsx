'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import type { TransactionData } from '@/types/transaction';
import { getEstadoEspanol, getPlatformDisplayName } from '../../utils/transactionHelpers';
import LabelValueRow from './ui/LabelValueRow';
import ReceiverDetails from './ui/ReceiverDetails';
import ProofModal from './ui/ProofModal';

const capitalizar = (texto: string) => texto.charAt(0).toUpperCase() + texto.slice(1);

interface Props {
  transaction: TransactionData;
  completada: boolean;
  fecha: string;
  horario: string;
  nombreSolicitante: string;
  montoEnviado: string;
  montoRecibido: string;
  colorClase: string;
}
const valueClass = 'text-right text-sm md:text-base text-custom-grayD-800 dark:text-white';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="col-span-2 text-base font-semibold text-gray-800 dark:text-white">
    {children}
  </div>
);

export function ExpandedTransactionDetails({
  transaction,
  completada,
  fecha,
  horario,
  nombreSolicitante,
  montoEnviado,
  montoRecibido,
  colorClase,
}: Props) {
  const [proofModalOpen, setProofModalOpen] = useState(false);

  const hasProofs = transaction.proofsOfPayment && transaction.proofsOfPayment.length > 0;
  return (
    <div className="space-y-4 pt-7 pb-3 px-4 text-sm cursor-auto" onClick={(e) => e.stopPropagation}>
      <div className="grid grid-cols-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <LabelValueRow
          label="Estado de la Solicitud"
          value={capitalizar(getEstadoEspanol(transaction.finalStatus))}
          valueClassName={`${valueClass} ${colorClase}`}
        />
        <LabelValueRow label="Fecha de la Solicitud" value={fecha} />
        <LabelValueRow label="Horario de la Transacción" value={horario} />
      </div>

      <div className="grid grid-cols-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <SectionTitle>Datos del Solicitante</SectionTitle>
        <LabelValueRow label="Nombre y Apellido" value={nombreSolicitante} />
        <LabelValueRow
          label="Método de Envío"
          value={`${getPlatformDisplayName(transaction.senderAccount.paymentMethod.platformId)}`}
        />
        <LabelValueRow label="Monto Enviado" value={montoEnviado} />
      </div>

      <div className="grid grid-cols-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <SectionTitle>Destinatario</SectionTitle>
        <ReceiverDetails transaction={transaction} />
        <LabelValueRow label="Monto a Recibir" value={montoRecibido} />
      </div>

      <div className="flex items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="text-lightBlue text-xs dark:text-white">
          El número de solicitud es únicamente para que nuestro equipo de Atención al Cliente pueda rastrear la
          transacción.
          <br />
          <span className="font-bold">NOTA:</span> Esta transacción fue{' '}
          {completada ? 'completada con éxito' : transaction.message || 'procesada'}
        </div>

        {hasProofs && (
          <Button
            className="self-center rounded-full bg-[#012d8a] px-6 text-white hover:ring-2 hover:ring-[#012A8E] hover:ring-offset-2 dark:bg-[#EBE7E0] dark:text-black dark:ring-offset-[#4B4B4B] hover:dark:ring-[#EBE7E0] sm:self-auto"
            onClick={() => setProofModalOpen(true)}
          >
            Ver Comprobante{transaction.proofsOfPayment.length > 1 ? 's' : ''}
          </Button>
        )}
      </div>

      <ProofModal
        isOpen={proofModalOpen}
        proofs={transaction.proofsOfPayment || []}
        onClose={() => setProofModalOpen(false)}
      />
    </div>
  );
}

export default ExpandedTransactionDetails;

