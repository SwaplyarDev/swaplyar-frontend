'use server';
import auth from "@/auth";
import { VerifyForm, VerificationResponse, SingleVerificationResponse, VerifiedUsersResponse, DetailedVerificationItem } from "@/types/verifiedUsers";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getverificationList = async (page: Number = 1, perPage: number = 10): Promise<VerifiedUsersResponse> => {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/admin/list?page=${page}&limit=${perPage}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      return { success: false, message: 'Error fetching user', page: 0, limit: 0, total: 0, totalPages: 0, data: [] };
    }
    const user = await response.json();
    return user;
  } catch (e) {
    console.error('Error fetching user:', e);
    throw new Error(JSON.stringify({ success: false, message: 'Error fetching user', page: 0, limit: 0, total: 0, totalPages: 0, data: [] }));
  }
}

export const getVerificationById = async(id: string): Promise<SingleVerificationResponse | undefined> => {
  try {
    const session = await auth();
    const token = session?.accessToken;
    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/admin/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });
    if (!response.ok) {
      return { success: false, message: 'Error fetching user', data: {} as DetailedVerificationItem };
    }
    const user = await response.json();
    return user;
  } catch (e) {
    console.error('Error fetching user:', e);
  }
}

export const sendChangeStatus = async (verification_id: string, verifyForm: VerifyForm) : Promise<VerificationResponse> => {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const response = await fetch(`${NEXT_PUBLIC_BACKEND_URL}/verification/admin/${verification_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(verifyForm),
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, message: 'Error al enviar la verificación' };
    }

    const data = await response.json();
    return data as VerificationResponse;
  } catch (error) {
    console.error('Error al enviar la verificación:', error);
    return { success: false, message: error instanceof Error ? error.message : 'Error desconocido' };
  }
};

export const updateUserProfileAdmin = async (profileId: string, payload: Record<string, any>) => {
  try {
    const session = await auth();
    const token = session?.accessToken;

    if (!token) {
      return { success: false, message: 'No autorizado' };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/profiles/${profileId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      return { success: false, message: data.message || 'Error al actualizar el perfil' };
    }

    return {
      success: true,
      message: data.message || 'Perfil actualizado correctamente',
      result: data,
    };
  } catch (error) {
    console.error('❌ Error en updateUserProfileAdmin:', error);
    return { success: false, message: 'Error interno al actualizar el perfil' };
  }
};

export const getUserProfileById = async (userId: string) => {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/profiles/by-id?userId=${userId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!res.ok) {
      console.error('❌ Error fetching user profile:', await res.text());
      return { success: false, message: 'No se pudo obtener el perfil' };
    }

    const data = await res.json();
    return { success: true, data: data.result };
  } catch (error) {
    console.error('⚠️ Error en getUserProfileById:', error);
    return { success: false, message: 'Error interno' };
  }
};

export const getUserProfileByUserId = async (userId: string) => {
  try {
    const session = await auth();
    const token = session?.accessToken;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/profiles/by-id?userId=${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      console.error("❌ Error fetching user profile:", await res.text());
      return { success: false, message: "No se pudo obtener el perfil" };
    }

    const data = await res.json();
    return { success: true, data: data.result };
  } catch (error) {
    console.error("⚠️ Error en getUserProfileByUserId:", error);
    return { success: false, message: "Error interno" };
  }
};