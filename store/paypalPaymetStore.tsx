import { create } from 'zustand';

// interface PayerInterface {
//     name: string;
//     email: string;
//     [key: string]: any;
// }

// [key: string]: any; Si payoneer llega a tener otras propiedades y no se quiere agregar oytra funcion exclusiva para payoneer
interface PaypalStore {
  paypal: boolean;
  payer: {
    [key: string]: any;
  };
  setPaypal: () => void;
  setPayer: (client: any) => void;
}

export const paypalPaymentStore = create<PaypalStore>((set) => ({
  paypal: false,
  payer: {},
  setPaypal: () => set((state) => ({ paypal: !state.paypal })),
  setPayer: (client) =>
    set((_state) => ({
      payer: { ...client },
    })),
}));
