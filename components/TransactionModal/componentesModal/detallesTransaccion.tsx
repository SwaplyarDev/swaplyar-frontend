import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { renderLabels, getReceiverLabels } from './ui/RenderLabels';
import React from 'react';

interface DetailTransProps {
  isLoading: boolean;
  transaction: TransactionTypeSingle;
}

const TransactionDetail: React.FC<DetailTransProps> = ({ transaction, isLoading }) => {
  const { sender, payment_method, amounts, proof_of_payment } = transaction.transaction;

  if (!isLoading)
    return (
      <section className="flex w-[100%] flex-row justify-between gap-5 font-textFont">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <g clip-path="url(#clip0_3326_34388)">
            <path
              d="M27.5 17.5C27.5 21.65 24.15 25 20 25C15.85 25 12.5 21.65 12.5 17.5C12.5 13.35 15.85 10 20 10C24.15 10 27.5 13.35 27.5 17.5Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40 20C40 31.05 31.05 40 20 40C8.95 40 0 31.05 0 20C0 8.95 8.95 0 20 0C31.05 0 40 8.95 40 20ZM10 34.375C10.4 33.71 14.275 27.5 19.975 27.5C25.65 27.5 29.55 33.725 29.95 34.375C32.2747 32.7675 34.1741 30.6193 35.4849 28.1153C36.7957 25.6113 37.4786 22.8264 37.475 20C37.475 10.325 29.65 2.5 19.975 2.5C10.3 2.5 2.475 10.325 2.475 20C2.475 25.95 5.45 31.225 10 34.375Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_3326_34388">
              <rect width="40" height="40" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <article className="flex flex-col items-start divide-y-2">
          <h3 className="text-xl font-semibold">Datos del Solicitante</h3>
          {renderLabels('Nombre y Apellido', sender?.first_name, sender?.last_name)}
          {renderLabels('Email', sender?.email)}
        </article>
        <article className="flex flex-col items-start divide-y-2">
          <h3 className="text-xl font-semibold">Datos del Destinatario</h3>
          {getReceiverLabels(transaction).map((item, index) => renderLabels(item.label, item.value))}
        </article>
        <article className="flex flex-col items-start divide-y-2">
          <h3 className="text-xl font-semibold">Datos del Pago</h3>
          {renderLabels(
            'Monto a Transferir',
            amounts?.sent.amount,
            payment_method?.sender.value,
            amounts?.sent.currency,
          )}
          {renderLabels(
            'Monto a recibir',
            amounts?.received.amount,
            payment_method?.receiver.value,
            amounts?.received.currency,
          )}
          {renderLabels('Link del comprobante', proof_of_payment.img_transaction.substring(0, 16).concat('....'))}
        </article>
      </section>
    );
};

export default TransactionDetail;
