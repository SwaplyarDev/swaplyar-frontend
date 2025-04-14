import { create } from 'zustand';

interface WhatsAppFormStore {
  phone: string;
  setPhone: (phone: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const useWhatsAppFormStore = create<WhatsAppFormStore>((set, get) => ({
  phone: '',
  setPhone: (phone) => set({ phone }),
  error: '',
  setError: (error) => set({ error }),
}));
