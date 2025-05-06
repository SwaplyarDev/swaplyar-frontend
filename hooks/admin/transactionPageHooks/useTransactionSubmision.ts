'use client';

import { useState } from 'react';
import ServiceTransaction from '@/components/admin/TransactionPageComponents/ServiceTransaction';

/**
 * Hook para manejar el envío de formularios de transacción
 */
export function useTransactionSubmission(transId: string, setStatus: (status: string) => void) {
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
    };

    try {
      // Usar el Server Action a través del TransactionService
      const result = await ServiceTransaction.UpdateTransactionStatus(status, transId, payload);

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

  return {
    isSubmitting,
    submitError,
    submitSuccess,
    handleSubmit,
    setIsSubmitting,
    setSubmitError,
    setSubmitSuccess,
  };
}
