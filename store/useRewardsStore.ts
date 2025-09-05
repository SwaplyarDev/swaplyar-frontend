import { create } from 'zustand';

export type CouponInstance = 'NONE' | 'THREE' | 'FIVE' | 'TEN' | 'MANUAL';

interface RewardsStore {
  stars: number;
  quantity: number;
  discounts_ids: string[];

  used3USD: boolean;
  used5USD: boolean;
  used10USD: boolean;
  usedManual: boolean;

  couponInstance: CouponInstance;
  loading: boolean;
  error: string | null;
  setCouponInstanceByAmount: (couponAmount: number) => void;
  addDiscountId: (id: string) => void;
  resetDiscounts: () => void;
  isUsed: (couponValue: number) => boolean;
  setData: (stars: number, quantity: number) => void;
  markUsed: (couponInstance: CouponInstance) => void;
  markManualUsed: () => void;
  calculateCouponInstance: (isVerified: boolean) => void;

  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  setCouponInstance: (instance: CouponInstance) => void;
}

export const useRewardsStore = create<RewardsStore>((set, get) => ({
  stars: 0,
  quantity: 0,
  discounts_ids: [],

  used3USD: false,
  used5USD: false,
  used10USD: false,
  usedManual: false,

  couponInstance: 'NONE',
  loading: true,
  error: null,

  setCouponInstanceByAmount: (couponAmount: number) => {
    if (couponAmount === 3 && !get().used3USD) set({ couponInstance: 'THREE' });
    else if (couponAmount === 5 && !get().used5USD) set({ couponInstance: 'FIVE' });
    else if (couponAmount === 10 && !get().used10USD) set({ couponInstance: 'TEN' });
    else set({ couponInstance: 'MANUAL' });
  },

  addDiscountId: (id: string) => {
    set((state) => ({ discounts_ids: [...state.discounts_ids, id] }));
  },
  resetDiscounts: () => set({ discounts_ids: [] }),

  resetUsed: () =>
    set({
      used3USD: false,
      used5USD: false,
      used10USD: false,
    }),
  isUsed: (couponValue: number) => {
    const { used3USD, used5USD, used10USD } = get();
    if (couponValue === 3) return used3USD;
    if (couponValue === 5) return used5USD;
    if (couponValue === 10) return used10USD;
    return false;
  },

  setData: (stars, quantity) => {
    set({ stars, quantity });
  },

  markUsed: (couponInstance: CouponInstance) => {
    if (couponInstance === 'THREE') set({ used3USD: true });
    if (couponInstance === 'FIVE') set({ used5USD: true });
    if (couponInstance === 'TEN') set({ used10USD: true, usedManual: true });
  },

  markManualUsed: () => set({ usedManual: true }),

  calculateCouponInstance: (isVerified) => {
    const { stars, quantity, used3USD, used5USD } = get();

    const hasGoal = stars >= 5 && quantity >= 500 && isVerified;

    if (hasGoal) {
      set({ couponInstance: 'TEN' });
      return;
    }

    const canShow3 = !used3USD && stars >= 0;
    const canShow5 = !used5USD && isVerified && stars >= 0;

    if (canShow3) {
      set({ couponInstance: 'THREE' });
    } else if (canShow5) {
      set({ couponInstance: 'FIVE' });
    } else {
      set({ couponInstance: 'MANUAL' });
    }
  },

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),
  setCouponInstance: (instance) => set({ couponInstance: instance }),
}));
