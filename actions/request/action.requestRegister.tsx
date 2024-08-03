// actions/request/action.requestRegister.tsx

'use server';

export const requestRegister = async (formData: FormData) => {
    try {
        const response = await fetch('https://your-api-endpoint.com/register', {
            method: 'POST',
            body: formData,
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
