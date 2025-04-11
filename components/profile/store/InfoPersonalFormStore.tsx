import { create } from 'zustand';

interface InfoPersonalFormStore {
  alias: string;
  setAlias: (alias: string) => void;
  error: string;
  setError: (error: string) => void;
}

export const useInfoPersonalFormStore = create<InfoPersonalFormStore>((set, get) => ({
  alias: '',
  setAlias: (alias) => set({ alias }),
  error: '',
  setError: (error) => set({ error }),
}));
