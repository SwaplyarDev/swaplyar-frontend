import { create } from "zustand";

interface PaypalStore{
    paypal: boolean;
    setPaypal: ()=> void;
}

export const paypalPaymentStore = create<PaypalStore>((set)=>({
    paypal: false,
    setPaypal: () => set((state) => ({paypal: !state.paypal})),
}));