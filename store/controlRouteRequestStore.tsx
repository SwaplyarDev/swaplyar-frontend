import { create } from 'zustand';

interface ControlRouteRequestStoreState {
  pass: boolean;
  setPass: () => void;
}

const useControlRouteRequestStore = create<ControlRouteRequestStoreState>((set, get) => {
  return {
    pass: false,
    setPass: () => {
      const currentPass = get().pass;
      set({ pass: !currentPass });
    },
  };
});

export default useControlRouteRequestStore;
