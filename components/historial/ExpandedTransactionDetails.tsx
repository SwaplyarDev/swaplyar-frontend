'use client';

import { Button } from '@/components/ui/Button';
import type { TransactionData } from '@/types/transaction';
import { getEstadoEspanol } from '../../utils/transactionHelpers';

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

const labelClass = 'text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16';
const valueClass = 'text-right text-[14px] sm:text-[16px] lg:pr-16 text-lightBlue';

const LabelValueRow = ({
  label,
  value,
  valueClassName = valueClass,
}: {
  label: string;
  value?: string;
  valueClassName?: string;
}) => (
  <>
    <div className={labelClass}>{label}</div>
    <div className={`${valueClassName}`}>{value ?? 'No disponible'}</div>
  </>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="col-span-2 text-[18px] font-bold text-gray-800 dark:text-white lg:pl-16">
    {children}
  </div>
);

function getPlatformDisplayName(platformId: string): string {
  switch (platformId) {
    case 'virtual_bank':
      return 'Banco Virtual';
    case 'bank':
      return 'Banco';
    case 'pix':
      return 'Pix';
    case 'receiver_crypto':
      return 'Crypto';
    default:
      return 'Método Desconocido';
  }
}

const ReceiverDetails = ({ transaction }: { transaction: TransactionData }) => {
  const pm = transaction.receiverAccount.paymentMethod;
  const tipo = pm.tipo;

  if (tipo === 'Pix') {
    return (
      <>
        <LabelValueRow label="Método de Recepción" value={pm.tipo} />
        <LabelValueRow label="CPF" value={pm.cpf} />
        <LabelValueRow label="Email" value={pm.valor} />
      </>
    );
  }

  if (tipo === 'Cripto') {
    return (
      <>
        <LabelValueRow label="Método de Recepción" value={`Red ${pm.red}`} />
        <LabelValueRow label="Dirección de Billetera" value={pm.wallet} />
      </>
    );
  }

  return (
    <>
      <LabelValueRow label="Método de Recepción" value={pm.tipo} />
      <LabelValueRow
        label={tipo === 'Banco Virtual' ? 'Código de Transferencia' : 'CBU/CVU/ALIAS'}
        value={pm.cuenta || pm.codigoTransferencia}
      />
      <LabelValueRow
        label={tipo === 'Banco Virtual' ? 'Email' : 'DNI/CUIT/CUIL'}
        value={tipo === 'Banco Virtual' ? pm.email : pm.documento}
      />
    </>
  );
};

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
  return (
    <div className="space-y-4 px-4 text-sm sm:px-10 sm:pb-2">
      <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <LabelValueRow
          label="Estado de la Solicitud"
          value={capitalizar(getEstadoEspanol(transaction.finalStatus))}
          valueClassName={`${valueClass} ${colorClase}`}
        />
        <LabelValueRow label="Fecha de la Solicitud" value={fecha} />
        <LabelValueRow label="Horario de la Transacción" value={horario} />
      </div>

      <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <SectionTitle>Datos del Solicitante</SectionTitle>
        <LabelValueRow label="Nombre y Apellido" value={nombreSolicitante} />
        <LabelValueRow
          label="Método de Envío"
          value={`Transferencia ${getPlatformDisplayName(transaction.senderAccount.paymentMethod.platformId)}`}
        />
        <LabelValueRow label="Monto Enviado" value={montoEnviado} />
      </div>

      <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <SectionTitle>Destinatario</SectionTitle>
        <ReceiverDetails transaction={transaction} />
        <LabelValueRow label="Monto a Recibir" value={montoRecibido} />
      </div>

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:px-6">
        <div className="text-lightBlue text-xs dark:text-white">
          El número de solicitud es únicamente para que nuestro equipo de Atención al Cliente pueda rastrear la
          transacción.
          <br />
          <span className="font-bold">NOTA:</span> Esta transacción fue{' '}
          {completada ? 'completada con éxito' : transaction.message || 'procesada'}
        </div>

        {transaction.proofOfPayment?.imgUrl && (
          <Button
            className="self-center rounded-full bg-[#012d8a] px-6 text-white hover:ring-2 hover:ring-[#012A8E] hover:ring-offset-2 dark:bg-[#EBE7E0] dark:text-black dark:ring-offset-[#4B4B4B] hover:dark:ring-[#EBE7E0] sm:self-auto"
            onClick={() => window.open(transaction.proofOfPayment?.imgUrl, '_blank')}
          >
            Ver Comprobante
          </Button>
        )}
      </div>
    </div>
  );
}

export default ExpandedTransactionDetails;

