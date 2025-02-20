import React from 'react';
import RecieverData from '@/components/TransactionModal/componentesModal/RecieverData';
import { useTransactionStore } from '@/store/transactionModalStorage';
import TransferClient from './TransferClient';
import { useState } from 'react';
import { renderSvgRed } from '@/components/TransactionModal/componentesModal/ui/svgFunctions';
import { TransactionTypeSingle } from '@/types/transactions/transactionsType';

interface ClientInformationProps {
  trans: TransactionTypeSingle;
}

const ClientInformation: React.FC<ClientInformationProps> = () => {
  const { trans } = useTransactionStore();
  const { transaction } = trans;
  const [modal, setModal] = useState<boolean>(false);

  return (
    <div>
      <button
        onClick={() => setModal(!modal)}
        className="max-w-[12rem] self-end rounded-lg border border-[#FF6200] bg-[#642600] px-2 py-2 text-darkText"
      >
        Editar Destinatario
      </button>

      <section className="flex flex-col items-center gap-2">
        {transaction.regret_id ? (
          <div className="flex flex-col gap-1">
            <div className="flex flex-row items-center justify-center gap-1 text-xs font-light">
              {renderSvgRed()}Si la Discrepancia no fue resuelta, se tiene que generar el reembolso del dinero al
              cliente, a la cuenta de origen
            </div>
            <h2 className="text-left text-2xl font-semibold">
              Realizar el Reembolso al cliente a la cuenta de Origen{' '}
            </h2>
          </div>
        ) : (
          <h2 className="self-start text-left text-2xl font-semibold">Informacion para realizar el Pago al cliente </h2>
        )}

        <section className="flex w-[100%] flex-row justify-center">
          <RecieverData trans={trans} />
          <TransferClient />
        </section>
      </section>
    </div>
  );
};

export default ClientInformation;
