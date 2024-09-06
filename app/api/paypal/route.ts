// /app/api/paypal/route.ts

import { NextResponse } from 'next/server';

const clientId = process.env.PAYPAL_CLIENT_ID;
const secretKey = process.env.PAYPAL_SECRET_KEY;
const getToken = process.env.PAYPAL_ACCESS_TOKEN_URL || "https://api-m.sandbox.paypal.com/v1/oauth2/token";
const paypalURL = process.env.PAYPAL_URL || "https://api-m.sandbox.paypal.com/v2/checkout/orders";

export async function POST(req: Request) {
  try {
    const { currency, amount } = await req.json();
    
    const auth = Buffer.from(`${clientId}:${secretKey}`).toString('base64');

    // Obtener el token de acceso
    const authResponse = await fetch(getToken, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
    });

    if (!authResponse.ok) {
      throw new Error('Error al obtener el token de acceso');
    }

    const { access_token } = await authResponse.json();

    // Crear la orden de PayPal
    const orderResponse = await fetch(paypalURL, {
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
          },
        ],
      }),
    });

    if (!orderResponse.ok) {
      throw new Error('Error al crear la orden de PayPal');
    }

    const { id: orderID } = await orderResponse.json();

    return NextResponse.json({ orderID });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creando la orden de PayPal:', error.message);
    } else {
      console.error('Error desconocido al crear la orden de PayPal:', error);
    }
    return NextResponse.json(
      { error: 'Error creando la orden de PayPal' },
      { status: 500 }
    );
  }
}
