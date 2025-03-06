import { create } from 'zustand';

interface ControlRouteRequestStoreState {
  pass: boolean;
  hasExitedForm: boolean;
  setPass: () => void;
  setExitedForm: () => void;
}

const useControlRouteRequestStore = create<ControlRouteRequestStoreState>((set, get) => ({
  pass: false,
  hasExitedForm: false,
  setPass: () => {
    const currentPass = get().pass;
    set({ pass: !currentPass, hasExitedForm: false });
  },
  setExitedForm: () => set({ hasExitedForm: true }),
}));

export default useControlRouteRequestStore;
