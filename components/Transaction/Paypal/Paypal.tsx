'use client'
import {PayPalScriptProvider, PayPalButtons} from '@paypal/react-paypal-js'
import axios from 'axios';

const client = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function Paypal() {
  return (
    <>
        <PayPalScriptProvider options={{
            clientId: client as string
        }}>
            <PayPalButtons
            createOrder={async()=>{
                try {
                    const { data } =  await axios.post("http://localhost:3000/api/paypal", {currency: "USD",amount: "100.00" })
                    console.log(data.messa);
                    return data;
                } catch (error) {
                    console.log(error);
                }
            }}
            // onApprove={async (data, actions) => {
            //   try {
            //     const capture = await actions.order?.capture();
            //     console.log(data);
            //     console.log('Pago aprobado:', capture); 
            //   } catch (error) {
            //     console.error('Error al capturar el pago:', error);
            //   }
            // }}
            />
        </PayPalScriptProvider>
    </>
  );
}