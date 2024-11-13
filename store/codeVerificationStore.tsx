import { create } from 'zustand';

type CodeVerificationState = {
  attempts: number;
  lockUntil: number | null; // Permitir null
  decrementAttempts: () => void;
  setLockUntil: (time: number | null) => void; // Permitir null
  resetAttempts: () => void;
};

const useCodeVerificationStore = create<CodeVerificationState>((set) => ({
  attempts: 3,
  lockUntil: null,
  decrementAttempts: () => set((state) => ({ attempts: state.attempts > 0 ? state.attempts - 1 : 0 })),
  setLockUntil: (time) => set(() => ({ lockUntil: time })),
  resetAttempts: () => set(() => ({ attempts: 3 })),
}));

export default useCodeVerificationStore;
