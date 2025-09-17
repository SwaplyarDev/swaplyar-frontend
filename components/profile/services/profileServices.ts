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

export const updateNickname = (token: string, nickName: string) =>
  apiRequest(
    `/users/profiles/my-profile/nickname`,
    "PUT",
    token,
    { nickName }
  );
  
export const updatePhone = (token: string, phone: string) =>
  apiRequest(`/users/profiles/my-profile/phone`, "PUT", token, { phone });

/** Editar localización */
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

/** Editar foto de perfil */
export const updatePicture = async (token: string, file: File) => {
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
