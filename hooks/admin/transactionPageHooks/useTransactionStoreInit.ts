'use client';

import { useEffect } from 'react';
import { useTransactionStore } from '@/store/transactionModalStorage';
import { Note, TransactionV2, emptyNote} from '@/types/transactions/transactionsType'
import type { RegretTypeSingle } from '@/types/transactions/regretsType';


interface UseTransactionStoreInitProps {
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
}

export function useTransactionStoreInit({
  initialTransaction,
  initialStatus,
  initialComponentStates,
  transIdAdmin,
  noteEdit,
  regretCancel,
}: UseTransactionStoreInitProps) {
  useEffect(() => {
    useTransactionStore.setState({
      trans: initialTransaction,
      noteEdit: noteEdit || emptyNote ,
      regretCancel: regretCancel || {
        note: '',
        regret_id: '',
        transaction_id: '',
        last_name: '',
        email: '',
        phone_number: '',
        status: '',
        created_at: '',
      },
      status: initialStatus,
      componentStates: initialComponentStates,
      transIdAdmin: transIdAdmin,
    });
  }, [initialTransaction, initialStatus, initialComponentStates, transIdAdmin, noteEdit, regretCancel]);
}
