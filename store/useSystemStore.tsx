import { create } from 'zustand';
import { System } from '@/types/data';

const defaultSendingSystem: System = {
  id: 'paypal',
  name: 'PayPal',
  logo: '/images/paypal.big.png',
  isDisabled: false,
  coin: 'USD'
};

const defaultReceivingSystem: System = {
  id: 'bank',
  name: 'Banco',
  logo: '/images/banco.medium.webp',
  isDisabled: false,
  coin: 'ARS'
};

interface SystemStore {
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  setSelectedSendingSystem: (system: System | null) => void;
  setSelectedReceivingSystem: (system: System | null) => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  selectedSendingSystem: defaultSendingSystem,
  selectedReceivingSystem: defaultReceivingSystem,
  setSelectedSendingSystem: (system) =>
    set((state) => ({ selectedSendingSystem: system })),
  setSelectedReceivingSystem: (system) =>
    set((state) => ({ selectedReceivingSystem: system })),
}));
