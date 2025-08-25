'use server';

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function createWalletAccount(data: any, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const contentType = res.headers.get('content-type');
    if (!res.ok) {
      let errorMessage = 'Error al guardar la cuenta';
      if (contentType && contentType.includes('application/json')) {
        try {
          const error = await res.json();
          console.error(error);
          errorMessage = error.message || errorMessage;
        } catch (err) {
          console.error('Error al obtener el mensaje de error:', err);
        }
      } else {
        console.error('Respuesta no JSON del backend:', await res.text());
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      const savedAccount = await res.json();
      return savedAccount;
    } else {
      throw new Error('Respuesta inesperada del servidor');
    }
  } catch (error) {
    console.error('Error desde createWalletAccount:', error);
    throw error;
  }
}

export async function getMyWalletAccounts(token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/accounts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      let errorMessage = 'Error al obtener las cuentas';
      if (contentType && contentType.includes('application/json')) {
        const error = await res.json();
        errorMessage = error.message || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      const accounts = await res.json();
      return accounts;
    } else {
      throw new Error('Respuesta inesperada del servidor');
    }
  } catch (error) {
    console.error('Error desde getMyWalletAccounts:', error);
    throw error;
  }
}

export async function getMyWalletAccountById(accountId: string, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/accounts/${accountId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      let errorMessage = 'Error al obtener la cuenta';
      if (contentType && contentType.includes('application/json')) {
        const error = await res.json();
        errorMessage = error.message || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      const account = await res.json();
      return account;
    } else {
      throw new Error('Respuesta inesperada del servidor');
    }
  } catch (error) {
    console.error('Error desde getMyWalletAccountById:', error);
    throw error;
  }
}

export async function getUserWalletAccounts(userId: string, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/${userId}/accounts`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      let errorMessage = 'Error al obtener las cuentas del usuario';
      if (contentType && contentType.includes('application/json')) {
        const error = await res.json();
        errorMessage = error.message || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      const accounts = await res.json();
      return accounts;
    } else {
      throw new Error('Respuesta inesperada del servidor');
    }
  } catch (error) {
    console.error('Error desde getUserWalletAccounts:', error);
    throw error;
  }
}

export async function getUserWalletAccountById(userId: string, accountId: string, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/${userId}/accounts/${accountId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      let errorMessage = 'Error al obtener la cuenta específica del usuario';
      if (contentType && contentType.includes('application/json')) {
        const error = await res.json();
        errorMessage = error.message || errorMessage;
      }
      throw new Error(errorMessage);
    }

    if (contentType && contentType.includes('application/json')) {
      const account = await res.json();
      return account;
    } else {
      throw new Error('Respuesta inesperada del servidor');
    }
  } catch (error) {
    console.error('Error desde getUserWalletAccountById:', error);
    throw error;
  }
}

export async function deleteWalletAccount1(accountId: string, token: string) {
  const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/accounts`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ bankAccountId: accountId }), // 👈 importante
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Error al eliminar cuenta');
  }

  return data;
}
