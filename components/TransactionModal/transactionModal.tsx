'use client';
import { useState, useEffect } from 'react';
import AprobarRechazar from './componentesModal/aprobarRechazar';
import TransactionDetail from './componentesModal/detallesTransaccion';
import ConfirmTransButton from './componentesModal/ConfirmTransButton';
import DiscrepancySection from './componentesModal/DiscrepancySection';
import ClientMessage from './componentesModal/ClientMessage';
import InfoStatus from './componentesModal/InfoStatus';
import TransferImages from './componentesModal/TransferImages';
import TransferClient from './componentesModal/TransferClient';
import { useTransactionStore } from '@/store/transactionModalStorage';
import { TransactionTypeSingle, emptyTransaction } from '@/types/transactions/transactionsType';
import CloseButton from './componentesModal/ui/CloseButton';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);

import RecieverData from './componentesModal/RecieverData';

const TransactionModal = ({ transId }: { transId: string }) => {
  const {
    isLoading,
    trans,
    status,
    componentStates,
    selected,
    fetchTransaction,
    updateTransactionStatus,
    setComponentStates,
    setSelected,
  } = useTransactionStore();

  useEffect(() => {
    console.log(selected, componentStates);
    console.log(status, 'status');
  }, [componentStates]);

  useEffect(() => {
    updateTransactionStatus(transId);
  }, [status, transId, componentStates]);
  useEffect(() => {
    if (transId) {
      fetchTransaction(transId);
    }
  }, [transId]);

  return (
    <section className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <section
        onClick={(e) => e.stopPropagation()}
        className="mt-32 flex max-h-[48rem] max-w-[55rem] flex-col gap-8 overflow-y-auto rounded-lg bg-white p-6 font-textFont shadow-lg transition-all duration-300"
      >
        <CloseButton close={() => MySwal.close()} />
        <InfoStatus trans={trans} transId={transId} />
        <TransactionDetail transaction={trans} isLoading={isLoading} />
        <ClientMessage trans={trans} />
        <TransferImages trans={trans} />
        <ConfirmTransButton
          value={componentStates.confirmTransButton}
          setValue={(value) => setComponentStates('confirmTransButton', value)}
          trans={trans}
        />
        <AprobarRechazar
          selected={selected}
          onSelectChange={(value) => {
            setComponentStates('aprooveReject', value);
            setSelected(value);
          }}
        />
        <DiscrepancySection trans={trans} />
        <button className="max-w-[9.50rem] self-end rounded-lg border border-[#FF6200] bg-[#642600] px-2 py-2 text-darkText">
          Editar Destinatario
        </button>
        <h2 className="lightText text-2xl font-semibold">Información para realizar el pago al cliente</h2>

        <section className="flex w-[100%] flex-row justify-between">
          <RecieverData trans={trans} />
          <TransferClient />
        </section>

        <div className="flex gap-5">
          <button className="rounded-full border-2 border-[#d0b8b8] bg-[#b6a0a0] p-2.5 text-2xl font-semibold">
            Rechazada
          </button>
          <button className="rounded-full border-2 border-[#b8cfb8] bg-[#9fb69f] p-2.5 text-2xl font-semibold">
            Aprobada
          </button>
        </div>
        <p className="lightText text-right text-base">
          Esta solicitud fue operada por: Jenifer Paola Gutierrez Torrez - 16:52 pm
        </p>
        <button className="rounded-full border-2 border-[#012a8d] bg-[#000c28] p-2.5 text-base font-semibold text-[#ebe7e0]">
          En Proceso
        </button>
        <button onClick={() => MySwal.close()} className="text-xl font-bold">
          Cerrar
        </button>
      </section>
    </section>
  );
};

export default TransactionModal;
