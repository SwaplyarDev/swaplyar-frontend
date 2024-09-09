'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { paypalPaymentStore } from '@/store/paypalPaymetStore';
import { useEffect, useState } from 'react';

const client = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

interface PayPalProps {
  currency: string;
  amount: number;
}
export default function Paypal({ currency, amount }: PayPalProps) {
  const [exchange, setExchange] = useState({ amount, currency });

  const { setPaypal } = paypalPaymentStore();


  useEffect(() => {
    if (currency && amount) setExchange({ amount, currency });
    console.log(amount, currency);
  }, [currency, amount]);

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: client as string,
        }}
      >
        <PayPalButtons
          createOrder={async () => {
            const res = await fetch('/api/paypal', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(exchange),
            });
            const data = await res.json();
            return data.orderID;
          }}
          onApprove={async (_data, actions) => {
            try {
              const capture = await actions.order?.get();

              console.log('Pago aprobado 1:', capture?.payer);
              setPaypal();
            } catch (error) {
              console.error('Error al capturar el pago:', error);
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
