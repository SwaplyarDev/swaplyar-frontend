const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getDiscounts(token: string) {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/discounts/user-discounts/available/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch discounts');
    }

    const data = await response.json();
    console.log('data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching discounts:', error);
    throw new Error('Failed to fetch discounts');
  }
}

// export async function putDiscountsStatus(token: string, coupon_id: string, uuid_transacción: string) {
//   try {
//     const body = JSON.stringify({ transactionId: uuid_transacción });
//     const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/discounts/user-discounts/${coupon_id}`, {
//       method: 'PUT',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//       body,
//     });
//     if (!response.ok) {
//       console.error('Response not ok:', response);
//       throw new Error('Failed to update discount status');
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching discounts:', error);
//     throw new Error('Failed to fetch discounts');
//   }
// }

export async function getDiscountsByUserId(user_id: string, token: string) {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/discounts/user-discounts/${user_id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
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
