import { create } from 'zustand';

interface DataSection1 {
  sender_first_name: string;
  sender_last_name: string;
  email: string;
  phone: string;
  own_account: boolean;
}

type DataRequestState = {
  section1: DataSection1;
  setSection1: (data: DataSection1) => void;
};

const useDataRequestStore = create<DataRequestState>((set) => ({
  section1: {
    sender_first_name: '',
    sender_last_name: '',
    email: '',
    phone: '',
    own_account: false,
  },
  setSection1: (data) =>
    set((state) => ({
      section1: {
        ...state.section1,
        ...data,
      },
    })),
}));

export default useDataRequestStore;
