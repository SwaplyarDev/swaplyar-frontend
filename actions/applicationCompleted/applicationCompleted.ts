import { FormRequestCompleted } from '@/types/repentance/repentance';

const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Falta backend 2

export const getApplicationCompleted = async (transaction_id: FormRequestCompleted['transaction_id']) => {
  try {
    const response = await fetch(`${API_URL}/v1/qualification/${transaction_id}`, {
      cache: 'no-store',
    });

    if (!response.ok) return null;

    return response.json();
  } catch (error) {
    console.error('Error fetching application completed:', error);
    return null;
  }
};

export const applicationCompleted = async (data: FormRequestCompleted) => {
  try {
    await fetch(`${API_URL}/v1/qualification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data, stars_amount: String(data.stars_amount) }),
    });
  } catch (error) {
    console.error('Error application completed:', error);
    return null;
  }
};
