'use client';
import { useState, useEffect } from 'react';
import { renderSvgRed } from './componentesModal/ui/svgFunctions';
import { useTransactionStore } from '@/store/transactionModalStorage';
import AprobarRechazar from './componentesModal/aprobarRechazar';
import TransactionDetail from './componentesModal/detallesTransaccion';
import ConfirmTransButton from './componentesModal/ConfirmTransButton';
import DiscrepancySection from './componentesModal/DiscrepancySection';
import ClientMessage from './componentesModal/ui/ClientMessage';
import InfoStatus from './componentesModal/InfoStatus';
import TransferImages from './componentesModal/TransferImages';
import TransferClient from './componentesModal/TransferClient';
import FinalSection from './componentesModal/FinalSection';
import CloseButton from './componentesModal/ui/CloseButton';
import ModalEditReciever from './componentesModal/ModalEditReciever/ModalEditReciever';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);

import RecieverData from './componentesModal/RecieverData';

const TransactionModal = ({ transId }: { transId: string }) => {
  const [modal, setModal] = useState<boolean>(false);
  const {
    isLoading,
    trans,
    noteEdit,
    regretCancel,
    transIdAdmin,
    status,
    componentStates,
    selected,
    fetchTransaction,
    fetchNote,
    fetchRegret,
    updateTransactionStatus,
    setComponentStates,
    setSelected,
  } = useTransactionStore();

  const { transaction } = trans;

  useEffect(() => {
    updateTransactionStatus(transId, transIdAdmin);
  }, [status, transId, componentStates]);

  useEffect(() => {
    if (transId) {
      fetchTransaction(transId);
    }
  }, [transId]);

  useEffect(() => {
    if (transaction.regret_id) {
      fetchRegret(transaction.regret_id);
    } else if (transaction.note_id) {
      fetchNote(transaction.note_id);
    }
  }, [transaction.regret_id]);

  return (
    <section className="fixed inset-0 top-0 z-[5] flex w-full items-center justify-end bg-black bg-opacity-50">
      <section
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full max-w-[55rem] flex-col gap-5 overflow-y-auto rounded-lg bg-white p-6 font-textFont text-lightText shadow-lg transition-all duration-300"
      >
        <CloseButton close={() => MySwal.close()} />
        <InfoStatus trans={trans} transId={transId} />
        <TransactionDetail transaction={trans} isLoading={isLoading} />
        <ClientMessage
          message={trans.transaction.message}
          headerMessage="Mensaje del cliente"
          classnames="min-h-[4.25rem] border-black"
        />
        <TransferImages trans={trans} />
        {transaction.regret_id ? (
          <div className="flex flex-col">
            <p className="text-left text-base font-medium">
              El Cliente solicito la Cancelacion y el Reembolso - Se realiza el reembolso a la cuenta de origen
            </p>
            <ClientMessage
              headerMessage="Mensaje"
              message={regretCancel.note}
              classnames="border-[#CE1818] min-h-[4.25rem]"
            />
          </div>
        ) : transaction.note_id ? (
          <div className="flex flex-col">
            <p className="text-base font-medium">El Cliente solicito Editar la Solicitud</p>
            <ClientMessage
              headerMessage="mensage"
              message={noteEdit.note}
              classnames="border-[#D75600] min-h-[4.25rem]"
            />
          </div>
        ) : null}

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
            <h2 className="self-start text-left text-2xl font-semibold">
              Informacion para realizar el Pago al cliente{' '}
            </h2>
          )}

          <section className="flex w-[100%] flex-row justify-center">
            <RecieverData trans={trans} />
            <TransferClient />
          </section>
        </section>

        <FinalSection />
      </section>
      <ModalEditReciever modal={modal} setModal={setModal} trans={trans} />
    </section>
  );
};

export default TransactionModal;
