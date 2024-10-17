import { create } from 'zustand';

interface EmailVerificationStore {
  email: string;
  setEmail: (email: string) => void;
  clearEmail: () => void;
}

const useEmailVerificationStore = create<EmailVerificationStore>((set) => ({
  email: '',
  setEmail: (email) => set({ email }), // Actualizar el email
  clearEmail: () => set({ email: '' }), // Limpiar el email
}));

export default useEmailVerificationStore;
