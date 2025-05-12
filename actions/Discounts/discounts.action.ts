const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
import { auth } from '@/auth';
export async function getDiscounts() {
  const session = await auth();

  const token = session?.accessToken || '';

  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/v1/discount/user-discounts/user`, {
      method: 'GET',
      headers: {
        Authorization: `user_id ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch discounts');
    }
    console.log('response', response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching discounts:', error);
    throw new Error('Failed to fetch discounts');
  }
}
