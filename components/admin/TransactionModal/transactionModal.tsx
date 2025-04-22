'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import SkeletonModal from '@/components/admin/TransactionModal/componentesModal/SkeletonModal';
import InfoStatus from '@/components/admin/TransactionModal/componentesModal/InfoStatus';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { useParams } from 'next/navigation';
import TransactionDetail from '@/components/admin/TransactionModal/componentesModal/DetailTransaction';
import ClientMessage from '@/components/admin/TransactionModal/componentesModal/ui/ClientMessage';
import TransferImages from '@/components/admin/TransactionModal/componentesModal/TransferImages';
import ConfirmTransButton from '@/components/admin/TransactionModal/componentesModal/ConfirmTransButton';
import AprobarRechazar from '@/components/admin/TransactionModal/componentesModal/aprobarRechazar';
import DiscrepancySection from '@/components/admin/TransactionModal/componentesModal/DiscrepancySection';
import ClientInformation from '@/components/admin/TransactionModal/componentesModal/ClientInformation';
import FinalSection from '@/components/admin/TransactionModal/componentesModal/FinalSection';
import { useSession } from 'next-auth/react';

const MySwal = withReactContent(Swal);

const TransactionModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [discrepancySend, setDiscrepancySend] = useState(false);
  const [modal, setModal] = useState<boolean>(false);

  const { data: session } = useSession();
  const token = session?.decodedToken.token;

  const params = useParams();
  const transId = params.id as string;

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
    },
    [setComponentStates, setSelected],
  );

  // Close the modal
  const handleClose = useCallback(() => {
    setIsVisible(false);
    // Give time for the animation to complete before actually closing
    setTimeout(() => MySwal.close(), 300);
  }, []);

  useEffect(() => {
    console.log('componentStates', componentStates);
  }, [componentStates]);

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

    let payload = {};

    // Preparar el payload según el estado
    switch (status) {
      case 'review_payment':
        payload = {
          review: form.transfer_id,
        };
        break;
      case 'approved':
        // No se envía información adicional
        break;
      case 'discrepancy':
        payload = {
          descripcion: form.description,
        };
        break;
      case 'canceled':
        payload = {
          descripcion: form.reason,
        };
        break;
      case 'modified':
        payload = {
          descripcion: form.description,
        };
        break;
      case 'refunded':
        payload = {
          codigo_transferencia: form.refund_code,
        };
        break;
      case 'completed':
      case 'in_transit':
        // No se requiere enviar información adicional
        break;
      default:
        break;
    }

    try {
      const response = await fetch(`/admin/transactions/status/${status}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Respuesta exitosa:', data);
      setSubmitSuccess(true);

      // Resetear el formulario después de un envío exitoso
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError('Error desconocido');
      }
      setSubmitSuccess(false);
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`relative flex h-full w-full flex-col overflow-y-auto rounded-lg bg-white transition-transform duration-300 ease-out dark:bg-gray-900 ${
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
            classnames="min-h-[4.25rem] border"
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

          {/* Confirmar Transferencia */}
          <ConfirmTransButton
            value={componentStates.confirmTransButton}
            setValue={(value) => handleComponentStateChange('confirmTransButton', value)}
            trans={trans}
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
