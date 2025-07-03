const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function resetUserProgress({ accessToken }: { accessToken: string }): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}/v1/discount/update-star`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ quantity: 0 }),
    });

    const data = await res.json();
    return data?.data === true;
  } catch (err) {
    console.error('Error al resetear progreso:', err);
    return false;
  }
}
