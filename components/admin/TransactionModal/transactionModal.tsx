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
import TransferImages from '@/components/admin/TransactionModal/componentesModal/TransferImages/TransferImages';
import ConfirmTransButton from '@/components/admin/TransactionModal/componentesModal/ConfirmTransButton';
import AprobarRechazar from '@/components/admin/TransactionModal/componentesModal/aprobarRechazar';
import ClientInformation from '@/components/admin/TransactionModal/componentesModal/ClientInformation';
import FinalSection from '@/components/admin/TransactionModal/componentesModal/FinalSection';
import { useSession } from 'next-auth/react';
import { useTransactionFlow } from '../utils/useTransactionHistoryState';


const MySwal = withReactContent(Swal);

const TransactionModal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [discrepancySend, setDiscrepancySend] = useState(false);
  const [modal, setModal] = useState<boolean>(false);

  const { data: session } = useSession();
  const token = session?.accessToken;

  const params = useParams();
  const transId = params.id as string;

  const transactionFlow = useTransactionFlow(transId, token || '');

  const {
    isLoading,
    trans,
    componentStates,
    selected,
    fetchTransaction,
    fetchRegret,
    updateTransactionStatusFromStore,
    setComponentStates,
    setSelected,
    getStatusClient,
    regretCancel
  } = useTransactionStore();

  const transaction = trans;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (transId) {
      fetchTransaction(transId);
    }
  }, [transId, fetchTransaction]);

  useEffect(() => {
    if (!transaction) return;

    // Solo fetch del regret si existe regret_id
    // Las notas ahora vienen directamente en transaction.note
    if (transaction.regret) {
      fetchRegret(transaction.regret.id);
    }
  }, [transaction, fetchRegret]);

  useEffect(() => {
    if (!transId || !trans) return;
    updateTransactionStatusFromStore(transId, trans);
    getStatusClient(transId, trans);
  }, [transId, trans, componentStates, updateTransactionStatusFromStore, getStatusClient]);

  const handleComponentStateChange = useCallback(
    (key: any, value: any) => {
      setComponentStates(key, value);
    },
    [setComponentStates],
  );

  const handleSelectionChange = useCallback(
    (value: any) => {
      setComponentStates('aprooveReject', value);
      setSelected(value);
    },
    [setComponentStates, setSelected],
  );

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => MySwal.close(), 300);
  }, []);

  useEffect(() => {}, [componentStates]);

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

    switch (status) {
      case 'review_payment':
        payload = {
          review: form.transfer_id,
        };
        break;
      case 'approved':
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
      setSubmitSuccess(true);

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
            message={transaction.message}
            headerMessage="Mensaje del cliente"
            classnames="min-h-[4.25rem] border"
          />

          <TransferImages trans={(transaction)} />

          {transaction.regret?.id ? (
            <div className="flex flex-col">
              <p className="text-left text-base font-medium">
                El Cliente solicito la Cancelación y el Reembolso - Se realiza el reembolso a la cuenta de origen
              </p>
              <ClientMessage
                headerMessage="Mensaje"
                message={transaction.regret.description}
                classnames="border-[#CE1818] min-h-[4.25rem]"
              />
            </div>
          ) : transaction.note?.message ? (
            <div className="flex flex-col">
              <p className="text-base font-medium">El Cliente solicito editar la solicitud</p>
              <ClientMessage
                headerMessage="mensaje"
                message={transaction.note.message}
                classnames="border-[#D75600] min-h-[4.25rem]"
              />
            </div>
          ) : null}

          <ConfirmTransButton
            value={componentStates.confirmTransButton}
            setValue={(value) => handleComponentStateChange('confirmTransButton', value)}
            trans={trans}
            submit={handleSubmit}
            setIsSubmitting={setIsSubmitting}
            setSubmitError={setSubmitError}
            setSubmitSuccess={setSubmitSuccess}
            transactionFlow={transactionFlow}
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
              transactionFlow={transactionFlow}
            />
          )}

          {componentStates.confirmTransButton !== null &&
            (componentStates.aprooveReject === 'accepted' ||
              (componentStates.aprooveReject !== 'canceled' &&
                componentStates.discrepancySection !== null &&
                (componentStates.discrepancySection !== true || discrepancySend))) && (
              <>
                <ClientInformation transactionFlow={transactionFlow} />
                <FinalSection transId={transId} />
              </>
            )}
        </div>
      )}
    </div>
  );
};

export default TransactionModal;