'use client';

import { useState, useEffect, useMemo } from 'react';
import type { NoteTypeSingle } from '@/types/transactions/notesType';
import type { RegretTypeSingle } from '@/types/transactions/regretsType';
import SkeletonModal from '../TransactionModal/componentesModal/SkeletonModal';
import InfoStatus from '../TransactionModal/componentesModal/InfoStatus';
import ConfirmTransButton from '../TransactionModal/componentesModal/ConfirmTransButton';
import AprobarRechazar from '../TransactionModal/componentesModal/aprobarRechazar';
import ClientInformation from '../TransactionModal/componentesModal/ClientInformation';
import TransferImages from '../TransactionModal/componentesModal/TransferImages/TransferImages';
import TransactionDetail from '../TransactionModal/componentesModal/DetailTransaction';
import { useTransactionStore } from '@/store/transactionModalStorage';
import { useTransactionStoreInit } from '@/hooks/admin/transactionPageHooks/useTransactionStoreInit';
import { useTransactionStatusUpdate } from '@/hooks/admin/transactionPageHooks/useTransactionStatusUpdate';
import { useModalAnimation } from '@/hooks/admin/transactionPageHooks/useModalAnimation';
import { useTransactionSubmission } from '@/hooks/admin/transactionPageHooks/useTransactionSubmision';
import { useComponentStateManagement } from '@/hooks/admin/transactionPageHooks/useComponentStateManagement';
import ClientEditCancelMessage, {
  ClientMessageType,
} from '../TransactionModal/componentesModal/ui/ClientEditCancelMessage';
import { TransactionV2 } from '@/types/transactions/transactionsType';
import { getTransactionStatusHistory } from '@/actions/transactions/transactions.action';

interface TransactionPageClientComponentProps {
  initialTransaction: TransactionV2;
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
  initialComponentStates: propInitialComponentStates,
  transIdAdmin,
  noteEdit,
  regretCancel,
  token,
}: TransactionPageClientComponentProps) {
  const [discrepancySend, setDiscrepancySend] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { status, setStatus } = useTransactionStore();

  const transId = initialTransaction.id;
  const [initialConfirmButtonSelection, setInitialConfirmButtonSelection] = useState<boolean | null>(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [hasUserChangedConfirm, setHasUserChangedConfirm] = useState(false);
  const [isTransactionApproved, setIsTransactionApproved] = useState(false);


  useEffect(() => {
    const fetchHistoryAndSetInitialState = async () => {
      setIsLoading(true);
      if (transId && token) {
        try {
          const history = await getTransactionStatusHistory(transId, token);
          if (history && history.length > 0) {
            const lastStatusEntry = history[history.length - 1];
            const lastStatus = lastStatusEntry.status;
            const confirmYesStatuses = ['review_payment', 'approved', 'discrepancy', 'refunded', 'completed'];

            if (confirmYesStatuses.includes(lastStatus)) {
              setInitialConfirmButtonSelection(true);
            } else if (lastStatus === 'rejected') {
              setInitialConfirmButtonSelection(false);
            } else {
              setInitialConfirmButtonSelection(false);
            }
          } else {
            setInitialConfirmButtonSelection(false);
          }
        } catch (error) {
          console.error('Error fetching transaction status history:', error);
          setInitialConfirmButtonSelection(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    fetchHistoryAndSetInitialState();
  }, [transId, token, refreshKey]);

  const combinedInitialComponentStates = useMemo(() => {
    return {
      ...propInitialComponentStates,
      confirmTransButton: initialConfirmButtonSelection,
    };
  }, [propInitialComponentStates, initialConfirmButtonSelection]);

  useTransactionStoreInit({
    initialTransaction: initialTransaction,
    initialStatus,
    initialComponentStates: combinedInitialComponentStates,
    transIdAdmin,
    noteEdit,
    regretCancel,
  });

  useTransactionStatusUpdate(transId, setStatus, token);

  const { isVisible } = useModalAnimation();

  const {
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit: baseHandleSubmit,
    setIsSubmitting,
    setSubmitError,
    setSubmitSuccess,
  } = useTransactionSubmission(transId, setStatus);

  const handleFormSubmit = async (
    status: string,
    form: any,
    setIsSubmittingCallback: (isSubmitting: boolean) => void,
    setSubmitErrorCallback: (error: string | null) => void,
    setSubmitSuccessCallback: (success: boolean) => void,
  ) => {
    await baseHandleSubmit(
      status,
      form,
      setIsSubmittingCallback,
      setSubmitErrorCallback,
      setSubmitSuccessCallback
    );
  };

  
  useEffect(() => {
    if (submitSuccess) {
      setRefreshKey(prev => prev + 1);
      setHasUserChangedConfirm(false);

      (async () => {
        if (transId && token) {
          try {
            const history = await getTransactionStatusHistory(transId, token);
            if (history && history.length > 0) {
              const lastStatusEntry = history[history.length - 1];
              const lastStatus = lastStatusEntry.status;
              const confirmYesStatuses = ['review_payment', 'approved', 'discrepancy', 'refunded','completed'];

              if (confirmYesStatuses.includes(lastStatus)) {
                setInitialConfirmButtonSelection(true);
              } else if (lastStatus === 'rejected') {
                setInitialConfirmButtonSelection(false);
              } else {
                setInitialConfirmButtonSelection(false);
              }
            }
          } catch (error) {
            console.error('Error refreshing status after submit:', error);
          }
        }
      })();
    }
  }, [submitSuccess, transId, token]);

  const { componentStates, selected, handleComponentStateChange, handleSelectionChange } =
    useComponentStateManagement();

  const handleConfirmChange = (value: boolean | null) => {
    setHasUserChangedConfirm(true);
    handleComponentStateChange('confirmTransButton', value);
  };

  useEffect(() => {
    if (hasUserChangedConfirm) return;

    const confirmYesStatuses = ['review_payment', 'approved', 'discrepancy', 'refunded'];
    const shouldBeConfirmed = confirmYesStatuses.includes(status);
    const shouldBeFalse = status === 'rejected' || !shouldBeConfirmed;

    if (shouldBeConfirmed && componentStates.confirmTransButton !== true) {
      handleComponentStateChange('confirmTransButton', true);
    } else if (shouldBeFalse && componentStates.confirmTransButton !== false) {
      handleComponentStateChange('confirmTransButton', false);
    }
  }, [status, componentStates.confirmTransButton, handleComponentStateChange, hasUserChangedConfirm]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative grid h-full w-full grid-cols-1 gap-4 overflow-y-auto rounded-lg border-none bg-gray-50 font-textFont shadow-sm outline-0 ring-0 transition-all duration-300 ease-out dark:bg-gray-900 lg:grid-cols-2 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      tabIndex={-1}
    >
      {isLoading ? (
        <SkeletonModal />
      ) : (
        <>
          <div className="col-span-2">
            <InfoStatus trans={initialTransaction} transId={transId} />
          </div>

          <div className="col-span-1">
            <div className="grid gap-4">
              <ConfirmTransButton
                value={componentStates.confirmTransButton}
                setValue={handleConfirmChange}
                trans={initialTransaction}
                submit={handleFormSubmit}
                setIsSubmitting={setIsSubmitting}
                setSubmitError={setSubmitError}
                setSubmitSuccess={setSubmitSuccess}
                token={token} 
                transId={transId} 
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
                  onApprovedChange={setIsTransactionApproved}
                  token={token}
                />
              )}

              {componentStates.confirmTransButton !== null &&
                (componentStates.aprooveReject === 'accepted' ||
                  isTransactionApproved ||
                  (componentStates.aprooveReject !== 'canceled' &&
                    componentStates.discrepancySection !== null &&
                    (componentStates.discrepancySection !== true || discrepancySend))) && (
                  <ClientInformation />
                )}
            </div>
          </div>

          <div className="col-span-2 lg:col-span-1">
            <div className="grid gap-4">
              <TransferImages trans={initialTransaction} />

              <ClientEditCancelMessage
                type={
                  initialTransaction.regret_id
                    ? ClientMessageType.Cancel
                    : initialTransaction.note_id
                    ? ClientMessageType.Edit
                    : null
                }
                message={regretCancel?.note || noteEdit?.note}
                createdAt={regretCancel?.created_at || noteEdit?.created_at}
              />

              <TransactionDetail transaction={initialTransaction} isLoading={isLoading} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
