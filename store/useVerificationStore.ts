// useVerificationStore.ts
import { create } from 'zustand';

type VerificationStatus = 'REENVIAR_DATOS' | 'PENDIENTE' | 'APROBADO' | 'RECHAZADO';

interface VerificationStore {
  status: VerificationStatus;
  showApprovedMessage: boolean;
  setStatus: (status: VerificationStatus) => void;
  setShowApprovedMessage: (value: boolean) => void;
}

export const useVerificationStore = create<VerificationStore>((set) => ({
  status: 'REENVIAR_DATOS',
  showApprovedMessage: false,
  setStatus: (status) => set({ status }),
  setShowApprovedMessage: (value) => set({ showApprovedMessage: value }),
}));
