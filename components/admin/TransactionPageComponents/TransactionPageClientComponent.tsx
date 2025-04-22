'use client';

import { useState, useEffect } from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import type { NoteTypeSingle } from '@/types/transactions/notesType';
import type { RegretTypeSingle } from '@/types/transactions/regretsType';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import SkeletonModal from '../TransactionModal/componentesModal/SkeletonModal';
import InfoStatus from '../TransactionModal/componentesModal/InfoStatus';
import ConfirmTransButton from '../TransactionModal/componentesModal/ConfirmTransButton';
import AprobarRechazar from '../TransactionModal/componentesModal/aprobarRechazar';
import ClientInformation from '../TransactionModal/componentesModal/ClientInformation';
import FinalSection from '../TransactionModal/componentesModal/FinalSection';
import TransferImages from '../TransactionModal/componentesModal/TransferImages';
import TransactionDetail from '../TransactionModal/componentesModal/DetailTransaction';
import ClientMessage from '../TransactionModal/componentesModal/ui/ClientMessage';
import { useTransactionStore } from '@/store/transactionModalStorage';
import ServiceTransaction from './ServiceTransaction';

const MySwal = withReactContent(Swal);

interface TransactionPageClientComponentProps {
  initialTransaction: TransactionTypeSingle;
  initialStatus: string;
  initialComponentStates: {
    aprooveReject: 'stop' | 'accepted' | 'canceled' | null;
    confirmTransButton: boolean | null;
    discrepancySection: boolean | null;
    transferRealized: boolean;
  };
  transIdAdmin: string;
  noteEdit: NoteTypeSingle | null;
  regretCancel: RegretTypeSingle | null;
  token: string;
}

export default function TransactionPageClientComponent({
  initialTransaction,
  initialStatus,
  initialComponentStates,
  transIdAdmin,
  noteEdit,
  regretCancel,
  token,
}: TransactionPageClientComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [discrepancySend, setDiscrepancySend] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { componentStates, selected, setComponentStates, setSelected, setStatus, status } = useTransactionStore();

  const transId = initialTransaction.transaction.transaction_id;

  // Initialize store with server data on mount
  useEffect(() => {
    useTransactionStore.setState({
      trans: initialTransaction,
      noteEdit: noteEdit || { note: '', note_id: '', transaction_id: '', created_at: '' },
      regretCancel: regretCancel || {
        note: '',
        regret_id: '',
        transaction_id: '',
        last_name: '',
        email: '',
        phone_number: '',
        status: '',
      },
      status: initialStatus,
      componentStates: initialComponentStates,
      transIdAdmin: transIdAdmin,
    });
  }, [initialTransaction, initialStatus, initialComponentStates, transIdAdmin, noteEdit, regretCancel]);

  // Handle modal animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  // Update transaction status periodically
  useEffect(() => {
    if (!transId) return;

    const updateStatus = async () => {
      try {
        const transactionDetails = await ServiceTransaction.GetTransactionDetails(transId);
        if (transactionDetails?.status) {
          setStatus(transactionDetails.status);
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    updateStatus();

    // Set up interval for periodic updates
    const intervalId = setInterval(updateStatus, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [transId, setStatus]);

  // Handle component state changes
  const handleComponentStateChange = (key: keyof typeof componentStates, value: any) => {
    setComponentStates(key, value);
  };

  // Handle selection change
  const handleSelectionChange = (value: 'stop' | 'accepted' | 'canceled' | null) => {
    setComponentStates('aprooveReject', value);
    setSelected(value);
  };

  // Close the modal
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => MySwal.close(), 300);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (
    status: string,
    form: any,
    setIsSubmitting: (isSubmitting: boolean) => void,
    setSubmitError: (error: string | null) => void,
    setSubmitSuccess: (success: boolean) => void,
  ) => {
    setIsSubmitting(true);
    setSubmitError(null);

    // Preparar el payload con el ID de transacción
    const payload = {
      ...form,
      transaction_id: transId,
    };

    try {
      // Usar el Server Action a través del TransactionService
      const result = await ServiceTransaction.UpdateTransactionStatus(status, payload);

      if (!result.success) {
        throw new Error(result.error || 'Error al actualizar la transacción');
      }

      setSubmitSuccess(true);

      // Actualizar el estado en el store
      setStatus(status);

      // Reset form after successful submission
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting data:', error);
      if (error instanceof Error) {
        setSubmitError(error.message || 'Error desconocido');
      } else {
        setSubmitError('Error desconocido');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative flex h-full w-full flex-col overflow-y-auto rounded-lg bg-gray-50 shadow-sm transition-all duration-300 ease-out dark:bg-gray-900 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      tabIndex={-1}
    >
      {isLoading ? (
        <SkeletonModal />
      ) : (
        <div className="grid grid-cols-2 gap-4 font-textFont">
          <div className="col-span-2">
            <InfoStatus trans={initialTransaction} transId={transId} />
          </div>

          <div>
            <div className="grid gap-4">
              {/* Confirmar Transferencia */}
              <ConfirmTransButton
                value={componentStates.confirmTransButton}
                setValue={(value) => handleComponentStateChange('confirmTransButton', value)}
                trans={initialTransaction}
                submit={handleSubmit}
                setIsSubmitting={setIsSubmitting}
                setSubmitError={setSubmitError}
                setSubmitSuccess={setSubmitSuccess}
              />

              {componentStates.confirmTransButton != null && (
                <AprobarRechazar
                  selected={selected}
                  componentStates={componentStates}
                  onSelectChange={handleSelectionChange}
                  transId={transId}
                  trans={initialTransaction}
                  handleComponentStateChange={(key, value) =>
                    handleComponentStateChange(key as keyof typeof componentStates, value)
                  }
                  setDiscrepancySend={setDiscrepancySend}
                />
              )}

              {componentStates.confirmTransButton !== null &&
                (componentStates.aprooveReject === 'accepted' ||
                  (componentStates.aprooveReject !== 'canceled' &&
                    componentStates.discrepancySection !== null &&
                    (componentStates.discrepancySection !== true || discrepancySend))) && (
                  <>
                    <ClientInformation modal={modal} setModal={setModal} trans={initialTransaction} />
                    <FinalSection transId={transId} />
                  </>
                )}
            </div>
          </div>

          <div>
            <div className="grid gap-4">
              <TransferImages trans={initialTransaction} />

              <TransactionDetail transaction={initialTransaction} isLoading={isLoading} />

              <ClientMessage
                message={initialTransaction.transaction.message}
                headerMessage="Mensaje del cliente"
                classnames="min-h-[4.25rem] border"
              />

              {initialTransaction.transaction.regret_id && regretCancel ? (
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
              ) : initialTransaction.transaction.note_id && noteEdit ? (
                <div className="flex flex-col">
                  <p className="text-base font-medium">El Cliente solicito Editar la Solicitud</p>
                  <ClientMessage
                    headerMessage="mensaje"
                    message={noteEdit.note}
                    classnames="border-[#D75600] min-h-[4.25rem]"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
