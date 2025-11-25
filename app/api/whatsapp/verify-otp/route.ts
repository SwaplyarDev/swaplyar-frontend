import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json({ success: false, message: 'Phone and code are required' }, { status: 400 });
    }

    // Aquí deberías verificar el código desde tu base de datos
    // Para este ejemplo, verificamos desde memoria (en producción usa DB)
    // const storedCode = global.verificationCodes?.[phone];

    // if (!storedCode || storedCode.code !== code) {
    //   return NextResponse.json({ success: false, message: 'Invalid code' }, { status: 400 });
    // }

    // Verificar si el código no ha expirado (ej. 10 minutos)
    // const isExpired = Date.now() - storedCode.timestamp > 10 * 60 * 1000;
    // if (isExpired) {
    //   return NextResponse.json({ success: false, message: 'Code expired' }, { status: 400 });
    // }

    // Limpiar el código usado
    // delete global.verificationCodes[phone];

    // Para testing, aceptar cualquier código de 6 dígitos
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ success: false, message: 'Invalid code format' }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: 'Code verified successfully' });

  } catch (error) {
    console.error('Error verifying code:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to verify code'
    }, { status: 500 });
  }
}