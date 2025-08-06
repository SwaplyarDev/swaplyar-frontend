'use client';

import { VerificationStatus } from '@/types/verifiedUsers';
import { createContext, useContext, useCallback, useState, ReactNode } from 'react';

interface SelectedStatusFilterContextType {
  selectedItem: VerificationStatus[];
  handleSelect: (itemId: VerificationStatus) => void;
  clearSelectedItems: () => void;
}

interface SelectedStatusFilterProviderProps {
  children: ReactNode;
}

const SelectedStatusFilterContext = createContext<SelectedStatusFilterContextType | undefined>(undefined);

export function SelectedStatusFilterProvider({ children }: SelectedStatusFilterProviderProps) {
  const [selectedItem, setSelectedItem] = useState<VerificationStatus[]>([]);

  // Manejador para seleccionar un elemento
  const handleSelect = useCallback(
    (itemId: VerificationStatus) => {
      if (itemId) {
        const newStatusFilters = selectedItem.includes(itemId)
          ? selectedItem.filter((id) => id !== itemId)
          : [...selectedItem, itemId];

        setSelectedItem(newStatusFilters);
      }
    },
    [selectedItem],
  );

  const clearSelectedItems = useCallback(() => {
    setSelectedItem([]);
  }, []);

  const value = {
    selectedItem,
    handleSelect,
    clearSelectedItems,
  };

  return <SelectedStatusFilterContext.Provider value={value}>{children}</SelectedStatusFilterContext.Provider>;
}

// Hook personalizado para usar el contexto
export function useSelectedStatusFilter() {
  const context = useContext(SelectedStatusFilterContext);

  if (context === undefined) {
    throw new Error('useSelectedStatusFilter must be used within a SelectedStatusFilterProvider');
  }

  return context;
}
