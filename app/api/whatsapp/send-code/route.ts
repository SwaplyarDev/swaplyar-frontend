import { NextRequest, NextResponse } from 'next/server';

// Función para enviar mensaje de verificación por WhatsApp usando Meta API
async function sendWhatsAppMessage(phone: string, code: string) {
  const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
  const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!ACCESS_TOKEN || !PHONE_NUMBER_ID) {
    throw new Error('WhatsApp API credentials not configured');
  }

  // Formatear el número de teléfono (asegurarse de que tenga el prefijo internacional sin +)
  const formattedPhone = phone.replace(/\D/g, ''); // Remover todos los caracteres no numéricos

  const url = `https://graph.facebook.com/v18.0/${PHONE_NUMBER_ID}/messages`;

  const body = {
    messaging_product: 'whatsapp',
    to: formattedPhone,
    type: 'text',
    text: {
      body: `Tu código de verificación es: ${code}`
    }
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ACCESS_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`WhatsApp API error: ${error}`);
  }

  return response.json();
}

export async function POST(request: NextRequest) {
  try {
    const { phone } = await request.json();

    if (!phone) {
      return NextResponse.json({ success: false, message: 'Phone number is required' }, { status: 400 });
    }

    // Generar código de verificación de 6 dígitos
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Aquí deberías guardar el código en tu base de datos con el teléfono y un timestamp
    // Para este ejemplo, lo guardamos en memoria (en producción usa Redis o DB)
    // global.verificationCodes = global.verificationCodes || {};
    // global.verificationCodes[phone] = { code: verificationCode, timestamp: Date.now() };

    // Enviar mensaje por WhatsApp
    await sendWhatsAppMessage(phone, verificationCode);

    // En producción, no devolver el código, solo confirmar que se envió
    return NextResponse.json({
      success: true,
      message: 'Verification code sent successfully',
      // code: verificationCode // Solo para testing, remover en producción
    });

  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to send verification code'
    }, { status: 500 });
  }
}