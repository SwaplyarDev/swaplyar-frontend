'use client';
import { useState, useEffect } from 'react';
import AprobarRechazar from './componentesModal/aprobarRechazar';
import TransactionDetail from './componentesModal/detallesTransaccion';
import ConfirmTransButton from './componentesModal/ConfirmTransButton';
import DiscrepancySection from './componentesModal/DiscrepancySection';
import ClientMessage from './componentesModal/ui/ClientMessage';
import InfoStatus from './componentesModal/InfoStatus';
import TransferImages from './componentesModal/TransferImages';
import TransferClient from './componentesModal/TransferClient';
import { useTransactionStore } from '@/store/transactionModalStorage';
import CloseButton from './componentesModal/ui/CloseButton';
import ModalEditReciever from './componentesModal/ModalEditReciever/ModalEditReciever';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);

import RecieverData from './componentesModal/RecieverData';

const TransactionModal = ({ transId }: { transId: string }) => {
  const [isVisible, setIsVisible] = useState(false); // Estado para la animación

  useEffect(() => {
    setIsVisible(true);
  }, []);
  const [modal, setModal] = useState<boolean>(false);
  const {
    isLoading,
    trans,
    transIdAdmin,
    status,
    componentStates,
    selected,
    fetchTransaction,
    updateTransactionStatus,
    setComponentStates,
    setSelected,
  } = useTransactionStore();

  console.log(status);
  useEffect(() => {
    updateTransactionStatus(transId, transIdAdmin);
  }, [status, transId, componentStates]);

  useEffect(() => {
    if (transId) {
      fetchTransaction(transId);
    }
  }, [transId]);

  return (
    <section className="fixed inset-0 top-0 z-[5] flex w-full translate-x-0 items-center justify-end bg-black bg-opacity-50 opacity-100">
      <section
        onClick={(e) => e.stopPropagation()}
        className={`relative flex h-full w-[891px] flex-col gap-8 overflow-y-auto rounded-lg bg-white p-6 font-textFont shadow-lg transition-transform duration-500 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        <CloseButton close={() => MySwal.close()} />
        <InfoStatus trans={trans} transId={transId} />
        <TransactionDetail transaction={trans} isLoading={isLoading} />
        <ClientMessage
          message={trans.transaction.message}
          headerMessage="Mensaje del cliente"
          classnames="min-h-[4.25rem]"
        />
        <TransferImages trans={trans} />

        <ConfirmTransButton
          value={componentStates.confirmTransButton}
          setValue={(value) => setComponentStates('confirmTransButton', value)}
          trans={trans}
        />
        {componentStates.confirmTransButton != null && (
          <AprobarRechazar
            selected={selected}
            componentStates={componentStates}
            onSelectChange={(value) => {
              setComponentStates('aprooveReject', value);
              setSelected(value);
            }}
          />
        )}

        <DiscrepancySection trans={trans} />
        <button
          onClick={() => setModal(!modal)}
          className="max-w-[10rem] self-end rounded-lg border border-[#FF6200] bg-[#642600] px-2 py-2 text-darkText"
        >
          Editar Destinatario
        </button>

        <section className="flex flex-col gap-2">
          <h2 className="text-left text-2xl font-semibold">Información para realizar el pago al cliente</h2>

          <section className="flex w-[100%] flex-row justify-between">
            <RecieverData trans={trans} />
            <TransferClient />
          </section>
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
      <ModalEditReciever modal={modal} setModal={setModal} trans={trans} />
    </section>
  );
};

export default TransactionModal;
