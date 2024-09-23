'use client';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { paypalPaymentStore } from '@/store/paypalPaymetStore';
import { useEffect, useState } from 'react';

const client = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

interface PayPalProps {
  currency: string;
  amount: number;
  handleDirection: () => void;
}

export default function Paypal({
  currency,
  amount,
  handleDirection,
}: PayPalProps) {
  const [exchange, setExchange] = useState({ amount, currency });

  const { setPaypal } = paypalPaymentStore();

  useEffect(() => {
    if (currency && amount) setExchange({ amount, currency });
  }, [currency, amount]);

  return (
    <div>
      <PayPalScriptProvider
        options={{
          clientId: client as string,
        }}
      >
        <PayPalButtons
          style={{
            color: 'blue',
            layout: 'horizontal',
            shape: 'pill',
            height: 45,
          }}
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

              setPaypal();
              console.log('datos paypal', capture);
              const client = {
                transactionId: capture?.id,
                first_name: capture?.payer?.name?.given_name,
                last_name: capture?.payer?.name?.surname,
                email: capture?.payer?.email_address,
                sendAmount: exchange.amount,
                sendCurrency: exchange.currency,
                payment_method: 'PayPal',
                identifier: capture?.payer?.payer_id,
              };
              localStorage.setItem('payer', JSON.stringify(client));

              handleDirection();
            } catch (error) {
              console.error('Error al capturar el pago:', error);
            }
          }}
          onCancel={() => {
            setPaypal();
          }}
          onError={() => {
            setPaypal();
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
