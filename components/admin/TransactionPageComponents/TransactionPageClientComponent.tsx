'use client';

import { useState } from 'react';
import type { TransactionTypeSingle } from '@/types/transactions/transactionsType';
import type { NoteTypeSingle } from '@/types/transactions/notesType';
import type { RegretTypeSingle } from '@/types/transactions/regretsType';
import SkeletonModal from '../TransactionModal/componentesModal/SkeletonModal';
import InfoStatus from '../TransactionModal/componentesModal/InfoStatus';
import ConfirmTransButton from '../TransactionModal/componentesModal/ConfirmTransButton';
import AprobarRechazar from '../TransactionModal/componentesModal/aprobarRechazar';
import ClientInformation from '../TransactionModal/componentesModal/ClientInformation';
import FinalSection from '../TransactionModal/componentesModal/FinalSection';
import TransferImages from '../TransactionModal/componentesModal/TransferImages/TransferImages';
import TransactionDetail from '../TransactionModal/componentesModal/DetailTransaction';
import ClientMessage from '../TransactionModal/componentesModal/ui/ClientMessage';
import { useTransactionStore } from '@/store/transactionModalStorage';
import { useTransactionStoreInit } from '@/hooks/admin/transactionPageHooks/useTransactionStoreInit';
import { useTransactionStatusUpdate } from '@/hooks/admin/transactionPageHooks/useTransactionStatusUpdate';
import { useModalAnimation } from '@/hooks/admin/transactionPageHooks/useModalAnimation';
import { useTransactionSubmission } from '@/hooks/admin/transactionPageHooks/useTransactionSubmision';
import { useComponentStateManagement } from '@/hooks/admin/transactionPageHooks/useComponentStateManagement';
import ClientEditCancelMessage, {
  ClientMessageType,
} from '../TransactionModal/componentesModal/ui/ClientEditCancelMessage';

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
}: TransactionPageClientComponentProps) {
  const [discrepancySend, setDiscrepancySend] = useState(false);
  const [modal, setModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const { status, setStatus } = useTransactionStore();

  const transId = initialTransaction.transaction.transaction_id;

  // Usar hooks personalizados
  useTransactionStoreInit({
    initialTransaction,
    initialStatus,
    initialComponentStates,
    transIdAdmin,
    noteEdit,
    regretCancel,
  });

  useTransactionStatusUpdate(transId, setStatus);

  const { isVisible } = useModalAnimation();

  const { isSubmitting, submitError, submitSuccess, handleSubmit, setIsSubmitting, setSubmitError, setSubmitSuccess } =
    useTransactionSubmission(transId, setStatus);

  const { componentStates, selected, handleComponentStateChange, handleSelectionChange } =
    useComponentStateManagement();

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

          <div className="col-span-2 lg:col-span-1">
            <div className="grid gap-4">
              <TransferImages trans={initialTransaction} />

              {/* aca tendria que ir el mensaje de edicion o cancelacion */}

              <ClientEditCancelMessage
                type={
                  initialTransaction.transaction.note_id && regretCancel
                    ? ClientMessageType.Cancel
                    : initialTransaction.transaction.note_id && noteEdit
                      ? ClientMessageType.Edit
                      : null
                }
                message={regretCancel?.note || noteEdit?.note}
              />

              {/* {initialTransaction.transaction.regret_id && regretCancel ? (
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
              ) : null} */}

              <TransactionDetail transaction={initialTransaction} isLoading={isLoading} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
