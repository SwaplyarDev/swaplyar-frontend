import { Button } from '@/components/ui/Button';
import type { TransactionData } from '../../types/transaction';

interface Props {
  transaction: TransactionData;
  completada: boolean;
  fecha: string;
  horario: string;
  nombreDestinatario: string;
  nombreSolicitante: string;
  montoEnviado: string;
  montoRecibido: string;
  colorClase: string;
}

export function ExpandedTransactionDetails({
  transaction,
  completada,
  fecha,
  horario,
  nombreDestinatario,
  nombreSolicitante,
  montoEnviado,
  montoRecibido,
  colorClase,
}: Props) {
  return (
    <div className="space-y-4 px-4 text-sm sm:px-10 sm:pb-2">
      <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
          Estado de la Solicitud
        </div>
        <div className={`text-right text-[14px] font-semibold sm:text-[16px] lg:pr-16 ${colorClase}`}>
          {transaction.transaction.status}
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
        <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{transaction.payment_method.sender.value}</div>

        <div className="text-lightBlue text-[16px] font-semibold dark:text-white sm:text-[18px] lg:pl-16">
          Monto Enviado
        </div>
        <div className="text-right text-[14px] sm:text-[16px] lg:pr-16">{montoEnviado}</div>
      </div>

      <div className="grid grid-cols-2 gap-y-2 border-b-2 border-[#012d8a] pb-4 dark:border-[#EBE7E0]">
        <div className="col-span-2 text-[18px] font-bold text-gray-800 dark:text-white lg:pl-16">Destinatario</div>

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
        <div className="overflow-x-auto whitespace-nowrap text-right text-[14px] sm:text-[16px] lg:pr-16">
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
  );
}

export default ExpandedTransactionDetails;
