const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function redeemCoupon({
  discountId,
  transactionId,
  accessToken,
}: {
  discountId: string;
  transactionId: string;
  accessToken: string;
}): Promise<boolean> {
  try {
    const res = await fetch(
      `${BASE_URL}/v1/discount/user-discounts/update?discountId=${discountId}&transactionId=${transactionId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const data = await res.json();
    return data?.data === 'updated discount';
  } catch (err) {
    console.error('Error al canjear cupón:', err);
    return false;
  }
}
