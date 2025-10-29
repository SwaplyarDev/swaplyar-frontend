import { create } from 'zustand';
import { System } from '@/types/data';
import { BankDarkImg, BankImg, PaypalDarkImg, PaypalImg } from '@/utils/assets/imgDatabaseCloudinary';


const defaultSendingSystem: System = {
  id: 'paypal',
  name: 'PayPal',
  logo: PaypalImg,
  logoDark: PaypalDarkImg,
  isDisabled: false,
  coin: 'USD',
  paymentMethod: 'paypal',
  coinSign: 'US$',
};

const defaultReceivingSystem: System = {
  id: 'bank',
  name: 'Bank',
  logo: BankImg,
  logoDark: BankDarkImg,
  isDisabled: false,
  coin: 'ARS',
  paymentMethod: 'ars',
  coinSign: 'ARS',
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
  resetToDefault: () => void;
}

export const useSystemStore = create<SystemStore>((set) => {
  return {
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
          localStorage.setItem('selectedSendingSystem', JSON.stringify(system));
        } else {
          localStorage.removeItem('selectedSendingSystem');
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
          localStorage.setItem('selectedReceivingSystem', JSON.stringify(system));
        } else {
          localStorage.removeItem('selectedReceivingSystem');
        }
        return { disabledSystems: newDisabledSystems };
      });
    },
    setActiveSelect: (selectType: 'send' | 'receive' | null) => set({ activeSelect: selectType }),
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
    resetToDefault: () => {
      set({
        selectedSendingSystem: defaultSendingSystem,
        selectedReceivingSystem: defaultReceivingSystem,
      });
      localStorage.setItem('selectedSendingSystem', JSON.stringify(defaultSendingSystem));
      localStorage.setItem('selectedReceivingSystem', JSON.stringify(defaultReceivingSystem));
    },
  };
});
