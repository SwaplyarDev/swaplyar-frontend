// useVerificationStore.ts
import { create } from 'zustand';

type VerificationStatus = 'NO_VERIFICADO' | 'PENDIENTE' | 'VERIFICADO' | 'RECHAZADO';

interface VerificationStore {
  status: VerificationStatus;
  showApprovedMessage: boolean;
  setStatus: (status: VerificationStatus) => void;
  setShowApprovedMessage: (value: boolean) => void;
}

export const useVerificationStore = create<VerificationStore>((set) => ({
  status: 'NO_VERIFICADO',
  showApprovedMessage: false,
  setStatus: (status) => set({ status }),
  setShowApprovedMessage: (value) => set({ showApprovedMessage: value }),
}));
