import { create } from 'zustand';
import { NoteTypeSingle, emptyNote } from '@/types/transactions/notesType';
import { RegretTypeSingle, emptyRegret } from '@/types/transactions/regretsType';
import { TransactionTypeSingle, emptyTransaction } from '@/types/transactions/transactionsType';
import {
  getTransactionById,
  updateStatusClient,
  getStatusTransactionAdmin,
  postStatusInAdmin,
  updateStatusAdmin,
} from '@/actions/transactions/transactions.action';
import { getNoteById } from '@/actions/transactions/notes.action';
import { getRegret } from '@/actions/repentance/repentanceForm.action';
import { convertTransactionState, getComponentStatesFromStatus } from '@/utils/transactionStatesConverser';
import { TransactionService } from '@/components/TransactionModal/componentesModal/ui/TransactionService';

interface TransactionState {
  trans: TransactionTypeSingle;
  noteEdit: NoteTypeSingle;
  regretCancel: RegretTypeSingle;
  isLoading: boolean;
  transIdAdmin: string;
  status: string;
  componentStates: {
    aprooveReject: 'stop' | 'accepted' | 'canceled' | null;
    confirmTransButton: boolean | null;
    discrepancySection: boolean | null;
    transferRealized: boolean;
  };
  selected: 'stop' | 'accepted' | 'canceled' | null;
  fetchTransaction: (transId: string) => Promise<void>;
  fetchNote: (noteId: string) => Promise<void>;
  fetchRegret: (regretId: string) => Promise<void>;
  setComponentStates: (key: keyof TransactionState['componentStates'], value: any) => void;
  setStatus: (status: string) => void;
  updateTransactionStatusFromStore: (transId: string) => Promise<void>;
  setSelected: (selected: 'stop' | 'accepted' | 'canceled' | null) => void;
  updateStatusFromComponents: () => void;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  trans: emptyTransaction,
  noteEdit: emptyNote,
  regretCancel: emptyRegret,
  isLoading: true,
  transIdAdmin: '',
  status: 'pending',

  componentStates: {
    aprooveReject: null,
    confirmTransButton: null,
    discrepancySection: null,
    transferRealized: false,
  },
  selected: null,

  fetchTransaction: async (transId) => {
    set({ isLoading: true });
    try {
      const trans = await getTransactionById(transId);
      const existOnAdmin: any = await getStatusTransactionAdmin(transId);
      if (trans) {
        if (existOnAdmin?.success) {
          const stat = convertTransactionState(existOnAdmin.data?.status);
          const comps = getComponentStatesFromStatus(existOnAdmin.data?.status);
          const idAdminTrans = existOnAdmin.data?.transaction_admin_id;
          set({ status: stat, componentStates: comps, transIdAdmin: idAdminTrans });
        } else {
          postStatusInAdmin(transId, '1');
        }
        set({ trans });
      }
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  updateTransactionStatusFromStore: async (transId) => {
    const { status } = get();
    console.log('📌 Estado antes de enviar al servicio:', status, transId);

    try {
      const response = await TransactionService(status, transId);

      if (response?.newStatus) {
        set({ status: response.newStatus });
        console.log('✅ Estado actualizado en el store:', response.newStatus);
      } else {
        console.warn('⚠️ No se recibió un nuevo estado en la respuesta.');
      }
    } catch (error) {
      console.error('❌ Error al actualizar el estado desde el store:', error);
    }
  },
  fetchNote: async (idNote: string) => {
    try {
      const note = await getNoteById(idNote);
      if (note) {
        set({ noteEdit: note });
      }
    } catch (error) {
      console.error('Error al obtener la solicitud de edición:', error);
    }
  },

  fetchRegret: async (idRegret: string) => {
    try {
      const { regret } = await getRegret(idRegret);
      if (regret) {
        set({ regretCancel: regret });
      }
    } catch (error) {
      console.error('Error al obtener el rechazo:', error);
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
    if (componentStates.aprooveReject === 'canceled') {
      newStatus = 'canceled';
    }

    if (componentStates.aprooveReject === 'stop' && componentStates.discrepancySection) {
      newStatus = 'discrepancy';
    } else if (componentStates.aprooveReject === 'stop' && !componentStates.discrepancySection) {
      newStatus = 'review_payment';
    } else if (
      componentStates.aprooveReject === 'accepted' &&
      !componentStates.discrepancySection &&
      !componentStates.transferRealized
    ) {
      newStatus = 'in_transit';
    } else if (
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
