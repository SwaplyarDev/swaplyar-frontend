'use client';

import { DetailedVerificationItem, VerificationStatus } from '@/types/verifiedUsers';
import { createContext, useContext, useCallback, useState, ReactNode } from 'react';
import { useUserVerifyList } from './useUserVerifyListState';

interface UserVerifyContextType {
  verificationById: DetailedVerificationItem;
  setVerificationById: (verification: DetailedVerificationItem) => void;
  updateVerificationNote: (note: string) => void;
  updateVerificationStatus: (status: VerificationStatus) => Promise<void>;
}

const UserVerifyContext = createContext<UserVerifyContextType | undefined>(undefined);

export function UserVerifyProvider({ children, verification }: { children: ReactNode, verification: DetailedVerificationItem }) {
  const [verificationById, setVerificationById] = useState<DetailedVerificationItem>(verification);
  const{ verificationList, updateVerificationList } = useUserVerifyList();

  const updateVerificationNote = useCallback((note: string) => {
    setVerificationById((prev) => {
      return {
        ...prev,
        note_rejection: note,
      };
    });
  }, []);

    const updateVerificationStatus = useCallback(async(status: VerificationStatus) => {
    setVerificationById((prev) => {
        return {
          ...prev,
          verification_status: status,
        };
    });
    await updateVerificationList(verificationList.page, 10);
  }, []);

  const value = {
    verificationById,
    setVerificationById,
    updateVerificationNote,
    updateVerificationStatus
  };

  return <UserVerifyContext.Provider value={value}>{children}</UserVerifyContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useUserVerify() {
  const context = useContext(UserVerifyContext);

  if (context === undefined) {
    throw new Error('useUserVerify must be used within a UserVerifyProvider');
  }

  return context;
}
