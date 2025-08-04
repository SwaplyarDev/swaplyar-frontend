'use client';

import { getverificationList } from '@/actions/userVerification/verification.action';
import { VerificationItem, VerifiedUsersResponse } from '@/types/verifiedUsers';
import { createContext, useContext, useCallback, useState, ReactNode } from 'react';

interface UserVerifyContextType {
  verificationList: VerifiedUsersResponse;
  setVerificationList: (verification: VerifiedUsersResponse) => void;
  verificationListFiltered: VerificationItem[];
  setVerificationListFiltered: (verification: VerificationItem[]) => void;
  updateVerificationList: (currentPage: number, perPage: number) => Promise<void>;
}

const initialVerificationList: VerifiedUsersResponse = {
  success: false,
  message: 'No data available',
  data: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  total: 0,
};

export const UserVerifyContext = createContext<UserVerifyContextType | undefined>(undefined);

export function UserVerifyListProvider({ children }: { children: ReactNode }) {
  const [verificationList, setVerificationList] = useState<VerifiedUsersResponse>(initialVerificationList);
  const [verificationListFiltered, setVerificationListFiltered] = useState<VerificationItem[]>(verificationList.data || []);

  const updateVerificationList = useCallback(async (currentPage: number, perPage: number) => {
    try {
    const newVerificationList = await getverificationList(currentPage, perPage);
    setVerificationList(newVerificationList);
    setVerificationListFiltered(newVerificationList.data || []);
    } catch (error) {
      console.error('Error updating verification list:', error);  
    }
  }, []);

  const value = {
    verificationList,
    setVerificationList,
    verificationListFiltered,
    setVerificationListFiltered,
    updateVerificationList,
  };

  return <UserVerifyContext.Provider value={value}>{children}</UserVerifyContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useUserVerifyList() {
  const context = useContext(UserVerifyContext);
  if (context === undefined) {
    throw new Error('useUserVerifyList must be used within a UserVerifyListProvider');
  }

  return context;
}
