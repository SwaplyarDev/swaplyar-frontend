const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getDiscounts(token: string) {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/discount/user-discounts/user`, {
      method: 'GET',
      headers: {
        Authorization: `user_id ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch discounts');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching discounts:', error);
    throw new Error('Failed to fetch discounts');
  }
}
