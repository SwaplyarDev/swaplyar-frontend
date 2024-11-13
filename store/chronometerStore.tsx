import { create } from 'zustand';

type ChronometerState = {
  isStopped: boolean;
  stop: boolean;
  setisStopped: (value: boolean) => void;
  setStop: (value: boolean) => void;
};

const useChronometerState = create<ChronometerState>((set) => ({
  isStopped: false,
  stop: false,
  setisStopped: (value: boolean) => set({ isStopped: value }),
  setStop: (value: boolean) => set({ stop: value }),
}));

export default useChronometerState;
