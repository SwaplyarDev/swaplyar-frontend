import { create } from 'zustand';

interface ControlRouteRequestStoreState {
  pass: boolean;
  hasExitedForm: boolean;
  setPass: (value: boolean) => void;
  setExitedForm: () => void;
}

const useControlRouteRequestStore = create<ControlRouteRequestStoreState>((set, get) => ({
  pass: false,
  hasExitedForm: false,
  setPass: (value: boolean) => {
    set({ pass: value, hasExitedForm: false });
  },
  setExitedForm: () => set({ hasExitedForm: true }),
}));

export default useControlRouteRequestStore;
