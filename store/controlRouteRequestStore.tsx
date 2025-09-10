import { create } from 'zustand';

interface ControlRouteRequestStoreState {
  pass: boolean;
  hasExitedForm: boolean;
  setPass: () => void; // toggle (legacy)
  setPassTrue: () => void;
  setPassFalse: () => void;
  setExitedForm: () => void;
}

const useControlRouteRequestStore = create<ControlRouteRequestStoreState>((set, get) => ({
  pass: false,
  hasExitedForm: false,
  setPass: () => {
    const currentPass = get().pass;
    set({ pass: !currentPass, hasExitedForm: false });
  },
  setPassTrue: () => set({ pass: true, hasExitedForm: false }),
  setPassFalse: () => set({ pass: false, hasExitedForm: true }),
  setExitedForm: () => set({ hasExitedForm: true }),
}));

export default useControlRouteRequestStore;
