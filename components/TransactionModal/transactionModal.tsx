'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import AprobarRechazar from './componentesModal/aprobarRechazar';
import TransactionDetail from './componentesModal/DetailTransaction';
import ConfirmTransButton from './componentesModal/ConfirmTransButton';
import DiscrepancySection from './componentesModal/DiscrepancySection';
import ClientMessage from './componentesModal/ui/ClientMessage';
import SkeletonModal from './componentesModal/SkeletonModal';
import InfoStatus from './componentesModal/InfoStatus';
import TransferImages from './componentesModal/TransferImages';
import FinalSection from './componentesModal/FinalSection';
import CloseButton from './componentesModal/ui/CloseButton';
import ModalEditReciever from './componentesModal/ModalEditReciever/ModalEditReciever';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import ClientInformation from '@/components/TransactionModal/componentesModal/ClientInformation';

const MySwal = withReactContent(Swal);

interface TransactionModalProps {
  transId: string;
}

const TransactionModal = ({ transId }: TransactionModalProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [discrepancySend, setDiscrepancySend] = useState(false);

  const {
    isLoading,
    trans,
    noteEdit,
    regretCancel,
    componentStates,
    selected,
    fetchTransaction,
    fetchNote,
    fetchRegret,
    updateTransactionStatusFromStore,
    setComponentStates,
    setSelected,
    getStatusClient,
  } = useTransactionStore();

  const { transaction } = trans;

  // Handle modal animation
  useEffect(() => {
    // Small delay to ensure animation works properly
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Fetch transaction data and related information
  useEffect(() => {
    if (transId) {
      fetchTransaction(transId);
    }
  }, [transId, fetchTransaction]);

  // Fetch additional data based on transaction properties
  useEffect(() => {
    if (!transaction) return;

    if (transaction.regret_id) {
      fetchRegret(transaction.regret_id);
    } else if (transaction.note_id) {
      fetchNote(transaction.note_id);
    }
  }, [transaction, fetchRegret, fetchNote]);

  // Update transaction status and client status
  useEffect(() => {
    if (!transId || !trans) return;
    console.log(transId, trans);
    updateTransactionStatusFromStore(transId, trans);
    getStatusClient(transId, trans);
  }, [transId, trans, componentStates, updateTransactionStatusFromStore, getStatusClient]);

  // Handle component state changes
  const handleComponentStateChange = useCallback(
    (key: any, value: any) => {
      setComponentStates(key, value);
    },
    [setComponentStates],
  );

  // Handle selection change
  const handleSelectionChange = useCallback(
    (value: any) => {
      setComponentStates('aprooveReject', value);
      setSelected(value);
      console.log(value);
    },
    [setComponentStates, setSelected],
  );

  // Close the modal
  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Give time for the animation to complete before actually closing
    setTimeout(() => MySwal.close(), 300);
  }, []);

  console.log(trans);

  return (
    <div
      className="fixed inset-0 z-[5] flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="transaction-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative flex h-full w-full flex-col overflow-y-auto rounded-lg bg-white shadow-lg transition-transform duration-300 ease-out md:w-[891px] ${
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        tabIndex={-1}
      >
        {isLoading ? (
          <SkeletonModal />
        ) : (
          <div className="flex flex-col gap-2 p-3 font-textFont text-lightText">
            <div className="flex w-full justify-end">
              <CloseButton close={handleClose} />
            </div>

            <div id="transaction-modal-title" className="sr-only">
              Transaction Details
            </div>

            <InfoStatus trans={trans} transId={transId} />
            <TransactionDetail transaction={trans} isLoading={isLoading} />

            {/* Client Message Section */}
            <ClientMessage
              message={trans.transaction.message}
              headerMessage="Mensaje del cliente"
              classnames="min-h-[4.25rem] border-black"
            />

            <TransferImages trans={trans} />

            {/* Conditional Sections based on transaction properties */}
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
                  headerMessage="mensaje"
                  message={noteEdit.note}
                  classnames="border-[#D75600] min-h-[4.25rem]"
                />
              </div>
            ) : null}

            {/* Action Sections */}
            <ConfirmTransButton
              value={componentStates.confirmTransButton}
              setValue={(value) => handleComponentStateChange('confirmTransButton', value)}
              trans={trans}
            />

            {componentStates.confirmTransButton != null && (
              <AprobarRechazar
                selected={selected}
                componentStates={componentStates}
                onSelectChange={handleSelectionChange}
                transId={transId}
              />
            )}

            {componentStates.aprooveReject !== null && componentStates.aprooveReject !== 'canceled' && (
              <DiscrepancySection
                trans={trans}
                value={componentStates.discrepancySection}
                setValue={(value) => handleComponentStateChange('discrepancySection', value)}
                setDiscrepancySend={setDiscrepancySend}
              />
            )}

            {componentStates.discrepancySection !== null && (
              <ClientInformation modal={modal} setModal={setModal} trans={trans} />
            )}

            {componentStates.discrepancySection !== null && <FinalSection transId={transId} />}
          </div>
        )}
        {/* <ModalEditReciever modal={modal} setModal={setModal} trans={trans} /> */}
      </div>
    </div>
  );
};

export default TransactionModal;
