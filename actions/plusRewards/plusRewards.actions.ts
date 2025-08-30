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

    console.log('Respuesta completa del backend:', data);

    if (!res.ok) {
      console.warn('Respuesta no OK:', data);
      return { verification_status: 'REENVIAR_DATOS' };
    }

    // El backend devuelve { success: true, data: { status: 'pending' } }
    // Necesitamos mapear esto a la estructura esperada
    if (data.success && data.data && data.data.status) {
      const backendStatus = data.data.status;
      console.log('Status del backend:', backendStatus);

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

      console.log('Status mapeado:', frontendStatus);
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
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'VERIFICADO' }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar verificación');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error al hacer PUT de verificación:', err);
    throw err;
  }
}

export async function resendVerificationAfterRejection(token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: 'RECHAZADO' }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Error al actualizar estado a REENVIAR_DATOS');
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error('Error al forzar REENVIAR_DATOS desde RECHAZADO:', err);
    throw err;
  }
}
