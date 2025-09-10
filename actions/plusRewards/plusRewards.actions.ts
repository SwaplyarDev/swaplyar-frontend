'use server';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function plusRewardsActions(formData: FormData, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || 'Error al subir las imágenes');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
}

export async function plusRewardsActionsPut(formData: FormData, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/upload`, {
      method: 'put',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data?.message || 'Error al subir las imágenes');
    }

    return { success: true, data };
  } catch (error) {
    return { success: false };
  }
}

export async function getPlusRewards(token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/status`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    const data = await res.json();

    if (!res.ok) {
      console.warn('Respuesta no OK:', data);
      return { verification_status: 'REENVIAR_DATOS' };
    }

    // El backend devuelve { success: true, data: { status: 'pending' } }
    // Necesitamos mapear esto a la estructura esperada
    if (data.success && data.data && data.data.verification_status.toLowerCase()) {
      const backendStatus = data.data.verification_status.toLowerCase();

      // Mapear estados del backend a estados del frontend
      let frontendStatus = 'REENVIAR_DATOS'; // default fallback

      switch (backendStatus.toLowerCase()) {
        case 'pending':
          frontendStatus = 'PENDIENTE';
          break;
        case 'verified':
          frontendStatus = 'APROBADO';
          break;
        case 'rejected':
          frontendStatus = 'RECHAZADO';
          break;
        case 'resend-data':
          frontendStatus = 'REENVIAR_DATOS';
          break;
        default:
          frontendStatus = 'REENVIAR_DATOS';
      }
      return { verification_status: frontendStatus };
    }

    console.warn('Estructura de respuesta inesperada:', data);
    return { verification_status: 'REENVIAR_DATOS' };
  } catch (error) {
    console.error('Error en getPlusRewards:', error);
    return { verification_status: 'REENVIAR_DATOS' };
  }
}

export async function getCardStatus(token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/user-validation`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const errorBody = await res.text();
      console.error('Respuesta no OK:', errorBody);
      throw new Error('Error al obtener los plus rewards');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error en getPlusRewards:', error);
    return null;
  }
}

export async function updateVerificationStatus(token: string) {
   try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/validate-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Error al validar verificación');
    }

    return {
      success: true,
      data,
    };
  } catch (err) {
    console.error('❌ Error al validar verificación:', err);
    return {
      success: false,
      message: (err as Error).message,
    };
  }
}

export async function resendVerificationAfterRejection(token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/request-resend`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    
    console.log('🔁 Respuesta del backend al reenviar verificación:', data);
    
    if (!res.ok) {
      throw new Error(data?.message || 'No se pudo solicitar el reenvío de datos');
    }
    return { success: true, data };
  } catch (err) {
    console.error(err);
    return { success: false, error: (err as Error).message };
  }
}