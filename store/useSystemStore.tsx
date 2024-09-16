import { create } from 'zustand';
import { System } from '@/types/data';

const defaultSendingSystem: System = {
  id: 'paypal',
  name: 'PayPal',
  logo: '/images/paypal.big.png',
  logoDark: '/images/paypal.dark.png',
  isDisabled: false,
  coin: 'USD',
};

const defaultReceivingSystem: System = {
  id: 'bank',
  name: 'Banco',
  logo: '/images/banco.medium.webp',
  logoDark: '/images/banco.dark.png',
  isDisabled: false,
  coin: 'ARS',
};

interface SystemStore {
  selectedSendingSystem: System | null;
  selectedReceivingSystem: System | null;
  activeSelect: 'send' | 'receive' | null;
  disabledSystems: Set<string>;
  setSelectedSendingSystem: (system: System | null) => void;
  setSelectedReceivingSystem: (system: System | null) => void;
  setActiveSelect: (selectType: 'send' | 'receive' | null) => void;
  disableSystem: (systemId: string) => void;
  enableSystem: (systemId: string) => void;
}

export const useSystemStore = create<SystemStore>((set) => ({
  selectedSendingSystem: defaultSendingSystem,
  selectedReceivingSystem: defaultReceivingSystem,
  activeSelect: null,
  disabledSystems: new Set(),
  setSelectedSendingSystem: (system) => {
    set({ selectedSendingSystem: system });
    set({ activeSelect: 'send' });
    set((state) => {
      const newDisabledSystems = new Set(state.disabledSystems);
      if (system) {
        newDisabledSystems.add(system.id);
      }
      return { disabledSystems: newDisabledSystems };
    });
  },
  setSelectedReceivingSystem: (system) => {
    set({ selectedReceivingSystem: system });
    set({ activeSelect: 'receive' });
    set((state) => {
      const newDisabledSystems = new Set(state.disabledSystems);
      if (system) {
        newDisabledSystems.add(system.id);
      }
      return { disabledSystems: newDisabledSystems };
    });
  },
  setActiveSelect: (selectType: 'send' | 'receive' | null) =>
    set({ activeSelect: selectType }),
  disableSystem: (systemId) =>
    set((state) => {
      const newDisabledSystems = new Set(state.disabledSystems);
      newDisabledSystems.add(systemId);
      return { disabledSystems: newDisabledSystems };
    }),
  enableSystem: (systemId) =>
    set((state) => {
      const newDisabledSystems = new Set(state.disabledSystems);
      newDisabledSystems.delete(systemId);
      return { disabledSystems: newDisabledSystems };
    }),
}));
