'use client';

import { useEffect } from 'react';
import ServiceTransaction from '@/components/admin/TransactionPageComponents/ServiceTransaction';

/**
 * Hook para actualizar periódicamente el estado de la transacción
 */
export function useTransactionStatusUpdate(
  transId: string,
  setStatus: (status: string) => void,
  token: string
) {
  // Update transaction status periodically
  useEffect(() => {
    if (!transId || !token) return;

    const updateStatus = async () => {
      try {
        const transactionDetails = await ServiceTransaction.GetTransactionDetails(transId, token);
        if (transactionDetails?.finalStatus) {
          setStatus(transactionDetails.finalStatus);
        }
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };

    // updateStatus()

    // Set up interval for periodic updates
    const intervalId = setInterval(updateStatus, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [transId, setStatus, token]);
}
