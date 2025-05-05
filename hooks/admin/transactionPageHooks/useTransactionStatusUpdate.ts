'use client';

import { useEffect } from 'react';
import ServiceTransaction from '@/components/admin/TransactionPageComponents/ServiceTransaction';

/**
 * Hook para actualizar periódicamente el estado de la transacción
 */
export function useTransactionStatusUpdate(transId: string, setStatus: (status: string) => void) {
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

    // updateStatus()

    // Set up interval for periodic updates
    const intervalId = setInterval(updateStatus, 30000); // Every 30 seconds

    return () => clearInterval(intervalId);
  }, [transId, setStatus]);
}
