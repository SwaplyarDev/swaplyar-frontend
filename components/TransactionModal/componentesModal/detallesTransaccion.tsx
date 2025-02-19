import { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import { renderLabels, getReceiverLabels } from './ui/RenderLabels';
import { renderSvgPerson } from './ui/svgFunctions';
import React from 'react';

interface DetailTransProps {
  isLoading: boolean;
  transaction: TransactionTypeSingle;
}

const TransactionDetail: React.FC<DetailTransProps> = ({ transaction, isLoading }) => {
  const { sender, payment_method, amounts, proof_of_payment } = transaction;

  if (!isLoading)
    return (
      <section className="flex w-[100%] flex-row justify-between gap-5 font-textFont">
        {renderSvgPerson()}
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
