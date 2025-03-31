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
      onClick={(e) => e.stopPropagation()}
      className={`relative flex h-full w-full flex-col overflow-y-auto rounded-lg transition-transform duration-300 ease-out dark:bg-gray-900 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      tabIndex={-1}
    >
      {isLoading ? (
        <SkeletonModal />
      ) : (
        <div className="flex flex-col gap-4 font-textFont">
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
                headerMessage="mensaje"
                message={noteEdit.note}
                classnames="border-[#D75600] min-h-[4.25rem]"
              />
            </div>
          ) : null}

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
              trans={trans}
              handleComponentStateChange={handleComponentStateChange}
              setDiscrepancySend={setDiscrepancySend}
            />
          )}

          {componentStates.confirmTransButton !== null &&
            (componentStates.aprooveReject === 'accepted' ||
              (componentStates.aprooveReject !== 'canceled' &&
                componentStates.discrepancySection !== null &&
                (componentStates.discrepancySection !== true || discrepancySend))) && (
              <>
                <ClientInformation modal={modal} setModal={setModal} trans={trans} />
                <FinalSection transId={transId} />
              </>
            )}
        </div>
      )}
    </div>
  );
};

export default TransactionModal;
