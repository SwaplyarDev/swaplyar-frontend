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
import { TransactionTypeSingle, emptyTransaction } from '@/types/transactions/transactionsType';

import RecieverData from './componentesModal/RecieverData';
import Mensaje from './componentesModal/mensaje';
import { getTransactionById, updateStatusClient } from '@/actions/transactions/transactions.action';

interface TransactionModalProps {
  modal: boolean;
  setModal: (arg: boolean) => void;
  transId: string;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ modal, setModal, transId }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [trans, setTransaction] = useState<TransactionTypeSingle>(emptyTransaction);
  const [status, setStatus] = useState<string>('pending');
  const [componentStates, setComponentStates] = useState<{
    aprooveReject: 'stop' | 'accepted' | 'rejected' | null;
    confirmTransButton: boolean;
    discrepancySection: boolean;
    transferRealized: boolean;
  }>({
    aprooveReject: null,
    confirmTransButton: false,
    discrepancySection: false,
    transferRealized: false,
  });
  const [selected, setSelected] = useState<'stop' | 'accepted' | 'rejected' | null>(null);

  useEffect(() => {
    console.log(selected, componentStates);
  }, [componentStates]);

  useEffect(() => {
    if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'stop' &&
      componentStates.discrepancySection
    ) {
      setStatus('discrepancy'); // cuando hay discrepancia
    }
    if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === null &&
      !componentStates.discrepancySection
    ) {
      setStatus('review_payment'); //cuando se acepta la primera parte
    }
    if (
      !componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'rejected' &&
      !componentStates.discrepancySection
    ) {
      setStatus('rejected'); //cuando se rechaza la peticion (no llega la confirmacion de transferencia)
    }
    if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'accepted' &&
      !componentStates.discrepancySection &&
      !componentStates.transferRealized
    ) {
      setStatus('in_transit'); //cuando esta todo bien solo hay que esperar a la transferencia de parte de swaply
    }
    if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'accepted' &&
      !componentStates.discrepancySection &&
      componentStates.transferRealized
    ) {
      setStatus('completed'); //Se completo la transferencia
    }
  }, [componentStates]);

  useEffect(() => {
    const updateTransactionStatus = async () => {
      try {
        await updateStatusClient(transId, status);

        console.log('Estado de la transacción actualizado');
      } catch (error) {
        console.error('Error al actualizar el estado de la transacción:', error);
      }
    };

    updateTransactionStatus();
  }, [status, transId]);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        if (transId) {
          const trans = await getTransactionById(transId);
          if (trans !== null) {
            setTransaction(trans);
            console.log('Transaction state updated:', trans);
          }
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, [transId]);

  const handleClick = () => {
    setModal(!modal);
    setTransaction(emptyTransaction);
  };

  return (
    <section
      onClick={handleClick}
      className={`fixed right-0 z-[101] flex w-full justify-end bg-gray-900/[0.4] ${modal ? 'visible' : 'invisible'}`}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`my-28 flex max-h-[48rem] max-w-[55rem] flex-col gap-8 overflow-y-auto rounded-lg bg-white p-6 font-textFont shadow-lg transition-all duration-300 ${modal ? 'opacity-100' : 'translate-x-[30vw] opacity-0'}`}
      >
        <InfoStatus trans={trans} transId={transId} />
        <TransactionDetail transaction={trans} isLoading={isLoading} />
        <ClientMessage trans={trans} />
        <TransferImages trans={trans} />
        <ConfirmTransButton
          value={componentStates.confirmTransButton}
          setValue={(value) => setComponentStates((prev) => ({ ...prev, confirmTransButton: !value }))}
          trans={trans}
        />
        <AprobarRechazar
          selected={selected}
          onSelectChange={(value) => {
            // Usar el setter de aprooveReject para modificar solo este campo
            setComponentStates((prev) => ({
              ...prev,
              aprooveReject: value, // Aquí solo actualizas aprooveReject
            }));
            setSelected(value); // También actualizas el estado selected
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
        <button onClick={() => setModal(false)} className="text-xl font-bold">
          Cerrar
        </button>
      </section>
    </section>
  );
};

export default TransactionModal;
