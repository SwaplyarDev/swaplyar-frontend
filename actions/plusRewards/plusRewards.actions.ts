'use server';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function plusRewardsActions(formData: FormData, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/verification/upload`, {
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
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/verification/upload`, {
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
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/verification/verification-status`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });
    // if (!res.ok) {
    //   const errorBody = await res.text();
    //   console.error('Respuesta no OK?:', errorBody);
    //   throw new Error('Error al obtener los plus rewards');
    // }
    const data = await res.json();

    if (!res.ok || !data?.verification_status) {
      console.warn('Respuesta no OK:', data);
      return { verification_status: 'NO_VERIFICADO' };
    }

    return data;
  } catch (error) {
    console.error('Error en getPlusRewards:', error);
    return null;
  }
}
export async function getCardStatus(token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/verification/user-validation`, {
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
