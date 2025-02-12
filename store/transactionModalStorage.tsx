import { create } from 'zustand';
import { TransactionTypeSingle, emptyTransaction } from '@/types/transactions/transactionsType';
import { getTransactionById, updateStatusClient } from '@/actions/transactions/transactions.action';

interface TransactionState {
  trans: TransactionTypeSingle;
  isLoading: boolean;
  status: string;
  componentStates: {
    aprooveReject: 'stop' | 'accepted' | 'rejected' | null;
    confirmTransButton: boolean;
    discrepancySection: boolean;
    transferRealized: boolean;
  };
  selected: 'stop' | 'accepted' | 'rejected' | null;
  fetchTransaction: (transId: string) => Promise<void>;
  updateTransactionStatus: (transId: string) => Promise<void>;
  setComponentStates: (key: keyof TransactionState['componentStates'], value: any) => void;
  setStatus: (status: string) => void;
  setSelected: (selected: 'stop' | 'accepted' | 'rejected' | null) => void;
  updateStatusFromComponents: () => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  trans: emptyTransaction,
  isLoading: false,
  status: 'pending',
  componentStates: {
    aprooveReject: null,
    confirmTransButton: false,
    discrepancySection: false,
    transferRealized: false,
  },
  selected: null,

  fetchTransaction: async (transId) => {
    set({ isLoading: true });
    try {
      const trans = await getTransactionById(transId);
      if (trans) {
        set({ trans });
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  updateTransactionStatus: async (transId) => {
    try {
      const { status } = get();
      await updateStatusClient(transId, status);
      console.log('Estado de la transacción actualizado');
    } catch (error) {
      console.error('Error al actualizar el estado de la transacción:', error);
    }
  },

  setComponentStates: (key, value) => {
    set((state) => ({
      componentStates: { ...state.componentStates, [key]: value },
    }));
    get().updateStatusFromComponents();
  },

  updateStatusFromComponents: () => {
    const { componentStates, setStatus } = get();
    let newStatus = 'pending';
    if (!componentStates.confirmTransButton) {
      newStatus = 'rejected';
    }
    if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'stop' &&
      componentStates.discrepancySection
    ) {
      newStatus = 'discrepancy';
    } else if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'stop' &&
      !componentStates.discrepancySection
    ) {
      newStatus = 'review_payment';
    } else if (
      !componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'rejected' &&
      !componentStates.discrepancySection
    ) {
      newStatus = 'rejected';
    } else if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'accepted' &&
      !componentStates.discrepancySection &&
      !componentStates.transferRealized
    ) {
      newStatus = 'in_transit';
    } else if (
      componentStates.confirmTransButton &&
      componentStates.aprooveReject === 'accepted' &&
      !componentStates.discrepancySection &&
      componentStates.transferRealized
    ) {
      newStatus = 'completed';
    }

    setStatus(newStatus);
  },

  setStatus: (status) => set({ status }),

  setSelected: (selected) => set({ selected }),
}));
