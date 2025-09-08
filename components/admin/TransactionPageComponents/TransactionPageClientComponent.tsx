'use client';

import { useState, useEffect, useMemo } from 'react';
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
import type { TransactionV2 } from '@/types/transactions/transactionsType';
import { useTransactionFlow } from '../utils/useTransactionHistoryState';
import type { Note } from '@/types/transactions/transactionsType'

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
  noteEdit: Note | null;
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
  const { status, setStatus } = useTransactionStore();

  const transId = initialTransaction.id;
  const [refreshKey, setRefreshKey] = useState(0);
  const [hasUserChangedConfirm, setHasUserChangedConfirm] = useState(false);
  const [isTransactionApproved, setIsTransactionApproved] = useState(false);

  const transactionFlow = useTransactionFlow(transId, token);

  const combinedInitialComponentStates = useMemo(() => {
    return {
      ...propInitialComponentStates,
      confirmTransButton: transactionFlow.initialConfirmButtonValue,
    };
  }, [propInitialComponentStates, transactionFlow.initialConfirmButtonValue]);

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
    await baseHandleSubmit(status, form, setIsSubmittingCallback, setSubmitErrorCallback, setSubmitSuccessCallback);
  };

  const { componentStates, selected, handleComponentStateChange, handleSelectionChange } =
    useComponentStateManagement();

  const handleConfirmChange = (value: boolean | null) => {
    setHasUserChangedConfirm(true);
    handleComponentStateChange('confirmTransButton', value);
  };

  useEffect(() => {
    if (hasUserChangedConfirm) return;

    const confirmYesStatuses = ['review_payment', 'approved', 'discrepancy', 'refunded', 'modified'];
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
      {transactionFlow.isLoading ? (
        <SkeletonModal />
      ) : (
        <>
          <div className="col-span-2">
            <InfoStatus trans={initialTransaction} transId={transId} />
          </div>

          <div className="col-span-1">
            <div className="grid gap-4">
              {transactionFlow.shouldShowConfirmButton && (
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
                  transactionFlow={transactionFlow}
                />
              )}

              {transactionFlow.shouldShowApproveReject && (
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
                  transactionFlow={transactionFlow}
                />
              )}

              {transactionFlow.shouldShowClientInformationDirectly && (
                <ClientInformation transactionFlow={transactionFlow} />
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
                    : initialTransaction.note?.message
                      ? ClientMessageType.Edit
                      : null
                }
                message={initialTransaction.regret_id ? regretCancel?.note : initialTransaction.note?.message}
                createdAt={initialTransaction.regret_id ? regretCancel?.created_at : initialTransaction.note?.createdAt}
              />

              <TransactionDetail transaction={initialTransaction} isLoading={transactionFlow.isLoading} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
