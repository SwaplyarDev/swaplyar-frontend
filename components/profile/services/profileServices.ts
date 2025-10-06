import { UpdateProfileResponse, UpdatePhoneResponse, UpdatePictureResponse } from "@/types/profileServices";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

async function apiRequest<T>(
  endpoint: string,
  method: string,
  token: string,
  body?: any,
  isFormData = false
): Promise<T> {
  const headers: HeadersInit = isFormData
    ? { Authorization: `Bearer ${token}` }
    : {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: isFormData ? body : body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(
      `❌ Error ${res.status} ${res.statusText}: ${errorText || "Unknown"}`
    );
  }

  return res.json();
}

/** Editar perfil */
export const updateProfile = (
  token: string,
  nickname?: string,
  location?: { country: string; department: string }
) =>
  apiRequest<UpdateProfileResponse>(
    `/users/profiles/my-profile`,
    "PUT",
    token,
    {
      ...(nickname && { nickname }), // solo si existe
      ...(location && { location })  // solo si existe
    }
  );


/** Editar teléfono */
export const updatePhone = (token: string, phone: string) =>
  apiRequest<UpdatePhoneResponse>(
    `/users/profiles/my-profile/phone`,
     "PUT", 
     token,
      { phone });


/** Editar foto de perfil */
export const updatePicture = async (token: string, file: File):Promise<UpdatePictureResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  return apiRequest(
    `/users/profiles/my-profile/picture`,
    "PUT",
    token,
    formData,
    true
  );
};

/** Editar email (solo admins por ahora)*/
//EL TIPADO ESTA SUPONIENDO QUE LA RESPUESTA ES IGUAL A LA DE PHONE, TODAVIA TIENE QUE CONFIRMARCE CON BACK
//YA QUE TODAVIA SE REQUIERE SER ADMIN PARA EDITAR EMAIL
export const updateEmail = (token: string, email: string) =>
  apiRequest<UpdatePhoneResponse>(
    `/users/profiles/my-profile/email`,
    "PUT",
    token,
    { email }
  );

  /*  Se comenta esta parte porque ahora se unificon los endpoints de location y nickname
  
  export const updateNickname = (token: string, nickName: string):Promise<UpdateNicknameResponse> =>
    apiRequest(
      `/users/profiles/my-profile/nickname`,
      "PUT",
      token,
      { nickName }
    );
    
    export const updateLocation = (
      token: string,
      country: string,
      department: string
    ) =>
      apiRequest(
        `/users/profiles/my-profile/location`,
        "PUT",
        token,
        { country, department }
      );
  
      */