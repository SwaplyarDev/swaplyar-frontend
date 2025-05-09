import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface VerificationStore {
  isVerified: boolean;
  verificationTime: string | null;
  postVerificationTransactions: any[];
  setVerified: () => void;
  setPostVerificationTransactions: (transactions: any[], verificationTime: string | null) => void;
}

export const TransactionVerificationStore = create<VerificationStore>()(
  persist(
    (set) => ({
      isVerified: false,
      verificationTime: null,
      postVerificationTransactions: [],

      setVerified: () => {
        const now = new Date().toISOString();
        set({ isVerified: true, verificationTime: now });
      },

      setPostVerificationTransactions: (transactions, verificationTime) => {
        if (!verificationTime) {
          set({ postVerificationTransactions: [] });
          return;
        }
        const filteredTransactions = transactions.filter((tx) => new Date(tx.createdAt) >= new Date(verificationTime));
        set({ postVerificationTransactions: filteredTransactions });
      },
    }),
    {
      name: 'verification-storage',
    },
  ),
);
