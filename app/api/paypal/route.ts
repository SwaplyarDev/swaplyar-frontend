import axios from 'axios';
import { NextResponse } from 'next/server';

const clientId = process.env.PAYPAL_CLIENT_ID;
const secretKey = process.env.PAYPAL_SECRET_KEY;
const getToken = process.env.PAYPAL_ACCESS_TOKEN;
const paypalURL = process.env.PAYPAL_URL;

export async function POST(req: Request) {
  try {

    // const {currency, amount} = await req.json();
    
    // const auth = Buffer.from(`${clientId}:${secretKey}`).toString('base64');
    
    // const authResponse = await axios.post(
    //     getToken as string,
    //   new URLSearchParams({ grant_type: 'client_credentials' }),
    //   {
    //     headers: {
    //       Authorization: `Basic ${auth}`,
    //       'Content-Type': 'application/x-www-form-urlencoded',
    //     },
    //   }
    // );
    
    // const { access_token } = authResponse.data;

    // const orderResponse = await axios.post(
    //     paypalURL as string,
    //   {
    //     intent: 'CAPTURE',
    //     purchase_units: [
    //       {
    //         amount: {
    //           currency_code: currency,
    //           value: amount ,
    //           breakdown: {
    //             item_total: {
    //               currency_code: currency,
    //               value: amount,
    //             },
    //           },
    //         },
    //         items: [
    //           {
    //             name: 'example',
    //             description: 'example',
    //             quantity: '1',
    //             category: 'DIGITAL_GOODS',
    //             unit_amount: {
    //               currency_code: currency,
    //               value: amount,
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //       'Content-Type': 'application/json',
    //     },
    //   }
    // );

    // const { id: orderID } = orderResponse.data;

    return NextResponse.json({message: "Recinoce la ruta"});

  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      {
        error: 'Error creating PayPal order',
      },
      { status: 500 }
    );
  }
}