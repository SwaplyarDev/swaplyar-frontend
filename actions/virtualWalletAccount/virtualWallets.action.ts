'use server';
import { revalidatePath } from 'next/cache';
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
      revalidatePath('/es/auth/solicitud');

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
    const apiUrl = `${NEXT_PUBLIC_BACKEND_URL}/users/accounts`;

    const res = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Cookie: '',
      },
      cache: 'no-store',
    });
    const contentType = res.headers.get('content-type');

    if (!res.ok) {
      if (res.status === 404) {
        return [];
      }
      if (res.status === 401 || res.status === 403) {
        throw new Error('Unauthorized');
      }
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

export async function deleteWalletAccount(accountId: string, token: string) {
  const API_URL = 'http://localhost:3001/api/v2/users/accounts';

  const response = await fetch(API_URL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      bankAccountId: accountId,
    }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Error al eliminar la cuenta');
  }
  revalidatePath('/dashboard/cuentas');
  revalidatePath('/es/auth/solicitud');
  return { success: true };
}

export async function getUserWalletAccountByUserId(userId: string, token: string) {
  try {
    const res = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/users/accounts/admin/findId?userId=${userId}`, {
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

        if (error.message === 'No se encontraron cuentas registradas') {
          return [];
        }

        throw new Error(errorMessage);
      }
      throw new Error('Error al obtener la cuenta específica del usuario');
    }

    if (contentType && contentType.includes('application/json')) {
      const account = await res.json();
      if (Array.isArray(account)) return account;
      return [];
    } else {
      throw new Error('Respuesta inesperada del servidor');
    }
  } catch (error) {
    console.error('Error desde getUserWalletAccountById:', error);
    throw error;
  }
}
