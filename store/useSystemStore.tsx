import { create } from 'zustand';
import { System } from '@/types/data';

interface SystemStore {
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  setSelectedSendingSystem: (system: System | null) => void;
  setSelectedReceivingSystem: (system: System | null) => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  selectedSendingSystem: null,
  selectedReceivingSystem: null,
  setSelectedSendingSystem: (system) =>
    set((state) => ({ selectedSendingSystem: system })),
  setSelectedReceivingSystem: (system) =>
    set((state) => ({ selectedReceivingSystem: system })),
}));
