import { NextResponse } from 'next/server';

const clientId = process.env.PAYPAL_CLIENT_ID;
const secretKey = process.env.PAYPAL_SECRET_KEY;
const getToken = process.env.PAYPAL_ACCESS_TOKEN;
const paypalURL = process.env.PAYPAL_URL;

export async function POST(req: Request) {
  try {
    const { currency, amount } = await req.json();

    const auth = Buffer.from(`${clientId}:${secretKey}`).toString('base64');

    const authResponse = await fetch(getToken as string, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    if (!authResponse.ok) {
      throw new Error('Error getting access token');
    }

    const { access_token } = await authResponse.json();

    const orderResponse = await fetch(paypalURL as string, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: currency,
              value: amount,
              breakdown: {
                item_total: {
                  currency_code: currency,
                  value: amount,
                },
              },
            },
            items: [
              {
                name: 'Transferencia SwaplyAr',
                description: 'Transferencia desde la aplicacion de SwaplyAr ',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          },
        ],
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Error creating PayPal order');
    }

    const { id: orderID } = await orderResponse.json();

    return NextResponse.json({
      orderID,
    });
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    return NextResponse.json(
      {
        error: 'Error creating PayPal order',
      },
      { status: 500 },
    );
  }
}
