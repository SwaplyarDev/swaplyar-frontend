'use client';

import { getVerificationById } from '@/actions/userVerification/verification.action';
import { DetailedVerificationItem, VerificationStatus } from '@/types/verifiedUsers';
import { createContext, useContext, useCallback, useState, ReactNode, useEffect, use } from 'react';

interface UserVerifyContextType {
  verificationById: DetailedVerificationItem;
  setVerificationById: (verification: DetailedVerificationItem) => void;
  updateVerificationNote: (note: string) => void;
  updateVerificationStatus: (status: VerificationStatus) => void;
}

const UserVerifyContext = createContext<UserVerifyContextType | undefined>(undefined);

export function UserVerifyProvider({ children, verification }: { children: ReactNode, verification: DetailedVerificationItem }) {
  const [verificationById, setVerificationById] = useState<DetailedVerificationItem>(verification);

  const updateVerificationNote = useCallback((note: string) => {
    setVerificationById((prev) => {
      return {
        ...prev,
        note_rejection: note,
      };
    });
  }, []);

    const updateVerificationStatus = useCallback((status: VerificationStatus) => {
    setVerificationById((prev) => {
        return {
          ...prev,
          verification_status: status,
        };
    });
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
