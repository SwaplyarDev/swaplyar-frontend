'use client'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import { useEffect } from 'react';

const client = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;


interface PayPalProps{
 amount: string;
 currency: string;
}
export default function Paypal({currency, amount}:PayPalProps) {

  useEffect(()=>{
    console.log(amount, currency);
    
  },[amount, currency]);
  return (
    <>
        <PayPalScriptProvider options={{
            clientId: client as string
        }}>
            <PayPalButtons
            createOrder={async()=>{
               const res =  await fetch('/api/paypal', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  amount,
                  currency,
                }),
              });
               const data = await res.json();
               return data.orderID;
            }}
            onApprove={async (_data, actions) => {
              try {
                const capture = await actions.order?.capture();
                
                console.log('Pago aprobado:', capture?.payer); 
              } catch (error) {
                console.error('Error al capturar el pago:', error);
              }
            }}
            />
        </PayPalScriptProvider>
    </>
  );
}