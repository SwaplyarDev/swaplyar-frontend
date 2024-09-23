// hooks/useSystemSelection.ts
import { useSystemStore } from '@/store/useSystemStore';
import { System } from '@/types/data';

export const useSystemSelection = () => {
  const {
    selectedSendingSystem,
    selectedReceivingSystem,
    setSelectedSendingSystem,
    setSelectedReceivingSystem,
    activeSelect,
    setActiveSelect,
  } = useSystemStore();

  const handleSystemSelection = (system: System, isSending: boolean) => {
    if (isSending) {
      setSelectedSendingSystem(system);
      setSelectedReceivingSystem(
        system.id === selectedReceivingSystem?.id
          ? null
          : selectedReceivingSystem,
      );
    } else {
      setSelectedReceivingSystem(system);
      setSelectedSendingSystem(
        system.id === selectedSendingSystem?.id ? null : selectedSendingSystem,
      );
    }
  };

  const handleInvertSystemsClick = () => {
    setSelectedSendingSystem(selectedReceivingSystem);
    setSelectedReceivingSystem(selectedSendingSystem);
    setActiveSelect(null);
  };

  const toggleSelect = (selectType: 'send' | 'receive') => {
    const newValue = activeSelect === selectType ? null : selectType;
    setActiveSelect(newValue);
  };

  return { handleSystemSelection, handleInvertSystemsClick, toggleSelect };
};
