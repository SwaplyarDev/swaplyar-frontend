const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Obtener las estrellas de los usuarios y la cantidad de dinero (en total) que tiene por las transacciones
export async function getUserStarsAndAmount(token: string) {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/discounts/stars`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}
