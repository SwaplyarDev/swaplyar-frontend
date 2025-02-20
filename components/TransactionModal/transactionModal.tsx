'use client';
import { useState, useEffect } from 'react';
import { renderSvgRed } from './componentesModal/ui/svgFunctions';
import { useTransactionStore } from '@/store/transactionModalStorage';
import AprobarRechazar from './componentesModal/aprobarRechazar';
import TransactionDetail from './componentesModal/DetailTransaction';
import ConfirmTransButton from './componentesModal/ConfirmTransButton';
import DiscrepancySection from './componentesModal/DiscrepancySection';
import ClientMessage from './componentesModal/ui/ClientMessage';
import SkeletonModal from './componentesModal/SkeletonModal';
import InfoStatus from './componentesModal/InfoStatus';
import TransferImages from './componentesModal/TransferImages';
import TransferClient from './componentesModal/TransferClient';
import FinalSection from './componentesModal/FinalSection';
import CloseButton from './componentesModal/ui/CloseButton';
import ModalEditReciever from './componentesModal/ModalEditReciever/ModalEditReciever';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ClientInformation from './componentesModal/ClientInformation';
const MySwal = withReactContent(Swal);

import RecieverData from './componentesModal/RecieverData';

const TransactionModal = ({ transId }: { transId: string }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
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
  }, [transaction.regret_id, transaction.note_id]);

  return (
    <section className="fixed inset-0 top-0 z-[5] flex w-full translate-x-0 items-center justify-end bg-black bg-opacity-50 opacity-100">
      <section
        onClick={(e) => e.stopPropagation()}
        className={`relative flex h-full w-[891px] flex-col overflow-y-auto rounded-lg bg-white shadow-lg transition-transform duration-500 ease-out ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {isLoading ? (
          <SkeletonModal />
        ) : (
          <section className="flex flex-col gap-5 p-6 font-textFont text-lightText">
            {' '}
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
            {componentStates.aprooveReject != null && (
              <DiscrepancySection
                trans={trans}
                value={componentStates.discrepancySection}
                setValue={(value) => setComponentStates('discrepancySection', value)}
              />
            )}
            {componentStates.discrepancySection && <ClientInformation trans={trans} />}
            <FinalSection />
          </section>
        )}
      </section>
      <ModalEditReciever modal={modal} setModal={setModal} trans={trans} />
    </section>
  );
};

export default TransactionModal;
