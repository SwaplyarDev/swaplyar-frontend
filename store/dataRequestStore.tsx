import { create } from 'zustand';

interface DataSection1 {
  sender_first_name: string;
  sender_last_name: string;
  email: string;
  phone: string;
  own_account: string;
}

interface DataSection2 {
  receiver_first_name: string;
  receiver_last_name: string;
  tax_identification?: string;
  transfer_identification?: string;
  re_transfer_identification?: string;
  name_of_bank?: string;
  wise_email?: string;
  re_enter_wise_email?: string;
}

interface DataSection3 {
  send_amount: string;
  receive_amount: string;
  pay_email: string;
  proof_of_payment: FileList | null;
  note: string;
}

type DataRequestState = {
  section1: DataSection1;
  setSection1: (data: DataSection1) => void;
  section2: DataSection2;
  setSection2: (data: DataSection2) => void;
  section3: DataSection3;
  setSection3: (data: DataSection3) => void;
};

const useDataRequestStore = create<DataRequestState>((set) => ({
  section1: {
    sender_first_name: '',
    sender_last_name: '',
    email: '',
    phone: '',
    own_account: '',
  },
  setSection1: (data) =>
    set((state) => ({
      section1: {
        ...state.section1,
        ...data,
      },
    })),
  section2: {
    receiver_first_name: '',
    receiver_last_name: '',
    tax_identification: '',
    re_transfer_identification: '',
    name_of_bank: '',
    wise_email: '',
    re_enter_wise_email: '',
  },
  setSection2: (data) =>
    set((state) => ({
      section2: {
        ...state.section2,
        ...data,
      },
    })),
  section3: {
    send_amount: '',
    receive_amount: '',
    pay_email: '',
    proof_of_payment: null,
    note: '',
  },
  setSection3: (data) =>
    set((state) => ({
      section3: {
        ...state.section3,
        ...data,
      },
    })),
}));

export default useDataRequestStore;
