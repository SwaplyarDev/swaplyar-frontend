'use client'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'

const client = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function Paypal() {
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
                  amount: "100.00",
                  currency: 'USD',
                }),
              });
               const data = await res.json();
               console.log(data);
               return data.orderID;
            }}
            onApprove={async (data, actions) => {
              try {
                const capture = await actions.order?.capture();
                console.log(data);
                console.log('Pago aprobado:', capture); 
              } catch (error) {
                console.error('Error al capturar el pago:', error);
              }
            }}
            />
        </PayPalScriptProvider>
    </>
  );
}