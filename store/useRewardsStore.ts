import { create } from 'zustand';

interface RewardsStore {
  stars: number;
  quantity: number;
  loading: boolean;
  error: string | null;
  setData: (stars: number, quantity: number) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useRewardsStore = create<RewardsStore>((set) => ({
  stars: 0,
  quantity: 0,
  loading: true,
  error: null,
  setData: (stars, quantity) => set({ stars, quantity }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
}));
