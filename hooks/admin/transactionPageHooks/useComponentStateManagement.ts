'use client';

import { useTransactionStore } from '@/store/transactionModalStorage';

/**
 * Hook para manejar los cambios de estado de los componentes
 */
export function useComponentStateManagement() {
  const { componentStates, selected, setComponentStates, setSelected } = useTransactionStore();

  // Handle component state changes
  const handleComponentStateChange = (key: keyof typeof componentStates, value: any) => {
    setComponentStates(key, value);
  };

  // Handle selection change
  const handleSelectionChange = (value: 'stop' | 'accepted' | 'canceled' | null) => {
    setComponentStates('aprooveReject', value);
    setSelected(value);
  };

  return {
    componentStates,
    selected,
    handleComponentStateChange,
    handleSelectionChange,
  };
}
