// action/auth/register.ts

'use server';

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch('https://your-api-endpoint.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email.toLowerCase(),
        password: password,  // Enviar la contraseña sin encriptar, asumiendo que la API se encargará de ello
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error en el registro');
    }

    return {
      ok: true,
      user: data.user,
      message: 'Usuario creado',
    };
  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      message: error.message || 'No se pudo crear el usuario',
    };
  }
};
